import mongooseConnection from 'mongoose';
import { config } from 'dotenv';

config();

mongooseConnection.connect(process.env.DB_CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true });
export default mongooseConnection;
