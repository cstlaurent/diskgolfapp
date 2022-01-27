import {
  getCourses,
  getCourse,
  addCourse,
  editCourse,
  deleteCourse,
} from '../db/courses.mjs'

function courseRoutes(app, options, done) {
  // Get courses
  app.get('/courses', async (request, reply) => {
    return { courses: getCourses() }
  })

  //Get specific course

  app.get('/course/:id', async (request, reply) => {
    const requestedID = request.params.id
    let requestedCourse = getCourse(requestedID)
    return requestedCourse
  })

  // Add new course
  app.post('/course', async (request, reply) => {
    if (!request.body.name) {
      reply.statusCode = 400
      return 'Bad Data'
    }
    const courseName = request.body.name
    const courseSetup = request.body.setup
    const newCourse = addCourse(courseName, courseSetup)
    return { newCourse: newCourse }
  })
  // Edit specific Course
  app.put('/course/:id', async (request, reply) => {
    // Receive Id as url params
    const requestedID = request.params.id
    // Receive body: {name: "Player Name"}
    if (!request.body.name) {
      reply.statusCode = 400
      return 'Bad Data'
    }
    const courseName = request.body.name
    const editedCourse = editCourse(requestedID, courseName)

    return { editedCourse: editedCourse }
  })

  // // Delete specific course
  app.delete('/course/:id', async (request, reply) => {
    // Receive Id as url params
    const requestedID = request.params.id
    deleteCourse(requestedID)
    return 'course deleted'
  })
  done()
}

export default courseRoutes
