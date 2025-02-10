import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ContactService {

  static async identifyContact(email?: string, phoneNumber?: string) {
    const contacts = await prisma.contact.findMany({
      where: { OR: [{ email }, { phoneNumber }] },
      orderBy: { createdAt: "asc" },
    });

    if (contacts.length === 0) {
      const newContact = await prisma.contact.create({
        data: { email, phoneNumber, linkPrecedence: "primary" },
      });
      return { primaryContactId: newContact.id, emails: [email], phoneNumbers: [phoneNumber], secondaryContactIds: [] };
    }

    const primaryContact = contacts.find((c) => !c.linkedId) || contacts[0];
    const secondaryContacts = contacts.filter((c) => c.linkedId === primaryContact.id);

    return {
      primaryContactId: primaryContact.id,
      emails: [primaryContact.email, ...secondaryContacts.map((c) => c.email)].filter(Boolean),
      phoneNumbers: [primaryContact.phoneNumber, ...secondaryContacts.map((c) => c.phoneNumber)].filter(Boolean),
      secondaryContactIds: secondaryContacts.map((c) => c.id),
    };
  }

  
  static async getAllContacts() {
    return prisma.contact.findMany({ where: { deletedAt: null } });
  }

  
  static async updateContact(id: number, email?: string, phoneNumber?: string) {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) return null;

    return prisma.contact.update({
      where: { id },
      data: { email, phoneNumber, updatedAt: new Date() },
    });
  }

 
  static async deleteContact(id: number) {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) return false;

    await prisma.contact.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return true;
  }
}
