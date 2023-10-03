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

  //get lga
  getLga = async (zoneId) => {
    try {
      const res = await api.get(`api/location/lga`);
      if (res?.data?.status === "success") {
        return res?.data?.lgas;
      }
    } catch (err) {
      throw err;
    }
  };

  //get lga
  getWards = async (zoneId) => {
    try {
      const res = await api.get(`api/location/wards`);
      if (res?.data?.status === "success") {
        return res?.data?.wards;
      }
    } catch (err) {
      throw err;
    }
  };

  //get wards by lga
  getWardsByLga = async (lgaId) => {
    try {
      const res = await api.get(`api/location/ward/${lgaId}`);
      if (res?.data?.status === "success") {
        return res?.data?.wards;
      }
    } catch (err) {
      throw err;
    }
  };

  getWorkSector = async (id) => {
    try {
      const res = await api.get(`api/supervisor/sub-work-typology/${id}`);
      if (res?.data?.status === "success") {
        return res?.data?.subWorkTypology;
      }
    } catch (err) {
      throw err;
    }
  };
}

const dataOBJs = new dataOBJ();
export default dataOBJs;
