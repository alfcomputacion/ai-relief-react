import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import AuthContext from './context/AuthProvider';
import AgentNextSteps from './components/AgentNextSteps';
import Navbar from './components/NavBar';
import ImageAssesment from './components/ImageAssesment';

function App() {
// const [success, setSuccess]= useState(false);
const {success} =useContext(AuthContext);
const [errMsg] = useState('');


  return (
   <>
    {success ? (
      <section className='section-welcome'>
 
        <p>{errMsg}</p>
        <Navbar />
        <h2 className='mt-2'>Welcome</h2>
        <Routes>
          <Route path='/' element={<ImageAssesment />} />
          <Route path='/resume' element={<AgentNextSteps />} />
        </Routes>
        {/* <AgentNextSteps />
        <ImageAssesment /> */}
        <div className="side">
        </div>

      </section>): ( <Login />)
      }
      </>

  )
}

export default App
