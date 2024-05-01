import express from "express";
import routes from "./routes/index.mjs";
import db from "./config/db.mjs";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  Credentials: true,
};

// parse json request
app.use(express.json());

app.use(cors(corsOptions));

app.use("/", routes);

app.listen(3001, () => {
  console.log("Server is running  on port 3001");
});

db.connection.once("open", () => {
  console.log("DB connected successfully!");
});
