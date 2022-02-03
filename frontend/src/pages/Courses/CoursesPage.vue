<script setup>
import { onMounted, ref } from 'vue'
import * as courseApi from '../../api/courses'

const courses = ref([])
const isEditMode = ref(false)
const newCourse = ref('')
const courseSetup = ref('')

onMounted(async () => {
  courses.value = await courseApi.getCourseList()
})

async function post() {
  if (isEditMode.value === false) {
    const newC = {
      name: newCourse.value,
      setup: courseSetup.value,
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
      setup: courseSetup.value,
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
  courses.value = await courseApi.getCourseList()
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
  await courseApi.deleteCourse(idToDel)
  courses.value = await courseApi.getCourseList()
}
</script>

<template>
  <div class="flex-col border-2 border-red-600">
    <div class="">
      <h1 class="text-center font-bold text-4xl">COURSE PAGE</h1>
    </div>
    <div class="pl-24 py-20 flex bg-yellow-100">
      <div class="border-2 border-blue-400 w-64 h-48 rounded-lg">
        <input class="mt-7" v-model="newCourse" type="text" />

        <input
          v-model="courseSetup"
          type="radio"
          id="courseconfig"
          name="courseconfig"
          value="18"
        />
        <label for="18">18</label>

        <input
          v-model="courseSetup"
          type="radio"
          id="courseconfig"
          name="courseconfig"
          value="9"
        />
        <label for="9">9</label>

        <button
          @click="post"
          v-if="isEditMode === false"
          class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 rounded-xl"
        >
          Add Course
        </button>

        <button
          @click="post"
          v-else
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-xl mb-5"
        >
          Save
        </button>
      </div>
      <div
        class="bg-blue-100 border-2 border-blue-400 rounded-xl text-xl w-1/3 "
      >
        <table class="">
          <th>course</th>
          <th></th>
          <th></th>
          <tr v-for="(c, id) in courses">
            <td class="px-10">
              {{ c.name }}
            </td>
            <tr><td class="px-10">{{c.setup}}</td></tr>
            <td class="bg-pink-200 px-10">
              <button @click="deleteCourse(c.id)" class="">DELETE</button>
            </td>
            <td class="px-10">
              <button @click="editCourse(c.id)" class="">EDIT</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bg-yellow-200"></div>
    <div class="bg-pink-200"><p>test</p></div>
    <div class="bg-green-200"><p>test</p></div>
    <div class="bg-red-200"><p>test</p></div>
  </div>

  <!-- <div class="text-xl font-bold text-blue-500 ml-6" v-for="c in courses">
    {{ c.name }}
  </div>
</template> -->
</template>
