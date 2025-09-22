import React,{useState,useEffect} from 'react'
import { doc, setDoc,getDocs,collection,updateDoc } from 'firebase/firestore';
import {db, Firebase} from '../../../Firebase/Config'
import LoadForAll from '../../../Components/LoadForAll/LoadForAll'
import './AllMessages.css'
import { useUser } from '../../../Store/UserContext'

function AllMessages() {
  const [AllMessages,setAllMessages] = useState([])
  const [load,setLoad] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    arrivalTime: '',
    toTime: ''
  })
  const {currentUser} = useUser()

  const fetchAllMessages = async () => {
    setLoad(true)
    try{
      const usersRef=collection(db,'leave-applay')
      const querySnapshot=await getDocs(usersRef)
      const usersData=querySnapshot.docs.map(doc=>({
          id:doc.id,  
          ...doc.data()
      }))

      usersData.sort((a,b)=>b.createdAt.seconds-a.createdAt.seconds)
      
      const filteredData = usersData.filter(user=>user.teacherId===currentUser?.uid)
      
      setAllMessages(filteredData)
    }catch(error){
      console.error('Error fetching messages:', error)
    }finally{
      setLoad(false)
    }
  }

  useEffect(()=>{
    fetchAllMessages()
   },[currentUser])

   const handleEdit = (message) => {
     setEditingId(message.id)
     setEditForm({
       arrivalTime: message.arrivalTime || '',
       toTime: message.toTime || ''
     })
   }

   const handleSaveEdit = async (id) => {
     try {
       const leaveRef = doc(db, 'leave-applay', id)
       await updateDoc(leaveRef, {
         arrivalTime: editForm.arrivalTime,
         toTime: editForm.toTime
       })
       console.log('Leave details updated successfully')
       setEditingId(null)
       setEditForm({ arrivalTime: '', toTime: '' })
       fetchAllMessages() // Refresh data
     } catch(error) {
       console.error('Error updating leave details:', error)
     }
   }

   const handleCancelEdit = () => {
     setEditingId(null)
     setEditForm({ arrivalTime: '', toTime: '' })
   }

   const handleApprove = async (id) => {
    try{
        const leaveRef=doc(db,'leave-applay',id)
        await updateDoc(leaveRef,{
            status:'approved'
        })
        console.log('Leave approved successfully')
        fetchAllMessages() // Refresh data immediately
        }catch(error){
        console.error('Error approving leave')
        }
   }
   
   const handleReject = async (id) => {
    try{
        const leaveRef=doc(db,'leave-applay',id)
        await updateDoc(leaveRef,{
            status:'rejected'
        })
        console.log('Leave rejected successfully')
        fetchAllMessages() // Refresh data immediately
        }catch(error){
        console.error('Error rejecting leave')
        }
   }

   const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      default: return 'status-default';
    }
  }


  return (
    <div className="leave-status-container">
      <div className="leave-status-header">
        <h1 className="leave-status-title">Leave Applications</h1>
        <p className="leave-status-subtitle">View and manage all leave requests</p>
      </div>

      <div className="leave-status-content">
        {load ? (
          <div className="loading-container">
            <LoadForAll />
          </div>
        ) : AllMessages.length === 0 ? (
          <div className="no-data-container">
            <div className="no-data-icon">📋</div>
            <h3>No Leave Applications</h3>
            <p>There are currently no leave applications to display.</p>
          </div>
        ) : (
          <div className="leave-cards-grid">
            {AllMessages.map((messages, index) => (
              <div key={messages.id || index} className="leave-card">
                <div className="leave-card-header">
                  <div className="leave-card-title">
                    <h3>Name: {messages.name || 'Leave Request'}</h3>
                    <h3>Matter: {messages.matter || 'Leave Request'}</h3>
                   
                  </div>
                  <div className="leave-card-date">
                    {messages.createdAt ? 
                      new Date(messages.createdAt.seconds * 1000).toLocaleDateString() : 
                      'N/A'
                    }
                  </div>
                </div>

                <div className="leave-card-body">
                  <div className="leave-info-grid">
                    <div className="info-item">
                      <label>Message:</label>
                      <p>{messages.message || 'No message provided'}</p>
                    </div>
                    
                    <div className="info-item">
                      <label>From:</label>
                      <p>{messages.fromTime || 'Not specified'}</p>
                    </div>
                    
                    <div className="info-item">
                      <label>To:</label>
                      {editingId === messages.id ? (
                        <input
                          type="date"
                          value={editForm.toTime}
                          onChange={(e) => setEditForm({...editForm, toTime: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        <p>{messages.toTime || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="info-item">
                      <label>Arrival Time:</label>
                      {editingId === messages.id ? (
                        <select
                          value={editForm.arrivalTime}
                          onChange={(e) => setEditForm({...editForm, arrivalTime: e.target.value})}
                          className="edit-input"
                        >
                          <option value="">Select Arrival Time</option>
                          <option value="Morning">Morning</option>
                          <option value="Evening">Evening</option>
                          <option value="Night">Night</option>
                        </select>
                      ) : (
                        <p>{messages.arrivalTime || 'Not specified'}</p>
                      )}
                    </div>
                    
                    <div className="info-item">
                      <label>Duration:</label>
                      <p>{messages.totalTime || 'Not specified'} Days</p>
                    </div>

                  {messages.status==='pending' ? (
                    <div className="info-item">
                      <button className='status-badge btn-approve' onClick={()=>handleApprove(messages.id)}>
                        Approve Leave
                      </button>
                      <button className='status-badge btn-reject' onClick={()=>handleReject(messages.id)}>
                        Reject Leave
                      </button>
                    </div>
                  ) : (
                    <span className={`status-badge ${getStatusColor(messages.status)}`}>
                      {messages.status || 'Pending'}
                    </span>
                  )}

                  <div className="info-item">
                    {editingId === messages.id ? (
                      <div className="edit-buttons">
                        <button className='status-badge btn-save' onClick={()=>handleSaveEdit(messages.id)}>
                          Save Changes
                        </button>
                        <button className='status-badge btn-cancel' onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                        
                   
                       <button className='status-badge btn-edit' onClick={()=>handleEdit(messages)}>
                      Edit Details
                      </button>
                      
                     
                    )}
                  </div>

                  
                  </div>
                </div>

                <div className="leave-card-footer">
                  <div className="timestamp">
                    <small>
                      Submitted: {messages.createdAt ? 
                        new Date(messages.createdAt.seconds * 1000).toLocaleString() : 
                        'N/A'
                      }
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllMessages