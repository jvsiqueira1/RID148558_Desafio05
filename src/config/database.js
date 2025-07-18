import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('biblioteca_db.sqlite', (error) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ', error.message)
    } else {
        console.log('Conectado com sucessso ao banco de dados SQLite.')
    }
})

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      pageCount INTEGER NOT NULL,
      isbn TEXT NOT NULL UNIQUE,
      publisher TEXT NOT NULL
    )
  `);
});

export default db