import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const generateToken = async (user) => {
    try{
    return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn:'1h'})
    }
    catch (error){
        throw new Error('Token generation failed');
    }
};

export default generateToken;