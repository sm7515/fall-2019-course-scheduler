import React from 'react';
import axios from 'axios';
import '../App.css'

export default function Logout() {

    return (
        <div className='form-container-logout'>
            {/* <a href='/login'>Log out</a> */}
        </div>
    )
}

function clickLogout()
{
    axios({
        method:"get",
        url:'http://localhost:5000/logout',
        withCredentials :true
      })
          .then(res => {
              alert("Sucessful Logout")
          })
          .catch(err => console.log(err));
}

