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
  <div class="flex-col  ">
    <div class="">
      <h1 class="text-center font-bold text-5xl pt-10 font-Oswald ">COURSES</h1>
    </div>
    <div class="pl-24 py-20 flex ">
      <div class="border-2 mx-auto p-4 bg-blue-100 border-blue-400 max-h-60    rounded-lg">
         <h1 class="text-center font-bold text-lg">ADD A COURSE</h1>
        <input class="mt-7 min-w-full " v-model="newCourse" type="text" placeholder="Course Name"  />
<div class="text-right p-5 text-lg">
 
        <input class=""
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
        </div>

        <button 
          @click="post"
          v-if="isEditMode === false"
          class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-20 rounded-xl "
        >
          Add Course
        </button>

        <button
          @click="post"
          v-else
          class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-20 rounded-xl mb-5"
        >
          Save
        </button>
      </div>
      <div
        class="bg-blue-100 border-2 border-blue-400 rounded-xl text-xl max-w-3x mx-auto  "
      >
        <table class="m-5 ">
        
          
          <tr  v-for="(c, id) in courses">
            <td class="px-10 ">
              {{ c.name }}
            </td>
            <tr><td class="px-10 ">{{c.setup}}</td></tr>
            <td class="">
              <button @click="deleteCourse(c.id)" class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl">DELETE</button>
            </td>
            <td class="px-10 ">
              <button @click="editCourse(c.id)" class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl">EDIT</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    
  </div>

  <!-- <div class="text-xl font-bold text-blue-500 ml-6" v-for="c in courses">
    {{ c.name }}
  </div>
</template> -->
</template>
