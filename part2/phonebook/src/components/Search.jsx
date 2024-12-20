
import Input from './blocks/Input'

const Search = ({setSearch , search}) => {
  return (
    <div className='w-full max-w-[500px]'>
        <Input placeholder='Search Phonebook ...' value={search} onChange={(event) => setSearch(event.target.value)} />
    </div>
  )
}

export default Search