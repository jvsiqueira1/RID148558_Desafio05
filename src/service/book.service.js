import bookRepository from '../repository/book.repository.js'

async function createBookService(book) {
    const createBook = await bookRepository.createBookRepository(book)
    if(!createBook) {
        throw new Error('Error creating book')
    }
    return createBook
}

async function getAllBooksService() {
    const books = await bookRepository.getAllBooksRepository()
    return books
}

async function getBookByIdService(id) {
    const book = await bookRepository.getBookByIdRepository(id)
    if (!book) throw new Error('Book not found')
    return book 
}

async function updateBookService(id, updatedBook) {
    const book = await bookRepository.getBookByIdRepository(id)
    if (!book) throw new Error('Book not found')
    const response = await bookRepository.updateBookRepository(id, updatedBook)
    return response
}

async function deleteBookService(id) {
    const book = await bookRepository.getBookByIdRepository(id)
    if (!book) throw new Error('Book not found')
    const response = await bookRepository.deleteBookRepository(id)
    return response
}

export default {
    createBookService,
    getAllBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService
}