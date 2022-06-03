import React, {useState} from "react";
import FileUploadService from "../services/FileUploadService";


function FileUploadComponent(props) {


    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState(props.title);
    const [grpId, setGroupId] = useState();
    const [userId, setUserId] = useState(props.userId)

    const [message, setMessage] = useState("");
    const [messageClass, setMessageClass] = useState("");

    function uploadFile(e){
        e.preventDefault();


        const formData = new FormData();
        formData.append('fileData', selectedFile);
        formData.append('title', title);
        formData.append('grpId', grpId);
        formData.append('senderId', userId);

        FileUploadService.uploadFile(formData).then(()=>{
            // alert("File Uploaded");
            // window.location.reload(false);
            setMessage("File Uploaded Successfully");
            setMessageClass("alert alert-success")
            setSelectedFile(null);
        }).catch((err)=>{
            // alert(err);
            setMessage("Failed to upload the file. Please try again");
            setMessageClass("alert alert-danger")
        });

    }



    return (  
        <div className="container">
            <div className="card p-5 my-bg" style={{borderRadius: "25px"}}>
            <h4 className="mb-4 p-4 card-header title-bg ">File Submision</h4>

                <span className={messageClass}>{message}</span>

                <div className="card-body">
                    <div className="col-md-6 m-auto">
                            <div className="form-group">
                                <label>Title </label>
                                <input type="text" className="form-control mb-3" value={props.title} readOnly />
                            </div>
                            <div className="form-group files color mb-4">
                                <label>Upload Your File </label>
                                <input type="file" className="form-control" name="file" onChange={(e)=>setSelectedFile(e.target.files[0])}/>
                            </div>
                            <div className="form-group">
                                <label>Group ID </label>
                                <input type="text" className="form-control mb-3" onChange={(e)=>setGroupId(e.target.value)} />
                            </div>
                            <button className="btn btn-primary" onClick={(e)=> props.setShowContent(true)}>Back</button> <span> </span>
                            <button className="btn btn-primary" onClick={uploadFile}>Submit</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}

export default FileUploadComponent;