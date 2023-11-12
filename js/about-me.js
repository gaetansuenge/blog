const itemsContainer = document.querySelector('#page')
const baseURL = "https://gaetansuenge.github.io/blog/"
const requestURL = baseURL + "markdown/about-me.md"
let request = new XMLHttpRequest()
const converter = new showdown.Converter()

request.open("GET", requestURL)
request.responseType = "text"
request.send()

request.onload = () => {
    markdown = request.response
    html = converter.makeHtml(markdown)
    itemsContainer.innerHTML = html
}
