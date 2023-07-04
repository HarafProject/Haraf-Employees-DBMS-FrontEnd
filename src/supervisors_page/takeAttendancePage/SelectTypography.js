import ReusableHeader from '../../component/reusable/reusableheader/ReusableHeader'
import { useNavigate } from 'react-router-dom'
import './attendance.css'
import { useState } from 'react'
export default function SelectTypography() {
  const [checkedItems, setCheckedItems] = useState({})

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    })
  }
  const navigate = useNavigate()

  return (
    <section>
      <ReusableHeader />
      <div className='margin '>
        <div className='select-typ'>
          <div className='header'>
            <h3>Select Typology</h3>
            <p>
              Please choose the employee typology for whom you will be taking
              attendance.
            </p>
          </div>
          <div className='wrapper'>
            <div className='grid'>
              <label className='toggle'>
                <div>
                  <input
                    type='checkbox'
                    name='checkbox1'
                    className='check'
                    checked={checkedItems.checkbox1 || false}
                    onChange={handleChange}
                  />
                  Health
                </div>
              </label>

              <label className='toggle'>
                <div>
                  <input
                    type='checkbox'
                    name='checkbox2'
                    className='check'
                    checked={checkedItems.checkbox2 || false}
                    onChange={handleChange}
                  />
                  Education
                </div>
                <p>You can only select one typology at a time</p>
              </label>

              <label className='toggle'>
                <div>
                  <input
                    type='checkbox'
                    name='checkbox3'
                    className='check'
                    checked={checkedItems.checkbox3 || false}
                    onChange={handleChange}
                  />
                  WASH
                </div>
              </label>

              <label className='toggle'>
                <div>
                  <input
                    type='checkbox'
                    name='checkbox4'
                    className='check'
                    checked={checkedItems.checkbox4 || false}
                    onChange={handleChange}
                  />
                  Transport
                </div>
              </label>
            </div>
            <label className='last-check'>
              <input
                type='checkbox'
                name='checkbox5'
                className='check'
                onChange={handleChange}
              />
              Agriculture, Livelihood & Value chain
            </label>
          </div>

          <button
            onClick={() => {
              navigate('/take-attendance')
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </section>
  )
}
