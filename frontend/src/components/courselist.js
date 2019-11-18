import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import Calendar from '../Pages/Calandar';

export default function CourseList(){

    const [courses,setCourse]=useState([]);

    const query=function(){
        axios.get('http://localhost:5000/database/fetchData')
        .then(res=>{
            //console.log(res.data);
            setCourse(res.data);
            return res;
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        query();
    }, query)

    console.log(courses && courses)

    return(
        <div className='course-page'>
		<Popup trigger={<button> Trigger</button>}>
    		<Calendar classes={{ 
                root: 'stylised-calendar'
             }}/>
 		 </Popup>
            {courses.map((i,key)=>{
                return(
                    <div className="course-card">
                        <h2>{i.name}</h2>
                        <div className='metaData'>
                            <p className='metaInfo'>{i.department}</p>
                            <p className='metaInfo'>{i.time}</p>
                            <p className='metaInfo'>{i.location}</p>
                        </div>
                        <p>{i.description}</p>
                    </div>
                )
            })}
        </div>
    )
}