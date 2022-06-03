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
            alert('Login successful')
            
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
            <form className='col-lg-4 m-auto card p-5' >
                <h3 className='text-center mb-4'>Login Page</h3>
                <div className="form-outline mb-4">
                    <input type="email"  className="form-control"  onChange={(e)=> setEmail(e.target.value)} />
                    <label className="form-label">Email address</label>
                </div>


                <div className="form-outline mb-4">
                    <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} />
                    <label className="form-label" >Password</label>
                </div>

                <button type="button" className="btn btn-primary btn-block mb-4" onClick={authUser} >Sign in</button>

                    
                <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    <p>or sign up with:</p>
                    
                </div>
            </form>


        </div>
    );

}

export default LoginComponent;