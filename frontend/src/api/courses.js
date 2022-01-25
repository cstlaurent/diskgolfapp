export async function getCourseList() {
  const coursesResponse = await fetch('http://127.0.0.1:7778/courses')

  console.log('courses', coursesResponse)
  const c = await coursesResponse.json()
  return c.courses
}

export async function deleteCourse(idToDel) {
  const coursesResponse = await fetch(
    `http://127.0.0.1:7778/course/${idToDel}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return coursesResponse
}
