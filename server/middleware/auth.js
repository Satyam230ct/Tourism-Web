import jwt from 'jsonwebtoken';

// wants to like a post
// click the like button => auth middleware(next)=> like Controller...

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;
        
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData ? decodedData.id : null;
        }
        else if(token){
            decodedData = jwt.decode(token);
            req.userId = decodedData ? decodedData.sub : null;
        }
        
        next();

    } catch (error) {   
        console.log(error);
    }
}

export default auth;