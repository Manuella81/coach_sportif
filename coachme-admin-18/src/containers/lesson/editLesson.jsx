import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import {Link} from 'react-router-dom';
import {getLessonsFromCoach,deleteOneLesson, updateOneLesson} from '../../api/lesson'
import {loadCoachLessons} from '../../slices/lessonSlice'
import { useSelector, useDispatch } from "react-redux";
import { selectCoach } from "../../slices/coachSlice";
import { selectLessons } from "../../slices/lessonSlice";

//exemple de hook
const EditLesson = (props)=>{
    
    const params = useParams()
    const lessons = useSelector(selectLessons)
    const coach = useSelector(selectCoach)
    const dispatch = useDispatch()
    const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const [msg, setMsg] = useState(null);
	const [lessonIndex, setLessonIndex] = useState(null)
	
	useEffect(() => {
	    let index = lessons.allLessons.findIndex((lesson)=>parseInt(lesson.id) === parseInt(params.id))
	    if(index !== -1){
	        setStart(new Date(lessons.allLessons[index].start))
	        setEnd(new Date(lessons.allLessons[index].end))
	        setLessonIndex(lessons.allLessons[index].id)
	    }
	    
	},[lessons])
	
	const submitEdit = ()=>{
	    let data = {
    		start:moment(start).add(2, 'hours'),
    		end: moment(end).add(2, 'hours')
    	}
	    
	    console.log(lessonIndex)
	    updateOneLesson(data, lessonIndex)
	    .then((res)=>{
	        console.log(res)
	        if(res.status === 200){
	            getLessonsFromCoach(coach.infos.id)
    	        .then((response)=>{
    	            if(response.status === 200){
    	                console.log(response)
    	                dispatch(loadCoachLessons(response.result))
    	                setMsg('La Modification a bien été effectuée');
    	            }
    	        })
    	        .catch(err=>console.log(err))
	        }
	    })
	    .catch(err=>console.log(err))
	}
	
	return (
		<div>
			<Link to="/">Retour admin</Link>
			<h2>Editez un cours</h2>
			<div>
				<p>Modification de début</p>
				<DateTimePicker 
					onChange={(date)=>{

						setStart(date)
					}}
	          		value={start}
	          		locale="fr"
				/>
			</div>
			<div>
				<p>Modification de la fin</p>
				<DateTimePicker 
					onChange={(date)=>{
						setEnd(date)
					}}
	          		value={end}
	          		locale="fr"
				/>
			</div>
			<button
				onClick={(e)=>{
					submitEdit();
				}}
			>
				EDITEZ !
			</button>
			{msg !== null && <p>{msg}</p>}
		</div>
	)

    
}

export default EditLesson