import mongoose from "mongoose";
const main =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB Connected')
    } catch (error) {
        console.log('Error while connecting db',error);
    }
}

export default main;