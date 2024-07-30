const messageTable = `CREATE TABLE IF NOT EXISTS messages(
message_id UUID PRIMARY KEY,
sent_by UUID NOT NULL,
received_by UUID NOT NULL,
sent_at TIMESTAMP NOT NULL,
message_status INT NOT NULL,
message_content TEXT NOT NULL,
message_receiver_username TEXT NOT NULL,
sender_username TEXT NOT NULL
);
`;

export default messageTable;
