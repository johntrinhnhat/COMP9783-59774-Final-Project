import { createItem, readItems, updateItem, deleteItem } from "./lib/Crud.js";
import cors from "cors";
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';



const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.get("/read", (req, res) => {
  res.send(readItems());
});

app.get("/read/:id", (req, res) => {
  const { id } = req.params;
  res.send(readItems(id));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  res.send(updateItem(id, req.body));
});

app.post("/create", (req, res) => {
  res.send(createItem(req.body));
});


app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  res.send(deleteItem(id));
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});