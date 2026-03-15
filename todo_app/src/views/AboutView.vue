<template>
  <div class="min-h-screen py-16 px-4">
    <div class="max-w-lg mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-white mb-2">💡 Hakkında</h1>
        <p class="text-white/40 text-sm">Proje detayları ve teknolojiler.</p>
      </div>

      <!-- Proje bilgisi -->
      <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg mb-4">
        <h2 class="text-white font-bold mb-3">📱 Todo App</h2>
        <p class="text-white/50 text-sm leading-relaxed">
          Vue 3 ve Vite ile geliştirilmiş modern bir görev yönetim uygulaması. Görevlerini
          önceliklendir, kategorize et ve takip et.
        </p>
      </div>

      <!-- Teknolojiler -->
      <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg mb-4">
        <h2 class="text-white font-bold mb-4">🛠️ Teknolojiler</h2>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="tech in technologies"
            :key="tech.name"
            class="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5"
          >
            <span class="text-lg">{{ tech.icon }}</span>
            <div>
              <p class="text-white text-xs font-medium">{{ tech.name }}</p>
              <p class="text-white/30 text-xs">{{ tech.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Özellikler -->
      <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
        <h2 class="text-white font-bold mb-4">✨ Özellikler</h2>
        <div class="space-y-2">
          <div
            v-for="feature in features"
            :key="feature"
            class="flex items-center gap-2 text-white/60 text-sm"
          >
            <span class="text-green-400">✓</span>
            {{ feature }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const technologies = [
  { icon: '💚', name: 'Vue 3', desc: 'Framework' },
  { icon: '⚡', name: 'Vite', desc: 'Build tool' },
  { icon: '🍍', name: 'Pinia', desc: 'State management' },
  { icon: '🎨', name: 'Tailwind CSS', desc: 'Styling' },
  { icon: '🔀', name: 'Vue Router', desc: 'Routing' },
  { icon: '📦', name: 'PWA', desc: 'Yüklenebilir' },
]

const features = [
  'Görev ekleme, düzenleme, silme',
  'Öncelik seviyesi (Düşük / Orta / Yüksek)',
  'Son tarih & gecikme uyarısı',
  'Kategori & etiket sistemi',
  'Sürükle & bırak sıralama',
  'Arama çubuğu',
  'Karanlık / Aydınlık tema',
  'LocalStorage ile veri saklama',
  'PWA desteği',
  'İstatistik sayfası',
]
</script>
