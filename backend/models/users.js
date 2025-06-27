const db= require('../db')
const bcrypt= require('bcrypt')

const getAllUsers= async ()=>{
    const result= await db.query("SELECT id, nombre AS username, email FROM users ORDER BY nombre ASC")
    return result.rows
}



const createUser = async ({ username, email, password,rol }) => {
   const hashed = await bcrypt.hash(password, 10);
  const result = await db.query(
    `INSERT INTO users (nombre, email, password, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nombre AS username, email, rol`,
    [username, email, hashed, rol]
  );
  return result.rows[0];
};







const getUserByEmail= async(email)=>{
    const result= await db.query(
        "SELECT * FROM users WHERE email = $1", [email]
    )
     return result.rows[0]
}

const deleteUser= async({id})=>{
    const result= await db.query(
        "DELETE FROM users WHERE id = $1", [id]
    )
    return result.rowCount > 0
}

const updateUser = async ({ id, username, email, password }) => {
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "UPDATE users SET nombre = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, nombre AS username, email",
      [username, email, hashedPassword, id]
    );
    return result.rows[0];
  } else {
    const result = await db.query(
      "UPDATE users SET nombre = $1, email = $2 WHERE id = $3 RETURNING id, nombre AS username, email",
      [username, email, id]
    );
    return result.rows[0];
  }
};


const getUserById = async (id) => {
  const result = await db.query("SELECT id, nombre AS username, email FROM users WHERE id = $1", [id]);
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