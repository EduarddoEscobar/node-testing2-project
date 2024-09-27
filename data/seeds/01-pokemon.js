
exports.seed = function(knex) {
  return knex('pokemon').insert([
    {pokemon_name: 'Charizard'},
    {pokemon_name: 'Blastoise'},
    {pokemon_name: 'Venusaur'}
  ]);
};
