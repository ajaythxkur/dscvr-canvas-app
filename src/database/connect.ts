import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env";

export const connectDB = () => {
    mongoose.connect(MONGO_URI)
        .then(()=>console.log("[mongo]: Connection established"))
        .catch((_error)=>console.log(`[mongo]: Connection failed`));
}
