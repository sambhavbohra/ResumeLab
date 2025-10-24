import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
// import Register from './pages/Register' 
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import PersonalInfoForm from './components/PersonalInfoForm'
import Preview from './pages/Preview'
import Layout from './pages/Layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />} >
          <Route index element={<Dashboard />}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
          <Route path='personal-info/:resumeId' element={<PersonalInfoForm />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
        <Route path="login" element={<Login />} />

      </Routes>
    </>
  )
}

export default App