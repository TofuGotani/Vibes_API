import fs from "fs";
import request from "request";

fs.readFile("./img/test.png", (err, data) => {
  const options = {
    uri: "http://localhost:3000/api/v1/ocr",
    headers: {
      "Content-type": "application/json",
    },
    json: { data: data.toString("base64") },
  };
  console.log(options);
  request.post(options, (err, res, body) => {
    console.log(res.body);
    // console.log(err, res, body);
    // console.log(Buffer.from(res.body["data"]));
    // fs.writeFile("./img/result.jpg", Buffer.from(res.body["data"]), () => {});
  });
});
