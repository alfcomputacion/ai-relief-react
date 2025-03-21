import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider';

const Login = () => {

    const {auth,setAuth, success, setSuccess} = useContext(AuthContext);
    const userRef = useRef('');
    const [user, setUser] = useState('');
    const [pwd, setPwd]= useState('');
    const [tokenCookie, setTokenCookie] = useState({})
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        userRef.current.focus();
        getCookie("Token")
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[user, pwd])
//COOKIES
function setCookie(name, value, days){
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 *60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/"
}
  useEffect(()=>{

      if(getCookie("Token") != ""){
          console.log("Token is :",  getCookie("Token"))
          // setSuccess(true)
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

    // Handles login to API
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const d = new Date();
      try{
   
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username: user, password: pwd})
        });
        console.log('waiting for response...')

      
        const token = await response.json();
        console.log("This is the token.access: ",token.access)
        setCookie("Token", token.access, 1)
        if(token){
          setTokenCookie(token.access)
          console.log('response done?')
          // setting authentication
          setAuth({user, token});
          // setCookie('Token', token.access, 1)
          
          d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
          let expires = "expires="+d.toUTCString();
  
          document.cookie = "Token=" + token.access; + expires + ";" 
          
          console.log(token['success'])
          console.log(user)
          // alert(token.access)
          setUser('');
          setPwd('');
          // setSuccess(true);
          
          }else{
            console.log(token.detail)
            if(token?.detail){
              setErrMsg(token.detail)
            }
          }

        // setIsLoading(false)

    }catch (err){
      console.log("el error es : " +err)
      setErrMsg(err.toUTCString)
    }
    }
   return (
    <>
    {
    
    <section className='section-login'>
      {/* <p ref={errRef} className={errMsg? "errmsg" :
      "offscreen"} aria-live='assertive'>{errMsg}</p> */}
      {errMsg ? (<p>{errMsg}</p>): (

        <form className='login-form' onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <label htmlFor='username'>Username:</label>
        <input 
            type='text' 
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
        />
        <label htmlFor='password'>Password</label>
        <input
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e)=> setPwd(e.target.value)}
            value={pwd}
            required 
        />
        <div>
          <div className="d-grid">
            <button className='btn btn-outline-success text-white'>Sign in</button>
          </div>

        </div>
      <p className='m-1'>
        Need an Account?<br />
        <span className='line'>
            {/*put router link here*/}
            <a href='#'>Sing Up</a>
        </span>
      </p>
      </form >
      )}

    </section>
      
    }</>
  )
}

export default Login
