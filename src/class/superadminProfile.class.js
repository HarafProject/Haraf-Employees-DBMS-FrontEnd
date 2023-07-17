
import api from "../API";

class SuperAdminObj {
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
}

const SuperAdminProfileSetUp = new SuperAdminObj()
export default SuperAdminProfileSetUp