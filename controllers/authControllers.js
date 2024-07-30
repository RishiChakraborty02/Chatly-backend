import pool from "../config/dbConfig.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM auth WHERE email = $1 AND password=$2",
      [email, password]
    );
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credentials");
    }
    const token = jwt.sign(
      { user_id: user.rows[0].user_id },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token,
      username: user.rows[0].username,
      user_id: user.rows[0].user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await pool.query("SELECT * FROM auth WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exists");
    }
    const newUser = await pool.query(
      "INSERT INTO auth (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    const token = jwt.sign(
      { user_id: newUser.rows[0].user_id },
      process.env.JWT_SECRET
    );

    console.log(token);
    res.status(200).json({
      token,
      username: newUser.rows[0].username,
      user_id: newUser.rows[0].user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export { login, register };
