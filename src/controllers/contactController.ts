import { Request, Response } from "express";
import { ContactService } from "../services/contactService";

export const identifyContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      res.status(400).json({ message: "Provide email or phoneNumber" });
      return;
    }

    const contact = await ContactService.identifyContact(email, phoneNumber);
    res.status(200).json({ contact });
  } catch (error) {
    console.error("Error in /identify:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Contact
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await ContactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Contact
export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contactId = parseInt(req.params.id, 10);
    const { email, phoneNumber } = req.body;

    const updatedContact = await ContactService.updateContact(contactId, email, phoneNumber);
    if (!updatedContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete Contact 
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contactId = parseInt(req.params.id, 10);
    const success = await ContactService.deleteContact(contactId);
    if (!success) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
