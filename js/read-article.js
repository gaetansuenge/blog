function loadItem() {
    if (pos != -1) {
        const slug = href.substr(pos + 1)
        slug ? null : window.location.replace(baseURL + "index.html")
        let MDRequestURL = baseURL + "markdown/"
        founded = false
        for (const key in items) {
            if (items[key].slug === slug) {
                article = items[slug]
                MDRequestURL += article.markdownFilename
                founded = true
            }
        }

        if (founded) {
            document.title = article.name
            request.open("GET", MDRequestURL)
            request.responseType = "text"
            request.send()

            request.onload = () => {
                markdown = request.response
                html = converter.makeHtml(markdown)
                itemsContainer.innerHTML = "<p id='description'>" + article.description + "</p> <h1>" + article.name + "</h1><hr>" + html
            }
        } else
            window.location.replace(baseURL + "index.html")

    } else
        window.location.replace(baseURL + "index.html")
}

const itemsContainer = document.querySelector('#page')
const baseURL = "https://gaetansuenge.github.io/blog/"
const requestURL = baseURL + "json/articles.json"


let request = new XMLHttpRequest()
let items = new Array()
let article = null
let markdown = null

const converter = new showdown.Converter()

request.open("GET", requestURL)
request.responseType = "json"
request.send()

request.onload = () => {
    items = request.response
    loadItem()
}

const href = window.location.href
const pos = href.indexOf("?")
