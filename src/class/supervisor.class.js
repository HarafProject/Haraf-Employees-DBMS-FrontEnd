import api from "../API";

class supervisorOBJ {
  //get profile
  editProfile = async (data) => {
    try {
      const response = await api.put("api/supervisor", data);
      console.log(response);
      return response.data;
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

  //get employee details
  getEmployee = async (id) => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/supervisor/employee/${id}`);

      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  updateEmployeeProfile = async (data, employee, notificationId) => {
    try {
      const response = await api.put(`api/supervisor/employee/${employee}?notification=${notificationId}`, data);

      return response.data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //get notifications
  getNotifications = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/supervisor/notifications");

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
      const { data } = await api.get("api/supervisor/work-typology");

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

  //delete employee
  deleteEmployee = async (data,notificationId) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.delete(
          `api/supervisor/employee/${data}?notification=${notificationId}`);

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
        const response = await api.post("api/supervisor/attendance", data);
        console.log(response);
        return response.data;
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
