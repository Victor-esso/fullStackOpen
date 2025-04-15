import { useDispatch, useSelector } from "react-redux"
import { clearSearchFilter, setSearchFilter } from "../reducers/filter"

const Filter = () => {
  const searchValue = useSelector(s => s.filter)
    const dispatch = useDispatch()
    const handleChange = e => {
        const value = e.target.value
        dispatch(setSearchFilter(value))
    }
  return (
    <>
        <input type="text" onChange={handleChange} style={{marginBottom: 10}} value={searchValue} />
        <button onClick={() => dispatch(clearSearchFilter())}>Clear</button>
    </>
  )
}

export default Filter