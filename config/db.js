import mongooseConnection from 'mongoose';
mongooseConnection.connect(process.env.DB_CONN_URL)
export default mongooseConnection;
