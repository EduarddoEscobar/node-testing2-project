
exports.seed = function(knex) {
  return knex('pokemon_moves').insert([
    {pokemon_id: 1, move_id: 2},
    {pokemon_id: 2, move_id: 1},
    {pokemon_id: 3, move_id: 3}
  ]);
};
