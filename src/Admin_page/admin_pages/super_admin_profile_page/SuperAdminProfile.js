import { Icon } from "@iconify/react";
import { useState } from "react";
import "./adminprofile.css";

export default function SuperAdminProfile() {
  const [editable, setEditable] = useState(false);
  const [buttonText, setButtonText] = useState("Edit Profile");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setInputValue3(event.target.value);
  };
  const handleInputChange4 = (event) => {
    setInputValue4(event.target.value);
  };

  const handleButtonClick = () => {
    if (editable) {
      setEditable(false);
      setButtonText("Edit Profile");
    } else {
      // Handle save functionality here
      // e.g., Make API calls, update database, etc.
      setEditable(true);
      setButtonText("Save");
    }
  };

  function cancelEdit() {
    // setUserData({
    //   firstname: user.firstname,
    //   surname: user.surname,
    //   phone: user.phone,
    // });
    setEditable(false);
    setButtonText("Edit Profile");
  }
  return (
    <div className="d-flex flex-column align-items-center admin-profile-section">
      <h2>Super Admin 1 Account</h2>
      <div className="admin-profile-page">
        <div className="profile">
          <img
            className="profile-picture"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          {editable && (
            <div className="camera-bg">
              <Icon icon="typcn:camera" color="white" />
            </div>
          )}
        </div>

        <div>
          <div className="input-form">
            <label htmlFor="">Name</label>
            <input
              className={editable ? "border-orange" : "border-black"}
              value={inputValue1}
              onChange={handleInputChange1}
              disabled={!editable}
              type="text"
              placeholder="Lazarus Kadwama"
            />
          </div>
          <div className="input-form">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              className={editable ? "border-orange" : "border-black"}
              value={inputValue2}
              onChange={handleInputChange2}
              disabled={!editable}
              placeholder="+234902494030"
            />
          </div>
          <div className="input-form">
            <label htmlFor="">Email Address</label>
            <input
              className={editable ? "border-orange" : "border-black"}
              type="text"
              value={inputValue3}
              onChange={handleInputChange3}
              disabled={!editable}
              placeholder="superadmin@yahoo.com"
            />
          </div>
          <div className="input-form">
            <label htmlFor="">Role</label>
            <input
              className={editable ? "border-orange" : "border-black"}
              type="text"
              value={inputValue4}
              onChange={handleInputChange4}
              disabled={!editable}
              placeholder="Super Admin 1"
            />
          </div>
          {/* <button onClick={handleButtonClick} className={`btn mt-4 profile-edit-button ${buttonText === "Save" ? "save-btn" : ""}`}>
            {!editable ? (
              // <div className="icon-bg">
                <Icon
                  icon="fluent:edit-20-filled"
                  color="#f99c39"
                  className="edit-icon"
                />
              // </div>
            ) : (
              ""
            )}
            {buttonText}
          </button> */}
          {/* {!isLoading && ( */}
            <div className="d-flex justify-content-between profile-btn mb-3">
              {editable && (
                <button className="btn profile-edit-button save-btn mt-4" onClick={cancelEdit}>
                  Cancel
                </button>
              )}

              <button onClick={handleButtonClick} className={`btn mt-4 profile-edit-button mx-auto ${buttonText === "Save" ? "save-btn" : ""}`}>
                {!editable ? (
                  // <div className="icon-bg">
                    <Icon
                      icon="fluent:edit-20-filled"
                      color="#f99c39"
                      className="edit-icon"
                    />
                  // </div>
                ) : (
                  ""
                )}
                {buttonText}
              </button>
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
