import {sql} from '../config/db.js';


export const getAllRants = async(req, res) => {
    try {
        const rants = await sql`SELECT * FROM rants ORDER BY created_at DESC`;
        res.status(200).json({success: true, data: rants});
    } catch (error) {
        res.status(500).json({success: false, message: "Error fetching rants"});
    }
}

export const createRant = async(req, res) => {
    const {header, content, youtube_url} = req.body

    if (!header || !content || !youtube_url) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    
    try {
        const creation = await sql`
            INSERT INTO rants (header, content, youtube_url) 
            VALUES (${header}, ${content}, ${youtube_url})
            RETURNING *`

        res.status(201).json({success: true, data: creation});
    } catch (error) {
        res.status(500).json({success: false, message: "Error creating rant"});
    }
}

export const updateRant = async(req, res) => {
    const {rant_id} = req.params;
    const {header, content, youtube_url} = req.body;

    try {
        await sql`
            UPDATE rants 
            SET header = ${header}, content = ${content}, youtube_url = ${youtube_url}
            WHERE rant_id = ${rant_id}
            RETURNING *`;

        res.status(200).json({success: true, message: "Rant updated successfully"});

    } catch (error) {
        res.status(500).json({success: false, message: "Error updating rant"});
        
    }

}

export const deleteRant = async(req, res) => {
    const {rant_id} = req.params;

    try {
        await sql`
            DELETE FROM rants 
            WHERE rant_id = ${rant_id}
            RETURNING *`;

        res.status(200).json({success: true, message: "Rant deleted successfully"});

    } catch (error) {
        res.status(500).json({success: false, message: "Error deleting rant"});
    }


}



