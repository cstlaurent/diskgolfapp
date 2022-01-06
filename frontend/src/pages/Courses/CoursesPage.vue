<script setup>
import { onMounted, ref } from 'vue'

const courses = ref([])

onMounted(async () => {
  const coursesResponse = await fetch('http://127.0.0.1:7778/courses')

  console.log('Courses', coursesResponse)

  const c = await coursesResponse.json()

  // c = {courses: [...]}
  courses.value = c.courses
})
</script>

<template>
  <div class="text-4xl font-bold text-center bg-blue-200 mt-10 mb-48">
    Courses
  </div>

  <div class="text-xl font-bold text-blue-500 ml-6" v-for="c in courses">
    {{ c.name }}
  </div>
</template>
