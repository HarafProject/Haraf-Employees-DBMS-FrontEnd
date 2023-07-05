import React from 'react';
// import './reusableinfo.css';

const ReusableInformationList = ({ title, information }) => {
  return (
    <div className='mt-5 reusable-info-list'>
      <p className='h6'>{title}</p>
      <div className="d-flex justify-content-between mt-3 personalinfo-user">
        {information.map((item, index) => (
          <p className='d-flex flex-column info' key={index}>
            <span>{item.label}</span>
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReusableInformationList;
