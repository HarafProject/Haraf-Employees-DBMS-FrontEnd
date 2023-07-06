import api from "../API";

class authOBJ {
  //auths reg
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

  //auths login
  login = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/auth/login", data);
        console.log(response);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //auths forgot password
  forgotPassword = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.post("api/auth/forgot-pw", data);
        console.log(response);
        return response;
        //store res data
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };

  //auths password reset otp
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

  //auths password reset
  ResetPassword = async (data) => {
    try {
      //check if data is empty
      if (data) {
        const response = await api.put("api/auth/reset-pw", data);
        console.log(response);
        return response;
      } else {
        throw new Error("please fill in the fields");
      }
    } catch (err) {
      throw err?.response?.data;
    }
  };
}

const auth = new authOBJ();
export default auth;
