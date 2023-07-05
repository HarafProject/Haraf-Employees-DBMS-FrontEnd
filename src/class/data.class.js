import api from "../API";

class dataOBJ {
  //get zone
  getZone = async () => {
    try {
      const res = await api.get("api/location/zones");
      if (res?.data?.status === "success") {
        return res?.data?.zones;
      }
    } catch (err) {
      throw err;
    }
  };
  //get lga by zone
  getLgaByZone = async (zoneId) => {
    try {
      const res = await api.get(`api/location/lga/${zoneId}`);
      if (res?.data?.status === "success") {
        return res?.data?.lgas;
      }
    } catch (err) {
      throw err;
    }
  };
}

const dataOBJs = new dataOBJ();
export default dataOBJs;
