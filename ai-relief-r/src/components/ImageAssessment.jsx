import React, { useEffect, useState, useContext } from 'react'
import AiReliefContext from '../context/AiReliefProvider'


export default function AgentNextSteps() {
const [response, setResponse] = useState(false);
const [image, setImage] = useState()

const [formData, setFormData] = useState({
  fileName: '',
  instructions: '',
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
      alert("Por favor, selecciona un archivo JPG.");
      return;
    }
  }
  const handleFileChange = (e) => {
  const archivo = e.target.files[0]; // Obtenemos el archivo seleccionado
  setImage(URL.createObjectURL(archivo))
  setFormData({
    ...formData, // Conserva los valores existentes
    file: archivo // Actualiza el campo "file" con el archivo seleccionado
  });
};
    // handles assesment api call
    const handleAssesment = async () =>{
      console.log('trying AI-API Image assesment...')
      const data = new FormData
      data.append('instructions', formData.instructions);
      data.append('file', formData.file);
      data.append('fileName', formData.fileName);
    if (!formData.file) {
      alert("Por favor, selecciona un archivo JPG.");
      return;
    }

      // try {
        const response = await fetch ('https://relief.a.alfcomputacion.com/api/airelief/',{
          // headers: {
            
          //   "Content-Type": "multipart/form-data",
          // },
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
    <span className='container-form'>
        <h3 className='border-bottom border-primary border-2 p-2'>Image Assessment</h3>
     <p>Hola, Hello, Bonjour, Hallo, Ciao, Olá, こんにちは</p> 
     {/* <AudioRecorder />

     <AudioToText /> */}
     <form onSubmit={handleSubmit}>
        <label htmlFor="fileName">Title</label>
        <input  type="text"
              name="fileName"
              value={formData.fileName}
              onChange={handleInput}
              placeholder='title of file'/>
        <label htmlFor="instructions">**Instructions**</label>
        <textarea 
              type="text"
              rows="10"
              cols="70" 
              name="instructions" 
              value={formData.instructions} 
              onChange={handleInput} 
              placeholder='Instructions for AI'/>
          {/* Campo para seleccionar el archivo */}
          {/* <button type="submit">Subir y resumir PDF</button> */}
      </form>

      {image?
      <div className='d-flex m-auto'>

      <img src={image} alt="File" width={200}/>
      </div>
        :
        <span>____________</span>
      }
      <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />
      <button onClick={() => handleAssesment()  } className='btn btn-info m-1'>Analize</button>
      {response?<div style={{whiteSpace: 'pre-wrap'}} className='text-start  m-auto pt-4'>
        {aiResponse}
      </div>:<div>...</div>}
    </span>
  )
}
