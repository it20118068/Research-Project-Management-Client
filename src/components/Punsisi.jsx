import React,{useState, useEffect} from "react";
import axios from "axios";

function Punsisi() {

    const[usersList, setUsersList] = useState([]);
    const[sup, setSup] = useState([]);
    const[other, setOther] = useState([]);
    const[searchValue, setSearchValue]= useState("");

    const[searchResult, setSearchResult] = useState([]);
    const[isSearch, setIsSearch]= useState(false)
  
    useEffect(()=>{
        getAllUsers();
    },[])
    

    function getAllUsers(){
        
        axios.get("http://localhost:8085/user/").then((res)=>{
            setUsersList(res.data);

            var tempS=[];
            var tempOther=[]
            

            for(const s of res.data){
                if(s.role == 1){
                    tempS.push(s)
                }else{
                    tempOther.push(s)
                }
            }

            setSup(tempS);
            setOther(tempOther);

        }).catch((err)=>{
            console.log(err);
        })
    }

    function search(){

        var searchRes = [];
        

        if(searchValue != ""){
            setIsSearch(true);
            for(const u of usersList){
                if(searchValue == u.name){
                    searchRes.push(u);
                }
            }
        }else{
            setIsSearch(false);
        }

        setSearchResult(searchRes)
    }


    return (  
        <div>
            <div className="form-group mb-2">
                <input className="form-control" type="text" onChange={(e)=>setSearchValue(e.target.value)}/>
            </div>
            <button type="button" className="btn btn-primary"onClick={search}>Search</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    { isSearch==false &&
                        sup.map(
                            user => <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                        )
                    }
                    {isSearch==false &&
                        other.map(
                            user => <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                        )
                    }

                    {isSearch==true &&
                        searchResult.map(
                            user => <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Punsisi;