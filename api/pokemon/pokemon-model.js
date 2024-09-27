const db = require('../../data/db-config');

function getAll(){
    return db('pokemon');
}

function getById(pokemon_id){
    return db('pokemon').where({ pokemon_id }).first();
}

function getBy(filter){
    return db('pokemon').where(filter);
}

async function insert(pokemon){
    let [id] = await db('pokemon').insert(pokemon);
    return getById(id);
}

async function update(pokemon_id, changes){
    await db('pokemon').update(changes).where({ pokemon_id });
    return getById(pokemon_id)
}

async function remove(pokemon_id){
    let result = await db('pokemon').where({ pokemon_id }).first();
    await db('pokemon').where({ pokemon_id }).del();
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