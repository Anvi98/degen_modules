import modules

## Get the request page and Initialize Bsoup
url = 'https://www.urbandictionary.com/random.php'
global_content = modules.makeRequest(url)

## Scrape
container = modules.scrape(global_content)

# Get the expressions 
expressions, meanings = container[0], container[1]

# print(expressions)

# Construct object for json

bank = modules.ConstructDict(expressions, meanings)

# Save the dictionnary in JSON file
modules.saveRequest("bank.json", bank)

