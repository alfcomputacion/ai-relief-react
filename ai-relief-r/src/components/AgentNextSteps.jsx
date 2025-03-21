import React from 'react'

export default function AgentNextSteps() {

  const  handleAiButton = () =>{
    console.log('hola from btn ai')
  } 
  return (
    <>
     <p>HOLA FROM AGENT AI RELIEF</p> 
      <button onClick={() => handleAiButton()  } className='btn btn-outline-danger m-1'>Analize</button>
    </>
  )
}
