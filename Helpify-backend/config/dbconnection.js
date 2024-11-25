import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb+srv://harshitkukreja07:Bhola070331@cluster0.oglbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Db Connection success")
} catch (error) {
    console.error("DB connection failed with error: ", error)
}