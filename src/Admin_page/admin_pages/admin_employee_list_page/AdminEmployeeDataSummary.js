import "./adminEmployeeDataSummary.css";

export default function AdminEmployeeList() {
  return (
    <section className="d-flex align-items-center justify-content-between">
      <div className="card">
        <h1 className="number">6300</h1>
        <p>Total Employees</p>
      </div>
      <div className="card">
        <h1 className="number">21</h1>
        <p>LGA's Onboarded</p>
      </div>
      <div className="card">
        <h1 className="number">63</h1>
        <p>LGA Supervisors</p>
      </div>
      <div className="card">
        <h1 className="number">56</h1>
        <p>Reports Recieved</p>
      </div>
    </section>
  );
}
