

import React, { useState, useRef } from 'react';
import profile from '../../../assets/profile.png';
import { Icon } from '@iconify/react';
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import './addemployee.css';
import { useNavigate } from 'react-router-dom';


export default function AddEmployeeScreen({ prefilledData }) {
    const navigate = useNavigate();


    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    function handleImageChange(event) {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
    function handleClick() {
        fileInputRef.current.click();
    }


    const isEditEmployee = !!prefilledData;




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
                    <h5>{isEditEmployee ? 'Add Employee' : 'Edit Employee'}</h5>


                    <form action="">
                        <div className="d-flex align-items-start">
                            <div className="mx-3">
                                <div className="form-field my-4">
                                    <input autocomplete="new-firstname" type="text" name="fname" placeholder='FirstName ' />
                                </div>
                                <div className="form-field my-4">
                                    <input autocomplete="new-accountnumber" type="number" name="bankno" placeholder='Bank Account Number ' />
                                </div>
                                <div className="form-field my-4">
                                    <select name="ward" id="">
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

                                </div>
                                <div className="form-field my-4">
                                    <input autocomplete="age" type="text" name="age" placeholder='Age ' />
                                </div>
                                <div className="form-field my-4">
                                    <select name="maritalstatus" id="">
                                        <option value="">Marital Status</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorce">Divorce</option>
                                    </select>

                                </div>

                                <div className="form-field my-4">
                                    <input autocomplete="new-housesize" type="number" name="housesize" placeholder='Household Size' />
                                </div>
                                <div className="form-field my-4">
                                    <select name="gender" id="">
                                        <option value="">Sex</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                    </select>

                                </div>


                            </div>
                            <div className="mx-3">
                                <div className="form-field my-4">
                                    <input autocomplete="new-phone" type="tel" name="phone" placeholder='Phone Number ' />
                                </div>
                                <div className="form-field my-4">
                                    <select name="bankname" id="">
                                        <option value="">Bank Name</option>
                                        <option value="accessbank">Access Bank Plc</option>
                                        <option value="fidelitybank">Fidelity Bank Plc</option>
                                        <option value="fcmb">First City Monument Bank Limited</option>
                                        <option value="firstbank">First Bank of Nigeria Limited</option>
                                        <option value="gtb">Guaranty Trust Holding Company Plc</option>
                                        <option value="unionbank">Union Bank of Nigeria Plc</option>
                                        <option value="uba">United Bank for Africa Plc</option>
                                        <option value="zenithbank">Zenith Bank Plc</option>
                                    </select>

                                </div>
                                <div className="form-field my-4">
                                    <input autocomplete="new-address" type="text" name="" placeholder='Home Address' />
                                </div>
                                <div className="form-field my-4">
                                    <select name="worktypology" id="">
                                        <option>Work Typology</option>
                                        <option value="health">Health</option>
                                        <option value="education">Education</option>
                                        <option value="wash">wash</option>
                                        <option value="agricuture">Agriculture, livelihood {<br />} & Value chain</option>
                                        <option value="transport">Transport</option>
                                    </select>

                                </div>

                                <div className="form-field my-4">
                                    <select name="specialdisability" id="">
                                        <option>Special Disability</option>
                                        <option value="nil">N/A</option>
                                        <option value="visibility">Visibility impairment</option>
                                        <option value="hearing">Hearing impairment</option>
                                        <option value="physical">Physical impairment</option>
                                        <option value="intellectual">Intellectual impairment</option>
                                        <option value="mental">Mental/Psychosocial impairment</option>
                                        <option value="speech">Speech impairment</option>
                                    </select>
                                </div>
                                <div className="form-field my-4">
                                    <select name="headofhouse" id="">
                                        <option>Head of House</option>
                                        <option value="womanhead">Women headed household</option>
                                        <option value="youthhead">Youth headed household</option>
                                        <option value="idp">Internal displaced Persons</option>
                                        <option value="aged">Aged</option>
                                    </select>
                                </div>

                                <div className='d-flex align-items-center picture-upload-section'>
                                    <div className="profile-img mx-3">
                                        {selectedImage ? (
                                            <img src={selectedImage} alt="Default Profile Image" />
                                        ) : (
                                            <img src={profile} alt='' />

                                        )}
                                        <button className="camera" onClick={handleClick}>
                                            <Icon icon="heroicons-solid:camera" className='camera-icon' />
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <p className="headshot-title">
                                        Employees headshot {<br />} <span>
                                            Please take a clear well lighted headshot
                                        </span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </form>


                    {/* <button onClick={() => { navigate("/biometric-capture"); }} className="btn save-employee mt-5">
                        Save Employee
                    </button> */}
                    <button
                        onClick={() => {
                            if (isEditEmployee) {
                                navigate("/employee-list");
                            } else {
                                navigate("/biometric-capture");
                            }
                        }}
                        className="btn save-employee mt-5"
                    >
                        {isEditEmployee ? 'Save Changes' : 'Save Employee'}
                    </button>
                </div>
            </div>
        </div>
    )
}