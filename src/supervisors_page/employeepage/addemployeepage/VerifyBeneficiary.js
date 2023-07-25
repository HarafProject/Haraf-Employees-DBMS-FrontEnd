import React, { useState, useEffect } from 'react'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import './verifyBeneficiary.css'
import supervisor from '../../../class/supervisor.class';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import NoNetworkModal from '../../../component/reusable/modalscontent/NoNetworkModal';
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';

export default function VerifyBeneficiary() {
    const navigate = useNavigate(); 
    const [bankList, setbankList] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState(null)
    const [isVerified, setIsVerified] = useState(false)
    const [verifiedDetails, setVerifiedDetails] = useState({})
    
    const [bankDetail, setBankDetails] = useState({
        bankName: "Select Bank",
    })
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    // Create state variables to hold the values of the input fields
    const [inputValues, setInputValues] = useState({
        accountNumber: "",
        bankcode: '',
        firstname: "",
        lastname: "",
        bankName: "Select Bank"

    })
    
    async function fetchBankList() {
        try {
            const bank_list = await supervisor.getBankList();

            setbankList(bank_list?.banks)
        } catch (error) {
            if (error === "You are currently offline.") {
                openModal()
            } else {
                toast.error(error)
                toast.error(error.error)
            }

        }

    }

    async function verifyBeneficiaryInfo() {

        if (!inputValues.accountNumber || !inputValues.bankcode || !inputValues.firstname || !inputValues.lastname || !inputValues.bankName) return toast.error("All inputs are required.")
        setIsLoading(true)
        try {
            const data = await supervisor.verifyBeneficiary(inputValues)

            setImg(`data:image/jpeg;base64,${data.bankDetails.photo}`)
            toast.success(data.message)
            setIsVerified(true)
            setVerifiedDetails(data.bankDetails)

        } catch (error) {
            toast.error(error)
            toast.error(error?.error)
            toast.error(error?.message)
            if (error.error.message) {
                return toast.error(error?.error?.message)
            } else {
               return toast.error("Invalid Input. Please check the input and try again.")
            }


        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBankList()
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInputValues((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }


    return (
        <div>
            <ReusableHeader />
            <div className='verify-beneficiary'>
                <h2>Verify Beneficiary</h2>

                {//Display BVN photo if verified
                    isVerified &&
                    <div className="bvn-photo">
                        <img src={img} />
                    </div>
                }


                <div className='form-flex'>
                    <div>
                        <div>
                            <input
                                type='text'
                                value={inputValues?.firstname}
                                name='firstname'
                                placeholder='First Name'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input
                                type='text'
                                placeholder='Account Number'
                                value={inputValues?.accountNumber}
                                name='accountNumber'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <input
                                type='text'
                                value={inputValues?.lastname}
                                name='lastname'
                                placeholder='Last Name'
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='select-field'>
                            <select
                                name="bankcode"
                                value={inputValues?.bankcode}
                                onChange={(e) => {
                                    if (e.target.value === inputValues?.bankName) return
                                    const bank = JSON.parse(e.target.value)
                                    setInputValues({
                                        ...inputValues,
                                        bankName: bank.name,
                                        bankcode: bank.code
                                    })

                                }}
                            >
                                <option>{inputValues?.bankName}</option>
                                {
                                    bankList?.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    
                </div>

                {isLoading && <button className="btn verify-btn save-employee"><RotatingLines width="20" strokeColor="#FFF" strokeWidth="3" /></button>}


                {(!isLoading && !isVerified) && <button className="btn verify-btn save-employee" onClick={verifyBeneficiaryInfo}>Verify</button>}
                {(!isLoading && isVerified) && <button onClick={() => navigate("/supervisor/add-employee", { state: verifiedDetails, replace: true })} className="btn verify-btn save-employee">Continue</button>}
            </div>
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

                <NoNetworkModal
                    closeModal={closeModal}
                />

            </Modal>
        </div>
    )
}