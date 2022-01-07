import { nanoid } from 'nanoid'

const courses = [
  {
    id: '-JNsUyQ0E7Hiujjx5',
    name: 'terrebonne',
  },
  {
    id: 'uYMqZXiFzbrkjh',
    name: 'mirabel',
  },
  {
    id: 'uYMqZXiFzb',
    name: 'ile Charron',
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

export function addCourse(courseName) {
  const course = {
    id: nanoid(),
    name: courseName,
  }

  courses.push(course)

  return course
}

export function editCourse(idToEdit, courseName) {
  const editedCourse = courses.find((course) => idToEdit === course.id)
  editedCourse.name = courseName
  return courseName
}

export function deleteCourse(id) {
  const courseIndex = courses.findIndex((course) => id === course.id)

  courses.splice(courseIndex, 1)
}
