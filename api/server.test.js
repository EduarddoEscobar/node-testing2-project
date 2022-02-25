const db = require('../data/db-config');
const server = require('./server');
const request = require('supertest');
const Moves = require('./moves/moves-model');
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
        expect(result).toEqual({ id: 1, name: "Charizard" });
    })

    test('insert creates a new pokemon and returns the newly created pokemon', async () => {
        const result = await Pokemon.insert({ name: 'Bidoof' });
        expect(result).toEqual({ id: 4, name: 'Bidoof' });
        const pokemon = await Pokemon.getAll();
        expect(pokemon).toHaveLength(4);
    })

    test('update updates a pokemon and returns the updated pokemon', async () => {
        let dbPokemon = await Pokemon.getById(2);
        expect(dbPokemon.name).toBe('Blastoise');
        const updatedPokemon = await Pokemon.update(2, { name: 'Squirtle' });
        expect(updatedPokemon).toEqual({ id: 2, name: 'Squirtle'});
        dbPokemon = await Pokemon.getById(2);
        expect(dbPokemon.name).toBe('Squirtle');
    })

    test('delete deletes a pokemon and returns the deleted pokemon', async () => {
        let result = await Pokemon.remove(1);
        expect(result).toEqual({ id: 1, name: 'Charizard' });
        let pokemon = await Pokemon.getAll();
        expect(pokemon).toHaveLength(2);
        expect(pokemon[0]).not.toEqual({id: 1, name: 'Charizard'});
    })
})

describe('Pokemon endpoints work', () => {
    test('[GET] / returns all the pokemon', async () => {
        let result = await request(server).get('/api/pokemon');
        expect(result.status).toBe(200);
        expect(result.body).toHaveLength(3);
    })
})