import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {sql} from '../config/db.js';

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;

        if (user.length === 0) {
            return res.status(401).send("Invalid credentials");
        }

        const validPassword = await bcrypt.compare(password, user[0].password_hash);
        
        if (!validPassword) {
            return res.status(401).send("Invalid credentials");
        }

       
        const token = jwt.sign(
            { user: { id: user[0].user_id } }, 
            process.env.jwtSecret, 
            { expiresIn: "1h" }
        );
        
        return res.json({token}); 

    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).send("Server error");
    }
}

export const register = async (req, res) => {
    const {username, password, email} = req.body;

    try {
        
        const user = await sql`SELECT * FROM users WHERE username = ${username}`;

        if (user.length !== 0) {
            return res.status(401).send("User already exists");
        }

        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        
        const newUser = await sql`
            INSERT INTO users (username, password_hash, email) 
            VALUES (${username}, ${bcryptPassword}, ${email}) 
            RETURNING *`;

       const token = jwt.sign(
            { user: { id: newUser[0].user_id } }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({token});
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({success: false, message: "Error creating user"});
    }
}