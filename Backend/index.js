import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // frontend application's origin
  },
});
app.use(cors());
app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("A user Connected");
});

mongoose.connect(
  "mongodb+srv://krishnaprasadawala:9975151297@foodordering.aronpcy.mongodb.net/"
);

const orderSchema = new mongoose.Schema({
  tableno: Number,
  orders: Array,
  total: Number,
});

const Order = new mongoose.model("Order", orderSchema);

const allOrdersSchema = new mongoose.Schema({
  date: String,
  tableno: Number,
  orders: Array,
  total: Number,
});

const AllOrders = new mongoose.model("AllOrders", allOrdersSchema);

app.get("/", (req, res) => {
  res.send("Backend Connected");
});

app.post("/admin", async (req, res) => {
  const { tableno, orders, total } = req.body;

  const newOrder = new Order({
    tableno: Number(tableno),
    orders: orders,
    total: Number(total),
  });

  await newOrder.save();

  io.emit("dataUpdated");
  io.emit("newOrder");

  res.status(200).send("Order created successfully");
});

app.post("/allorders", async (req, res) => {
  const { tableno, orders, total } = req.body;

  const newOrder = new AllOrders({
    date: new Date(),
    tableno: Number(tableno),
    orders: orders,
    total: total,
  });

  await newOrder.save();

  io.emit("dataUpdated")

  res.status(200).send("Order Served Successfully!");
});

app.get("/admin", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
});

app.delete("/admin/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send("Order not found");
    }
    io.emit("dataUpdated");
    res.status(200).send("Order deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting order");
  }
});

app.get("/servedorders", async (req, res) => {
  const servedOrders = await AllOrders.find({});
  res.status(200).send(servedOrders);
});

server.listen(port, "0.0.0.0" , () =>
  console.log(`Listening to port on http://localhost:${port}`)
);