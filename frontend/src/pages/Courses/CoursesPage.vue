<script setup>
import { onMounted, ref } from 'vue'

const courses = ref([])
const isEditMode = ref(false)
const newCourse = ref('')

onMounted(async () => {
  const coursesResponse = await fetch('http://127.0.0.1:7778/courses')

  console.log('Courses', coursesResponse)

  const c = await coursesResponse.json()

  // c = {courses: [...]}
  courses.value = c.courses
})

async function post() {
  if (isEditMode.value === false) {
    const newC = {
      name: newCourse.value,
    }
    const body = JSON.stringify(newC)
    const coursesResponse = await fetch('http://127.0.0.1:7778/course', {
      body: body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } else {
    //  EDIT MODE RECOIT ID TO EDIT DE LA FUNCTION EDITCOURSE

    const modifiedCourse = {
      name: newCourse.value,
    }
    const body = JSON.stringify(modifiedCourse)
    const coursesResponse = await fetch(
      `http://127.0.0.1:7778/course/${isEditMode.value}`,
      {
        body: body,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
  await loadCourses()
  isEditMode.value = false
  newCourse.value = ''
}

async function editCourse(idToEdit) {
  isEditMode.value = idToEdit
  for (const c of courses.value) {
    if (c.id === idToEdit) {
      newCourse.value = c.name
    }
  }
}

async function deleteCourse(idToDel) {
  const coursesResponse = await fetch(
    `http://127.0.0.1:7778/course/${idToDel}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  loadCourses()
}

async function loadCourses() {
  const coursesResponse = await fetch('http://127.0.0.1:7778/courses')

  console.log('Courses', coursesResponse)

  const c = await coursesResponse.json()

  // p = {players: [...]}
  courses.value = c.courses
}
</script>

<template>
  <div class="text-4xl font-bold text-center bg-blue-200 mt-10 mb-48">
    Courses
  </div>

  <div class="border-4 border-blue-100">
    <input v-model="newCourse" type="text" class="bg-violet-100 w-1/3" />
    <button
      @click="post"
      v-if="isEditMode === false"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded-full w-52"
    >
      Add Course
    </button>
    <button
      @click="post"
      v-else
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full ml-60 mb-5"
    >
      Save
    </button>
  </div>

  <div>
    <table>
      <th>course</th>
      <tr v-for="(c, id) in courses">
        <td>
          {{ c.name }}
        </td>
        <td>
          <button @click="deleteCourse(c.id)" class="w-28">DELETE</button>
        </td>
        <td><button @click="editCourse(c.id)" class="w-28">EDIT</button></td>
      </tr>
    </table>
  </div>

  <!-- <div class="text-xl font-bold text-blue-500 ml-6" v-for="c in courses">
    {{ c.name }}
  </div>
</template> -->
</template>
