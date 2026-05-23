import express from 'express'

const router =express.Router()
import { addContact, getContacts, updateContact, deleteContact,} from '../controllers/ContactController.js'
import { authMiddleware } from '../middleware/authMiddleWare.js'

router.post("/", authMiddleware, addContact)
router.get("/", authMiddleware, getContacts)
router.put("/:id", authMiddleware, updateContact)
router.delete("/:id", authMiddleware, deleteContact)

export default router