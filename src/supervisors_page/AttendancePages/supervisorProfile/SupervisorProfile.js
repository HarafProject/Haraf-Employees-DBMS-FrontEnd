import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "./supervisorProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import supervisor from "../../../class/supervisor.class";
import { toast } from "react-toastify";
import { loginSuccess } from "../../../redux/reducers/userReducer";

export default function SupervisorProfile() {
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [buttonText, setButtonText] = useState("Edit Profile");
  const [edited, setEdited] = useState(false);

  const [userData, setUserData] = useState({
    firstname: user.firstname,
    surname: user.surname,
    phone: user.phone,
  });

  const handleChange = (e) => {
    setEdited(true);
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleButtonClick = async (e) => {
    if (editable) {
      try {
        if (edited) {
          setIsLoading(true);
          const data = await supervisor.editProfile(userData);
          toast.success(data.message);
          dispatch(loginSuccess(data?.user));
          setEditable(false);
          setButtonText("Edit Profile");
        } else {
          setEditable(false);
          setButtonText("Edit Profile");
        }
      } catch (error) {
        toast.error(error);
        toast.error(error.error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle save functionality here
      // e.g., Make API calls, update database, etc.
      setEditable(true);
      setButtonText("Save");
    }
  };

  function cancelEdit() {
    setUserData({
      firstname: user.firstname,
      surname: user.surname,
      phone: user.phone,
    });
    setEditable(false);
    setButtonText("Edit Profile");
  }

  return (
    <div>
      <ReusableHeader />
      <div className="supervisor-account">
        <h3 className="">Supervisor Account</h3>
        <div className="d-flex flex-column align-items-center">
          {!editable && (
            <div className="input-form">
              <label htmlFor="">Name</label>
              <input
                value={`${userData.firstname} ${userData.surname}`}
                onChange={handleChange}
                disabled={!editable}
                type="text"
                placeholder="Lazarus Kadwama"
              />
            </div>
          )}
          {editable && (
            <div className="input-form">
              <label htmlFor="">First Name</label>
              <input
                value={userData.firstname}
                name="firstname"
                onChange={handleChange}
                disabled={!editable}
                type="text"
                placeholder="Lazarus Kadwama"
              />
            </div>
          )}

          {editable && (
            <div className="input-form">
              <label htmlFor="">Surname</label>
              <input
                type="text"
                name="surname"
                value={userData.surname}
                onChange={handleChange}
                disabled={!editable}
                placeholder="+234902494030"
              />
            </div>
          )}
          <div className="input-form">
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              value={userData.phone}
              onChange={handleChange}
              disabled={!editable}
              placeholder="+234902494030"
            />
          </div>
          <div className="input-form">
            <label htmlFor="">Email Address</label>
            <input
              type="email"
              onChange={handleChange}
              disabled={true}
              placeholder={user.email}
            />
          </div>
          <div className="input-form">
            <label htmlFor="">Role</label>
            <input
              type="text"
              value={user.role}
              onChange={handleChange}
              disabled={true}
              placeholder="Super Admin 1"
            />
          </div>

          {isLoading && (
            <center className="btn edit-button">
              <RotatingLines width="30" strokeColor="#FFF" strokeWidth="3" />
            </center>
          )}

          {!isLoading && (
            <div className="d-flex justify-content-between profile-btn mb-3">
              {editable && (
                <button className="btn profile-edit-button save-btn mt-4" onClick={cancelEdit}>
                  Cancel
                </button>
              )}

              <button onClick={handleButtonClick} className={`btn mt-4 profile-edit-button ${buttonText === "Save" ? "save-btn" : ""}`}>
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
          )}
        </div>
      </div>
    </div>
  );
}
