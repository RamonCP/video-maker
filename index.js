const readline = require('readline-sync')
const robots = {
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js')
}

async function start() {
    const content = {}

    content.termoPesquisa = retornoTermoPesquisa()
    content.termoPrefixo = retornoTermoPrefixo()
    
    await robots.text(content)

    function retornoTermoPesquisa () {
        return readline.question('Digite um termo de pesquisa: ')
    }

    function retornoTermoPrefixo() {
        const prefixo = ['Who is', 'What is', 'The history of']
        const prefixSelectedIndex = readline.keyInSelect(prefixo, 'Choose a option')
        const prefixSelectedText = prefixo[prefixSelectedIndex]

        return prefixSelectedText
    }

    console.log(content)
}

start()