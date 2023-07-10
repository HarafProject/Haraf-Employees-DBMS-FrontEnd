import { useState } from "react";
import "./requestFromSupervisor.css";

import EditRequestTab from "./request_tab_content/EditRequestTab";
import DeleteRequestTab from "./request_tab_content/DeleteRequestTab";
import AddRequestTab from "./request_tab_content/AddRequestTab";

export default function RequestFromSupervisor() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="supervisor-request">
      <div className="tab-buttons">
        <button
          className={activeTab === "tab1" ? "current" : ""}
          onClick={() => handleTabClick("tab1")}
        >
          Delete Employee Request
        </button>
        <button
          className={activeTab === "tab2" ? "current" : ""}
          onClick={() => handleTabClick("tab2")}
        >
          Profile Edit Request
        </button>
        <button
          className={activeTab === "tab3" ? "current" : ""}
          onClick={() => handleTabClick("tab3")}
        >
          Add Employee Request
        </button>
      </div>
      {activeTab === "tab1" && <DeleteRequestTab />}
      {activeTab === "tab2" && <EditRequestTab />}
      {activeTab === "tab3" && <AddRequestTab />}
    </div>
  );
}
