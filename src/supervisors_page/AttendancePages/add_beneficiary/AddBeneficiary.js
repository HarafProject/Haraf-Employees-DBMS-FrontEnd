import React, { useState } from 'react'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import './addbeneficiary.css'
import profile from '../../../assets/profile.png'
import {
  bankName,
  householdTypes,
  sex,
  maritalStatus,
  specialDisability,
  wards,
  workTopology,
} from '../../../component/data/AddBeneficiaryData'

export default function AddBeneficiary() {
  // Create state variables to hold the values of the input fields
  const [inputValues, setInputValues] = useState({
    accountNumber: '',
    bankName: '',
    fullName: '',
    phoneNumber: '',
    age: '',
    homeAddress: '',
    houseHoldSize: '',
  })

  const [selectedOption, setSelectedOption] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      <ReusableHeader />
      <div className='add-form'>
        <h2>Add Beneficiary</h2>
        <div className='form-flex'>
          <div>
            <div>
              <input
                type='text'
                placeholder='Account Number'
                value={inputValues.accountNumber}
                name='accountNumber'
                onChange={handleInputChange}
              />
            </div>

            <div>
              <input
                type='text'
                value={inputValues.fullName}
                name='fullName'
                placeholder='Full Name'
                onChange={handleInputChange}
              />
            </div>
            <div>
              <select
                id='dropdown'
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value=''>Ward</option>
                {wards.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type='text'
                value={inputValues.age}
                name='age'
                onChange={handleInputChange}
                placeholder='Age'
              />
            </div>
            <div>
              <select
                id='dropdown'
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value=''>Marital Status</option>
                {maritalStatus.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type='text'
                value={inputValues.houseHoldSize}
                name='houseHoldSize'
                onChange={handleInputChange}
                placeholder='Household size'
              />
            </div>

            <div>
              <select
                id='dropdown'
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value=''>Sex</option>
                {sex.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div>
              <select
                id='dropdown'
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value=''>Bank name</option>
                {bankName.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type='text'
                value={inputValues.phoneNumber}
                name='phoneNumber'
                onChange={handleInputChange}
                placeholder='Phone Number'
              />
            </div>

            <div>
              <input
                type='text'
                value={inputValues.homeAddress}
                name='homeAddress'
                onChange={handleInputChange}
                placeholder='Home Address'
              />
            </div>
            <div>
              <select
                id='dropdown'
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value=''>Work Typology</option>
                {workTopology.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id='dropdown'
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value=''>Special Disability</option>
                {specialDisability.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id='dropdown'
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value=''>Head of Household</option>
                {householdTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className='user'>
              <div>
                <img src={profile} alt='' />
              </div>
              <div>
                <p>Beneficiary headshot</p>
                <p>Please take a clear well lighted headshot</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={''}>Save Beneficiary</button>
      </div>
    </div>
  )
}
