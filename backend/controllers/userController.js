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
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );
        
        return res.json({token}); 

    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).send("Server error");
    }
}

export const register = async (req, res) => {
    console.log("Register route hit with body:", req.body); 
    
    const {username, password, email} = req.body;

    try {
        const user = await sql`SELECT * FROM users WHERE username = ${username}`;

        if (user.length !== 0) {
            return res.status(401).json({message: "User already exists"});
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
        console.error('Registration error:', error);
        res.status(500).json({success: false, message: "Error creating user: " + error.message});
    }
}

export const verify = async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error('Verification error:', error.message);
        res.status(500).send("Server error");
    }
}

export const getDashboard = async (req, res) => {
    try {
        
        const user = await sql`
            SELECT username, email 
            FROM users 
            WHERE user_id = ${req.user.id}
        `;
        
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json({
            success: true,
            user: user[0]
        });
    } catch (error) {
        console.error('Dashboard error:', error.message);
        res.status(500).send("Server error");
    }
};