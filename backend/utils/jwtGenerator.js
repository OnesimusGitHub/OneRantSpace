import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function jwtGenerator() {
 
    const payload = {
        user: user_id
    }
  
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1h'});
}

module.exports = jwtGenerator; 

export default jwtGenerator