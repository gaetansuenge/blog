function createItem(item) {
    const div = document.createElement('div')
    div.classList.add('item')

    const h1 = document.createElement('h1')
    h1.innerText = item.name

    const p = document.createElement('p')
    p.innerText = item.description

    const p2 = document.createElement('p')
    p2.classList.add('badge')
    p2.classList.add('text-bg-success')
    p2.innerText = item.date

    const a = document.createElement('a')
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-outline-success')
    a.href = baseURL + "read.html?" + item.slug
    button.innerText = item.name
    a.appendChild(button)

    div.appendChild(h1)
    div.appendChild(p2)
    div.appendChild(p)
    div.appendChild(a)
    div.appendChild(document.createElement('hr'))
    itemsContainer.appendChild(div)
}

function loadItem() {
    itemsContainer.innerHTML = ""
    for (const key in items) {
        let name = items[key].name
        name = name.toLowerCase()
        if (fetchWords != null) {
            name.includes(fetchWords.toLowerCase()) ? createItem(items[key]) : null
        } else
            createItem(items[key])
    }
}

const itemsContainer = document.querySelector('#page')
const baseURL = "https://gaetansuenge.github.io/blog/"
const requestURL = baseURL + "json/articles.json"

let request = new XMLHttpRequest()
let items = new Array()
let fetchWords = null
const searchInput = document.querySelector("#query")

request.open("GET", requestURL)
request.responseType = "json"
request.send()

request.onload = () => {
    items = request.response
    loadItem()
}

searchInput.addEventListener('input', () => {
    fetchWords = searchInput.value
    loadItem()
})
