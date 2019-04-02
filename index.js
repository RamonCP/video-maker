const readline = require('readline-sync')

function start() {
    const content = {}

    content.termoPesquisa = retornoTermoPesquisa()
    content.termoPrefixo = retornoTermoPrefixo()

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