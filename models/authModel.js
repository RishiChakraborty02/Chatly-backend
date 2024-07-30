const authTable = `CREATE TABLE IF NOT EXISTS auth (
user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);
`;


export default authTable;