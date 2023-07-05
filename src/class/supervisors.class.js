import api from "../API";


class supervisorOBJ {
  //supervisors reg
  register = async (data) => {
    
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/auth/register", data);
        //store response in redux
        return response;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //supervisors login
  login = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/auth/register", data);
        console.log(response);
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err;
    }
  };
}

const supervisor = new supervisorOBJ();
export default supervisor;
