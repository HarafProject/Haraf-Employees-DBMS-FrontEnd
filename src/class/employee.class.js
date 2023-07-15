import api from "../API";

class employeeOBJ {
  //create
  create = (data) => {};

  //get all
  filterById = async (id) => {
    try {
      //check if data is empty
      const { data } = await api.get("/api/superadmin/all-beneficiaries");
      return  data.data.find(obj => obj._id === id);
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get one
  get = () => {};
}

const employee = new employeeOBJ();
export default employee;
