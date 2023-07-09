import api from "../API";

class supervisorOBJ {
  //get profile
  getProfile = async (data) => {
    try {
      const response = await api.get("api/supervisor/me");
      console.log(response);
      return response;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //get bank list
  getBankList = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/supervisor/bank_list");

      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //verify employee bank account
  verifyEmpoyeeBankAccount = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/supervisor/bank-details", data);

        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //get work typology
  getWorkTypology = async () => {
    try {
      //check if data is empty
      const {data} = await api.get("api/supervisor/work-typology");
 
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //add employee
  addEmployee = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/supervisor/add-employee", data);
    
        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      console.log(err)
      throw err?.response?.data;
    }
  };
  //get all employee
  getAllEmployee = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/supervisor/employee");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //new employee request
  newEmployeeRequest = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post(
          "api/supervisor/new-employee-request",
          data
        );
     
        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //delete employee request
  deleteEmployeeRequest = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post(
          "api/supervisor/delete-employee-request",
          data
        );
  
        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //edit employee request
  editEmployeeRequest = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post(
          "api/supervisor/edit-employee-request",
          data
        );
       
        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //submit attendance
  submitAttendance = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.put("api/supervisor/attendance", data);
        console.log(response);
        return response;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
}

const supervisor = new supervisorOBJ();
export default supervisor;
