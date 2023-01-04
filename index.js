const express = require("express");
const fs = require("fs");
const app = express();

app.post("/upload", function (req, res) {
  try {
    const writeStream = fs.createWriteStream("./uploads/image.jpg");
    req.pipe(writeStream);
    writeStream.on("finish", function () {
      res.send("Image uploaded successfully");
    });
  } catch (error) {
    res.send(error);
  }
});

app.get("/download", function (req, res) {
  try {
    const readStream = fs.createReadStream("./uploads/image.jpg");
    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", 'attachment; filename="image.jpg"');
    readStream.pipe(res);
  } catch (error) {
    res.send(error);
  }
});

app.get("/view", function (req, res) {
  try {
    const readStream = fs.createReadStream("./uploads/image.jpg");
    res.set("Content-Type", "image/jpeg");
    readStream.pipe(res);
  } catch (error) {
    res.send(error);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
