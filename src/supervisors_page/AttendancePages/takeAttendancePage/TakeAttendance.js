import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";
import { useNavigate } from "react-router-dom";
import AttendanceTable from "./AttendanceTable";
import "./takeAttendance.css";

export default function TakeAttendance() {
  const navigate = useNavigate();

  return (
    <section>
      <ReusableHeader />
      <div className="margin">
        <div className="attendance">
          <div className="attendance-header">
            <h3>Tick Attendance</h3>
            <h4>17th July 2023</h4>
          </div>
          <div className="attendance-sub-head">
            <h4>Health Typology</h4>
            <p>
              Note: Attendance report must be <br /> sent between
              <span>09:00am - 4:00pm</span>
            </p>
          </div>
        </div>
        <AttendanceTable />
        <div className="center-container">
          <button
            className="center-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Next Typology
          </button>
        </div>
      </div>
    </section>
  );
}
