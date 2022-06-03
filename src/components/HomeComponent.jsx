import React, {useState, useEffect} from "react";
import ActivityService from "../services/ActivityService";
import AuthenticationService from "../services/AuthenticationService";
import FileUploadComponent from "./FileUploadComponent";


function HomeComponent() {

    const [activities, setActivites] = useState([]);
    const [title, setTitle] = useState();
    const [activityType, setActivityType] = useState(0);
    const [selectedFile, setSelectedFile] = useState();
    const [role, setRole] = useState(null);
    const [showContent, setShowContent] = useState(true);
    const [selectedActivity, setSelectedActivity] = useState([]);
    const [userId, setUserId] = useState("");

   

    useEffect(()=>{

        AuthenticationService.authUser().then((res)=>{
            setRole(res.data.role);
            setUserId(res.data.id)
        })
        
        loadAllActivities();
   
    },[]);



    function loadAllActivities(){
        let acts = [];
        function getActivities(){ 
            return  new Promise((resolve, reject) =>{
                ActivityService.getActivities().then((res)=>{ 
                    resolve(res.data)
                }).catch((err)=>{
                    alert(err.message);
                })
            })
        }

        async function setActivities(){
            try{
                let response = await getActivities();

                for(const a of response){
                    if(a.activityType == 0){
                        acts.push(
                            <tr className="h-25 ">
                                <td className="p-5"><h6>{a.title}</h6></td>
                                <td className="p-5"></td>
                                <td className="p-5"><a href="/CreateStudentGroups" class="btn btn-primary btn-sm active" role="button" aria-pressed="true">Add Submission</a></td>
                            </tr>     
                        )
                    } else if (a.activityType == 1) {
                        acts.push(
                            <tr className="h-25 ">
                                <td className="p-5"><h6>{a.title}</h6></td>
                                <td className="p-5"></td>
                                <td className="p-5"><button class="btn btn-primary btn-sm active" role="button" aria-pressed="true" onClick={(e)=>{setSelectedActivity(a); setShowContent(false)}} >Add Submission</button></td>
                            </tr>     
                        )
                    } else if (a.activityType == 2){
                        acts.push(
                            <tr className="h-25 ">
                                <td className="p-5"><h6>{a.title}</h6></td>
                                <td className="p-5"></td>
                                <td className="p-5"><a href={a.fileData} class="btn btn-primary btn-sm active" role="button" aria-pressed="true">Download</a></td>
                            </tr>     
                        )
                    }
                }
                setActivites(acts)
            } catch (err){
                console.log(err);
            }
        }       
        setActivities();          
    }



    //create activity
    function createActivity(){
        const activity = {title, activityType}
        
        const formData = new FormData();

        formData.append('title', title);
        formData.append('activityType', activityType);
        formData.append('fileData', selectedFile);

        ActivityService.saveActivity(formData).then(()=>{
            window.location.reload(false);
        }).catch((err)=>{
            alert(err);
        })
    }


    return (
        <div>
            {showContent == true &&
            <div>
 
            <div className="card bg-dark text-light p-3" style={{opacity:'90%'}}>
                
                <h2 className="card-header mb-5 p-4 title-bg" >
                    Activities
                    {role == 0 && 
                        <button className="btn btn-secondary btn-sm m-2" data-toggle="modal" data-target="#addActivity">Add</button>
                    } 
                    
                </h2>

                <div className="card-body overflow-auto mb-5">
                    <table class="table table-hover table-dark">
                        
                        <tbody>
                            {activities}
                        </tbody>
                    </table>
                    
                </div> 
            </div>


            {/* Create Activity Modal */}
            {role == 0 &&
            <div class="modal fade" id="addActivity" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Activity</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Title</label>
                            <input type="text" class="form-control" onChange={(e)=>setTitle(e.target.value)} />
                        </div>

                        <div class="form-group p-3">
                            <label style={{fontWeight: "bold"}}>Activity</label>
                            {/* <input type="text" class="form-control"/> */}
                            <select class="form-select" aria-label="Default select example" value={activityType} onChange={(e)=>setActivityType(e.target.value)}>
                                <option value="0">Create Project Group</option>
                                <option value="1">Submit Document</option>
                                <option value="2">Download Document</option>
                            </select>
                        </div>  

                        {activityType == 2 &&
                            <div class="form-group p-3">
                                <label style={{fontWeight: "bold"}}>Upload the file</label>
                                <input type="file" className="form-control" name="file" onChange={(e)=>setSelectedFile(e.target.files[0])}/>
                            </div>
                        }         

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={createActivity}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
            }

            </div>
            }
            {showContent != true && <FileUploadComponent title={selectedActivity.title} setShowContent={setShowContent} userId={userId} />}
        </div> 
        
    );
}

export default HomeComponent;