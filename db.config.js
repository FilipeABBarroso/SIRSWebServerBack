module.exports = {
    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "Password123$%&",
    DB: "webdb",
    dialect: "mysql",
    pool: {
        //maximum number of connections permissible in a pool
        max: 10,
        //minimum number of connections permissible in a pool
        min: 0,
        //maximum time, in terms of milliseconds, that a connection can be held idly before being released
        acquire: 30000,
        //maximum time, in terms of milliseconds, that the pool seeks to make the connection before an error message pops up on screen
        idle: 10000
    }
};