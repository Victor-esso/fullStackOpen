import Header from "./Header";
import Content from "./Content";
import Total from "./Total"

const Course = ({course}) => {

    const totalExercises = course.parts.reduce((sum , part) => sum + part.exercises ,0);
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default Course