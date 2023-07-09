import ReusableHeader from '../../../component/reusable/reusableheader/ReusableHeader'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import './supervisorProfile.css'

export default function SupervisorProfile() {
  const [inputValue, setInputValue] = useState('')
  const [editable, setEditable] = useState(false)
  const [buttonText, setButtonText] = useState('Edit Profile')

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleButtonClick = () => {
    if (editable) {
      setEditable(false)
      setButtonText('Edit Profile')
    } else {
      // Handle save functionality here
      // e.g., Make API calls, update database, etc.
      setEditable(true)
      setButtonText('Save')
    }
  }
  return (
    <section>
      <ReusableHeader />
      <section className='login-container'>
        <h3 className='login-heading'>Supervisor Login</h3>
        <section>
          <div className='input-form'>
            <label htmlFor=''>Name</label>
            <input
              value={inputValue}
              onChange={handleChange}
              disabled={!editable}
              type='text'
              placeholder='Lazarus Kadwama'
            />
          </div>
          <div className='input-form'>
            <label htmlFor=''>Phone Number</label>
            <input
              type='text'
              value={inputValue}
              onChange={handleChange}
              disabled={!editable}
              placeholder='+234902494030'
            />
          </div>
          <div className='input-form'>
            <label htmlFor=''>Email Address</label>
            <input
              type='text'
              value={inputValue}
              onChange={handleChange}
              disabled={!editable}
              placeholder='superadmin@yahoo.com'
            />
          </div>
          <div className='input-form'>
            <label htmlFor=''>Role</label>
            <input
              type='text'
              value={inputValue}
              onChange={handleChange}
              disabled={!editable}
              placeholder='Super Admin 1'
            />
          </div>
          <button onClick={handleButtonClick} className='edit-button'>
            {!editable ? (
              <div className='icon-bg'>
                <Icon
                  icon='fluent:edit-20-filled'
                  color='#f99c39'
                  className='edit-icon'
                />
              </div>
            ) : (
              ''
            )}
            {buttonText}
          </button>
        </section>
      </section>
    </section>
  )
}
