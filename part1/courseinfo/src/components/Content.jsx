import Part from "./blocks/Part"
const Content = ({parts}) => {
  return (
    <ul>
      {parts.map((part , index) => (
        <Part key={index} part={part} />
      ))}
    </ul>
  )
}

export default Content