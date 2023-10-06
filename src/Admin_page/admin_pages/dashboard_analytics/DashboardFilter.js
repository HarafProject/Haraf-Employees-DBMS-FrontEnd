import React, { useState, useEffect } from 'react'
import dataOBJs from '../../../class/data.class';
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import supervisor from '../../../class/supervisor.class';

const fetchLocationData = async (key) => {
    try {
        const [lgaData, typologyData] = await Promise.all([
            dataOBJs.getLga(),
            supervisor.getWorkTypology(),
        ]);
        return {

            lgaData,
            typologyData,
        };
    } catch (error) {
        toast.error(error?.error);
    }
};

const fetchWorkSectorData = async (id) => {
    try {
        const workSectorData = await dataOBJs.getWorkSector(id);
        return workSectorData;
    } catch (error) {
        toast.error(error?.error);
    }
};
const DashboardFilter = ({ beneficiaries, setTempData, setDisplayType, closeTypo, setCloseTypo, setSector, setTypo }) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const { data, status } = useQuery([' fetchLocationDatas'], fetchLocationData);
    const [workSectorData, setWorkSectorData] = useState([]);
    const [selectedLi, setSelectedLi] = useState(null);
    const [displayInnerDiv, setDisplayInnerDiv] = useState(true);
    const [temp, setTemp] = useState([])

    useEffect(() => {

        setTemp(beneficiaries)

        closeTypo && setIsDropDownOpen(false)

    }, [beneficiaries, closeTypo])

    useEffect(() => {

        if (!data?.typologyData?.status === "success") return
        const fetchData = async () => {
            const promises = data?.typologyData?.workTypology?.map(async (item) => {
                const data = await fetchWorkSectorData(item?._id);
                return data;
            });

            const resolvedData = await Promise.all(promises);
            setWorkSectorData(resolvedData);
        };

        fetchData();
    }, [data]);

    const toggleWorkSectorDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const handleLiClick = (index) => {
        setSelectedLi(index === selectedLi ? null : index);
    };

    function handleFilter(e) {

        if (e.target.name === "lga") {

            const datas =
                e.target.value === ""
                    ? beneficiaries
                    : beneficiaries?.filter((item) => item.lga._id === e.target.value);
            setDisplayType(e.target.value === "" ? "all" : "wards")
            setTemp(datas)
            setTempData(datas);
            setSector("")
            setTypo("")
        } else if (e.target.name === "sector") {

            const data = temp?.filter((item) => {
                const workdata = item.workTypology._id === e.target.value;
                const filteredData = workdata ? workdata : null;
                return filteredData;
            });
            setTempData(data);
            setSector(e.target.sector)
            setTypo("")
        } else if (e.target.name === "typology") {

            const data = temp?.filter((item) => {
                const workdata = item.subWorkTypology._id === e.target.value;
                const filteredData = workdata ? workdata : null;
                return filteredData;
            });
            setTempData(data);
            setTypo(e.target.typology)
        }
    }

    return (
        <div className="filter-option-section">
            <div className="filter d-flex align-items-center justify-content-between ">

                <>
                    {" "}
                    <div className="form-field my-2" onClick={() => setIsDropDownOpen(false)}>
                        <select name="lga" id="" onChange={handleFilter}>
                            <option value="">LGA's</option>
                            {data?.lgaData?.map((a, i) => (
                                <option key={i} value={a._id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search-button px-4 mx-2" onClick={toggleWorkSectorDropDown}>
                        <input

                            type="search"
                            name="sector"
                            placeholder="Work Typology"
                            disabled="true"
                        />
                        <div >
                            <Icon icon="bxs:down-arrow" className="me-2 workSector-arrow" />
                        </div>
                    </div>
                    <div
                        className="sector-drop-down"
                        style={{ display: isDropDownOpen ? "block" : "none" }}
                    >
                        {data?.typologyData?.workTypology.map((item, i) => (
                            <div key={i}>
                                <li
                                    className="option-bold "
                                    onClick={() => {
                                        setCloseTypo(false)
                                        handleFilter({ target: { name: "sector", value: item._id, sector: item.name } })
                                        handleLiClick(i);
                                        setDisplayInnerDiv(true); // Show inner div when the li is clicked
                                    }}
                                    style={{ cursor: "pointer", listStyle: "none" }}
                                >
                                    {item.name}
                                </li>
                                <div
                                    className="inner-dropdown-select"
                                    style={{
                                        display:
                                            selectedLi === i && displayInnerDiv ? "block" : "none", // Toggle display based on selectedLi and displayInnerDiv
                                    }}
                                >
                                    {workSectorData[i]?.map((item, j) => (
                                        <div
                                            key={j}
                                            onClick={() => {
                                                handleFilter({ target: { name: "typology", value: item._id, typology: item.name } })
                                            }}
                                            style={{ padding: "5px", cursor: "pointer" }}
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>


            </div>
        </div>
    )
}

export default DashboardFilter