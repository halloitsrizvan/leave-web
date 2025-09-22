import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db, Firebase } from '../../Firebase/Config';
import LoadForAll from '../LoadForAll/LoadForAll';

// Icon Components (using SVG for self-containment)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const HashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <line x1="4" x2="20" y1="9" y2="9"/>
    <line x1="4" x2="20" y1="15" y2="15"/>
    <line x1="10" x2="8" y1="3" y2="21"/>
    <line x1="16" x2="14" y1="3" y2="21"/>
  </svg>
);

const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <path d="m4 6 8-4 8 4"/>
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/>
    <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/>
    <path d="M18 5v17"/>
    <path d="M6 5v17"/>
    <path d="M12 5v17"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

function Signup() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [stdClass, setStdClass] = useState('');
  const [allAdmin, setAllAdmin] = useState([]);
  const [userType, setUserType] = useState('student');
  const [signupErr, setSignupErr] = useState('');
  const [load, setLoad] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      setFirstLoad(true);
      try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const admins = usersData.filter(user => user.isAdmin);
        setAllAdmin(admins);
        setFirstLoad(false);
      } catch (error) {
        console.error("Error fetching admin users:", error);
        setSignupErr("Could not load necessary data. Please try again later.");
        setFirstLoad(false);
      }
    };
    fetchAllUsers();
  }, []);

  const formatPhoneEmail = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return `${cleaned}@phoneauth.com`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupErr('');
    setLoad(true);

    if (!phone || !password || !name) {
      setSignupErr('Name, Phone, and Password are required.');
      setLoad(false);
      return;
    }
    if (userType === 'student' && (!admissionNumber || !stdClass)) {
      setSignupErr('Admission Number and Class are required for students.');
      setLoad(false);
      return;
    }
    if (userType === 'staff' && !stdClass) {
      setSignupErr('Class/Section is required for staff.');
      setLoad(false);
      return;
    }

    let teacherSection = '';
    if (userType === 'student') {
      if (['5', '6', '7'].includes(stdClass)) {
        teacherSection = 'HOS';
      } else if (['8', '9', '10'].includes(stdClass)) {
        teacherSection = 'HOD';
      } else {
        teacherSection = stdClass;
      }
    } else {
      teacherSection = stdClass;
    }

    const teacher = allAdmin.find(admin => admin.sectionOfTeacher === teacherSection);
    const teacherName = teacher ? teacher.name : null;
    const teacherID = teacher ? teacher.id : null;

    try {
      const auth = getAuth(Firebase);
      const phoneEmail = formatPhoneEmail(phone);
      const userCredential = await createUserWithEmailAndPassword(auth, phoneEmail, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const userData = {
        name,
        phone,
        email: phoneEmail,
        stdClass,
        sectionOfTeacher: teacherSection,
        createdAt: new Date().toISOString(),
        isAdmin: userType === 'staff',
        teacherName,
        teacherID,
      };
      
      if (userType === 'student') {
        userData.admissionNumber = admissionNumber;
      }

      await setDoc(doc(db, 'users', user.uid), userData);
      
      setLoad(false);
      navigate('/');
    } catch (error) {
      setLoad(false);
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setSignupErr('This phone number is already registered.');
      } else if (error.code === 'auth/weak-password') {
        setSignupErr('Password should be at least 6 characters long.');
      } else {
        setSignupErr('An error occurred during signup. Please try again.');
      }
    }
  };

  if (firstLoad) {
    return <LoadForAll title="Loading Signup Page..." />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      {load && <LoadForAll title="Creating your account..." />}

      <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="mt-2 text-gray-500">Join our community today!</p>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-gray-200 p-1">
            <button
              onClick={() => setUserType('student')}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-300 ${userType === 'student' ? 'bg-white text-blue-600 shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
            >
              I am a Student
            </button>
            <button
              onClick={() => setUserType('staff')}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-300 ${userType === 'staff' ? 'bg-white text-blue-600 shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
            >
              I am Staff
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {signupErr && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
              {signupErr}
            </div>
          )}

          <div className="relative">
            <UserIcon />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {userType === 'student' && (
            <>
              <div className="relative">
                <HashIcon />
                <input
                  type="number"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                  placeholder="Admission Number"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <SchoolIcon />
                <input
                  type="text"
                  value={stdClass}
                  onChange={(e) => setStdClass(e.target.value)}
                  placeholder="Your Class (e.g., 5, 9)"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          {userType === 'staff' && (
            <div className="relative">
              <SchoolIcon />
              <select
                value={stdClass}
                onChange={(e) => setStdClass(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select Section / Role</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="HOS">HOS (Classes 5-7)</option>
                <option value="HOD">HOD (Classes 8-10)</option>
              </select>
            </div>
          )}

          <div className="relative">
            <PhoneIcon />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <LockIcon />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={load}
              className="w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition-transform duration-200 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;