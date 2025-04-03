import { useContext, useState } from 'react'
import './App.css'
import Login from './components/Login'
import AuthContext from './context/AuthProvider';
import AgentNextSteps from './components/AgentNextSteps';
import Navbar from './components/NavBar';

function App() {
// const [success, setSuccess]= useState(false);
const {success} =useContext(AuthContext);
const [errMsg, setErrMsg] = useState('');

  return (
   <>
    {success ? (
      <section className='section-welcome'>
 
        <p>{errMsg}</p>
        <Navbar />
        <h2 className='mt-2'>Welcome</h2>
        <AgentNextSteps />
        <div className="side">
        </div>

      </section>): ( <Login />)
      }
      </>

  )
}

export default App
