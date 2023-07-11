import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import "./attendanceReportUpload.css";

export default function AttendanceReportUpload() {
  const navigate = useNavigate();

  return (
    <section>
      <ReusableHeader />
      <div className="margin ">
        <div className="select-typ-report">
          <div className="header-report">
            <h3>Attendance Report Upload</h3>
            <p>
              Please choose the employee typology for whom you will be taking
              attendance
            </p>
          </div>
          <h4>Attendance Summary</h4>
          <div className="summary-grid">
            <div className="summary">
              <h1>280</h1>
              <p>Present</p>
            </div>
            <div className="summary">
              <h1>14</h1>
              <p>Absent</p>
            </div>
            <div className="summary">
              <h1>11:59pm</h1>
              <p>Submission Time</p>
            </div>
          </div>
          <div className="report-grid">
            <div className="report">
              <p>Report For:</p>
              <h4>3rd July 2023</h4>
            </div>
            <div className="report">
              <p>Report From:</p>
              <h4>Guyuk LGA</h4>
            </div>
            <div className="report">
              <p>Report By:</p>
              <h4>Gloria Zira</h4>
            </div>
          </div>
          <div className="msg-area">
            <textarea
              placeholder="Supervisors comment"
              name=""
              id=""
              cols="50"
              className="message"
              rows="4"
              textarea
            />
            <p>
              Kindly state any challenge experienced during the process of
              taking attendance today
            </p>
          </div>
          <div className="btns">
            <button
              className="btn-back"
              onClick={() => {
                navigate("/take-attendance");
              }}
            >
              Back to attendance
            </button>
            <button className="btn-submit" onClick={() => {}}>
              Submit Result
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
