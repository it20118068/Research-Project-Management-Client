import axios from "axios";

const USER_BASE_URL = "http://localhost:8085/activity/";

class ActivityService {
    getActivities(){
        return axios.get(USER_BASE_URL);
    }
    
    saveActivity(formData){
        // return axios.post(USER_BASE_URL+'createActivity', activity);
        return axios({
            method: "post",
            url: USER_BASE_URL+"createActivity",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }      
        });
    }
}
 
export default new ActivityService();