<template>
  <div>
    <div class="min-h-screen py-16 px-4">
      <div class="max-w-lg mx-auto">
        <!-- Başlık -->
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold text-white mb-2 tracking-tight">✅ Todo App</h1>
          <p class="text-white/40 text-sm">Görevlerini takip et, üretken kal.</p>
        </div>

        <!-- İstatistik -->
        <div class="flex gap-3 mb-6">
          <div
            class="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
          >
            <p class="text-2xl font-bold text-white">{{ store.todos.length }}</p>
            <p class="text-white/40 text-xs mt-1">Toplam</p>
          </div>
          <div
            class="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
          >
            <p class="text-2xl font-bold text-green-400">{{ store.completedCount }}</p>
            <p class="text-white/40 text-xs mt-1">Tamamlanan</p>
          </div>
          <div
            class="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
          >
            <p class="text-2xl font-bold text-purple-400">{{ store.remainingCount }}</p>
            <p class="text-white/40 text-xs mt-1">Kalan</p>
          </div>
          <div
            class="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
          >
            <p class="text-2xl font-bold text-red-400">{{ store.overdueCount }}</p>
            <p class="text-white/40 text-xs mt-1">Geciken</p>
          </div>
        </div>

        <!-- Kart -->
        <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
          <TodoForm
            :editingTodo="editingTodo"
            @add="store.addTodo"
            @update="handleUpdate"
            @cancel="cancelEdit"
          />

          <!-- Arama -->
          <div class="mb-3">
            <input
              v-model="searchQuery"
              placeholder="🔍 Görev ara..."
              class="w-full p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all text-sm"
            />
          </div>

          <!-- Filtreler -->
          <div class="flex gap-2 mb-3">
            <button
              v-for="f in filters"
              :key="f.value"
              @click="activeFilter = f.value"
              :class="
                activeFilter === f.value
                  ? 'bg-purple-500/70 border-purple-400/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              "
              class="flex-1 py-2 text-xs rounded-lg border transition-all font-medium"
            >
              {{ f.label }}
            </button>
          </div>

          <!-- Kategori filtresi -->
          <div class="flex gap-2 mb-4 flex-wrap">
            <button
              @click="activeCategory = 'all'"
              :class="
                activeCategory === 'all'
                  ? 'bg-blue-500/50 border-blue-400/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
              "
              class="px-3 py-1 text-xs rounded-full border transition-all"
            >
              Tümü
            </button>
            <button
              v-for="cat in store.categories"
              :key="cat"
              @click="activeCategory = cat"
              :class="
                activeCategory === cat
                  ? 'bg-blue-500/50 border-blue-400/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
              "
              class="px-3 py-1 text-xs rounded-full border transition-all"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Liste -->
          <p v-if="filteredTodos.length === 0" class="text-center text-white/30 py-8 text-sm">
            Görev bulunamadı 🌙
          </p>

          <draggable
            v-model="draggableTodos"
            item-key="id"
            handle=".drag-handle"
            animation="200"
            ghost-class="opacity-30"
          >
            <template #item="{ element }">
              <div class="flex items-center gap-2">
                <span
                  class="drag-handle cursor-grab text-white/20 hover:text-white/50 transition-all select-none"
                  >⠿</span
                >
                <div class="flex-1">
                  <TodoItem
                    :todo="element"
                    @toggle="store.toggleTodo"
                    @edit="startEdit"
                    @delete="store.deleteTodo"
                  />
                </div>
              </div>
            </template>
          </draggable>

          <!-- Tümünü temizle -->
          <button
            v-if="store.completedCount > 0"
            @click="store.clearCompleted"
            class="w-full mt-3 py-2 text-xs text-white/30 hover:text-red-400 transition-all"
          >
            Tamamlananları temizle
          </button>
        </div>
      </div>
    </div>

    <!-- Görev Detay Modalı -->
    <Transition name="fade">
      <div
        v-if="selectedTodo"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="selectedTodo = null"
      >
        <div
          class="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-gray-900/90 backdrop-blur-lg shadow-2xl"
        >
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-white font-bold text-lg">📋 Görev Detayı</h2>
            <button
              @click="selectedTodo = null"
              class="text-white/40 hover:text-white transition-all"
            >
              ✕
            </button>
          </div>
          <p class="text-white/90 mb-4">{{ selectedTodo.text }}</p>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-white/40">Öncelik</span>
              <span :class="priorityColor(selectedTodo.priority)">{{
                priorityLabel(selectedTodo.priority)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/40">Kategori</span>
              <span class="text-blue-300">{{ selectedTodo.category }}</span>
            </div>
            <div class="flex justify-between" v-if="selectedTodo.deadline">
              <span class="text-white/40">Son Tarih</span>
              <span class="text-white/70">{{
                new Date(selectedTodo.deadline).toLocaleDateString('tr-TR')
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/40">Durum</span>
              <span :class="selectedTodo.completed ? 'text-green-400' : 'text-yellow-400'">
                {{ selectedTodo.completed ? '✅ Tamamlandı' : '⏳ Devam Ediyor' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import TodoForm from '../components/TodoForm.vue'
import TodoItem from '../components/TodoItem.vue'
import { useTodoStore } from '../stores/todoStore.js'

const store = useTodoStore()
const editingTodo = ref(null)
const selectedTodo = ref(null)
const activeFilter = ref('all')
const activeCategory = ref('all')
const searchQuery = ref('')

const filters = [
  { label: '🌙 Tümü', value: 'all' },
  { label: '⏳ Devam', value: 'active' },
  { label: '✅ Bitti', value: 'completed' },
  { label: '⚠️ Geciken', value: 'overdue' },
]

const filteredTodos = computed(() => {
  let list = store.todos

  if (searchQuery.value.trim()) {
    list = list.filter((t) => t.text.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  if (activeFilter.value === 'active') list = list.filter((t) => !t.completed)
  else if (activeFilter.value === 'completed') list = list.filter((t) => t.completed)
  else if (activeFilter.value === 'overdue')
    list = list.filter((t) => !t.completed && t.deadline && new Date(t.deadline) < new Date())
  if (activeCategory.value !== 'all') list = list.filter((t) => t.category === activeCategory.value)

  return list
})

const draggableTodos = computed({
  get: () => filteredTodos.value,
  set: (val) => store.reorderTodos(val),
})

const startEdit = (todo) => {
  editingTodo.value = { ...todo }
}
const cancelEdit = () => {
  editingTodo.value = null
}

const handleUpdate = (data) => {
  store.updateTodo(editingTodo.value.id, data)
  editingTodo.value = null
}

const priorityLabel = (p) => ({ low: '🟢 Düşük', medium: '🟡 Orta', high: '🔴 Yüksek' })[p]
const priorityColor = (p) =>
  ({ low: 'text-green-400', medium: 'text-yellow-400', high: 'text-red-400' })[p]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
