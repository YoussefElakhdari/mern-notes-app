import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/Auth';
import { Link } from 'react-router-dom';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoanding] = useState(true);
  const { user } = useAuth();

  const handleDelete=async(id)=>{
       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
        },
      });

      const data = await res.json();

      if(data.success){
        toast.success('Note deleted');
        setNotes(notes.filter((note) => note._id !== id));
      }
      if(!data.success) return toast.error(data.error)
  }

  const getAllNotes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`, {
        method: 'GET', // Change to GET method
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
        },
      });

      const data = await res.json();
      setLoanding(false);
      console.log(data);

      if (data.success) {
        setNotes(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch notes');
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  if(loading){
    return  <h1>loading.....</h1>
  }
  return (
    <div className="flex flex-wrap justify-center">
  {notes && notes.length === 0 ? (
    <h1 className="text-4xl font-bold text-center mt-8 m-11">There's no notes</h1>
  ) : (
    notes.map((note, index) => (
      <div key={index} className="w-80 max-w-xs rounded-lg shadow-md p-4 m-4" style={{backgroundColor: note.color}}>
        <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
        <p className="text-sm text-gray-700">{note.description}</p>
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mt-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          <Link to={`/Notes/update/${note._id}`}>Update</Link>
        </button>
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mt-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => handleDelete(note._id)}>
          Delete
        </button>
      </div>
    ))
  )}
</div>
  );
}

export default Notes;


