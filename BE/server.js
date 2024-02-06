import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 4000;
app.use(cors());

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tung76721119",
  database: "airbnb",
});
dbConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/load-avt", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      dbConnection.query("SELECT * FROM images", (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
    let thatLink 
    for(let i = 0;i<results.length;i++){
      if(results[i].home_id===1){
        thatLink= results[i].link
      }
    }

    res.send(thatLink);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("An error occurred while fetching data");
  }
});

app.listen(port, () => {
  console.log("Server đã chạy trên port 4000");
});
