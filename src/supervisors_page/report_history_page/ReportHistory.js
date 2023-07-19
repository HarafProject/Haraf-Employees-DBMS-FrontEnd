


import reportHistory from '../../component/data/ReportHistoryList'
import ReusableHeader from "../../component/reusable/reusableheader/ReusableHeader";
import './history.css'

export default function ReportHistory() {



    return (
        <div className="report-history-page">
            <ReusableHeader />
            <div className="report-history-section my-5 p-5">
                <h1>Report History</h1>
                <div className="history-list mt-3">

                    {reportHistory.map((item, index) => (
                        <div key={index}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p>
                                    {item.wards}, {item.lga}_{item.date} ( {item.time})
                                    <span> {item.supervisor_name}</span>
                                </p>
                                <button className={`btn history-btn ${item.report_status === 'pending' ? 'pending' : 'sent'}`}>{item.report_status}</button>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}