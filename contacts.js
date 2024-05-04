import fs from 'fs/promises';
import path from 'path';
import {nanoid} from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json');
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  }
  catch (err) {
    console.log(err.message);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find(contact => contact.id === contactId);
    return foundContact || null;
  }
  catch (err) {
    console.log(err.message);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);

    if (idx === -1) {
      return null;
    }

    const [deletedContact] = contacts.splice(idx, 1);
    await updateContacts(contacts);

    return deletedContact;
  }
  catch (err) {
    console.log(err.message);
  }
}

export async function addContact(id, name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
  }
  catch (err) {
    console.log(err.message);
  }
}
