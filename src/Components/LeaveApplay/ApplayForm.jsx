import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './ApplayForm.css'
import LoadForAll from '../LoadForAll/LoadForAll';
import { addDoc, collection } from 'firebase/firestore';
import {  useUser } from '../../Store/UserContext';
import { db } from '../../Firebase/Config';

function ApplayForm() {

  const {currentUser, userData, loading}=useUser()
  
  // Debug logging
  console.log('Current User:', currentUser);
  console.log('User Data:', userData);
  console.log('Loading:', loading);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [matter, setMatter] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit=async(e)=>{
    e.preventDefault();
    setIsLoading(true)
    setError('') // Clear previous errors

    // Validate required fields
    if (!currentUser) {
      setError('User not authenticated');
      setIsLoading(false);
      return;
    }

    if (!matter || !message || !fromTime || !toTime) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    // Calculate total time in days
    const fromDate = new Date(fromTime);
    const toDate = new Date(toTime);
    const totalTimeInDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));

    try{
      const docRef = await addDoc(collection(db,'leave-applay'),{
        name: currentUser.displayName,
        stdId: currentUser.uid,
        matter,
        message,
        fromTime,
        toTime,
        totalTime: totalTimeInDays,
        teacherName: userData?.teacherName || 'Not Assigned',
        teacherId:userData?.teacherID|| 'Not Assigned',
        createdAt: new Date(),
        status: 'pending',
        arrivalTime
      })
      
      console.log('Document written with ID: ', docRef.id);
      setIsLoading(false);
     
      navigate('/'); // or wherever you want to redirect
      
    }catch(err){
      setError(err.message)
      console.log(err.message)
      setIsLoading(false);
    }
  }
  // Show loading while user data is being fetched
  if (loading) {
    return <LoadForAll title="Loading user data..." />;
  }

  // Show error if user is not authenticated
  if (!currentUser) {
    return <div className="error-message">Please login to apply for leave</div>;
  }

  return (
    <div className="leave-application-container">
      <div className="leave-application-card">
        <div className="card-header">
          <div className="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h2>Leave Application</h2>
          <p>Submit your leave request for approval</p>
        </div>

        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-section">
            <h3 className="section-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Application Details
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="matter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  Subject Matter
                </label>
                <input 
                  type="text" 
                  id="matter" 
                  placeholder="What's this leave request about?" 
                  value={matter} 
                  onChange={(e) => setMatter(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                Detailed Message
              </label>
              <textarea 
                id="message" 
                rows="4" 
                placeholder="Please provide detailed information about your leave request..." 
                required 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              Leave Period
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fromTime">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  From Date
                </label>
                <input 
                  type="date" 
                  id="fromTime" 
                  required 
                  value={fromTime} 
                  onChange={(e) => setFromTime(e.target.value)} 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="toTime">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  To Date
                </label>
                <input 
                  type="date" 
                  id="toTime" 
                  required 
                  value={toTime} 
                  onChange={(e) => setToTime(e.target.value)} 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="arrivalTime">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Expected Arrival Time
              </label>
              <select 
                name="arrivalTime" 
                id="arrivalTime" 
                required 
                value={arrivalTime} 
                onChange={(e) => setArrivalTime(e.target.value)}
              >
                <option value="">Select arrival time</option>
                <option value="Morning">Morning (6 AM - 12 PM)</option>
                <option value="Evening">Evening (12 PM - 6 PM)</option>
                <option value="Night">Night (6 PM - 12 AM)</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Request Information
            </h3>
            
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>From</h4>
                  <p>{currentUser?.displayName || 'Student'}</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>To</h4>
                  <p>{userData?.teacherName || 'Teacher Not Assigned'}</p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {error}
            </div>
          )}
          
          {isLoading && <LoadForAll title="Submitting your leave request..."/>}
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
            {isLoading ? 'Submitting...' : 'Submit Leave Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ApplayForm