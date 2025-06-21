const db= require('../db')
const bcrypt= require('bcrypt')

const getAllUsers= async ()=>{
    const result= await db.query("SELECT * FROM users ORDER BY username ASC")
    return result.rows
}



const createUser = async ({ username, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const result = await db.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name AS username, email`,
    [username, email, hashed]
  );
  return result.rows[0];
};







const getUserByEmail= async(email)=>{
    const result= await db.query(
        "SELECT * FROM users WHERE email = $1", [email]
    )
     return result.rows[0]
}

const deleteUser= async(id)=>{
    const result= await db.query(
        "DELETE FROM users WHERE id = $1", [id]
    )
}

const updateUser = async ({ id, name, email, password }) => {
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email",
      [name, email, hashedPassword, id]
    );
    return result.rows[0];
  } else {
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email",
      [name, email, id]
    );
    return result.rows[0];
  }
};


const getUserById = async (id) => {
  const result = await db.query("SELECT id, name, email FROM users WHERE id = $1", [id]);
  return result.rows[0];
};


module.exports={
    getAllUsers,
    createUser,
    getUserByEmail,
    updateUser,
    deleteUser,
    getUserById, 

}