import api from "../API";

class supervisorOBJ {
  //supervisors reg
  register = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/auth/register", data);
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
        const response = await api.post("api/auth/login", data);
        console.log(response);
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //supervisors forgot password
  forgotPassword = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/auth/forgot-pw", data);
        console.log(response);
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //supervisors password reset otp
  passwordResetOTP = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/auth/verify-token", data);
        console.log(response);
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //supervisors password reset 
  ResetPassword = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.put("api/auth/reset-pw", data);
        console.log(response);
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };


}

const supervisor = new supervisorOBJ();
export default supervisor;
