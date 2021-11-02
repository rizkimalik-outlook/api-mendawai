import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import knex from '../config/db_connect.js';
import checkAuth from '../middleware/auth.js';
dotenv.config();


async function index(req, res) {
    if(req.method !== 'GET') return res.status(405).end();
    
    checkAuth(req, res);
    const users = await knex('users');
    // const users = await knex.raw('select * from users');

    res.json(users);
    res.end();
}

async function show(req, res) {
    try {
        if(req.method !== 'GET') return res.status(405).end('Method not Allowed');
        // const checkAuth = await auth(res, req);
        const { id } = req.params;

        const getUser = await knex('users').where('id',id);
        
        res.status(200);
        res.json({ 
            status: 200,
            data: getUser 
        });
        res.end();
    } 
    catch (error) {
        console.log(error);
    }
}


async function store(req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');

        const { name, username, email_address, password, user_level, max_concurrent } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        const getId = await knex('users')
            .insert([{
                name,
                username,
                email_address,
                password: passwordHash,
                user_level,
                login: 0,
                max_concurrent,
                created_at: knex.fn.now()
            }]);

        const getData = await knex('users').where({ id: getId }).first();

        res.status(200);
        res.json({
            status: 200,
            data: getData
        });
        res.end();
    }
    catch (error) {
        console.log(error);
    }
}


async function update(req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');

        const { id, name, username, email_address, password, user_level, max_concurrent } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        const getId = await knex('users')
            .where({ id })
            .update({ name, username, email_address, password: passwordHash, user_level, max_concurrent, updated_at: knex.fn.now() })

        const getData = await knex('users').where({ id: id }).first();

        res.status(200);
        res.json({
            'status': 200,
            'data': getData
        });
        res.end();
    }
    catch (error) {
        console.log(error);
    }
}


async function destroy(req, res) {
    try {
        if (req.method !== 'DELETE') return res.status(405).end('Method not Allowed');

        const { id } = req.params;
        const deleteRow = await knex('users').where({ id }).del();

        res.status(200);
        res.json({
            status: 200,
            message: 'Success Delete',
        });
        res.end();
    }
    catch (error) {
        console.log(error);
    }
}

export {
    index,
    show,
    store,
    update,
    destroy
}

