<template>
  <div
    :class="[
      'flex items-center justify-between p-4 rounded-xl mb-3 border backdrop-blur-md transition-all group',
      todo.completed ? 'bg-white/3 border-white/5' : 'bg-white/5 border-white/10 hover:bg-white/10',
      isOverdue ? 'border-red-500/30' : '',
    ]"
  >
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        class="w-5 h-5 cursor-pointer accent-purple-400 shrink-0"
      />
      <div class="flex-1 min-w-0">
        <!-- Görev metni -->
        <p
          :class="todo.completed ? 'line-through text-white/30' : 'text-white/90'"
          class="text-sm font-medium truncate"
        >
          {{ todo.text }}
        </p>
        <!-- Alt bilgiler -->
        <div class="flex items-center gap-2 mt-1 flex-wrap">
          <!-- Öncelik -->
          <span :class="priorityClass" class="text-xs px-2 py-0.5 rounded-full border">
            {{ priorityLabel }}
          </span>
          <!-- Kategori -->
          <span
            class="text-xs px-2 py-0.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300"
          >
            {{ todo.category }}
          </span>
          <!-- Deadline -->
          <span
            v-if="todo.deadline"
            :class="isOverdue ? 'text-red-400' : 'text-white/40'"
            class="text-xs"
          >
            {{ isOverdue ? '⚠️' : '📅' }} {{ formattedDeadline }}
          </span>
        </div>
      </div>
    </div>

    <!-- Aksiyonlar -->
    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2">
      <button
        @click="$emit('edit', todo)"
        class="px-3 py-1 text-xs bg-blue-500/30 hover:bg-blue-500/60 text-blue-300 rounded-lg border border-blue-400/20 transition-all"
      >
        ✏️
      </button>
      <button
        @click="$emit('delete', todo.id)"
        class="px-3 py-1 text-xs bg-red-500/30 hover:bg-red-500/60 text-red-300 rounded-lg border border-red-400/20 transition-all"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['todo'])
defineEmits(['toggle', 'edit', 'delete'])

const priorityClass = computed(() => {
  const map = {
    low: 'bg-green-500/10 border-green-400/20 text-green-300',
    medium: 'bg-yellow-500/10 border-yellow-400/20 text-yellow-300',
    high: 'bg-red-500/10 border-red-400/20 text-red-300',
  }
  return map[props.todo.priority] || map.medium
})

const priorityLabel = computed(() => {
  const map = { low: '🟢 Düşük', medium: '🟡 Orta', high: '🔴 Yüksek' }
  return map[props.todo.priority] || '🟡 Orta'
})

const isOverdue = computed(() => {
  if (!props.todo.deadline || props.todo.completed) return false
  return new Date(props.todo.deadline) < new Date()
})

const formattedDeadline = computed(() => {
  if (!props.todo.deadline) return ''
  return new Date(props.todo.deadline).toLocaleDateString('tr-TR')
})
</script>
