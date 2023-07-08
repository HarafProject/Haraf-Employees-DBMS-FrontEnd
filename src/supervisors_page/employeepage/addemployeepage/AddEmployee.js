import React, { useState,useEffect, useRef } from "react";
import profile from "../../../assets/profile.png";
import { Icon } from "@iconify/react";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import "./addemployee.css";
import { useNavigate } from "react-router-dom";
import supervisor from "../../../class/supervisor.class";
import { useFormik } from "formik";
import * as yup from "yup";


export default function AddEmployeeScreen() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [typology,setTypology] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  function handleImageChange(event) {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  }
  function handleClick() {
    fileInputRef.current.click();
  }
  useEffect(()=>{
    //get typology
    supervisor.getWorkTypology().then((res)=>{
      console.log(res?.data,'typology')
    })
    //get profile
    supervisor.getProfile().then((res)=>{
      console.log(res,'data of sup')
    })
    //get bank list
    supervisor.getBankList().then((res)=>{
      console.log(res,'data form bank')
    })
  },[supervisor])

  const validationSchema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    bankno: yup.number().required("Bank Account Number is required"),
    ward: yup.string().required("Ward is required"),
    age: yup.string().required("Age is required"),
    maritalstatus: yup.string().required("Marital Status is required"),
    housesize: yup.number().required("Household Size is required"),
    gender: yup.string().required("Gender is required"),
    phone: yup.string().required("Phone Number is required"),
    bankname: yup.string().required("Bank Name is required"),
    address: yup.string().required("Home Address is required"),
    worktypology: yup.string().required("Work Typology is required"),
    specialdisability: yup.string().required("Special Disability is required"),
    headofhouse: yup.string().required("Head of House is required"),
  });


 
  const formik = useFormik({
    initialValues: {
      fname: "",
      bankno: "",
      ward: "",
      age: "",
      maritalstatus: "",
      housesize: "",
      gender: "",
      phone: "",
      bankname: "",
      address: "",
      worktypology: "",
      specialdisability: "",
      headofhouse: "",
      image:""
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission
      if(selectedImage){
        const data = {
          uploaded_file:selectedImage,
          fullName:values.fname ,
          phone:values.phone,
          accountNumber:values.bankno,
          zone:"64a3f6362a5ef2032b4b0cd7", //comes for sup
          lga:"64a3fa9c9ef7c273740bba81",//comes for sup
          ward:"64a5733e1a8f7b7fb075be7b",//comes for sup
          address:values.address,
          age:values.age,
          workTypology:"64a4ac99014ab6d0c08ad3a0",
          maritalStatus:values.maritalstatus,
          householdSize:values.headofhouse,
          householdHead:values.headofhouse,
          specialDisability:values.specialdisability
        }
        //verify bank details
        const bankDetails = {
          
        }
        try {
          const res = await supervisor.verifyEmpoyeeBankAccount(bankDetails);
          if (res) {
            // Add employee
            const addEmployee = async (data) => {
              const res = await supervisor.addEmployee(data);
              console.log(res, 'response');
            };
            addEmployee();
          }
        } catch (err) {
          // Error verifying bank details
          console.log(err);
        }
        console.log(values);
      }
    },
  });

  return (
    <div className="add-employee-screen ">
      <div>
        <ReusableHeader />
      </div>
      <div className="add-employee-screen mt-5 py-5">
        <div className="d-flex flex-column align-items-center add-employee-content mt-4">
          <h5>Add Employee</h5>

          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex align-items-start">
              <div className="mx-3">
                <div className="form-field my-4">
                  <input
                    autocomplete="new-firstname"
                    type="text"
                    name="fname"
                    id="fname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fname}
                    placeholder="FirstName "
                  />
                  {formik.touched.fname && formik.errors.fname && (
                    <p className="error">{formik.errors.fname}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <input
                    autocomplete="new-accountnumber"
                    type="number"
                    name="bankno"
                    id="bankno"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bankno}
                    placeholder="Bank Account Number "
                  />
                  {formik.touched.bankno && formik.errors.bankno && (
                    <p className="error">{formik.errors.bankno}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <select name="ward" id="ward" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ward}
                  placeholder="FirstName ">
                    <option value="">Ward</option>
                    <option value="banjiram">Banjiram</option>
                    <option value="bobini">Bobini</option>
                    <option value="bodeno">Bodeno</option>
                    <option value="chikila">Chikila</option>
                    <option value="dukul">Dukul</option>
                    <option value="dumna">Dumna</option>
                    <option value="guyuk">Guyuk</option>
                    <option value="kola">Kola</option>
                    <option value="lokoro">Lokoro</option>
                    <option value="purokayo">Purokayo</option>
                  </select>
                  {formik.touched.ward && formik.errors.ward && (
                    <p className="error">{formik.errors.ward}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <input
                    autocomplete="age"
                    type="text"
                    name="age"
                    placeholder="Age "
                    id="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                    
                  />
                  {formik.touched.age && formik.errors.age && (
                    <p className="error">{formik.errors.age}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <select name="maritalstatus" id="maritalstatus"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maritalstatus}
                  placeholder="maritalstatus">
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorce">Divorce</option>
                  </select>
                  {formik.touched.maritalstatus && formik.errors.maritalstatus && (
                    <p className="error">{formik.errors.maritalstatus}</p>
                  )}
                </div>

                <div className="form-field my-4">
                  <input
                    autocomplete="new-housesize"
                    type="number"
                    name="housesize"
                    id="housesize"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.housesize}
                    placeholder="Household Size"
                  />
                  {formik.touched.housesize && formik.errors.housesize && (
                    <p className="error">{formik.errors.housesize}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <select name="gender" 
                  id="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}>
                    <option value="">Sex</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="error">{formik.errors.gender}</p>
                  )}
                </div>
              </div>
              <div className="mx-3">
                <div className="form-field my-4">
                  <input
                    autocomplete="new-phone"
                    type="tel"
                    name="phone"
                    id="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                    placeholder="Phone Number "
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="error">{formik.errors.phone}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <select name="bankname"  id="bankname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bankname}>
                    <option value="">Bank Name</option>
                    <option value="accessbank">Access Bank Plc</option>
                    <option value="fidelitybank">Fidelity Bank Plc</option>
                    <option value="fcmb">
                      First City Monument Bank Limited
                    </option>
                    <option value="firstbank">
                      First Bank of Nigeria Limited
                    </option>
                    <option value="gtb">
                      Guaranty Trust Holding Company Plc
                    </option>
                    <option value="unionbank">Union Bank of Nigeria Plc</option>
                    <option value="uba">United Bank for Africa Plc</option>
                    <option value="zenithbank">Zenith Bank Plc</option>
                  </select>
                  {formik.touched.bankname && formik.errors.bankname && (
                    <p className="error">{formik.errors.bankname}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <input
                    autocomplete="new-address"
                    type="text"
                    name="address"
                    id="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                    placeholder="Home Address"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="error">{formik.errors.address}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <select name="worktypology" id="worktypology"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.worktypology}>
                    <option>Work Typology</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                    <option value="wash">wash</option>
                    <option value="agricuture">
                      Agriculture, livelihood {<br />} & Value chain
                    </option>
                    <option value="transport">Transport</option>
                  </select>
                  {formik.touched.worktypology && formik.errors.worktypology && (
                    <p className="error">{formik.errors.worktypology}</p>
                  )}
                </div>

                <div className="form-field my-4">
                  <select name="specialdisability" id="specialdisability"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specialdisability}>
                    <option>Special Disability</option>
                    <option value="nil">N/A</option>
                    <option value="visibility">Visibility impairment</option>
                    <option value="hearing">Hearing impairment</option>
                    <option value="physical">Physical impairment</option>
                    <option value="intellectual">
                      Intellectual impairment
                    </option>
                    <option value="mental">
                      Mental/Psychosocial impairment
                    </option>
                    <option value="speech">Speech impairment</option>
                  </select>
                  {formik.touched.specialdisability && formik.errors.specialdisability && (
                    <p className="error">{formik.errors.specialdisability}</p>
                  )}
                </div>
                <div className="form-field my-4">
                  <select name="headofhouse" id="headofhouse"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.headofhouse}>
                    <option>Head of House</option>
                    <option value="womanhead">Women headed household</option>
                    <option value="youthhead">Youth headed household</option>
                    <option value="idp">Internal displaced Persons</option>
                    <option value="aged">Aged</option>
                  </select>
                  {formik.touched.headofhouse && formik.errors.headofhouse && (
                    <p className="error">{formik.errors.headofhouse}</p>
                  )}
                </div>

                <div className="d-flex align-items-center picture-upload-section">
                  <div className="profile-img mx-3">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Profile" />
                    ) : (
                      // eslint-disable-next-line jsx-a11y/img-redundant-alt
                      <img src={profile} alt="Default Profile Image" />
                    )}
                    <button className="camera" onClick={handleClick}>
                      <Icon
                        icon="heroicons-solid:camera"
                        className="camera-icon"
                      />
                    </button>
                    <input
                      type="file"
                      accept="image/"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    
                  </div>
                  <p className="headshot-title">
                    Employees headshot {<br />}{" "}
                    <span>Please take a clear well lighted headshot</span>
                  </p>
                </div>
              </div>
            </div>
            <button
            type="submit"
            className=" btn save-employee mt-5"
          >
            Save Employee
          </button>
          </form>

         
        </div>
      </div>
    </div>
  );
}
