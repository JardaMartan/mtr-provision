/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

/*
const mockData = require("./mockData");

const { status } = mockData;
const data = JSON.stringify({ status }); */

const convert = require("xml-js");
const xml = require("fs").readFileSync(
  path.join(__dirname, "./status.xml"),
  "utf8"
);

const data = convert.xml2json(xml, { compact: true, spaces: 4 });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
