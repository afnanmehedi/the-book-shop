const bookContainer = document.getElementById('book-container')
const bookDetails = document.getElementById('book-details')
document.getElementById('search-btn').addEventListener('click', () => {
    bookContainer.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center  align-items-center ">
    <div class="spinner-border text-success" role="status">
        <span class ="visually-hidden">Loading...</span>
    </div>
    </div>
    const searchText = document.getElementById('search-text')
    if (searchText.value == '') {
        bookContainer.innerHTML = ("Please search with a valid book name")
    }
    else {
        const api = `https://openlibrary.org/search.json?q=${searchText.value}`
        searchText.value = ''
        fetch(api)
            .then(res => res.json())
            .then(data => showData(data.docs))
    }
})
const showData = (books) => {
    const bookArr = books.filter(book => book.cover_i !== undefined && book.author_name !== undefined && book.publisher !== undefined && book.title !== undefined && book.first_publish_year !== undefined)
    if (bookArr.length === 0) {
        bookDetails.innerHTML = ""
        bookContainer.innerHTML = ''
        bookContainer.innerHTML = 'No Result Found'
        return;
    }
    else {
        const newParagraph = document.createElement('p')
        newParagraph.innerHTML = ""
        newParagraph.innerHTML = `You got ${bookArr.length} books`
        bookDetails.innerHTML = ""
        bookDetails.appendChild(newParagraph)
    }
    bookContainer.innerHTML = ''
    bookArr.forEach(book => {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
            <div class="card my-3" style="width: 18rem; height:420px">
                <img class="card-img-top img-fluid"  style="width:300px; height:200px" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" >
            <div class="card-body overflow-hidden">
                <h5 class="card-title">Book Title: ${book.title}</h5>
                <p class="card-subtitle mb-2">Book Author Name : ${book.author_name[0]}</p>
                <p class="card-text">Book Publisher : ${book.publisher[0]}</p>
                <p class="card-text"> First Publish Year : ${book.first_publish_year} </p>
            </div>
            </div>
            `
        bookContainer.appendChild(newDiv)
    })