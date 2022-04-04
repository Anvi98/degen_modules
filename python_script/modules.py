from datetime import datetime
import requests
from bs4 import BeautifulSoup
import json

def makeRequest(url):
  req = requests.get('https://www.urbandictionary.com/random.php')
  return  BeautifulSoup(req.text,'lxml')

def scrape(html_content):
  container = html_content.find('section', class_="overflow-hidden")

  # Get the expressions 
  expressions = []
  for urban_exp in container.find_all('h1', class_="flex-1"):
    urban_exp = urban_exp.text
    expressions.append(urban_exp)
  
  
  #  Get the meanings
  meanings = []
  for m in html_content.find_all('div', class_= 'meaning'):
    definintion = m.text
    definintion.split('.')[0]
    meanings.append(m.text)
  
  results = [expressions, meanings]
  return results

def ConstructDict(exp, definitions):
  bank = []
  for i in range(0, len(exp)):
    word = {
      "expression": exp[i],
      "meaning": definitions[i].split('.')[0],
      "added_on": datetime.timestamp(datetime.now())
    }
    bank.append(word)
  
  return bank

def saveRequest(path, data): 
  # Get the previous expressions in the bank
  f = open(path, "r")
  content = f.readlines()
  f.close()

  content = "".join(content)
  result = content.find("]") # indice

  with open(path, "w") as f:
    f.seek(0)
    begining = content[:result]
    ending = content[result:]
    print(data[0])
    if len(content) == 0:
      f.write("[")
      f.write(("\n\t"+json.dumps(data[0]))+",")
      for i in range(1, len(data)):
        f.write(",")
        f.write("\n\t"+json.dumps(data[i]))
      f.write("\n\n]")
    else:
      f.write(begining+",")
      f.write(("\t"+json.dumps(data[0])))
      for i in range(1, len(data)):
        f.write(",")
        f.write("\n\t" + json.dumps(data[i]))

      f.write("\n\n"+ending)
  
  print("New words added.")
