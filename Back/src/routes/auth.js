import SECRET from "../../secret.js";
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(401).send({message: 'Acesso negado.'});
    }
    
    try {
        jwt.verify(token, SECRET);

        if(next)
            next();
    } catch (error) {
        res.status(400).send({message: 'Token inválido.'});
    }
}

const generateToken = (id) => {
    return jwt.sign({
        id: id
    },
       SECRET,
       {
            expiresIn: '1d'
       }
    );
}

export { checkToken, generateToken };