import "./adminEmployeeAttendanceSummary.css";

export default function AdminEmployeeDataSummary() {
  return (
    <div>
      <h2>Attendance Summary</h2>
      <div className="attendance-grid">
        <div className="attendance-flex ">
          <div>
            <h1>142</h1>
            <p>Total Work days</p>
          </div>
          <div>
            <h1 className="green">134</h1>
            <p>Total days present</p>
          </div>
        </div>

        <div className="border-center"></div>
        <div className="border-cross"></div>
        <div className="attendance-flex">
          <div>
            <h1 className="red">06</h1>
            <p>Total days absent</p>
          </div>
          <div>
            <h1>87%</h1>
            <p>Total days absent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
