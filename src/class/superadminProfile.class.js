
import api from "../API";

class SuperAdminObj {
  //get profile
  editProfile = async (data) => {
    try {
      const response = await api.patch("api/superadmin/edit-admin-data", data);

      return response.data;
    } catch (err) {
      throw err?.response?.data;
    }
  };
}

const SuperAdminProfileSetUp = new SuperAdminObj()
export default SuperAdminProfileSetUp