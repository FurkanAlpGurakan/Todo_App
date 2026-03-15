import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { createTodo } from '../interfaces/todo.js'

export const useTodoStore = defineStore('todo', () => {
  const STORAGE_KEY = 'vue-todo-app'

  const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  const theme = ref(localStorage.getItem('theme') || 'dark')

  // LocalStorage sync
  watch(
    todos,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true },
  )

  watch(theme, (val) => {
    localStorage.setItem('theme', val)
  })

  // Getters
  const completedCount = computed(() => todos.value.filter((t) => t.completed).length)
  const remainingCount = computed(() => todos.value.filter((t) => !t.completed).length)
  const overdueCount = computed(
    () =>
      todos.value.filter((t) => !t.completed && t.deadline && new Date(t.deadline) < new Date())
        .length,
  )
  const categories = computed(() => {
    const cats = todos.value.map((t) => t.category).filter(Boolean)
    return [...new Set(cats)]
  })

  // Actions
  const addTodo = ({ text, priority, deadline, category }) => {
    todos.value.push(createTodo(text, priority, deadline, category))
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  const updateTodo = (id, { text, priority, deadline, category }) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.text = text
      todo.priority = priority
      todo.deadline = deadline
      todo.category = category
    }
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter((t) => !t.completed)
  }

  const reorderTodos = (newList) => {
    todos.value = newList
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    todos,
    theme,
    completedCount,
    remainingCount,
    overdueCount,
    categories,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    reorderTodos,
    toggleTheme,
  }
})
