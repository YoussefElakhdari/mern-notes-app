const jwt = require('jsonwebtoken');

const requireAuth= async (req, res ,next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({
            success: false,
            error: 'you must be logged in'
        })
    };

    const token = authorization.replace('Bearer ','');

    jwt.verify(token , process.env.JWT_SECRET , async (err, payload)=>{
        if(err){
            return res.status(400).json({
                success: false,
                error: 'you must be logged in'
            })
        };

        const {id} = payload;
        req.userId = id;

        next();
    })

}
module.exports = {requireAuth}