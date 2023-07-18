import { useState } from "react";
import "./requestFromSupervisor.css";

import EditRequestTab from "./request_tab_content/EditRequestTab";
import DeleteRequestTab from "./request_tab_content/DeleteRequestTab";
import AddRequestTab from "./request_tab_content/AddRequestTab";

export default function RequestFromSupervisor() {
  const [activeTab, setActiveTab] = useState("delete_request");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="supervisor-request">
      <div className="tab-buttons">
        <button
          className={activeTab === "delete_request" ? "current" : ""}
          onClick={() => handleTabClick("delete_request")}
        >
          Delete Employee Request
        </button>
        <button
          className={activeTab === "edit_request" ? "current" : ""}
          onClick={() => handleTabClick("edit_request")}
        >
          Profile Edit Request
        </button>
        <button
          className={activeTab === "add_request" ? "current" : ""}
          onClick={() => handleTabClick("add_request")}
        >
          Add Employee Request
        </button>
      </div>
      {activeTab === "delete_request" && (
        <DeleteRequestTab />
      )}
      {activeTab === "edit_request" && <EditRequestTab />}
      {activeTab === "add_request" && <AddRequestTab />}
    </div>
  );
}
