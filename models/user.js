const  sqlite3  =  require('sqlite3').verbose();
const database = new sqlite3.Database("./rpihotspotvpn.db");
const  createUsersTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text)`;

    return  database.run(sqlQuery);
}//used to create user table






const  findUserById  = (id, cb) => { 
    return  database.get(`SELECT * FROM users WHERE id = ?`,[id], (err, row) => {
            cb(err, row)
    });
}
const  existUser  = (cb) => { 
    return  database.get(`select count(*) from users`,(err, row) => {
            cb(err, row)
            console.log(row);
    });
}
const  findUserByEmail  = (email, cb) => {
    return  database.get(`SELECT * FROM users WHERE email = ?`,[email], (err, row) => {
            cb(err, row)
    });
}


const  createUser  = (user, cb) => {
    return  database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)',user, (err) => {
        cb(err)
    });
}

module.exports = {
    findUserById : findUserById,
    findUserByEmail: findUserByEmail,
    createUser: createUser,
    createUsersTable: createUsersTable,
    existUser: existUser,
}       