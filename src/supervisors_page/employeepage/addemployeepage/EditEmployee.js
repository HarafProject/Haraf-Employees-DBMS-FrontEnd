import React, { useState, useRef, useEffect } from 'react';
import profile from '../../../assets/profile.png';
import { Icon } from '@iconify/react';
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import './addemployee.css';
import { useNavigate, useLocation } from 'react-router-dom';
import dataOBJs from '../../../class/data.class';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import Webcam from 'react-webcam';
import Modal from 'react-modal';
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from 'react-query'
import supervisor from '../../../class/supervisor.class';


const fetchEmployee = async (key, id) => {
  if (!id) return
  try {

    const res = await supervisor.getEmployee(id)
    return res

  } catch (error) {
    toast.error(error?.error);
  }
};

export default function EditEmployeeScreen() {
  const navigate = useNavigate();
  const location = useLocation()
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const { user } = useSelector((state) => state?.user)
  const [isVerified, setIsVerified] = useState(false)//Check if user account number is valid
  const [bankDetail, setBankDetails] = useState({
    bankName: "Select Bank",
  })
  const [bankList, setbankList] = useState([])
  const [wardList, setWardList] = useState([])
  const [typologyList, setTypologyList] = useState([])
  const inputRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [edited, setEdited] = useState(false)
  let { employee, notificationId } = location.state
  const { data, status } = useQuery(['fetchEmployee', employee], fetchEmployee)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageData(imageSrc);
    closeModal()
  };


  async function fetchBankList() {
    try {
      const bank_list = await supervisor.getBankList();
      setbankList(bank_list.banks)
    } catch (error) {
      toast.error(error)
      toast.error(error.error)
    }

  }
  async function fetchWards() {
    try {

    } catch (error) {

    }
    const ward_list = await dataOBJs.getWardsByLga(user.lga);
    setWardList(ward_list)
  }

  async function fetchTypology() {
    const typology_list = await supervisor.getWorkTypology();

    setTypologyList(typology_list.workTypology)
    // setWardList(ward_list)
  }
  useEffect(() => {

    if (!employee) return navigate(-1)

    fetchBankList();
    fetchWards()
    fetchTypology()
  }, [])

  useEffect(() => {
    if (!data) return

    setBankDetails({
      fullName: data.employee.fullName,
      accountNumber: data.employee.accountNumber,
      bankCode: data.employee.bankCode,
      bankName: data.employee.bankName,
      BVN:data.employee.BVN

    })
    setImageData(data.employee.photo)
    const updatedValues = {
      ward: data.employee.ward._id,
      age: data.employee.age,
      maritalStatus: data.employee.maritalStatus,
      householdSize: data.employee.householdSize,
      sex: data.employee.sex,
      phone: data.employee.phone,
      address: data.employee.address,
      workTypology: data.employee.workTypology._id,
      specialDisability: data.employee.specialDisability,
      householdHead: data.employee.householdHead,
    };
    formik.setValues(updatedValues);
    setIsVerified(true)
  }, [data])




  async function verifyBankDetails() {

    if (!bankDetail.accountNumber) return toast.error("Please enter account number.")
    if (bankDetail.bankName === "Select Bank") return toast.error("Please select bank.")
    toast.info("Please wait while we verify your bank details.")
    try {
      setIsVerified(false)
      const { bankDetails, message } = await supervisor.verifyEmpoyeeBankAccount(bankDetail)

      setBankDetails({
        ...bankDetail,
        fullName: bankDetails.accountName
      })

      toast.success(message)
      setIsVerified(true)
      inputRef.current.focus();

    } catch (error) {
      console.log(error)
      setBankDetails({
        ...bankDetail,
        fullName: ""
      })
      setIsVerified(false)
      toast.error(error)
      toast.error(error?.error)
    }

  }

  const validationSchema = Yup.object().shape({
    ward: Yup.string().required('Ward is required'),
    age: Yup.number().required('Age is required'),
    maritalStatus: Yup.string().required('Marital Status is required'),
    householdSize: Yup.number().required('Household Size is required'),
    sex: Yup.string().required('sex is required'),
    phone: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Home Address is required'),
    workTypology: Yup.string().required('Work Typology is required'),
    specialDisability: Yup.string().required('Special Disability is required'),
    householdHead: Yup.string().required('Head of House is required'),
  });

  const formik = useFormik({
    initialValues: {
      ward: '',
      age: '',
      maritalStatus: '',
      householdSize: '',
      sex: '',
      phone: '',
      address: '',
      workTypology: '',
      specialDisability: '',
      householdHead: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!imageData) return toast.error("Headshot is required.")
      try {
        // Handle form submission here
        // Create a FormData object to send the image file
        setIsLoading(true)
        const formData = new FormData();

        if (imageData.slice(-4) !== "webp") {
          formData.append('image', dataURLtoFile(imageData, 'image.png'));
        }

        // Append form fields to formData
        Object.keys(values).forEach((field) => {

          formData.append(field, values[field]);
        });
        // Append form fields to formData
        Object.keys(bankDetail).forEach((field) => {
          // console.log()
          formData.append(field, bankDetail[field]);
        });
        const { message, updatedEmployee } = await supervisor.updateEmployeeProfile(formData, employee, notificationId)

        toast.success(message)
        setIsLoading(false)
        navigate("/supervisor/employee-profile", { state: updatedEmployee, replace: true })

      } catch (error) {
        setIsLoading(false)
        toast.error(error)
        toast.error(error?.error)
      }
    },
  });

  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };


  return (
    <div className="add-employee-screen ">
      <div>
        <ReusableHeader />
      </div>
      <div className="add-employee-screen mt-5 py-5">

        <div className="d-flex flex-column align-items-center add-employee-content mt-4">

          {/* <h5>Add Employee</h5> */}
          {/* <h5>{prefilledData ? 'Edit Employee' : 'Add Employee'}
                    </h5>  */}
          <h5>Edit Beneficiary</h5>


          <form >
            <div className="d-flex align-items-start">
              <div className="mx-3">
                <div className="form-field my-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={bankDetail.fullName}
                    disabled
                  />

                </div>
                <div className="form-field my-4">
                  <input autocomplete="new-accountnumber"
                    type="text" name="accountNumber"
                    onChange={(e) => setBankDetails({
                      ...bankDetail,
                      accountNumber: e.target.value
                    })}
                    value={bankDetail.accountNumber}
                    onBlur={verifyBankDetails}
                    placeholder='Bank Account Number '
                    autoFocus
                    disabled
                  />
                </div>
                <div className="form-field my-4" >
                  <select name="ward" disabled={!isVerified}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ward}
                    placeholder="Select ward"
                  >
                    <option value="">Ward</option>
                    {
                      wardList.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                    }

                  </select>
                  {formik.touched.ward && formik.errors.ward ? (
                    <div className="error">{formik.errors.ward}</div>
                  ) : null}
                </div>
                <div className="form-field my-4">
                  <input autocomplete="age" type="number" name="age" placeholder='Age ' disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="error">{formik.errors.age}</div>
                  ) : null}
                </div>
                <div className="form-field my-4">
                  <select name="maritalStatus" disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.maritalStatus} >
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorce">Divorce</option>
                  </select>
                  {formik.touched.maritalStatus && formik.errors.maritalStatus ? (
                    <div className="error">{formik.errors.maritalStatus}</div>
                  ) : null}
                </div>

                <div className="form-field my-4">
                  <input autocomplete="new-housesize" type="number"
                    name="householdSize" placeholder='Household Size'
                    disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.householdSize}
                  />
                  {formik.touched.householdSize && formik.errors.householdSize ? (
                    <div className="error">{formik.errors.householdSize}</div>
                  ) : null}
                </div>
                <div className="form-field my-4"  >
                  <select name="sex" id="" disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sex}>
                    <option value="">Sex</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>

                  {formik.touched.sex && formik.errors.sex ? (
                    <div className="error">{formik.errors.sex}</div>
                  ) : null}
                </div>


              </div>
              <div className="mx-3">
                <div className="form-field my-4">
                  <input autocomplete="new-phone"
                    type="tel" name="phone" ref={inputRef}
                    placeholder='Phone Number '
                    disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />

                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="error">{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div className="form-field my-4">
                  <select name="" onChange={(e) => {
                    if (e.target.value === bankDetail?.bankName) return
                    const bank = JSON.parse(e.target.value)
                    setBankDetails({
                      ...bankDetail,
                      bankName: bank.name,
                      bankCode: bank.code
                    })

                  }} placeholder='Select Bank'
                    onBlur={verifyBankDetails}
                    disabled
                  >
                    <option>{bankDetail?.bankName}</option>
                    {
                      bankList?.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>)
                    }
                  </select>

                </div>
                <div className="form-field my-4">
                  <input autocomplete="new-address"
                    type="text" name="address" placeholder='Home Address'
                    disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="error">{formik.errors.address}</div>
                  ) : null}
                </div>
                <div className="form-field my-4">
                  <select name="workTypology" disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.workTypology}
                  >
                    <option>Work Typology</option>
                    {typologyList?.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}

                  </select>
                  {formik.touched.workTypology && formik.errors.workTypology ? (
                    <div className="error">{formik.errors.workTypology}</div>
                  ) : null}
                </div>

                <div className="form-field my-4">
                  <select name="specialDisability" disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.specialDisability} >
                    <option>Special Disability</option>
                    <option value="nil">N/A</option>
                    <option value="visibility">Visibility impairment</option>
                    <option value="hearing">Hearing impairment</option>
                    <option value="physical">Physical impairment</option>
                    <option value="intellectual">Intellectual impairment</option>
                    <option value="mental">Mental/Psychosocial impairment</option>
                    <option value="speech">Speech impairment</option>
                  </select>
                  {formik.touched.specialDisability && formik.errors.specialDisability ? (
                    <div className="error">{formik.errors.specialDisability}</div>
                  ) : null}
                </div>
                <div className="form-field my-4">
                  <select name="householdHead" disabled={!isVerified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.householdHead} >
                    <option>Head of House</option>
                    <option value="womanhead">Women headed household</option>
                    <option value="youthhead">Youth headed household</option>
                    <option value="idp">Internal displaced Persons</option>
                    <option value="aged">Aged</option>
                  </select>
                  {formik.touched.householdHead && formik.errors.householdHead ? (
                    <div className="error">{formik.errors.householdHead}</div>
                  ) : null}
                </div>

                <div className='d-flex align-items-center picture-upload-section'>
                  <div className="profile-img mx-3">

                    {imageData && <img src={imageData} alt="Captured" />}

                    {!imageData && <img src={profile} alt='' />}
                    <button className="camera" onClick={(e) => {
                      e.preventDefault()
                      openModal()
                    }} disabled={!isVerified}>
                      <Icon icon="heroicons-solid:camera" className='camera-icon' />
                    </button>

                  </div>
                  <p className="headshot-title">
                  Beneficiary headshot {<br />} <span>
                      Please take a clear well lighted headshot
                    </span>
                  </p>
                </div>

              </div>
            </div>
            {isLoading && <center className="btn save-employee mt-5"><RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" /></center>}

            {
              !isLoading &&
              <div className="d-flex">
                <button type="button" onClick={() => navigate(-1)} className="btn save-employee mt-5">
                  Go back
                </button>
                <button type="button" onClick={formik.handleSubmit} disabled={!formik.isValid || !isVerified || isLoading} className="btn save-employee mt-5">
                  Save Changes
                </button>
              </div>


            }
          </form>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className={{
              base: 'modal-base',
              afterOpen: 'modal-base_after-open',
              beforeClose: 'modal-base_before-close'
            }}
            overlayClassName={{
              base: 'overlay-base',
              afterOpen: 'overlay-base_after-open',
              beforeClose: 'overlay-base_before-close'
            }}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={2000}
          >

            <Webcam
              audio={false}
              ref={webcamRef}
              mirrored={true}
              videoConstraints={{
                facingMode: ["environment"]
              }}
            />
            <button className="profile-img camera" onClick={handleCapture}>
              <Icon icon="heroicons-solid:camera" className='camera-icon' />
            </button>
          </Modal>


        </div>
      </div>
    </div>
  )
}