
import Course from "./components/Course";
import courses from "./data";


function App() {

  let grandTotalCourses = courses.reduce((preVal , course)=> {
      return preVal + course.parts.reduce((initVal , part) => initVal + part.exercises,0)
  },0)


  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => <Course course={course} key={course.id} />)}
      <hr />
      <strong>The total number of courses for web development is {grandTotalCourses}</strong>
    </>
  )
}

export default App
