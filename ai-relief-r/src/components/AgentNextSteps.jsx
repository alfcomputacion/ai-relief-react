import React, { useEffect, useState, useContext } from 'react'
// import AssesContext from '../context/AssesProvider'
import AiReliefContext from '../context/AiReliefProvider'

export default function AgentNextSteps() {
const [response, setResponse] = useState(false);
const {aiResponse, setAiResponse} = useContext(AiReliefContext);
useEffect(()=>{
  console.log("response changed")
},[response])
    // handles assesment api call
    const handleAssesment = async (e) =>{
      console.log('trying AI-API')
      
      // try {
        const response = await fetch ('http://127.0.0.1:8000/api/airelief/',{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username:"user"})
          })
          const data =  await response.json();
          if (data){
            setAiResponse(data.data)
            setResponse(true)

          }
          console.log('Ai submitted...')
      // }catch (error) {
      //   console.log('this is API Relief error: ', error.toUTCString)
      // }
    }
  return (
    <>
     <p>Hola, Hello, Bonjour, Hallo, Ciao, Olá, こんにちは</p> 
      <button onClick={() => handleAssesment()  } className='btn btn-info m-1'>Analize</button>
      {response?<div style={{whiteSpace: 'pre-wrap'}} className='text-start w-75 h-75 m-auto pt-4'>
        {aiResponse}
      </div>:<div>...</div>}
    </>
  )
}
