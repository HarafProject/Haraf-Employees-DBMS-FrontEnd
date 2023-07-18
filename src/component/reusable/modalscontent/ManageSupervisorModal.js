import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminSupervisorList from "../../data/ListOfAdminSupervisors";
import { Icon } from "@iconify/react";
import "./modalscreen.css";
import manageSupervisior from "../../../class/ManageSupervisior.class";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import superAdmin from "../../../class/super.class";

export default function ManageSupervisorModal({
  closeModal,
  buttonClick,
  supervisorName,
  getRole,
  id,
  supervisor,
  setSupervisor
}) {
  const navigate = useNavigate();
  const [actionTitle, setActionTitle] = useState("");
  const [actionText, setActionText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const actionClick = (action) => {
    if (action === "Verify") {
      setIsLoading(true)
      manageSupervisior.verify(id).then((res) => {
        let data = res.data
        // Map through the 'employee' array and replace the updated item with the matching '_id'
        const updatedSupervisorArray = supervisor.map((item) =>
          item._id === data._id ? data : item
        );

        setSupervisor(updatedSupervisorArray);
        toast.success(` You have successfully ${buttonClick} ${supervisorName} as a ${getRole}`)
        setIsLoading(false)
        closeModal()

      }).catch((err) => {
        console.log(err, 'err')
        toast.error(err.message)
        setIsLoading(false)
      })

    } else if (action === "Delete") {
      setIsLoading(true)
      manageSupervisior.undoVerified(id).then((res) => {
        setIsLoading(false)
        toast.success(` You have successfully ${buttonClick} ${supervisorName} as a ${getRole}`)
        let data = res.data
        // Map through the 'employee' array and replace the updated item with the matching '_id'
        const updatedSupervisorArray = supervisor.map((item) =>
          item._id === data._id ? data : item
        );

        setSupervisor(updatedSupervisorArray);
        closeModal()
      }).catch((err) => {
        console.log(err, 'err')
        toast.error(err.message)
        setIsLoading(false)
      })
    } else if (action === "Unverify") {
      setIsLoading(true)
      console.log(id, 'iddd')
      manageSupervisior.undoVerified(id).then((res) => {
        console.log(res, 'response')
        toast.success(` You have successfully ${buttonClick} ${supervisorName} as a ${getRole}`)
        setIsLoading(false)
        closeModal()
      }).catch((err) => {
        console.log(err, 'err')
        toast.error(err.message)
        setIsLoading(false)
      })
    } else if (action === "Verify-Admin") {
      setIsLoading(true)
      superAdmin.verifyAdmin(id).then((res) => {
        let data = res.data
        toast.success(` You have successfully ${buttonClick} ${supervisorName} as a ${getRole}`)
        setIsLoading(false)
        // Map through the 'employee' array and replace the updated item with the matching '_id'
        const updatedSupervisorArray = supervisor.map((item) =>
          item._id === data._id ? data : item
        );

        setSupervisor(updatedSupervisorArray);
        closeModal()

      }).catch((err) => {
        console.log(err, 'err')
        toast.error(err.message)
        setIsLoading(false)
      })
    } else if (action === "Delete-Admin") {
      setIsLoading(true)
      superAdmin.undoVerifiedAdmin(id).then((res) => {
      
        let data = res.data
        toast.success(` You have successfully ${buttonClick} ${supervisorName} as a ${getRole}`)
        setIsLoading(false)
        // Map through the 'employee' array and replace the updated item with the matching '_id'
        const updatedSupervisorArray = supervisor.map((item) =>
          item._id === data._id ? data : item
        );

        setSupervisor(updatedSupervisorArray);
        closeModal()

      }).catch((err) => {
        console.log(err, 'err')
        toast.error(err.message)
        setIsLoading(false)
      })
    }
  }
  useEffect(() => {
    if (buttonClick === "verify") {
      setActionTitle("Verify Supervisor");
      setActionText(
        `Are you sure you want to verify ${supervisorName} as a ${getRole}? This will allow ${supervisorName} to have full access to the LIPWDMS portal`
      );
      setButtonText("Verify");
    } else if (buttonClick === "delete") {
      setActionTitle("Delete Supervisor");
      setActionText(
        `Are you sure you want to permanently delete ${supervisorName} as a ${getRole}? This will disable ${supervisorName} account on the LIPWDMS portal`
      );
      setButtonText("Delete");
    } else if (buttonClick === "unverify") {
      setActionTitle("Verify Supervisor");
      setActionText(
        `Are you sure you want to unverify ${supervisorName} as a ${getRole}? This will restrict ${supervisorName} from having full access to the LIPWDMS portal`
      );
      setButtonText("Unverify");
    } else if (buttonClick === "verify-admin") {
      setActionTitle("Verify-Admin");
      setActionText(
        `Are you sure you want to verify ${supervisorName} as a ${getRole}? This will allow ${supervisorName} to have full access to the LIPWDMS portal`
      );
      setButtonText("Verify-Admin");
    } else if (buttonClick === "delete-admin") {
      setActionTitle("Delete-Admin");
      setActionText(
        `Are you sure you want to permanently delete ${supervisorName} as a ${getRole}? This will disable ${supervisorName} account on the LIPWDMS portal`
      );
      setButtonText("Delete-Admin");
    }
  }, [buttonClick, getRole, supervisorName]);

  return (
    <div
      className="modal-screen px-5 py-1 my-3"
      isOpen={true}
      onRequestClose={closeModal}
    >
      <div className="">
        <button
          className="btn close-button delete-close-btn"
          onClick={closeModal}
        >
          <Icon icon="ic:round-cancel" className="close-icon" />
        </button>

        <div className="d-flex flex-column align-items-center modal-content">
          <p className="mt-2 text-center no-network">{actionTitle}</p>
          <span className="mt-2 mb-5 text-center">{actionText}</span>

          <button
            disabled={isLoading}
            className={`btn modal-button my-4 ${buttonText === "Verify" ? "verify-btn" : "delete-btn"
              }`}
            onClick={() => {
              actionClick(buttonText)
            }}
          >
            {isLoading ? 'loading' : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
