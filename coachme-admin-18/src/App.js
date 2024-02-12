import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Header from './containers/header'
import Admin from './containers/admin'
import Profil from './containers/profil'
import EditLesson from './containers/lesson/editLesson'
import {Routes, Route} from 'react-router-dom';
import RequireAuth from './helpers/require-auth-data'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<RequireAuth child={Admin} auth={true}/>}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/logout" element={<Logout />}/>
          <Route exact path="/profil" element={<RequireAuth child={Profil} auth={true}/>}/>
          <Route exact path="/edit-lesson/:id" element={<RequireAuth child={EditLesson} auth={true}/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;