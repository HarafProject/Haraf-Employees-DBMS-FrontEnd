import api from "../API";

class AdminAttendanceOBJ {
  //get all zone
  getAllZone = async () => {
    try {
      const res = await api.get("api/superadmin/all-zones-attendance");
      if (res?.data?.success) {
        return res?.data?.data;
      }
    } catch (err) {
      throw err;
    }
  };
   //filter report by zone
   filterByZone = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/superadmin/a-zones-attendance", data);
        return response;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
    //filter report by lga
    filterByLGA = async (data) => {
        try {
          //check if data is empty
          if (data) {
            const response = await api.post("api/superadmin/filter-attendance-by-lga", data);
            return response;
          } else {
            throw new Error("please fill in the fields");
          }
        } catch (err) {
          throw err?.response?.data;
        }
      };
       //filter report by datae
    filterByDate = async (data) => {
        try {
          //check if data is empty
          if (data) {
            const response = await api.post("api/superadmin/filter-attendance-by-date", data);
            return response;
          } else {
            throw new Error("please fill in the fields");
          }
        } catch (err) {
          throw err?.response?.data;
        }
      };

}

const AdminAttendance = new AdminAttendanceOBJ();
export default AdminAttendance;
