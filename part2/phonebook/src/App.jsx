
import data from "./data"
import { useEffect, useMemo, useState } from "react";
import tippy, {animateFill} from 'tippy.js';
import * as helper from "./functions";
import Header from "./components/Header";
import Add from "./components/Add";
import ContactList from "./components/ContactList";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import Button from "./components/blocks/Button";
import Decide from "./components/Decide";

function App() {

  // const [contacts , setContacts] = useState(data);
  const [contacts , setContacts] = useState(() => {
    // Load contacts from localStorage, or use an empty array as a fallback
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });

  // Save contacts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [addContact , setAddContact] = useState(false);
  const [search , setSearch] = useState('');
  const [editContact, setEditContact] = useState({
    name : '',
    number : '',
    id : false
  });
  const [deleteContact , setDeleteContact] = useState(false);
  const [newContact , setNewContact] = useState({
    name : '',
    number : ''
  })

  const [clearPhonebook , setClearPhonebook] = useState(false);

  const [error , setError] = useState({});


  const toggleAddContact = () => {
    setAddContact(!addContact)
    resetNewContact();
    clearErrors();
  }

  useEffect(()=> {
    tippy('[data-tippy-content]:not(.tippy-init)',{
      arrow: false,
      animateFill: true,
      hideOnClick: false,
      inertia: true,
      theme: 'light-border',
      plugins: [animateFill],
      onCreate(instance){
        instance.reference.classList.add('tippy-init');
      },
    });
  },[contacts])


  const resetNewContact = () => setNewContact({
    name : '',
    number : ''
  })

  const validateFields = (fields) => {
    let isValid = true;
    clearErrors();
    Object.entries(fields).forEach(([field, value]) => {
      if (value.trim() === '') {
        createError(field, `${field} field cannot be empty`);
        isValid = false;
      }
    });
    return isValid;
  };
  

  const addNewContact = (event) => {
    event.preventDefault();
    clearErrors();

    if (!validateFields(newContact)) return;

  
    // Check for duplicate contacts (by name or number)
    const duplicatesName = contacts.some(contact => 
      contact.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );
    const duplicatesNumber = contacts.some(contact => 
      contact.number.trim() === newContact.number.trim()
    );
  
    if (duplicatesName || duplicatesNumber) {
      duplicatesName && createError('name','Duplicate name found');
      duplicatesNumber && createError('number', 'Phone number already exist')
      return false;
    }
  
    // Add new contact to state
    setContacts(prevContacts => [
      {
        name: newContact.name.trim(),
        number: newContact.number.trim(),
        id: prevContacts.length + 1, // Consider using a more robust unique ID strategy
      },
      ...prevContacts
    ]);
  
    // Reset the input fields and close the form/modal
    resetNewContact();
    toggleAddContact();
  };

  const submitEditContact = (event) => {
      event.preventDefault();

      clearErrors();

      // Check for empty fields
      if (editContact.name.trim() === '' || editContact.number.trim() === '') {
        editContact.name.trim() === '' && createError('name','Name field cannot be empty')
        editContact.number.trim() === '' && createError('number','Number field cannot be empty')
        return false;
      }

      setContacts(initContacts => {
        return initContacts.map(contact => contact.id === editContact.id ? editContact : contact)
      })

      closeEditContact();
  }

  const closeEditContact = () => {
    setEditContact({
      name : '',
      number : '',
      id : false
    })

    clearErrors();
  }

  const edit = (contact) => {
    setEditContact(contact)
  }

  const removeContact = (contact) => {
    setDeleteContact(contact);
  }

  const handleDeleteContact = () =>{
    setContacts((initContacts) => initContacts.filter(contact => contact.id != deleteContact.id))
    cancelDelete();
  }

  const cancelDelete = () =>{
    setDeleteContact(false);
  }

  const createError = (field, error) => {
    setError((initError) => ({
      ...initError,
      [field]: error,
    }));
  };

  const clearErrors = () =>{
    setError({});
  }

  const resetPhonebook = () => {
    setContacts([]);
    setClearPhonebook(false)
  }


  
const filteredContacts = useMemo(()=>{
  return contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(search.toLocaleLowerCase()) || contact.number.includes(search)
  })
},[contacts, search])




  return (
    <section className="w-dvw h-full min-h-dvh  vertical no-select">
      <Header toggleAddContact={toggleAddContact} setSearch={setSearch} search={search} clearPhonebook={()=>setClearPhonebook(true)} contacts={contacts} filteredContacts={filteredContacts} />

      {contacts.length ? 
        <ContactList contacts={filteredContacts} edit={edit} removeContact={removeContact} />
      : 
        <div className="vertical gap-3 items-center fixed abs-center-xy">
          <span className="text-[#5f5f5f]">Your <span className="text-orange-600">Phonebook</span> is empty</span>
          <Button className={`animate-breath`} onClick={() => toggleAddContact()}>Add Contact</Button>
        </div>
      }



      {addContact &&  <Add toggleAddContact={toggleAddContact} newContact={newContact} setNewContact={setNewContact} addNewContact={addNewContact}  error={error} />}
      {(editContact.id ) &&  <Edit closeEditContact={closeEditContact} editContact={editContact} setEditContact={setEditContact} submitEditContact={submitEditContact} error={error} />}
      {deleteContact && <Delete contact={deleteContact} onCancel={cancelDelete} onDelete={handleDeleteContact} />}

      {clearPhonebook && 

        <Decide 
          title="Delete All Contacts"
          message={<>This action would delete all(<span className="text-orange-500">{contacts.length}</span>) contacts form the phonebook</>}
          onTrue={resetPhonebook}
          onFalse={() => setClearPhonebook(false)}
        />
      
      }
     
    </section>
  )
}

export default App
