
exports.seed = function(knex) {
  return knex('moves').insert([
    {move_name: 'Hydro Pump', move_type: 'Water'},
    {move_name: 'Flamethrower', move_type: 'Fire'},
    {move_name: 'Giga Drain', move_type: 'Grass'}
  ]);
};
