import fetch from "node-fetch";
import * as fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log('directory-name 👉️', __dirname);
// console.log(path.join(__dirname, '/dist', 'test.txt'));


let data = "\nMy little bro";

fs.appendFileSync('cool.txt', data, err => {
  if(err)
    console.log(err);
  else {
    console.log("good to go. File saved.");
    console.log(fs.readFileSync("cool.txt", "utf8"));
  }
});