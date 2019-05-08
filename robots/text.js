const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
    await conteudoWikipedia(content)
    sanitizeContent(content)
    breakContentInSenteces(content)

    async function conteudoWikipedia(content) {
        const algorithmiaKey = algorithmia(algorithmiaApiKey)
        const wikiAlgorithmia = algorithmiaKey.algo('web/WikipediaParser/0.1.2')
        const wikiResponde = await wikiAlgorithmia.pipe(content.termoPesquisa)
        const wikiContent = wikiResponde.get()

        content.sourceContentOriginal = wikiContent.content
    }

    function sanitizeContent(content){
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withouDateInParentheses = removeDateInParentheses(withoutBlankLinesAndMarkdown)

        content.sourceContentSanitized = withouDateInParentheses

        function removeBlankLinesAndMarkdown(text){
            const allLines = text.split('\n')
            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith("==")) return false
                return true
            })
            return withoutBlankLinesAndMarkdown.join(' ')
        }

        function removeDateInParentheses(text){
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }
    }

    function breakContentInSenteces(content){
        content.sentences = []

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        })
    }
}

module.exports = robot