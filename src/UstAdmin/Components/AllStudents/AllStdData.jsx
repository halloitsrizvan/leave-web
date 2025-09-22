import React,{useState,useEffect} from 'react'
import {db,Firebase} from '../../../Firebase/Config'
import {collection,getDocs,updateDoc,doc} from 'firebase/firestore'
import { useUser } from '../../../Store/UserContext'

function AllStdData() {
    const [allUsers,setAllUsers] = useState([])
    const [load,setLoad] = useState(false)
    const [err,SetErr] = useState('')
    const {currentUser,userData} = useUser()
    
    useEffect(()=>{
        const fetchUsers=async()=>{
            setLoad(true)
            try{
                const usersRef=collection(db,'users')
                const querySnapshot=await getDocs(usersRef)
                const usersData=querySnapshot.docs.map(doc=>({
                    id:doc.id,  
                    ...doc.data()
                }))
                usersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                 const filter=usersData.filter(user=>user?.teacherID===currentUser?.uid)
                
                setAllUsers(filter)
               
                setLoad(false)
            }catch(error){
                SetErr(error.message)
                setLoad(false)
            }
        }
        fetchUsers()
    },[currentUser?.uid])

const debug=()=>{
    alert(allUsers[0].name)
}
  return (
    <div>
         <div className="container">
        <div className="text-center mt-3" >
            <h1 className="section-title title-all-users">
               User Management
            </h1>
        </div>
        
        <div className="table-responsive">
            <table className="table user-table table-striped">
                <thead>
                    <tr>
                        <th scope="col">No </th>
                        <th scope="col"> Name</th>
                        <th scope="col"> Phone Number</th>
                        <th scope="col"> Email</th>
                        <th scope="col"> Status</th>
                        <th scope="col"> Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user,index)=>(
                    <tr>    
                        <th scope="row"> {index+1}</th>
                        <td class="user-id">{user.name}</td>
                        <td class="user-name">{user.phone}</td>
                        <td class="user-email">{user.email}</td>
                        <td class="user-admin"></td>
                        <td class="user-admin"></td>
                       
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

export default AllStdData