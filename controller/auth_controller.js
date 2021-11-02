import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knex from '../config/db_connect.js';
dotenv.config();

async function login(req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const { username, password } = req.body;

        //?check username
        const user = await knex('users').where({ username }).first();
        if (!user) return res.status(401).json({ value: 'username', message: 'Username not found' });

        //?check password
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(401).json({ value: 'password', message: 'Password not match' });

        //?login update
        await knex('users').update({login:1}).where({username});

        //?generate token
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        
        //?send token
        user.token = token;

        // response(res, data, 'User login success');
        res.json(user);
        res.end();
    }
    catch (error) {
        console.log(error);
    }
}

async function logout(req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const { username } = req.body;
        
        //?login update
        await knex('users').update({login:0}).where({username});

        res.json({status: 'success'});
        res.end();
    }
    catch (error) {
        console.log(error);
    }
}


export { login, logout }

