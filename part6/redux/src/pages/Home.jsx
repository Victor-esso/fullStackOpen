import { isBad , isGood , isOk , reset } from "../store"
import { useDispatch ,  useSelector } from "react-redux"

const Home = () => {
  const dispatch = useDispatch()
  const { good , bad , ok } = useSelector(s => s.counter)
  return (
    <div>
      <div className="horizontal gap-2 *:bg-stone-600 *:rounded-sm *:px-5 *:py-2">
        <button onClick={() => dispatch(isGood())}>Good</button>
        <button onClick={() => dispatch(isBad())}>Bad</button>
        <button onClick={() => dispatch(isOk())}>Ok</button>
        <button onClick={() => reset(500)}>Reset</button>
      </div>
      <p>Good : {good}</p>
      <p>Bad : {bad}</p>
      <p>Ok : {ok}</p>
    </div>
  )
}

export default Home