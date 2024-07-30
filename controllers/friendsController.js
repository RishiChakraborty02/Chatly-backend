import pool from "../config/dbConfig.js";
const findFriend = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await pool.query(
      "SELECT username, user_id FROM auth WHERE username ILIKE $1",
      [`%${username}%`]
    );

    res.status(200).json(user.rows);
  } catch (error) {
    console.log(error)
    res.status(500).send("Server Error");
  }
};

export { findFriend };
