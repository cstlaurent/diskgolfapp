export async function getCourseList() {
  const coursesResponse = await fetch('http://127.0.0.1:7778/courses')

  console.log('courses', coursesResponse)
  const c = await coursesResponse.json()
  return c.courses
}
