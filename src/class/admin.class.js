import api from "../API";

class adminOBJ {
  //work-typology

  confirmAdminCode = async (code) => {
    try {
        const response = await api.post("api/admin/confirm-code", code);

        return response.data;

    } catch (err) {

      throw err?.response?.data;
    }
  }
  addWorkTypology = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/admin/work-typology", data);

        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  };

  //update supervisor
  updateSupervisor = async (data, id) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.put(`api/admin/supervisor/${id}`, data);

        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  };

  //get Get Supervisors
  getGetSupervisors = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/admin/supervisors");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  // create account
  register = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/admin/create-admin", data);
        return response;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //login
  login = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/admin/login", data);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //admin action on supervisor
  adminAction = async (data, id) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.put(`/api/admin/handle-request/${id}`, data);

        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  };

  //get all DataCount
  getDataCount = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/admin/data-summary");
      
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get all attendance date
  getAttendanceDates = async (type, value) => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/admin/attendance-dates`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get all attendance date
  getAttendanceWeeks = async (type, value) => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/admin/attendance-weeks`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //get all DataCount
  getAnalyticsData = async (type, value) => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/admin/beneficiary-attendance-analytics?type=${type}&value=${value}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

    //get all DataCount
    getAnalyticsReportData = async (type, value,lga) => {
      try {
        //check if data is empty
        const { data } = await api.get(`api/admin/beneficiary-attendance-analytics/report?type=${type}&value=${value}&lga=${lga}`);
        return data;
      } catch (err) {
        throw err?.response?.data;
      }
    };
  //get all Get Supervisors
  getAllGetSupervisors = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/admin/all-supervisors");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //get all Get beneficiaries
  getAllGetbeneficiaries = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/admin/all-beneficiaries");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //filter by lga
  filterByLga = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/admin/filter-by-lga", data);
        console.log(response);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //filter by zone
  filterByZone = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/admin/filter-by-zones", data);
        console.log(response);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //filter by wards
  filterByWards = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/admin/filter-by-ward", data);
        console.log(response);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //filter by work topology
  filterByWorkTOpology = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post(
          "api/admin/filter-by-work-topology",
          data
        );
        console.log(response);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //search
  search = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/admin/search", data);
        console.log(response);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  getEmployeeSummary = async (employeeId,type,value) => {
    try {

      const response = await api.get(`api/admin/beneficiary-attendance-summary/${employeeId}?type=${type}&value=${value}`);

      return response.data;
      //store res data

    } catch (err) {
      throw err?.response?.data;
    }
  }
}

const admin = new adminOBJ();
export default admin;
