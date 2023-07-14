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
  searchByZone = async () => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/filter-supervisors-by-zones/${data}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //search By LGA
  searchByLGA = async () => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/filter-supervisors-by-lga/${data}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
   //verify supervisor
   verify = async () => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/superadmin/verify-supervisor/${data}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
   //get by id
   searchById = async () => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/view-a-supervisor/${data}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
  //undo verified 
  //get by id
  undoVerifiedd = async () => {
    try {
      //check if data is empty
      const { data } = await api.get(`api/superadmin/undo-supervisor-verification/${data}`);
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

}

const manageSupervisior = new manageSupervisiorOBJ()
export default manageSupervisior