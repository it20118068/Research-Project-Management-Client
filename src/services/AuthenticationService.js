import axios from "axios";

const USER_BASE_URL = "http://localhost:8085/user/auth";

class AuthenticationService {
    authUser(){
        const token = localStorage.getItem('token');
        return axios({
            method: "post",
            url: USER_BASE_URL+"/",
            headers: { "x-access-token": token }      
        });
    }
}
 
export default new AuthenticationService();