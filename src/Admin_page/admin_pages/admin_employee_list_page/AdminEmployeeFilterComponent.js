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

console.log(fetchWorkSectorData());

function AdminEmployeeFilterComponent({ allData, setBeneficiaries, showLastSelect, showOtherOption }) {
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

  console.log(tempData);

  function handleFilter(e) {
    if (e.target.name === "zone") {
      const datas =
        e.target.value === ""
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
    } else if (e.target.name === "workSector") {
      const data =
        e.target.value === ""
          ? tempData
          : tempData?.filter((item) => {
              const workdata = item.subWorkTypology === e.target.value;
              const filteredData = workdata ? workdata : null;
              return filteredData;
            });
      setBeneficiaries(data);
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

  const handleLiClick = (index) => {
    setSelectedLi(index);
  };

  const [isOpen, setIsOpen] = useState(true);

  function handleFilter2() {
    setBeneficiaries(allData);
  }

  return (
    <div className="filter-option-section admin  mt-3">
      <div className="filter d-flex align-items-center justify-content-between ">
{showOtherOption && <> <div className="search-button px-2 mx-2">
          <Icon icon="eva:search-outline" className="me-2 search-icon" />
          <input
            type="search"
            onChange={handleFilter}
            name="search"
            placeholder="Search Member"
          />
        </div>

        <div className="form-field my-2">
          <select name="zone" id="" onChange={handleFilter}>
            <option value="">Zones</option>
            {zoneList.map((item, i) => (
              <option key={i} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field my-2">
          <select name="lga" id="" onChange={handleFilter}>
            <option value="">LGA's</option>
            {lgaList?.map((a, i) => (
              <option key={i} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field my-2">
          <select name="ward" onChange={handleFilter}>
            <option value="">Ward</option>
            {wardList.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field my-2">
          <div>
            {typologyList.map((item, i) => (
              <div key={i}>
                <li className="option-bold list-style-none" onClick={() => handleLiClick(i)}>
                  {item.name}
                </li>
                <select
                  name="workSector"
                  id=""
                  onChange={handleFilter}
                  style={{ display: selectedLi === i ? "block" : "none" }}
                >
                  {isOpen &&
                    workSectorData[i]?.map((item, j) => (
                      <option value={item._id} key={j}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </div>
        </div>
</>
}
        
       

        {!showLastSelect &&
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
        }

      </div>
    </div>
  );
}

export default AdminEmployeeFilterComponent;
