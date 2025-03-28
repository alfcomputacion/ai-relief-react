import React, { useEffect, useState, useContext } from 'react'
// import AssesContext from '../context/AssesProvider'
import AiReliefContext from '../context/AiReliefProvider'

export default function AgentNextSteps() {
const [response, setResponse] = useState(false);
const [formData, setFormData] = useState({
  fileName: '',
  instructions: 'Resume'
  
})

const {aiResponse, setAiResponse} = useContext(AiReliefContext);

useEffect(()=>{
  console.log("response changed")
},[response])

const handleInput = (e)=>{
  const {name, value} = e.target;
  setFormData((prevData)=>({
    ...prevData,
    [name]: value,
  }));
}
    // handles assesment api call
    const handleAssesment = async (e) =>{
      console.log('trying AI-API')
      
      // try {
        const response = await fetch ('http://127.0.0.1:8000/api/airelief/text/',{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
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
     
     <input type="text"
            name="fileName"
            value={formData.fileName}
            onChange={handleInput}
            placeholder='title of file' />
     <input 
        type="text" 
        name="instructions" 
        value={formData.instructions} 
        onChange={handleInput} 
        placeholder='Instructions for AI'/>

      <button onClick={() => handleAssesment()  } className='btn btn-info m-1'>Analize</button>
      {response?<div style={{whiteSpace: 'pre-wrap'}} className='text-start w-75 h-75 m-auto pt-4'>
        {aiResponse}
      </div>:<div>...</div>}
    </>
  )
}
