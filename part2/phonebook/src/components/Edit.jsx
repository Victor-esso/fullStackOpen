
import ContactForm from './ContactForm'
const Edit = ({closeEditContact , setEditContact , editContact , submitEditContact, error }) => {
  return (
    <>
        <ContactForm closeForm={closeEditContact} setContact={setEditContact} onSubmit={submitEditContact} error={error} contact={editContact} formTitle={'Update Contact'} formSubTitle={'Currently updating and existing'}  submitText={'Update Contact'}/>
    </>
  )
}

export default Edit