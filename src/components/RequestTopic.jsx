import React,{useState, useEffect} from "react";
import AuthenticationService from "../services/AuthenticationService";
import RequestService from "../services/RequestService";
import UserService from "../services/UserService";

function RequestTopic() {


    const [supervisorsList, setSupervisorsList] = useState([]);
    const [co_supervisorsList, setCoSupervisorsList] = useState([]);
    const [userId, setUserId] = useState("");
    const [type, setType] = useState(0);
    const [grpId, setGroupId] = useState("");
    const [topic, setTopic] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [co_supervisor, setCoSupervisor] = useState("");

    const [alertClass, setAlertClass] = useState("");
    const [alertMessage, setAlertMessage] = useState("");


    useEffect(()=>{  
        
        AuthenticationService.authUser().then((res)=>{
            if(res.data.role != 2){
                window.location.href = '/Login'
            } else {
                setUserId(res.data.id)
                getSupervisors();
                getCoSupervisors();
            }
        })
        
    }, []);


    function createRequest(){
        let request_1 = {type, grpId, senderId:userId, receiverId:supervisor, content:topic}
        
        RequestService.createRequest(request_1).then(()=>{
            setAlertClass("alert alert-success mt-2");
            setAlertMessage("Request has successfully sent");
        }).catch((err)=>{
            setAlertClass("alert alert-danger mt-2");
            setAlertMessage("Failed to send the request :(");
        })

        let request_2 = {type, grpId, senderId:userId, receiverId:co_supervisor, content:topic}
        
        RequestService.createRequest(request_2).then(()=>{
            setAlertClass("alert alert-success mt-2");
            setAlertMessage("Request has successfully sent");
        }).catch((err)=>{
            setAlertClass("alert alert-danger mt-2");
            setAlertMessage("Failed to send the request :(");
        })

    }


    function getSupervisors(){
        UserService.getSupervisors().then((res)=>{
            setSupervisorsList(res.data);         
        }).catch((err)=>{
            alert(err.message);
        }); 
    }

    function getCoSupervisors(){
        UserService.getCoSupervisors().then((res)=>{
            setCoSupervisorsList(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }




    return (  
        <div className="container">
            <div className="card p-5 my-bg" style={{borderRadius: "25px"}}>
            <h4 className="mb-4 p-4 card-header title-bg ">Request Research Topic</h4>
        
            <div className="card-body">
                <form>

                    <div className="row">
                        <div class="form-group mb-3 col">
                            <label style={{fontWeight: "bold"}}>Supervisor</label>
                            <select class="form-select" aria-label="Default select example" onChange={(e)=> setSupervisor(e.target.value)}>
                                <option>Select </option>
                                {
                                    supervisorsList.map(
                                        s => <option value={s._id} >{s.name}</option>

                                    )
                                }     
                            </select>
                        </div>
                        <div class="form-group mb-3 col">
                            <label style={{fontWeight: "bold"}}>Co-Supervisor</label>
                            <select class="form-select" aria-label="Default select example" onChange={(e)=> setCoSupervisor(e.target.value)}>
                                <option>Select</option>
                                {
                                    co_supervisorsList.map(
                                        s => <option value={s._id} >{s.name}</option>

                                    )
                                }     
                            </select>
                        </div> 
                    </div>

                    

                    

                    <div class="form-group mb-3">
                        <label style={{fontWeight: "bold"}}>Group ID </label>
                        <input type="text" class="form-control"  onChange={(e)=> setGroupId(e.target.value)}/>
                    </div> 

                    <div class="form-group mb-3">
                        <label style={{fontWeight: "bold"}}>Topic </label>
                        <input type="text" class="form-control" onChange={(e)=> setTopic(e.target.value)} />
                    </div>  

                    <div class={alertClass} role="alert">
                            {alertMessage}
                    </div>

                    <button type="button" className="btn btn-primary" onClick={createRequest}>Submit</button>


                </form>     
            </div>    
            
            </div>
        </div>
    );
}

export default RequestTopic;