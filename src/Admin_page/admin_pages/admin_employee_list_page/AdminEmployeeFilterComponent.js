import { Icon } from "@iconify/react";
import "./adminEmployeeFilter.css";

function AdminEmployeeFilterComponent() {
  return (
    <div className="filter-option-section  mt-3">
      <div className="d-flex align-items-center justify-content-between ">
        <div className="search-button px-2 mx-2">
          <Icon icon="eva:search-outline" className="me-2 search-icon" />
          <input type="search" name="" placeholder="Search Member" />
        </div>

        <div className="form-field my-2">
          <select name="zones" id="">
            <option value="">Zones</option>
            <option value="banjiram">Banjiram</option>
            <option value="bobini">Bobini</option>
          </select>
        </div>
        <div className="form-field my-2">
          <select name="LGA's" id="">
            <option value="">LGA's</option>
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
