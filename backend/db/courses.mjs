import { ObjectId } from 'mongodb'
import { db } from './index.mjs'

export async function getCourses() {
  const mongoCourses = await db.collection('course').find().toArray()
  console.log(mongoCourses)
  return mongoCourses
}
export async function getCourse(id) {
  const course = await db
    .collection('course')
    .find({ _id: ObjectId(id) })
    .toArray()
  console.log(course)
  return course
}

export function addCourse(courseName, courseSetup) {
  const course = {
    name: courseName,
    setup: courseSetup,
  }
  db.collection('course').insertOne(course)
}

export function editCourse(idToEdit, courseName, setup) {
  db.collection('course').updateOne(
    { _id: ObjectId(idToEdit) },
    { $set: { name: courseName, setup: setup } }
  )
}

export function deleteCourse(id) {
  db.collection('course').deleteOne({ _id: ObjectId(id) })
}
