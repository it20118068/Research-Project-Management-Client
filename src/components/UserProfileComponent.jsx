import React,{useState} from "react";

function UserProfileComponent() {

    const [name, setName] = useState("Ms. Kushnara Suriyawansa");
    const [image, setImage] = useState("https://www.sliit.lk/profile/uploads/scan_image_1505803005-Ms__Kushnara.jpg");
    const [career, setCareer] = useState("Lecturer")
    const [faculty, setFaculty] = useState("FACULTY OF COMPUTING | COMPUTER SCIENCE & SOFTWARE ENGINEERING")


    return (  
        <div className="container">
            <div className="card p-5 my-bg" style={{borderRadius: "25px"}}>
            {/* <h2 className="card-header mb-5 p-4" style={{borderRadius: "20px"}}>Request Supervisor/Co-Supervisor</h2> */}


            

            <div className="card-body">
                    <div className="row m-auto user-profile-bg p-5" style={{borderRadius: "25px"}}>
                        <div className="col-lg-3">
                            <img src={image} className="rounded"  alt="Sample image" />
                        </div>
                        <div className="col m-5">
                            <h2>{name}</h2>
                            <h4>{career}</h4>
                            <h6>{faculty}</h6>
                            
                        </div>         
                    </div>
                    <div className="row m-auto user-profile-bg p-5 mt-2" style={{borderRadius: "25px"}}>
                        <h3>Bio</h3>
                        <p>
                        Lecturer at Sri Lanka Institute of Infomation Technology - 2019 August - to Date
Assistant Lecturer at Sri Lanka Institute of Infomation Technology - 2016 June - 2019 August
Acdemic Instructor at Sri Lanka Institute of Infomation Technology - 2016 January - 2016 June
                        </p>
                    
                       
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default UserProfileComponent;