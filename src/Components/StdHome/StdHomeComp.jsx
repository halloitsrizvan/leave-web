import React from 'react'
import './StdHome.css';
import {Link} from 'react-router'
import {FaPlusCircle} from 'react-icons/fa'
function StdHomeComp() {
  
  return (
    <div>
        <Link to='/applay-leave'>
       <div className='text-center mt-5 bg-gradient-to-r from-indigo-600 to-purple-700 p-5 rounded-lg shadow-lg w-1/2 mx-auto cursor-pointer' >
        <h1 className='text-2xl font-bold text-white '>Apply Leave</h1>   
       </div>
        </Link>
    </div>
  )
}

export default StdHomeComp