import bookService from '../service/book.service.js'

function traduzirParaIngles(livro) {
    if (!livro) return livro
    return {
        id: livro.id,
        title: livro.titulo,
        pageCount: livro.num_paginas,
        isbn: livro.isbn,
        publisher: livro.editora
    }
}

function traduzirParaPortugues(livro) {
    if (!livro) return livro
    return {
        id: livro.id,
        titulo: livro.title,
        num_paginas: livro.pageCount,
        isbn: livro.isbn,
        editora: livro.publisher
    }
}

function traduzirListaParaPortugues(livros) {
    if (!Array.isArray(livros)) return livros
    return livros.map(traduzirParaPortugues)
}

async function createBookController(req, res) {
    let newBook = traduzirParaIngles(req.body)
    if ('id' in newBook) delete newBook.id

    try {
        const createdBook = await bookService.createBookService(newBook)
        res.status(201).type('text/plain').send('Livro cadastrado com sucesso')
    } catch (e) {
        res.status(400).send({ mensagem: e.message })
    }
}

async function getBooksController(_req, res) {
    try {
        const books = await bookService.getAllBooksService()
        res.send(traduzirListaParaPortugues(books))
    } catch (e) {
        res.status(404).send({ mensagem: e.message })
    }
}

async function getBookByIdController(req, res) {
    const bookId = req.params.id

    try {
        const book = await bookService.getBookByIdService(bookId)
        res.send(traduzirParaPortugues(book))
    } catch (e) {
        res.status(400).send({ mensagem: e.message })
    }
}

async function updateBookController(req, res) {
    let updatedBook = traduzirParaIngles(req.body)
    if ('id' in updatedBook) delete updatedBook.id
    const bookId = req.params.id

    try {
        const response = await bookService.updateBookService(bookId, updatedBook)
        return res.send({
            mensagem: "Livro atualizado com sucesso",
            ...traduzirParaPortugues(response)
        })
    } catch (e) {
        res.status(400).send({ mensagem: e.message })
    }
}

async function deleteBookController(req, res) {
    const bookId = req.params.id

    try {
        const response = await bookService.deleteBookService(bookId)
        if (response && response.message) {
            return res.send({ mensagem: response.message, id: response.id })
        }
        return res.send(response)
    } catch (e) {
        res.status(400).send({ mensagem: e.message })
    }
}

export default {
    createBookController,
    getBooksController,
    getBookByIdController,
    updateBookController,
    deleteBookController
}