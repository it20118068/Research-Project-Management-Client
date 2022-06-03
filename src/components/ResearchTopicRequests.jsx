import React,{useEffect, useState} from "react";

function ResearchTopicRequest() {
    return (  
        <div className="container">
        <div className="card p-5 my-bg" style={{borderRadius: "25px"}}>
        <h2 className="card-header mb-5 p-4" style={{borderRadius: "20px"}}>Topic Requests</h2>

       

        <div className="card-body">
                <div className="col m-auto">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Group ID</th>
                            <th scope="col">Leader</th>
                            <th scope="col">Topic</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>GRP_106</td>
                            <td>IT20118068</td>
                            <td>Live Streaming</td>
                            <td>Pending</td>
                            <td>
                                <button className="btn btn-primary btn-sm"  data-toggle="modal" data-target="#action">Action</button>
                            </td>
                            
                        </tr>
                        {/* {
                            users.map(
                                user =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>        
                                    <td>{user.name}</td>  
                                    <td>{user.email}</td>  
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#editUser">Edit</button>
                                        <span> </span>
                                        <button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteUser" >Delete</button>
                                    </td>  
                                </tr>
                            )                                             
                        } */}
                    </tbody>
                </table>       
                </div>
                
            </div>
        </div>




         {/* Delete modal */}
      
        <div class="modal fade" id="action" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Action</h5>
            </div>
            <div class="modal-body">
                <h6>Do you want to Accept/Reject this topic?</h6>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Accept</button>
                <button type="button" class="btn btn-danger btn-sm" >Reject</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>  
            </div>
            </div>
        </div>
        </div>                


    </div>
    );
}

export default ResearchTopicRequest;