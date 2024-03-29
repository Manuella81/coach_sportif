import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCoach, connectCoach } from "../slices/coachSlice";
import { loadCoachLessons } from "../slices/lessonSlice";
import {getLessonsFromCoach } from "../api/lesson"

//HOC de controle des data et de la sécurité
const RequireAuth = (props) => {
    const dispatch = useDispatch();

    const coach = useSelector(selectCoach);
    
    const params = useParams();
    
    const Child = props.child;
    // gestion des state
    const [redirect, setRedirect] = useState(false);
  
    // au chargement de chaque component
    useEffect(() => {
        //si notre utilisateur n'est pas connecté (redux)
        if(coach.isLogged === false){
            //on récup le token dans le storage
            let token = window.localStorage.getItem("coachme-token")
            //si le token est null et que la route est protégée
            if(token === null && props.withAuth){
                //on demande la redirection
                setRedirect(true)
            //sinon
            }else{
                //on vérifie le token (api)
                axios.get(config.api_url+'/api/v1/coach/checkToken', { headers: { "x-access-token": token }})
                .then((response)=>{
                    //si la réponse n'est pas 200
                    if(response.data.status !== 200){
                        //si la route est protégée
                        if(props.withAuth){
                            //on demande la redirection
                            setRedirect(true)
                        }   
                    //sinon
                    }else{
                        //on connecte notre coach dans le store de redux
                        let myCoach = response.data.coach[0]
                        myCoach.token = token
                        
                        dispatch(connectCoach(myCoach))
                        //on appel la fonction api de récupération des lessons d'un coach
                        getLessonsFromCoach(response.data.coach[0].id)
                        .then((response)=>{
                            if(response.status === 200){
                                //on ajoute les lessons de ce coach dans redux
                                dispatch(loadCoachLessons(response.result))
                            }
                        })
                        .catch(err=>console.log(err))
                            
                    }
                })
                .catch((err)=>{
                    window.localStorage.removeItem("coachme-token")
                    setRedirect(true)
                })
                    
            }
        }             
        
    }, [])
    
    if (redirect) {
        return <Navigate to="/login" />;
    }
    return <Child {...props} params={params} />;

};

export default RequireAuth;