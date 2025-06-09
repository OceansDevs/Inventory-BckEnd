const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/inventRoutes");
const connectDB = require("./db/inventDB");

//middleware
app.use(express.json());

//routes
app.use("/api/inventory", routes);
app.use("/api/inventory", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Inventory API",
    routes: [
      { method: "GET", path: "/api/inventories" },
      { method: "GET", path: "/api/inventories/:id" },
      { method: "POST", path: "/api/inventories" },
      { method: "PUT", path: "/api/inventories/:id" },
      { method: "DELETE", path: "/api/inventories/:id" },
    ],
  });
});

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
});
