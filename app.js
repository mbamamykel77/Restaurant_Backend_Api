import express from "express"


const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json());







app.listen(port, () => console.log(`server is listening on Port ${port}...`));
