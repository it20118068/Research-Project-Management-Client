import React, {useState} from 'react';
import StudentGroupService from '../services/StudentGroupService';
import UserService from '../services/UserService';

function LoginComponent() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function authUser(){
        const user = {email, password}
        UserService.authUser(user).then((res)=>{
            localStorage.setItem('token', res.data.user)
            localStorage.setItem('name', res.data.name)
            getStudentGroupId(res.data.sid);        
			window.location.href = '/'
        }).catch((err)=>{
            alert(err);
        })
    }

    function getStudentGroupId(id){
        StudentGroupService.getStudentGroupById(id).then((res)=>{
            localStorage.setItem('grpId', res.data)
        }).catch((err)=>{
            alert(err);
        })
      }

    return (
        <div>
            <form className='col-lg-6 m-auto card p-5 bg-dark text-white mt-5' style={{opacity:'90%'}} >
                <h3 className='text-center mb-4 display-6'>Login</h3>
                <div className="form-outline mb-4">
                    <label className="form-label">Email address</label>
                    <input type="email"  className="form-control bg-dark text-light"  onChange={(e)=> setEmail(e.target.value)} />
                </div>


                <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" className="form-control bg-dark text-light" onChange={(e)=> setPassword(e.target.value)} />
                    
                </div>

                <div className='text-center'>
                    <button type="button" className="btn btn-secondary  mb-4" onClick={authUser} >Sign in</button>
                </div>
                

                    
                <div className="text-center">
                    <p>Not a member? <a href="/register">Register</a></p>                   
                </div>
            </form>

        </div>
    );

}

export default LoginComponent;