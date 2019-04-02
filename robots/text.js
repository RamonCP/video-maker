const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey

function robot(content) {
    conteudoWikipedia(content)

    async function conteudoWikipedia(content) {
        const algorithmiaKey = algorithmia(algorithmiaApiKey)
        const wikiAlgorithmia = algorithmiaKey.algo('web/WikipediaParser/0.1.2')
        const wikiResponde = await wikiAlgorithmia.pipe(content.termoPesquisa)
        const wikiContent = wikiResponde.get()
        console.log(wikiContent)
    }
}

module.exports = robot