import fs from 'fs/promises';
import path from 'path';
import {nanoid} from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json');
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const contacts = await fs.readFile(contactsPath);
  console.log(contacts)
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id.
  // Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const foundContact = contacts.find(contact => contact.id = contactId);
  return foundContact || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту.
  // Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);

  return deletedContact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
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

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
