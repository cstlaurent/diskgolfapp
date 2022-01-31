import { nanoid } from 'nanoid'

const courses = [
  {
    id: '-JNsUyQ0E7Hiujjx5',
    name: 'terrebonne',
    setup: 18,
  },
  {
    id: 'uYMqZXiFzbrkjh',
    name: 'mirabel',
    setup: 9,
  },
  {
    id: 'uYMqZXiFzb',
    name: 'ile Charron',
    setup: 9,
  },
]

export function getCourses() {
  return courses
}
export function getCourse(id) {
  const course = courses.find((course) => id === course.id)
  console.log(course)
  return course
}

export function addCourse(courseName, courseSetup) {
  const course = {
    id: nanoid(),
    name: courseName,
    setup: courseSetup,
  }

  courses.push(course)

  return course
}

export function editCourse(idToEdit, courseName, setup) {
  const editedCourse = courses.find((course) => idToEdit === course.id)
  editedCourse.name = courseName
  editedCourse.setup = setup
  return editedCourse
}

export function deleteCourse(id) {
  const courseIndex = courses.findIndex((course) => id === course.id)

  courses.splice(courseIndex, 1)
}
