# ✅ Todo App

Modern, özellik zengini bir görev yönetim uygulaması. Vue 3 ve Vite ile geliştirilmiştir.

🌐 **Canlı Demo:** [https://gregarious-gecko-09d7c5.netlify.app](https://gregarious-gecko-09d7c5.netlify.app)

---



## 🚀 Özellikler

- ✅ Görev ekleme, düzenleme, silme ve tamamlama
- 🔴 Öncelik seviyesi (Düşük / Orta / Yüksek)
- 📅 Son tarih & gecikme uyarısı
- 🏷️ Kategori & etiket sistemi
- 🔍 Anlık arama çubuğu
- ⠿ Sürükle & bırak ile sıralama
- 🌙 Karanlık / ☀️ Aydınlık tema geçişi
- 💾 LocalStorage ile veri saklama (sayfa yenilense de veriler kaybolmaz)
- 📊 İstatistik sayfası (tamamlanma oranı, öncelik & kategori dağılımı)
- 📱 PWA desteği (telefona yüklenebilir)

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| [Vue 3](https://vuejs.org/) | JavaScript framework |
| [Vite](https://vitejs.dev/) | Build tool |
| [Pinia](https://pinia.vuejs.org/) | State management |
| [Vue Router](https://router.vuejs.org/) | Sayfa yönlendirme |
| [Tailwind CSS](https://tailwindcss.com/) | CSS framework |
| [vuedraggable](https://github.com/SortableJS/vue.draggable.next) | Drag & drop |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | PWA desteği |

---

## 📁 Proje Yapısı

```
src/
├── assets/          # CSS dosyaları
├── components/      # Yeniden kullanılabilir bileşenler
│   ├── TodoForm.vue     # Görev ekleme & güncelleme formu
│   └── TodoItem.vue     # Tek görev kartı
├── interfaces/      # Veri modelleri
│   └── todo.js          # Todo objesi oluşturucu
├── router/          # Vue Router yapılandırması
│   └── index.js
├── stores/          # Pinia store
│   └── todoStore.js     # Tüm state & aksiyonlar
├── views/           # Sayfalar
│   ├── TodoView.vue     # Ana sayfa
│   ├── StatsView.vue    # İstatistik sayfası
│   └── AboutView.vue    # Hakkında sayfası
└── App.vue          # Kök bileşen & navbar
```

---

## ⚙️ Kurulum

```bash
# Repoyu klonla
git clone https://github.com/kullanici-adin/todo_app.git

# Proje dizinine gir
cd todo_app

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

---

## 📦 Build & Deploy

```bash
# Production build al
npm run build

# Build önizlemesi
npm run preview
```

> Proje [Netlify](https://netlify.com) üzerinde `dist/` klasörü ile deploy edilmiştir.

---

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
