<template>
  <div :class="store.theme === 'light' ? 'light-theme' : ''">
    <!-- Navbar -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-lg"
    >
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <RouterLink
            to="/"
            :class="$route.name === 'todo' ? 'text-white' : 'text-white/40 hover:text-white/70'"
            class="text-sm font-medium transition-all"
          >
            ✅ Görevler
          </RouterLink>
          <RouterLink
            to="/stats"
            :class="$route.name === 'stats' ? 'text-white' : 'text-white/40 hover:text-white/70'"
            class="text-sm font-medium transition-all"
          >
            📊 İstatistik
          </RouterLink>
          <RouterLink
            to="/about"
            :class="$route.name === 'about' ? 'text-white' : 'text-white/40 hover:text-white/70'"
            class="text-sm font-medium transition-all"
          >
            💡 Hakkında
          </RouterLink>
        </div>
        <!-- Tema geçişi -->
        <button
          @click="store.toggleTheme()"
          class="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-white/70 hover:text-white text-sm transition-all"
        >
          {{ store.theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>

    <div class="pt-16">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from './stores/todoStore.js'
const store = useTodoStore()
</script>

<style>
.light-theme {
  background: linear-gradient(135deg, #e0e7ff, #f0f4ff, #ddd6fe) !important;
  min-height: 100vh;
}

.light-theme nav {
  background: rgba(255, 255, 255, 0.6) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}

.light-theme h1,
.light-theme h2,
.light-theme p,
.light-theme span,
.light-theme a {
  color: #1e1b4b !important;
}

.light-theme .text-white\/40,
.light-theme .text-white\/50,
.light-theme .text-white\/30 {
  color: #6b7280 !important;
}
</style>
