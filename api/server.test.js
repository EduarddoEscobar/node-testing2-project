const db = require('../data/db-config');
const server = require('./server');
const request = require('supertest');
// const Moves = require('./moves/moves-model');
const Pokemon = require('./pokemon/pokemon-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db('pokemon').truncate();
    await db('pokemon').insert({pokemon_name: 'Charizard'});
    await db('pokemon').insert({pokemon_name: 'Blastoise'});
    await db('pokemon').insert({pokemon_name: 'Venusaur'});
})

describe('Pokemon database functions work', () => {
    test('getAll returns all pokemon in the database', async () => {
        const result = await Pokemon.getAll();
        expect(result).toHaveLength(3);
    })

    test('getById returns a single pokemon', async () => {
        const result = await Pokemon.getById(1);
        expect(result).toEqual({ pokemon_id: 1, pokemon_name: "Charizard" });
    })

    test('insert creates a new pokemon and returns the newly created pokemon', async () => {
        const result = await Pokemon.insert({ pokemon_name: 'Bidoof' });
        expect(result).toEqual({ pokemon_id: 4, pokemon_name: 'Bidoof' });
        const pokemon = await Pokemon.getAll();
        expect(pokemon).toHaveLength(4);
    })

    test('update updates a pokemon and returns the updated pokemon', async () => {
        let dbPokemon = await Pokemon.getById(2);
        expect(dbPokemon.pokemon_name).toBe('Blastoise');
        const updatedPokemon = await Pokemon.update(2, { pokemon_name: 'Squirtle' });
        expect(updatedPokemon).toEqual({ pokemon_id: 2, pokemon_name: 'Squirtle'});
        dbPokemon = await Pokemon.getById(2);
        expect(dbPokemon.pokemon_name).toBe('Squirtle');
    })

    test('delete deletes a pokemon and returns the deleted pokemon', async () => {
        let result = await Pokemon.remove(1);
        expect(result).toEqual({ pokemon_id: 1, pokemon_name: 'Charizard' });
        let pokemon = await Pokemon.getAll();
        expect(pokemon).toHaveLength(2);
        expect(pokemon[0]).not.toEqual({id: 1, pokemon_name: 'Charizard'});
    })
})

describe('Pokemon endpoints work', () => {
    test('[GET] / returns all the pokemon', async () => {
        let result = await request(server).get('/api/pokemon');
        expect(result.status).toBe(200);
        expect(result.body).toHaveLength(3);
    })

    test('[GET] /:id returns the correct pokemon', async () => {
        let result = await request(server).get('/api/pokemon/1');
        expect(result.status).toBe(200);
        expect(result.body.pokemon_name).toBe('Charizard');
    })

    test('[POST] / creates a new pokemon', async () => {
        let result = await request(server).post('/api/pokemon').send({ pokemon_name: 'Bidoof'});
        expect(result.status).toBe(201);
        expect(result.body.pokemon_name).toBe('Bidoof');
        let pokemon = await Pokemon.getAll();
        expect(pokemon).toHaveLength(4);
    })

    test('[PUT] /:id updates the pokemon', async () => {
        let result = await request(server).put('/api/pokemon/3').send({ pokemon_name: 'Shiny Bidoof'});
        expect(result.status).toBe(200);
        expect(result.body.pokemon_name).toBe('Shiny Bidoof');
        let pokemon = await Pokemon.getById(3);
        expect(pokemon.pokemon_name).toBe('Shiny Bidoof');
    })

    test('[DELETE] /:id deletes the pokemon and return a the deleted pokemon', async () => {
        let result = await request(server).delete('/api/pokemon/1');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ pokemon_id: 1, pokemon_name: 'Charizard'});
        let pokemon = await Pokemon.getAll();
        expect(pokemon).toHaveLength(2);
    })
})