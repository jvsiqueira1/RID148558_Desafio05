import { Router } from "express"
import bookRouter from "./book.routes.js"

const routers = Router()

routers.use("/livros", bookRouter)

export { routers }