<template>
  <div class="min-h-screen py-16 px-4" :class="store.theme === 'light' ? 'bg-gray-100' : ''">
    <div class="max-w-lg mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-white mb-2">📊 İstatistikler</h1>
        <p class="text-white/40 text-sm">Görev performansına genel bakış.</p>
      </div>

      <!-- Genel istatistikler -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg text-center">
          <p class="text-4xl font-bold text-white">{{ store.todos.length }}</p>
          <p class="text-white/40 text-sm mt-1">Toplam Görev</p>
        </div>
        <div class="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg text-center">
          <p class="text-4xl font-bold text-green-400">{{ store.completedCount }}</p>
          <p class="text-white/40 text-sm mt-1">Tamamlanan</p>
        </div>
        <div class="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg text-center">
          <p class="text-4xl font-bold text-purple-400">{{ store.remainingCount }}</p>
          <p class="text-white/40 text-sm mt-1">Devam Eden</p>
        </div>
        <div class="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg text-center">
          <p class="text-4xl font-bold text-red-400">{{ store.overdueCount }}</p>
          <p class="text-white/40 text-sm mt-1">Geciken</p>
        </div>
      </div>

      <!-- Tamamlanma oranı -->
      <div class="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg mb-6">
        <div class="flex justify-between mb-2">
          <p class="text-white/70 text-sm font-medium">Tamamlanma Oranı</p>
          <p class="text-white font-bold text-sm">{{ completionRate }}%</p>
        </div>
        <div class="w-full bg-white/10 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-purple-500 to-green-400 h-3 rounded-full transition-all duration-500"
            :style="{ width: completionRate + '%' }"
          ></div>
        </div>
      </div>

      <!-- Öncelik dağılımı -->
      <div class="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg mb-6">
        <p class="text-white/70 text-sm font-medium mb-4">Öncelik Dağılımı</p>
        <div class="space-y-3">
          <div v-for="p in priorities" :key="p.value">
            <div class="flex justify-between mb-1">
              <span class="text-xs" :class="p.color">{{ p.label }}</span>
              <span class="text-xs text-white/40">{{ priorityCount(p.value) }}</span>
            </div>
            <div class="w-full bg-white/10 rounded-full h-2">
              <div
                :class="p.bar"
                class="h-2 rounded-full transition-all duration-500"
                :style="{ width: priorityRate(p.value) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kategori dağılımı -->
      <div class="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
        <p class="text-white/70 text-sm font-medium mb-4">Kategoriler</p>
        <div v-if="store.categories.length === 0" class="text-center text-white/30 text-sm py-4">
          Henüz kategori yok
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <div
            v-for="cat in store.categories"
            :key="cat"
            class="px-3 py-2 rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs"
          >
            {{ cat }} ({{ categoryCount(cat) }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTodoStore } from '../stores/todoStore.js'

const store = useTodoStore()

const completionRate = computed(() => {
  if (store.todos.length === 0) return 0
  return Math.round((store.completedCount / store.todos.length) * 100)
})

const priorities = [
  { value: 'high', label: '🔴 Yüksek', color: 'text-red-300', bar: 'bg-red-400' },
  { value: 'medium', label: '🟡 Orta', color: 'text-yellow-300', bar: 'bg-yellow-400' },
  { value: 'low', label: '🟢 Düşük', color: 'text-green-300', bar: 'bg-green-400' },
]

const priorityCount = (p) => store.todos.filter((t) => t.priority === p).length
const priorityRate = (p) => {
  if (store.todos.length === 0) return 0
  return Math.round((priorityCount(p) / store.todos.length) * 100)
}
const categoryCount = (cat) => store.todos.filter((t) => t.category === cat).length
</script>
