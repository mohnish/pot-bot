import mongooseConnection from 'mongoose';
mongooseConnection.connect(process.env.MONGO_SRV)
export default mongooseConnection;
