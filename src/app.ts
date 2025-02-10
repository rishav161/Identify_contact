import express from "express";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(contactRoutes); 

app.get("/", (req, res) => {
  res.send("Server is running fine");
});



export default app;
