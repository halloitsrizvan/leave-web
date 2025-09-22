import React,{useState,useEffect} from 'react'
import { doc, setDoc,getDocs,collection } from 'firebase/firestore';
import {db, Firebase} from '../../Firebase/Config'
import LoadForAll from '../LoadForAll/LoadForAll'
import './LeaveStatus.css'
import { useUser } from '../../Store/UserContext'

function LeaveStatus() {
  const [AllMessages,setAllMessages] = useState([])
  const [load,setLoad] = useState(false)
  const {currentUser} = useUser()
  
  useEffect(()=>{
    const fetchAllMessages=async()=>{
      setLoad(true)
      try{
        const usersRef=collection(db,'leave-applay')
        const querySnapshot=await getDocs(usersRef)
        const usersData=querySnapshot.docs.map(doc=>({
            id:doc.id,  
            ...doc.data()
        }))

        usersData.sort((a,b)=>b.createdAt.seconds-a.createdAt.seconds)
        
        const filteredData = usersData.filter(user=>user.stdId===currentUser?.uid)
        
        setAllMessages(filteredData)
      }catch(error){
        console.error('Error fetching messages:', error)
      }finally{
        setLoad(false)
      }
    }
         fetchAllMessages()
   },[currentUser])

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      default: return 'status-default';
    }
  }

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      default: return '📋';
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="leave-status-container">
      <div className="leave-status-header">
        <h1 className="leave-status-title">📋 Leave Applications</h1>
        <p className="leave-status-subtitle">View and manage all your leave requests</p>
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
            <p>You haven't submitted any leave applications yet. Start by creating a new request.</p>
          </div>
        ) : (
          <div className="leave-cards-grid">
            {AllMessages.map((messages, index) => (
              <div key={messages.id || index} className="leave-card">
                <div className="leave-card-header">
                  <div className="leave-card-title">
                    <h1>📝 {messages.matter || 'Leave Request'}  </h1>
                    
                    <span className={`status-badge status-badge-std ${getStatusColor(messages.status)}`}>
                      {getStatusIcon(messages.status)} {messages.status || 'Pending'}
                    </span>
                  </div>
                  <div className="leave-card-date">
                    📅 {formatDate(messages.createdAt)}
                  </div>
                </div>

                <div className="leave-card-body">
                  <div className="leave-info-grid">
                    <div className="info-item">
                      <label>💬 Message:</label>
                      <p>{messages.message || 'No message provided'}</p>
                    </div>
                    
                    <div className="info-item">
                      <label>🕐 From:</label>
                      <p>{messages.fromTime || 'Not specified'}</p>
                    </div>
                    
                    <div className="info-item">
                      <label>🕐 To:</label>
                      <p>{messages.toTime || 'Not specified'}</p>
                    </div>

                    <div className="info-item">
                      <label>⏰ Arrival Time:</label>
                      <p>{messages.arrivalTime || 'Not specified'}</p>
                    </div>
                    
                    <div className="info-item">
                      <label>📅 Duration:</label>
                      <p>{messages.totalTime || 'Not specified'} Days</p>
                    </div>
                  </div>
                </div>

                <div className="leave-card-footer">
                  <div className="timestamp">
                    <small>
                      📤 Submitted: {formatDateTime(messages.createdAt)}
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

export default LeaveStatus