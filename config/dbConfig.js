import pg from "pg";
import authModel from "../models/authModel.js";
import messageModel from "../models/messageModel.js";

// const conObj = {
//   host: "localhost",
//   port: 5432,
//   database: "rishichat",
// };
const pool = new pg.Pool({
  connectionString: "postgresql://chatapp_q84e_user:lNkpEa2ClMaEZa7NxtyPGKObsXel7CBw@dpg-cqk84tjqf0us73c4a8lg-a.oregon-postgres.render.com/chatapp_q84e",
  ssl: {
    rejectUnauthorized: false,
  },
});

const startdb = async () => {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await pool.query(authModel);

    await pool.query(messageModel);

    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

export { startdb };
export default pool;
