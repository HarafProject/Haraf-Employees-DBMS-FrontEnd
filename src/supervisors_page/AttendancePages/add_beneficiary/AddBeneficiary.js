import React, { useState } from 'react'
import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import './addbeneficiary.css'
import profile from '../../../assets/profile.png'
import { bankName } from '../../../component/data/AddBeneficiaryData'

export default function AddBeneficiary() {
  // Create state variables to hold the values of the input fields
  const [inputValues, setInputValues] = useState({
    accountNumber: '',
    bankName: '',
    firstName: '',
    lastName: '',

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
                value={inputValues.firstName}
                name='firstName'
                placeholder='First Name'
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <input
                type='text'
                value={inputValues.lastName}
                name='lastName'
                placeholder='Last Name'
                onChange={handleInputChange}
              />
            </div>
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
          </div>
        </div>
        <button onClick={''}>Verify</button>
      </div>
    </div>
  )
}
