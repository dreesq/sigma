module.exports = () => {
    return {
        debug: true,
        server: {
            port: 3000,
            parsers: true,
            cors: {
                origin: '*',
                credentials: true
            }
        },
        plugins: {
            db: {
                server: 'mongodb://127.0.0.1/database'
            }
        }
    }
};