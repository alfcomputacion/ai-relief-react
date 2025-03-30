import React, { useEffect, useState, useContext } from 'react'
// import AssesContext from '../context/AssesProvider'
import AiReliefContext from '../context/AiReliefProvider'

export default function AgentNextSteps() {
const [response, setResponse] = useState(false);
const [formData, setFormData] = useState({
  fileName: '',
  instructions: 'Resume',
  file: null,
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

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Por favor, selecciona un archivo PDF.");
      return;
    }
  }
  const handleFileChange = (e) => {
  const archivo = e.target.files[0]; // Obtenemos el archivo seleccionado
  setFormData({
    ...formData, // Conserva los valores existentes
    file: archivo // Actualiza el campo "file" con el archivo seleccionado
  });
};
    // handles assesment api call
    const handleAssesment = async (e) =>{
      console.log('trying AI-API')
      const data = new FormData
      data.append('instructions', formData.instructions);
      data.append('file', formData.file)

      // try {
        const response = await fetch ('http://127.0.0.1:8000/api/airelief/text/',{
          headers: {
            
            "Content-Type": "multipart/form-data",
          },
          method: "POST",
          body: data,
          })
          const dta =  await response.json();
          if (dta){
            setAiResponse(dta.data)
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
      <form onSubmit={handleSubmit}>
        {/* Campo para seleccionar el archivo */}
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button type="submit">Subir y resumir PDF</button>
      </form>

      <button onClick={() => handleAssesment()  } className='btn btn-info m-1'>Analize</button>
      {response?<div style={{whiteSpace: 'pre-wrap'}} className='text-start w-75 h-75 m-auto pt-4'>
        {aiResponse}
      </div>:<div>...</div>}
    </>
  )
}
