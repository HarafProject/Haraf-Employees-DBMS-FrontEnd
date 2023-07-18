import api from "../API";

class AdminRequestFromSupervisorOBJ {
  //get Get  delete employee request
  getAllDeleteEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/delete-employee-request");

      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get Get  edit employee request
  getAllEditEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/edit-employee-request");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get Get  add employee request  /employee-request/:id
  getAllAddEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/add-employee-request");
      console.log(data)
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //get Get  add employee request
  getAnEmployeeRequest = async () => {
    try {
      //check if data is empty
      const { data } = await api.get("api/superadmin/employee-request/:id");
      return data;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //POST decline employee Request
  handleSupervisorRequest = async (itemIdToModal, type, action, reason) => {
    // console.log(itemIdToModal);
    try {
      const { response } = await api.put(`api/admin/handle-request/${itemIdToModal}?type=${type}&action=${action}`, { reason });
      return response;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //POST decline employee Request
  declineEmployeeRequest = async ({ itemIdToModal }) => {
    // console.log(itemIdToModal);
    try {
      const { response } = await api.post(
        "api/superadmin/decline-employee-request",
        { id: String(itemIdToModal) }
      );
      return response;
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //POST accept employee Request
  approveEmployeeRequest = async ({ itemIdToModal }) => {
    // console.log(itemIdToModal);
    try {
      const { response } = await api.post(
        "api/superadmin/approve-employee-request",
        { id: String(itemIdToModal) }
      );
      return response;
    } catch (err) {
      throw err?.response?.data;
    }
  };
}

const EmployeeRequest = new AdminRequestFromSupervisorOBJ();
export default EmployeeRequest;