import { Icon } from "@iconify/react";
import "./adminEmployeeFilter.css";
import {useState,useEffect} from 'react'
import dataOBJs from "../../../class/data.class";
import supervisor from "../../../class/supervisor.class";

function AdminEmployeeFilterComponent(){
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [zones, setZones] = useState([]);
  const [selectedZones, setSelectedZones] = useState();
  const [ward, setWard] = useState([]);
  const [workTopology, setWorkTopology] = useState([]);
  const [lgas, setLgas] = useState([
    {
      name: "select zone",
      _id: "",
    },
  ]);

  useEffect(() => {
    dataOBJs.getZone().then((zone) => {
      setZones(zone);
    });
    if (selectedZones) {
      dataOBJs.getLgaByZone(selectedZones).then((res) => {
        setLgas(res);
        console.log(res,'select zone')
      });
    }
  }, [selectedZones]);
  useEffect(()=>{
    supervisor.getWorkTypology().then((res)=>{
      setWorkTopology(res)
    })
  })
  console.log(selectedZones,'select zone')
  return (
    <div className="filter-option-section  mt-3">
      <div className="d-flex align-items-center justify-content-between ">
        <div className="search-button px-2 mx-2">
          <Icon icon="eva:search-outline" className="me-2 search-icon" />
          <input type="search" name="" placeholder="Search Member" />
        </div>

        <div className="form-field my-2">
          <select onChange={(e) => {
            console.log(e?.target?.value, "values fromm id");
            setSelectedZones(e.target.value);
          }} name="zones" id="">
            <option value="">Zones</option>
            {zones.map((a, i) => (
              <option
                key={i}
                value={a._id}
                
              >
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field my-2">
          <select name="LGA's" id="">
            <option value="">LGA's</option>
            {lgas.map((a, i) => (
              <option key={i} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field my-2">
          <select name="ward" id="">
            <option value="">Ward</option>
            {ward.map((a, i) => (
              <option key={i} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field my-2">
          <select name="worktypology" id="">
            <option>Work Typology</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="wash">wash</option>
            <option value="agricuture">
              Agriculture, livelihood {<br />} & Value chain
            </option>
            <option value="transport">Transport</option>
          </select>
        </div>
        <div className="exportBtn">
          <Icon icon="clarity:export-solid" color="white" />
          <span>Export</span>
        </div>
      </div>
    </div>
  );
}

export default AdminEmployeeFilterComponent;
