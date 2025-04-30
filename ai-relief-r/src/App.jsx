import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import AuthContext from './context/AuthProvider';
import AgentNextSteps from './components/AgentNextSteps';
import Navbar from './components/NavBar';
import ImageAssesment from './components/ImageAssessment';
import AboutUs from './components/AboutUs';

function App() {
// const [success, setSuccess]= useState(false);
const {success} =useContext(AuthContext);
const [errMsg] = useState('');


  return (
   <>
    {success ? (
      <section className='section-welcome'>
 
        <Navbar />
        <p>{errMsg}</p>
        <Routes>
          <Route path='/' element={<ImageAssesment />} />
          <Route path='/summary' element={<AgentNextSteps />} />
          <Route path='/aboutus' element={<AboutUs />} />
        </Routes>
        <div className="side">
        </div>

      </section>): ( <Login />)
      }
      </>

  )
}

export default App
