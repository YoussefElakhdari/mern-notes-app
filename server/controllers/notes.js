const Note = require('../model/notes');

const getNotes= async (req, res)=>{
   const userId = req.userId;

    try{
        const notes = await Note.find({userId});
        res.status(200).json({
            success: true,
            data: notes
        })
   }catch(err){
        console.log(err.message);
        res.status(400).json({
            success: false,
            error: err.message
    })
   }
}
const getNote= async (req, res)=>{
    
        // check the valid mongo id
        if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({
                   success: false,
                   error: 'id is not valid'
            });
        };

    try{
        const note = await Note.findById(req.params.id);
        if(!note){
         return res.status(400).json({
            success: false,
            error: 'note not founded'
       })
    }
    res.status(200).json({
            success: true,
            data: note
        })
   }catch(err){
        console.log(err.message);
        res.status(400).json({
            success: false
    })
   }
}
const createNote= async (req, res)=>{
    const userId = req.userId;
    try{
        const note = await Note.create({...req.body,userId});
        res.status(200).json({
            success: true,
            data: note
        });
    }catch(err){
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}
const updateNote= async (req, res)=>{
    
     // check the valid mongo id
     if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
               success: false,
               error: 'id is not valid'
        });
    };

    try{
       
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(400).json({
                success: false,
                error: 'not founded'
            })
        }
        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
            );
            res.status(200).json({
                success: true,
                data: updated
            })
    }catch(err){
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
const deleteNote = async (req, res) => {
    // check the valid mongo id
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
               success: false,
               error: 'id is not valid'
        });
    };
    
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            res.status(400).json({
                success: false,
                error: 'not founded'
            });
        }
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: {}
        })
        // const note = await Note.findById(req.params.id);
        // if (!note) {
        //     return res.status(404).json({
        //         success: false,
        //         error: 'Note not found'
        //     });
        // }
        
        // await note.remove();

        // res.status(200).json({
        //     success: true,
        //     data: {}
        // });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};


module.exports = {getNotes,getNote,updateNote,createNote,deleteNote};