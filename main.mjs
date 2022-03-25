import * as degen from "./modules.mjs";


let used_word = true;
let current_word ='';
const used_words_file = 'backup.txt';
const base_url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';


while(used_word){
  current_word = degen.word_picker();
  used_word = degen.used_word_checker(current_word, used_words_file);
}

let res = await degen.get_word(current_word, base_url).then(val => val);

degen.save_word(used_words_file ,current_word);

console.log(res);
// console.log(res);

