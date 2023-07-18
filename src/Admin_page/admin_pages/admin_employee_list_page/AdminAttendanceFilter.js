import { useState, useEffect } from "react"
import { Icon } from "@iconify/react";
import "./adminEmployeeFilter.css";
import { useQuery } from 'react-query'
import dataOBJs from "../../../class/data.class";
import supervisor from "../../../class/supervisor.class";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const fetchAttendnaceLocationData = async (key) => {

    try {

        const [zoneData, lgaData] = await Promise.all([
            dataOBJs.getZone(),
            dataOBJs.getLga(),

        ]);
        return {
            zoneData,
            lgaData,
        }

    } catch (error) {
        toast.error(error?.error);
    }
};
function AdminAttendanceFilter({ allData, reports, setReports }) {
    const [zoneList, setZoneList] = useState([]);
    const [lgaList, setLgaList] = useState([]);
    const [tempData, setTempData] = useState([]);
    const { user } = useSelector((state) => state?.user);

    // React query fecth data
    const { data, status } = useQuery(['fetchAttendnaceLocationData'], fetchAttendnaceLocationData)

    useEffect(() => {
        if (!data) return
        setTempData(allData)
        if (user.role === "admin") {
            setZoneList(data.zoneData.filter(item => item._id === user.zone))
        } else {
            setZoneList(data.zoneData)
        }

    }, [data])

    useEffect(() => {
        if (user.role === "admin") {

            setLgaList(data?.lgaData.filter(item => item.zone._id === user.zone))
        } else {
            setLgaList(data?.lgaData)
        }
    }, [zoneList])




    function handleFilter(e) {

        if (e.target.name === "zone") {

            const datas =
                e.target.value === ""
                    ? allData
                    : allData?.filter((item) => item.zone._id === e.target.value);
            let lga = e.target.value === ""
                ? data?.lgaData :
                data?.lgaData.filter(item => item.zone._id === e.target.value)
            setLgaList(lga)
            setTempData(datas);
            setReports(datas);
        } else if (e.target.name === "lga") {

            const datas =
                e.target.value === ""
                    ? tempData
                    : tempData?.filter((item) => item.lga._id === e.target.value);
            setReports(datas);
        } else {
            let lowercaseQuery = e.target.value.toLowerCase();

            // Filter the array based on the name key
            let filteredData = allData.filter(function (item) {
                let lowercaseName = item.submittedBy.firstname.toLowerCase();
                return lowercaseName.includes(lowercaseQuery);
            });
            setReports(filteredData);
        }
    }

    return (
        <div className="filter-option-section  mt-3">
            <div className="d-flex align-items-center justify-content-end ">
                <div className="search-button px-2 mx-2">
                    <Icon icon="eva:search-outline" className="me-2 search-icon" />
                    <input type="search" onChange={handleFilter} name="search" placeholder="Search Member" />
                </div>

                <div className="form-field my-2">
                    <select name="zone" id="" onChange={handleFilter}>
                        <option value="">Zones</option>
                        {zoneList.map((item, i) => (
                            <option
                                key={i}
                                value={item._id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-field my-2">
                    <select name="lga" id="" onChange={handleFilter}>
                        <option value="">LGA's</option>
                        {lgaList?.map((a, i) => (
                            <option
                                key={i}
                                value={a._id}

                            >
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>


                {/* <div className="exportBtn">
          <Icon icon="clarity:export-solid" color="white" />
          <span>Export</span>
        </div> */}
            </div>
        </div>
    );
}

export default AdminAttendanceFilter;
