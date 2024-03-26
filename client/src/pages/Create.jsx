import React, {useState} from 'react';
import {useAuth} from '../contexts/Auth';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("white");
    const {user} = useAuth();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
          e.preventDefault();
          const note = {
            title, description, color
          };
          
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`,{
            method: 'POST',
            headers: {"Content-Type": "application/json" ,
                      Authorization: `Bearer ${user}`},
            body: JSON.stringify(note)
          });
          const data = await res.json();

          if(data.success){
            setColor('white');
            setDescription('');
            setTitle('');
            navigate('/notes')
            toast.success('Note created successfuly');
          }
          if(!data.success){
            toast.error(data.error);
          }
    }
  return (
    <div className='flex flex-col gap-4 p-4 min-h-screen items-center justify-center'>
      <form className='flex flex-col gap-4'
              onSubmit={handleSubmit}>
            <input className='bg-gray-100 px-4 py-2 rounded-md' type="text" value={title} placeholder='title' name='title' onChange={(e)=>setTitle(e.target.value)}/>
            <input className='bg-gray-100 px-4 py-2 rounded-md' type="text" value={description} placeholder='description' name='description' onChange={(e)=>setDescription(e.target.value)}/>
            <select className='bg-gray-100 px-4 py-2 rounded-md' name="color" value={color} onChange={(e)=>setColor(e.target.value)}>
              <option value="#f1f1f1">Grey</option>
              <option value="#add8e6">Blue</option>
              <option value="#90ee90">Green</option>
              <option value="#ffffcc">Yellow</option>  
              <option value="#e6e6fa">Purpule</option>
            </select>
            <button type='submit' className='bg-gray-800 text-white px-4 py-2 rounded-md'>Create Note</button>
      </form>
    </div>
  )
}

export default Create
