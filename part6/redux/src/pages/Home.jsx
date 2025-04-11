import { isBad , isGood , isOk , reset } from "../store"
import { useDispatch ,  useSelector } from "react-redux"

const Home = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <div className="horizontal gap-2 *:bg-stone-600 *:rounded-sm *:px-5 *:py-2">
        <button onClick={() => dispatch(isGood())}>Good</button>
        <button onClick={() => dispatch(isBad())}>Bad</button>
        <button onClick={() => dispatch(isOk())}>Ok</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
      <p>Good : {useSelector(s => s.good)}</p>
      <p>Bad : {useSelector(s => s.bad)}</p>
      <p>Ok : {useSelector(s => s.ok)}</p>
    </div>
  )
}

export default Home