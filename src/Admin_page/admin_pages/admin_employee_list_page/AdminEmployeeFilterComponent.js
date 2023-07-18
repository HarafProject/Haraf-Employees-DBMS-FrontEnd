import { Icon } from "@iconify/react";
import "./adminEmployeeFilter.css";

function AdminEmployeeFilterComponent({zone,setZone,lga,setLga,setTopology,topology,search,setSearch}) {
  return (
    <div className="filter-option-section admin  mt-3">
      <div className="filter d-flex align-items-center justify-content-between ">
        <div className="search-button px-2 mx-2">
          <Icon icon="eva:search-outline" className="me-2 search-icon" />
          <input type="search" value={search} onChange={e=> setSearch(e.target.value)} name="" placeholder="Search Member" />
        </div>

        <div className="form-field my-2">
          <select name="zones" id="" onChange={(zone)=>{
            setZone((prevZone) => ({
              ...prevZone,
              value: zone.target.value
            }));
          }}>
            <option value="">Zones</option>
            {zone.menue.map((a, i) => (
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
          <select name="LGA's" id="" onChange={(lga)=>{
            setLga((prevLga) => ({
              ...prevLga,
              value: lga.target.value
            }));
          }}>
            <option value="">LGA's</option>
            {lga.menue.map((a, i) => (
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
          <select name="ward" id="">
            <option value="">Ward</option>
            <option value="banjiram">Banjiram</option>
            <option value="bobini">Bobini</option>
            <option value="bodeno">Bodeno</option>
            <option value="chikila">Chikila</option>
            <option value="dukul">Dukul</option>
            <option value="dumna">Dumna</option>
            <option value="guyuk">Guyuk</option>
            <option value="kola">Kola</option>
            <option value="lokoro">Lokoro</option>
            <option value="purokayo">Purokayo</option>
          </select>
        </div>
        <div className="form-field my-2">
          <select name="worktypology" id="" onChange={(zone)=>{
            setTopology((prevZone) => ({
              ...prevZone,
              value: zone.target.value
            }));
          }}>
            <option>Work Typology</option>
            {topology.menue.map((a, i) => (
              <option
                key={i}
                value={a._id}
                
              >
                {a.name}
              </option>
            ))}
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
