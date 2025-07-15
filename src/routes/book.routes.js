import bookController from "../controller/book.controller.js"
import { Router } from "express"

const router = Router()

router.get("/", bookController.getBooksController)
router.post("/", bookController.createBookController)
router.get("/:id", bookController.getBookByIdController)
router.put("/:id", bookController.updateBookController)
router.delete("/:id", bookController.deleteBookController)

export default router