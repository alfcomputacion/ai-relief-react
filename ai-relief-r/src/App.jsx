import { useContext, useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import AuthContext from './context/AuthProvider';
import AgentNextSteps from './components/AgentNextSteps';
import Navbar from './components/NavBar';

function App() {
// const [success, setSuccess]= useState(false);
const {auth, success, setSuccess} =useContext(AuthContext);
const [errMsg, setErrMsg] = useState('');
  useEffect(()=>{

      if(getCookie("Token") != ""){
          console.log("WHY DOESNT you change Token is :",  getCookie("Token"))
          setSuccess(true)
      }
      console.log("USEFFECT: ",auth.token)
      if(auth.token != undefined){
          setSuccess(true)
          setTokenCookie(auth.token)
      }
  },[auth])

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  return (
   <>
    {success ? (
      <section className='section-player'>
 
        <p>{errMsg}</p>
        <Navbar />
        <h2 className='mt-2'>AI relief</h2>
        <AgentNextSteps />
        <div className="side">
        </div>

      </section>): ( <Login />)
      }
      </>

  )
}

export default App
