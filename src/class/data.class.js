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

  getUniqueLgas = async (zoneId) => {
    try {
      const res = await api.get(`api/location/unique-lgas`);
      if (res?.data?.status === "success") {
        return res?.data?.uniqueLgas;
      }
    } catch (err) {
      throw err;
    }
  };

  getUniqueWards = async (zoneId) => {
    try {
      const res = await api.get(`api/location/unique-wards`);
      if (res?.data?.status === "success") {
        return res?.data?.uniqueWards;
      }
    } catch (err) {
      throw err;
    }
  };

  // Get the total number of wards
  getWardsCount = async () => {
    try {
      const res = await api.get("api/location/wards/count");
      if (res?.data?.status === "success") {
        return res?.data?.count;
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

  // Get the list of work sectors
  getWorkSectors = async () => {
    try {
      const res = await api.get("api/supervisor/work-sectors");
      if (res?.data?.status === "success") {
        return res?.data?.workSectors;
      }
    } catch (err) {
      throw err;
    }
  };
}

const dataOBJs = new dataOBJ();
export default dataOBJs;
