import dbPool from "../config/dbConfig";
async function SaveMessage(message) {
  try {
    await dbPool.query(
      "INSERT INTO messages(message_id,sent_by,message_content,sent_at,received_by,message_status,message_chat_id) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [
        message.message_id

      ]
    );
  } catch (error) {
     console.log(error)
  }
}
