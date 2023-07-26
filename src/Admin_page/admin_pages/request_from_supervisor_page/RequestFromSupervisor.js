import { useState } from "react";
import "./requestFromSupervisor.css";

import EditRequestTab from "./request_tab_content/EditRequestTab";
import DeleteRequestTab from "./request_tab_content/DeleteRequestTab";
import AddRequestTab from "./request_tab_content/AddRequestTab";
import { RotatingLines } from "react-loader-spinner";

export default function RequestFromSupervisor() {
  const [activeTab, setActiveTab] = useState("delete_request");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {isSubmitting && <div className='d-flex align-items-center px-5 py-3'><RotatingLines width="50" strokeColor="#0173bc" strokeWidth="3" /> <p style={{ color: "#0173bc" }}>Processing request! please wait...</p></div>}
      <div className="supervisor-request">
        <div className="tab-buttons">
          <p
            className={activeTab === "delete_request" ? "current" : ""}
            onClick={() => handleTabClick("delete_request")}
          >
            Delete Employee Request
          </p>
          <p
            className={activeTab === "edit_request" ? "current" : ""}
            onClick={() => handleTabClick("edit_request")}
          >
            Profile Edit Request
          </p>
          <p
            className={activeTab === "add_request" ? "current" : ""}
            onClick={() => handleTabClick("add_request")}
          >
            Add Employee Request
          </p>
        </div>
        {activeTab === "delete_request" && (
          <DeleteRequestTab
            setIsSubmitting={setIsSubmitting}
          />
        )}
        {activeTab === "edit_request" && <EditRequestTab
          setIsSubmitting={setIsSubmitting}
        />}
        {activeTab === "add_request" && <AddRequestTab
          setIsSubmitting={setIsSubmitting} />}
      </div>
    </>

  );
}
