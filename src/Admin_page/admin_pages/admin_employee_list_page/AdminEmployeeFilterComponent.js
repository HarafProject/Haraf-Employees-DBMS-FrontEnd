import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./adminEmployeeFilter.css";
import { useQuery } from "react-query";
import dataOBJs from "../../../class/data.class";
import supervisor from "../../../class/supervisor.class";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";

const fetchLocationData = async (key) => {
  try {
    const [zoneData, lgaData, wardData, typologyData] = await Promise.all([
      dataOBJs.getZone(),
      dataOBJs.getLga(),
      dataOBJs.getWards(),
      supervisor.getWorkTypology(),
    ]);
    return {
      zoneData,
      lgaData,
      wardData,
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

function AdminEmployeeFilterComponent({
  allData,
  setBeneficiaries,
  showLastSelect,
  showOtherOption,
}) {
  const [zoneList, setZoneList] = useState([]);
  const [lgaList, setLgaList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [typologyList, setTypologyList] = useState([]);
  const [tempData, setTempData] = useState([]);
  const { user } = useSelector((state) => state?.user);
  const [workSectorData, setWorkSectorData] = useState([]);

  // const [showLastSelect, setShowLastSelect] = (false)

  // React query fecth data
  const { data, status } = useQuery(["fetchLocationData"], fetchLocationData);

  useEffect(() => {
    if (!data) return;
    setTempData(allData);
    if (user.role === "admin") {
      setZoneList(data.zoneData.filter((item) => item._id === user.zone));
    } else {
      setZoneList(data.zoneData);
    }
    setTypologyList(data.typologyData.workTypology);
  }, [data]);

  useEffect(() => {
    if (user.role === "admin") {
      setLgaList(data?.lgaData.filter((item) => item.zone._id === user.zone));
    } else {
      setLgaList(data?.lgaData);
    }
  }, [zoneList]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = typologyList?.map(async (item) => {
        const data = await fetchWorkSectorData(item?._id);
        return data;
      });

      const resolvedData = await Promise.all(promises);
      setWorkSectorData(resolvedData);
    };

    fetchData();
  }, [typologyList]);

  function handleFilter(e) {

    if (e.target?.name === "zone") {

      const datas =
        e.target?.value === ""
          ? allData
          : allData?.filter((item) => item.zone._id === e.target.value);
      let lga =
        e.target.value === ""
          ? data?.lgaData
          : data?.lgaData.filter((item) => item.zone._id === e.target.value);
      setLgaList(lga);
      setTempData(datas);
      setBeneficiaries(datas);
    } else if (e.target.name === "lga") {
      setWardList(
        data.wardData.filter((item) => item.lga._id === e.target.value)
      );
      const datas =
        e.target.value === ""
          ? tempData
          : tempData?.filter((item) => item.lga._id === e.target.value);
      setBeneficiaries(datas);
    } else if (e.target.name === "ward") {
      const data =
        e.target.value === ""
          ? tempData
          : tempData?.filter((item) => item.ward._id === e.target.value);
      setBeneficiaries(data);
    } else if (e.target.name === "sector") {

      const data = tempData?.filter((item) => {
        const workdata = item.workTypology._id === e.target.value;
        const filteredData = workdata ? workdata : null;
        return filteredData;
      });
      setBeneficiaries(data);
    } else if (e.target.name === "typology") {

      const data = tempData?.filter((item) => {
        const workdata = item.subWorkTypology._id === e.target.value;
        const filteredData = workdata ? workdata : null;
        return filteredData;
      });
      setBeneficiaries(data);
      setDisplayInnerDiv(false);
    } else {
      let lowercaseQuery = e.target.value.toLowerCase();

      // Filter the array based on the name key
      let filteredData = allData.filter(function (item) {
        let lowercaseName = item.fullName.toLowerCase();
        return lowercaseName.includes(lowercaseQuery);
      });
      setBeneficiaries(filteredData);
    }
  }

  const [selectedLi, setSelectedLi] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [displayInnerDiv, setDisplayInnerDiv] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleLiClick = (index) => {
    setSelectedLi(index === selectedLi ? null : index);
  };

  // const handleOptionClick = (itemId) => {
  //   const data = tempData?.filter((item) => {
  //     const workdata = item.subWorkTypology === itemId;
  //     return workdata;
  //   });
  //   setSelectedOption(itemId);
  //   setBeneficiaries(data);
  //   setDisplayInnerDiv(false);
  // };

  const toggleWorkSectorDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="filter-option-section admin for-sector   mt-3">
      <div className="filter d-flex align-items-center justify-content-between ">
        {showOtherOption && (
          <>
            {" "}
            <div className="search-button px-2 mx-2" onClick={() => setIsDropDownOpen(false)}>
              <Icon icon="eva:search-outline" className="me-2 search-icon" />
              <input
                type="search"
                onChange={handleFilter}
                name="search"
                placeholder="Search Member"
              />
            </div>
            <div className="form-field my-2" onClick={() => setIsDropDownOpen(false)}>
              <select name="zone" id="" onChange={handleFilter}>
                <option value="">Zones</option>
                {zoneList.map((item, i) => (
                  <option key={i} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field my-2" onClick={() => setIsDropDownOpen(false)}>
              <select name="lga" id="" onChange={handleFilter}>
                <option value="">LGA's</option>
                {lgaList?.map((a, i) => (
                  <option key={i} value={a._id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field my-2" onClick={() => setIsDropDownOpen(false)}>
              <select name="ward" onChange={handleFilter}>
                <option value="">Ward</option>
                {wardList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-button px-4 mx-2" onClick={toggleWorkSectorDropDown}>
              <input
                type="search"
                name="search"
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
              {typologyList.map((item, i) => (
                <div key={i}>
                  <li
                    className="option-bold "
                    onClick={() => {
                      handleFilter({ target: { name: "sector", value: item._id } })
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
                          handleFilter({ target: { name: "typology", value: item._id } })
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
        )}

        {showLastSelect && (
          <div className="form-field my-2">
            <select name="workTypology" id="" onChange={handleFilter}>
              {typologyList.map((item, i) => (
                <>
                  <option className="option-bold" key={i} value={item._id}>
                    {item.name} <br />
                  </option>
                </>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEmployeeFilterComponent;
