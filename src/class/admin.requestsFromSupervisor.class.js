import api from "../API";

class AdminRequestFromSupervisorOBJ {
  //get Get  delete employee request
  getAllDeleteEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/delete-employee-request");
      
      return data;
      
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get Get  edit employee request
  getAllEditEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/edit-employee-request");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get Get  add employee request  /employee-request/:id
  getAllAddEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/edit-employee-request");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get Get  add employee request  
  getAnEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/employee-request/:id");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
}

const EmployeeRequest = new AdminRequestFromSupervisorOBJ();
export default EmployeeRequest;