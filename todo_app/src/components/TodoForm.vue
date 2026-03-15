<template>
  <div class="mb-6 space-y-3">
    <!-- Görev input -->
    <div class="flex gap-2">
      <input
        v-model="inputText"
        @keyup.enter="handleSubmit"
        :placeholder="editingTodo ? 'Görevi güncelle...' : 'Yeni görev ekle...'"
        class="flex-1 p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all"
      />
      <button
        @click="handleSubmit"
        class="px-5 py-3 bg-purple-500/70 hover:bg-purple-500 text-white rounded-xl font-medium transition-all backdrop-blur-sm border border-purple-400/30"
      >
        {{ editingTodo ? 'Güncelle' : 'Ekle' }}
      </button>
      <button
        v-if="editingTodo"
        @click="$emit('cancel')"
        class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all backdrop-blur-sm border border-white/20"
      >
        İptal
      </button>
    </div>

    <!-- Alt seçenekler -->
    <div class="grid grid-cols-3 gap-2">
      <!-- Öncelik -->
      <select
        v-model="inputPriority"
        class="p-2 rounded-xl border border-white/20 bg-white/10 text-white text-xs focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all"
      >
        <option value="low" class="bg-gray-900">🟢 Düşük</option>
        <option value="medium" class="bg-gray-900">🟡 Orta</option>
        <option value="high" class="bg-gray-900">🔴 Yüksek</option>
      </select>

      <!-- Deadline -->
      <input
        v-model="inputDeadline"
        type="date"
        class="p-2 rounded-xl border border-white/20 bg-white/10 text-white text-xs focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all"
      />

      <!-- Kategori -->
      <input
        v-model="inputCategory"
        placeholder="Kategori..."
        class="p-2 rounded-xl border border-white/20 bg-white/10 text-white text-xs placeholder-white/40 focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['editingTodo'])
const emit = defineEmits(['add', 'update', 'cancel'])

const inputText = ref('')
const inputPriority = ref('medium')
const inputDeadline = ref('')
const inputCategory = ref('Genel')

watch(
  () => props.editingTodo,
  (val) => {
    if (val) {
      inputText.value = val.text
      inputPriority.value = val.priority
      inputDeadline.value = val.deadline || ''
      inputCategory.value = val.category || 'Genel'
    } else {
      inputText.value = ''
      inputPriority.value = 'medium'
      inputDeadline.value = ''
      inputCategory.value = 'Genel'
    }
  },
)

const handleSubmit = () => {
  if (!inputText.value.trim()) return
  if (props.editingTodo) {
    emit('update', {
      text: inputText.value.trim(),
      priority: inputPriority.value,
      deadline: inputDeadline.value || null,
      category: inputCategory.value || 'Genel',
    })
  } else {
    emit('add', {
      text: inputText.value.trim(),
      priority: inputPriority.value,
      deadline: inputDeadline.value || null,
      category: inputCategory.value || 'Genel',
    })
  }
  inputText.value = ''
  inputPriority.value = 'medium'
  inputDeadline.value = ''
  inputCategory.value = 'Genel'
}
</script>
