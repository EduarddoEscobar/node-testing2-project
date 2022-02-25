const db = require('../../data/db-config');

function getAll(){
    return db('pokemon');
}

function getById(id){
    return db('pokemon').where({ id }).first();
}

function getBy(filter){
    return db('pokemon').where(filter);
}

async function insert(pokemon){
    let [id] = await db('pokemon').insert(pokemon);
    return getById(id);
}

async function update(id, changes){
    await db('pokemon').update(changes).where({ id });
    return getById(id)
}

async function remove(id){
    let result = await db('pokemon').where({ id }).first();
    await db('pokemon').where({ id }).del();
    return result;
}

module.exports = {
    getAll,
    getById,
    getBy,
    insert,
    update,
    remove
}