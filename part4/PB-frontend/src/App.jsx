
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
import contactServices from './services/contacts'
import Notification from "./components/Notification";

function App() {

  const [notifications , setNotifications] = useState([]);
  const [contacts , setContacts] = useState([]);
  const [addContact , setAddContact] = useState(false);
  const [search , setSearch] = useState('');
  const [deleteContact , setDeleteContact] = useState(false);
  const [clearPhonebook , setClearPhonebook] = useState(false);
  const [error , setError] = useState({});
  const [editContact, setEditContact] = useState({
    name : '',
    number : '',
    id : false
  });
  const [newContact , setNewContact] = useState({
    name : '',
    number : ''
  })

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
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
  }, [contacts]);

  const toggleAddContact = () => {
    setAddContact(!addContact)
    resetNewContact();
    clearErrors();
  }

  useEffect(()=> {
    
    contactServices.all().then(r => setContacts(r))



  },[])

  useEffect(()=>{

  },[error])
  

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
        addNotification('error',`${field} field cannot be empty `,field);
        isValid = false;
      }
    });
    return isValid;
  }

  const handleServerValidationErrors = (errors) => {
    if(typeof errors === 'object'){
      Object.values(errors).forEach(error => {
        if(error.message && error.path){
          addNotification('error',error.message , error.path , 5000)
        }
      })
    }
  }
  
  const addNewContact = (event) => {
    event.preventDefault();
    clearErrors();

    if (!validateFields(newContact)) return;

    const newContactRaw = {...newContact}

    const duplicateContact =  contacts.find(contact =>  contact.name.trim().toLowerCase() === newContact.name.trim().toLowerCase())
    if(duplicateContact){
      
        submitEditContact(false,{
          ...duplicateContact , number : newContact.number
        });
        // Reset the input fields and close the form/modal
        toggleAddContact();
      return;
    }
  
    // Check for duplicate contacts (by name or number)
    const duplicatesName = contacts.some(contact => {
      return contact.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    });
    const duplicatesNumber = contacts.some(contact => {
      return contact.number.toString().trim() === newContact.number.trim()
    });
  
    if (duplicatesName || duplicatesNumber) {
      duplicatesName && createError('name','Duplicate name found');
      duplicatesName && addNotification('error','This name already exist your contact list',newContactRaw.name);

      duplicatesNumber && createError('number', 'Phone number already exist')
      duplicatesNumber && addNotification('error','This Phone Number already exist your contact list',newContactRaw.number);
      return false;
    }


    contactServices.create(newContactRaw).then(r => {
      // Add new contact to state
      setContacts(prevContacts => [
        ...prevContacts,
        r
      ]);

      addNotification('success',`${r.name} has been added to your phonebook.`,'Add Successfully',4000);
      // Reset the input fields and close the form/modal
      resetNewContact();
      toggleAddContact();
    }).catch(error => {
      let errors = error.response.data?.error; 
      handleServerValidationErrors(errors);
    })
    return ;

  
  }

  const submitEditContact = (event = false , editContactDirect = false) => {

      let innerContact = false;
      if(event){
        event.preventDefault();
      }

      if(editContactDirect){
        innerContact = editContactDirect
        setEditContact(innerContact);
      }else{
        innerContact = editContact
      }

      clearErrors();

      // Check for empty fields
      if (!editContactDirect && (editContact.name.trim() === '' || editContact.number === '')) {
        editContact.name.trim() === '' && createError('name','Name field cannot be empty')  
        editContact.name.trim() === '' && addNotification('error',`Name field cannot be empty`)

        editContact.number.trim() === '' && createError('number','Number field cannot be empty')
        editContact.number.trim() === '' && addNotification('error',`Number field cannot be empty`)
        return false;
      }

      contactServices.update(innerContact.id , innerContact).then(r => {

        setContacts(initContacts => {
          return initContacts.map(contact => contact.id === r.id ? r : contact)
        })

        addNotification('success',`${r.name} contact has be updated successfully`,'Success')
  
        closeEditContact();
      }).catch(error => {
          let errors = error.response.data?.error; 
          handleServerValidationErrors(errors);
      })

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

    contactServices.del(deleteContact.id).then( r =>{
      setContacts((initContacts) => initContacts.filter(contact => contact.id != r.id))
      cancelDelete();
      addNotification('success',`${r.name} contact has been deleted from the phone book`,'Contact Deleted',3500)
    })

  }

  const cancelDelete = () =>{
    setDeleteContact(false);
  }

  const createError = (field, error) => {
    setError((initError) => ({
      ...initError,
      [field]: error,
    }));
  }

  const clearErrors = () =>{
    setError({});
  }

  const resetPhonebook = () => {
    contactServices.clearAll().then(r => {
      setContacts([]);
      setClearPhonebook(false)
      addNotification('success',`All(${r.length}) contacts on the phonebook as been deleted`,'Cleared!')
    })
  }


  
  const filteredContacts = useMemo(()=>{
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(search.toLocaleLowerCase()) || contact.number.includes(search)
    }).reverse()
  },[contacts, search])

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const addNotification = (type = null,message , title = null, duration = 2500) => {
    const id = `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
    setNotifications(prev => [...prev , {id,message,title,type,duration}])
  }



  return (
    <section className="w-full h-full min-h-dvh  vertical no-select">
      <Header toggleAddContact={toggleAddContact} setSearch={setSearch} search={search} clearPhonebook={()=>setClearPhonebook(true)} contacts={contacts} filteredContacts={filteredContacts} />

      {contacts.length ? 
        <ContactList contacts={filteredContacts} edit={edit} removeContact={removeContact} />
      : 
        <div className="vertical gap-3 items-center fixed abs-center-xy">
          <span className="text-[#5f5f5f]">Your <span className="text-orange-600">Phonebook</span> is empty</span>
          <Button className={`animate-breath`} onClick={() => toggleAddContact()}>Add Contact</Button>
        </div>
      }

      {addContact &&  
        <Add 
          toggleAddContact={toggleAddContact} 
          newContact={newContact} 
          setNewContact={setNewContact} 
          addNewContact={addNewContact}  
          error={error} 
        />
      }

      {(editContact.id ) &&  
        <Edit 
          closeEditContact={closeEditContact} 
          editContact={editContact} 
          setEditContact={setEditContact} 
          submitEditContact={submitEditContact} 
          error={error} 
        />
      }

      {deleteContact && 
        <Delete 
          contact={deleteContact} 
          onCancel={cancelDelete} 
          onDelete={handleDeleteContact} 
        />
      }

      {clearPhonebook && 
        <Decide 
          title="Delete All Contacts"
          message={<>This action would delete all(<span className="text-orange-500">{contacts.length}</span>) contacts form the phonebook</>}
          onTrue={resetPhonebook}
          onFalse={() => setClearPhonebook(false)}
        />
      }

      {/* Notification Container */}
      {notifications.length && 
      <div className="fixed max-md:abs-center-x md:right-7 top-[4rem] max-md:w-max w-0 h-max max-sm:p-4 vertical max-h-[100dvh] *:w-max items-end max-md:*:w-full max-lg:px-6 z-[9999999]">
        {notifications.map((notification, index) => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            title={notification.title}
            removeNotification={removeNotification}
            type={notification.type}
            index={index}
            duration={notification.duration}
          />
        ))}
      </div>
      }
     
    </section>
  )
}

export default App
