import fetch from 'node-fetch'; //  node-fetch => npm install node-fetch
import * as fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import arrayShuffle from 'array-shuffle';  // => npm install array-shuffle


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export function save_word(file_name, word){
  /*
    file_name: -str- the backup file path,
    word: -str- the word picked from the dictionary.
    return : -str- the word saved
    ---
    It saves the word into the backup file for later checking
  */

  const backup = word+"\n";
  fs.appendFileSync(file_name, backup, err => {
    if(err)
      console.log(err);
    else {
      console.log("good to go. word saved.");
      console.log(fs.readFileSync(file_name, "utf8"));
    }
  });
  return word
}

export function used_word_checker(current_word, file){
  /*
    current_word: -str-  the word picked from the common_words,
    file: -str- the path of the backup file of words used.
    return: bool
    --- 
    It checks if the word has been already used from a precedent play,
    and return a boolean true or false.
  */

  const val = fs.readFileSync(__dirname + "/" + file, {encoding: 'utf8'}, (error, data) => {
    if(error){
      throw error;
    }
  });
  const used_words_list = val.toString().split('\n');
  console.log(typeof(used_words_list));
  return used_words_list.includes(current_word);
}

export function word_picker(){
  /*
    Load dictionary common_words.txt
    shuffle the list
    pick one word
    return the selected word  from Dictionary as a string
  */
  let shuffled = [];

  const val = fs.readFileSync(__dirname + "/common_words.txt", {encoding: 'utf8'}, (error, data) => {
    if(error){
      throw error;
    }
  });
  const full_words = val.toString().split('\n');
  shuffled = arrayShuffle(full_words);

  const word = shuffled[1];

  return word;

}

export async function get_word(req, base_url){
  /*
    req: -str- the word to look for 
    base_url: -str- the base url of the api
    return: JSON file 
    ---
    It takes these two arguments and makes GET call request to the api 
    to returns a JSON which contains the word and a list of its definitions.
  */

  let defs = [];
  let word_send = {};

  return await fetch(`${base_url}${req}`)
  .then(res => res.json())
  .then(res => {  
    res[0].meanings.forEach( first => {
      first.definitions.forEach(second => {
        defs.push(second.definition);
      });
    });

    word_send = {
      "word": req,
      "definitions": defs
    };
    return JSON.stringify(word_send);
  })
  .catch(err => {
    return(err);
  })
}