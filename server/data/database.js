import mongoose from "mongoose"

export const databaseconnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "Authentication07" })
    .then(() => console.log("Database Connected SuccessFully"))
    .catch((error) => console.log(`Error WHile Database Connection :${error}`))
}
