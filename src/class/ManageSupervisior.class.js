import api from "../API"

class manageSupervisiorOBJ {
    //get Get  all Supervisors
  getAll = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/list-of-admins-and-supervisors");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //search by name
  searchByName = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("/api/superadmin/list-of-admins-and-supervisors", data);
        return response;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //search by zone
  searchByZone = async (data) => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/filter-supervisors-by-zones/${data}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //search By LGA
  searchByLGA = async (id) => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/filter-supervisors-by-lga/${id}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
   //verify supervisor
   verify = async (id) => {
    try {
      //check if data is empty
      const { data } = await api.put(`api/superadmin/verify-supervisor/${id}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
   //get by id
   searchById = async (id) => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/view-a-supervisor/${id}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //undo verified 
  //get by id
  undoVerified = async (id) => {
    try {
      //check if data is empty
      const { data } = await api.put(`api/superadmin/undo-supervisor-verification/${id}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

}

const manageSupervisior = new manageSupervisiorOBJ()
export default manageSupervisior