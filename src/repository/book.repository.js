import db from '../config/database.js'

function createBookRepository(book) {
    return new Promise((resolve, reject) => {
        const { title, pageCount, isbn, publisher } = book
        db.run(`INSERT INTO books (title, pageCount, isbn, publisher) VALUES (?, ?, ?, ?)`,
            [title, pageCount, isbn, publisher],
            function (error) {
                if (error) {
                    return reject(error)
                }
                resolve({ id: this.lastID, ...book })
            }
        )
    })
}

function getAllBooksRepository() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM books`, [], (error, rows) => {
            if(error) {
                return reject(error)
            } else {
                resolve(rows)
            }
        })
    })
}

function getBookByIdRepository(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM books WHERE id = ?`, [id], (error, row) => {
            if (error) {
                return reject(error)
            } else {
                resolve(row)
            }
        })
    })
}

function updateBookRepository(id, updatedBook) {
    return new Promise((resolve, reject) => {
        const fields = ['title', 'pageCount', 'isbn', 'publisher']
        let query = "UPDATE books SET"
        const values = []

        fields.forEach(field => {
            if (updatedBook[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updatedBook[field])
            }
        })

        if (values.length === 0) {
            return reject(new Error('Nenhum campo válido para atualizar.'))
        }

        query = query.slice(0, -1)
        query += " WHERE id = ?"
        values.push(id)
        db.run(query, values, function (error) {
            if (error) {
                return reject(error)
            } else {
                resolve({ id, ...updatedBook})
            }
        })
    })
}

function deleteBookRepository(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM books WHERE id = ?`, [id], function (error) {
            if (error) {
                return reject(error)
            } else {
                resolve({ message: "Livro deletado com sucesso", id })
            }
        })
    })
}

export default {
    createBookRepository,
    getAllBooksRepository,
    getBookByIdRepository,
    updateBookRepository,
    deleteBookRepository
}