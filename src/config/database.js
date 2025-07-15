import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('biblioteca_db.sqlite', (error) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ', error.message)
    } else {
        console.log('Conectado com sucessso ao banco de dados SQLite.')
    }
})

export default db