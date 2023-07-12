import api from "../API";

class superOBJ {
  // create account
  register = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/superadmin/create-account", data);
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
        const response = await api.post("api/superadmin/login", data);
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
  //Update Admin
  updateSupervisor = async (data, id) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.put(`api/superadmin/${id}`, data);

        return response.data;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      console.log(err);
      throw err?.response?.data;
    }
  };
  //get Get All Supervisors
  getAllSupervisors = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/all-supervisor");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //get all beneficiaries
  getAllbeneficiaries = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/all-beneficiaries");
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
        const response = await api.post("api/superadmin/filter-by-lga", data);
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
        const response = await api.post("api/superadmin/filter-by-zones", data);
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
        const response = await api.post("api/superadmin/filter-by-wards", data);
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
  filterByWorkTopology = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post(
          "api/superadmin/filter-by-work-topology",
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
  //search beneficiaries
  search = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/superadmin/search", data);
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
   //get ward
  getWard = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/all-ward");

      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
}

const superAdmin = new superOBJ();
export default superAdmin;
