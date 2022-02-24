const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  }
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      filename: './data/pokemon.db3'
    }
  },

  testing: {
    ...sharedConfig,
    connection: {
      filename: './data/testing.db3'
    }
  }

};
