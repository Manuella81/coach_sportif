import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectCoach } from "../slices/coachSlice";
import { selectLessons } from "../slices/lessonSlice";
import moment from 'moment';
import Calendar from '../components/calendar';
import AddLesson from '../components/addLesson';

const Admin = (props)=>{
    const coach = useSelector(selectCoach)
    const lessons = useSelector(selectLessons)
    
    const [myLessons, setMyLessons] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);  

    
    const onClickChangeLessons = (type)=>{
        //condition qui va mettre à jour myLessons avec les lessons à afficher
        switch(type) {
            case 'all':
                setMyLessons(lessons.allLessons);
            break;

            case 'futur':
                setMyLessons(lessons.futurLessons);
            break;

            case 'old':
                setMyLessons(lessons.oldLessons);
            break;

            default:
                 setMyLessons(lessons.allLessons);
            break;

        }
       
    }
    useEffect(()=>{
         console.log(myLessons)
    }, [myLessons])
    return (
        <div>
            <div>
                <button
                    class="orange_button"
                    onClick={(e)=>{
                        setIsPopUp(true);
                    }}
                >
                    Ajouter un cours
                </button>
            </div>
            <div>
                <button
                    class="orange_button"
                    onClick={(e)=>{
                        onClickChangeLessons('all')
                    }}
                >
                    Tous mes cours
                </button>
                <button
                    class="orange_button"
                    onClick={(e)=>{
                        onClickChangeLessons('futur')
                    }}
                >
                    Mes cours à venir
                </button>
                <button
                    class="orange_button"
                    onClick={(e)=>{
                        onClickChangeLessons('old')
                    }}
                >
                    mes cours passés
                </button>
            </div>
            {isPopUp && <AddLesson 
                onClose={(e)=>{
                    setIsPopUp(false)
                }}
            />}
            {myLessons.length > 0 && <Calendar lessons={myLessons} isModify={isModify}/>}
        </div>
    )
}

export default Admin;