import mongoose from 'mongoose';

const conectaDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
} 

export default conectaDB;