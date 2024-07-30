import dbPool from "../config/dbConfig";
async function deleteMessage(message_id) {
  try {
    await dbPool.query("DELETE FROM messages WHERE message_id=$1", [
      message_id,
    ]);
  } catch (error) {
    console.log(error);
  }
}
