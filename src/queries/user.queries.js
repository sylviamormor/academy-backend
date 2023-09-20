const addUser = `
 INSERT INTO users (
    email,
    username,
    password
 )
 VALUES ($1, $2, $3) RETURNING id, username, email, created_at
`;

const findUserByEmail = `
 SELECT id, email, password FROM users WHERE email=$1
`

const fetchAllUsers = `SELECT username, email FROM users`

const fetchUserById = `SELECT id, username, email FROM users WHERE id=$1`

module.exports ={
    addUser,
    findUserByEmail,
    fetchAllUsers,
    fetchUserById
}

