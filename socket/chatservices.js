import { io } from "../app.js";
import pool from "../config/dbConfig.js";

const activeUsers = {};

async function chatServer() {
  console.log("Chat server ignited");
  io.on("connection", (socket) => {
    activeUsers[socket.user] = socket.id;
    console.log(activeUsers);

    socket.on("disconnect", () => {
      delete activeUsers[socket.user];
    });

    socket.on("message", async (data) => {
      const recipientSocketId = activeUsers[data.received_by];
      console.log(data, "untouched_data");

      const receiver_username = data.message_receiver_username;
      const sender_username = data.sender_username;
      data.message_receiver_username = sender_username;
      data.sender_username = receiver_username;

      console.log(data, "touched_data");

      if (recipientSocketId) {
        // Swap the sender and receiver usernames

        // Emit the modified data to the recipient
        io.to(recipientSocketId).emit("message", data);
      } else {
        try {
          await pool.query(
            "INSERT INTO messages (message_id, sent_by, received_by,message_status,message_content,sent_at,message_receiver_username,sender_username) VALUES ($1, $2, $3, $4, $5, $6,$7,$8)",
            [
              data.message_id,
              data.sent_by,
              data.received_by,
              1,
              data.message_content,
              data.sent_at,
              data.message_receiver_username,
              data.sender_username,
            ]
          );
        } catch (error) {
          console.error("Error saving message to database:", error);
        }
      }
    });

    socket.on("receive_undelivered", async () => {
      try {
        const undeliveredmsgs = await pool.query(
          "SELECT  * from messages where received_by = $1 and message_status = $2",
          [socket.user, 1]
        );

        console.log(undeliveredmsgs.rows);

        socket.emit("undelivered", undeliveredmsgs.rows);
        await pool.query("DELETE FROM messages WHERE received_by=$1", [
          socket.user,
        ]);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

export { chatServer };
