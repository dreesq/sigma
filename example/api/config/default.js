module.exports = () => {
  return {
    debug: true,
    server: {
      port: 3001,
      parsers: true,
      cors: {
        origin: '*',
        credentials: true
      }
    },
    plugins: {
      db: {
        driver: 'mongodb',
        server: 'mongodb://127.0.0.1/database'
      }
    }
  }
}
