import { Router } from "express";
import { identifyContact, getAllContacts, updateContact, deleteContact } from "../controllers/contactController";

const router = Router();

router.post("/identify", identifyContact); 
router.get("/contacts", getAllContacts);
router.put("/contact/:id", updateContact); 
router.delete("/contact/:id", deleteContact);

export default router;
