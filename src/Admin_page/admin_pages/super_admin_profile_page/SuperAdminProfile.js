import { Icon } from "@iconify/react";
import { useState } from "react";
import "./adminprofile.css";
import { useSelector, useDispatch } from "react-redux";
import SuperAdminProfileSetUp from "../../../class/superadminProfile.class";
import { toast } from "react-toastify";
import { loginSuccess } from "../../../redux/reducers/userReducer";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import { RotatingLines } from "react-loader-spinner";

export default function SuperAdminProfile() {
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
          const data = await SuperAdminProfileSetUp.editProfile(userData);
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
    <section>
      <section className="login-container">
        <h3 className="login-heading">Admin Profile</h3>
        <section>
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
              type="text"
              value={userData.phone}
              onChange={handleChange}
              disabled={!editable}
              placeholder="+234902494030"
            />
          </div>
          <div className="input-form">
            <label htmlFor="">Email Address</label>
            <input
              type="text"
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
            <div className="d-flex justify-content-between mb-3">
              {editable && (
                <button className="edit-button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}

              <button onClick={handleButtonClick} className="edit-button">
                {!editable ? (
                  <div className="icon-bg">
                    <Icon
                      icon="fluent:edit-20-filled"
                      color="#f99c39"
                      className="edit-icon"
                    />
                  </div>
                ) : (
                  ""
                )}
                {buttonText}
              </button>
            </div>
          )}
        </section>
      </section>
    </section>
  );
}
