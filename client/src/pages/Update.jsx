import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { toast } from "react-toastify";

const Update = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");

  const { user } = useAuth();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = {
      title,
      description,
      color,
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(note),
      }
    );

    const data = await res.json();

    if (data.success) {
      setTitle("");
      setDescription("");
      setColor("#ffffff");
      toast.success("Note updated");
      navigate("/notes");
    }

    if (!data.success) {
      toast.error(data.error);
    }
  };

  const getNote = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setTitle(data.data.title);
      setDescription(data.data.description);
      setColor(data.data.color);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className='flex flex-col gap-4'>
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

export default Update;
