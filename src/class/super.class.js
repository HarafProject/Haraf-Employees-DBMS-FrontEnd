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
}

const superAdmin = new superOBJ();
export default superAdmin;
