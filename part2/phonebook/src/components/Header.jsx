import Button from "./blocks/Button"
import Search from "./Search"
import { Icon } from "@iconify/react/dist/iconify.js"

const Header = ({toggleAddContact , setSearch, search , clearPhonebook, contacts, filteredContacts }) => {
  return (
    <header className="bg-stone-950 w-full py-3 vertical items-center gap-4 px-5 pt-6 shrink-0 fixed inset-0 h-max">
        <div className="horizontal gap-2"><Icon icon="hugeicons:contact" className="text-[3rem] text-orange-500 animate-breath" /><span className="text-[2rem] text-white">Phonebook</span></div>
        <div className="w-full vertical items-center gap-2">
          <div className="horizontal gap-2 w-full max-w-[650px] justify-center">
              {contacts.length > 0 && 
                  <Button className={`bg-red-800 hover:bg-red-600`} onClick={clearPhonebook} tippyContent={`Clear phonebook`}>
                    <Icon icon="feather:x-circle" width="24" height="24" />
                  </Button>
              }
              <Search setSearch={setSearch} search={search} />
              {contacts.length > 0 &&
                <Button onClick={toggleAddContact} tippyContent={'Add Contact'} className={`max-sm:fixed max-sm:bottom-[10dvw] max-sm:right-[5dvw] max-sm:rounded-full max-sm:w-[70px] max-sm:aspect-square max-sm:!p-0 max-sm:grid-center`}>
                    <Icon icon="feather:user-plus" className="text-inherit text-[1.5rem] max-sm:text-[2.2rem] " />
                </Button>
              }
          </div>
          {(contacts.length > 0) && 
            (
            <>
              <span className="text-[#5f5f5f] text-sm capitalize"> {(contacts.length !== filteredContacts.length) && <>showing <span className="font-semibold text-orange-600">{filteredContacts.length}</span> out of a </>} total of <span className="font-semibold text-orange-600">{contacts.length}</span> contact{contacts.length > 1 && 's'}</span>
            </>
            )
          }
        </div>

    </header>
  )
}

export default Header