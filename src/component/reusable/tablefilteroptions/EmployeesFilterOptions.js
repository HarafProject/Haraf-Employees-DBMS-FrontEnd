import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./tablefilteroptions.css";
import dataOBJs from "../../../class/data.class";
import { useDispatch, useSelector } from "react-redux";
import supervisor from "../../../class/supervisor.class";

const EmployeeTableFilterOption = ({ allData, usersData, setUsersData }) => {
  const [wardList, setWardList] = useState([]);
  const [typologyList, setTypologyList] = useState([]);
  const [tempData, setTempData] = useState([]);
  const { user } = useSelector((state) => state?.user);

  async function fetchWards() {
    try {
      const ward_list = await dataOBJs.getWardsByLga(user.lga);
      setWardList(ward_list);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTypology() {
    const typology_list = await supervisor.getWorkTypology();
    console.log(typology_list)

    setTypologyList(typology_list.workTypology);
    // setWardList(ward_list)
  }
  useEffect(() => {
    fetchWards();
    fetchTypology();
    setTempData(allData);
  }, [allData]);

  function handleFilter(e) {
    if (e.target.name === "workTypology") {
      const data =
        e.target.value === ""
          ? allData
          : allData?.filter((item) => item.workTypology._id === e.target.value);
      setTempData(data);
      setUsersData(data);
    } else if (e.target.name === "ward") {
      const data =
        e.target.value === ""
          ? tempData
          : tempData?.filter((item) => item.ward._id === e.target.value);
      setUsersData(data);
    } else {
      let lowercaseQuery = e.target.value.toLowerCase();

      // Filter the array based on the name key
      let filteredData = allData?.filter(function (item) {
        let lowercaseName = item?.fullName?.toLowerCase();
        return lowercaseName?.includes(lowercaseQuery);
      });
      setUsersData(filteredData);
    }
  }

  return (
    <div className="reusable filter-option-section px-5 mt-5">
      <div className=" filter d-flex align-items-center justify-content-between ">
        <p className="">Beneficiary List</p>
        <div className="d-flex align-items-center ">
          <div className="search-button px-2 mt-3 mx-2">
            <Icon icon="eva:search-outline" className="me-2 search-icon" />
            <input
              type="search"
              name="search"
              placeholder="Search Beneficiary"
              onChange={(e) => handleFilter(e)}
            />
          </div>
          <div className="form-field topology mt-3 mx-2">
            <select name="workTypology" onChange={(e) => handleFilter(e)}>
              <option value={""}>Work Topology</option>
              {typologyList?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field ward mt-3 mx-2">
            <select name="ward" id="" onChange={(e) => handleFilter(e)}>
              <option value="">Ward</option>
              {wardList?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTableFilterOption;
