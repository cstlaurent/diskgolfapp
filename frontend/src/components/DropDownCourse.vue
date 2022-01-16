<script setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
const props = defineProps({
  courses: Array,
})

const selectedCourse = ref()
function chooseCourse(course) {
  emit('courseSelected', course)
}
const emit = defineEmits({
  courseSelected: null,
})
</script>

<template>
  <div class="w-72">
    <Listbox v-model="selectedCourse">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
        >
          <span class="block truncate">Chose A Course</span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <!-- <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" /> -->
          </span>
        </ListboxButton>

        <ListboxOptions
          class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="course in props.courses"
            @click="chooseCourse(course)"
            :key="course.name"
            :value="course"
            as="template"
          >
            <li
              :class="[
                active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ course.name }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <!-- <CheckIcon class="w-5 h-5" aria-hidden="true" /> -->
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
