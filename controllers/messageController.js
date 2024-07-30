import pool from "../config/dbConfig";

const fetchUndeliveredMessages = async (req, res) => {
  try {
    const user = req.user;
    const messages = await pool.query(
      "SELECT * FROM messages WHERE received_by=$1 AND message_status=$2",
      [user, 1]
    );

    if (messages.rows.length > 0) {
      await pool.query(
        "UPDATE messages SET message_status=$1 WHERE received_by=$2 AND message_status=$3",
        [2, user, 1]
      );
    }

    res.status(200).json(messages.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const saveMessageToServer = async (req, res) => {
  try {
  } catch (error) {}
};

export { fetchUndeliveredMessages, saveMessageToServer };
