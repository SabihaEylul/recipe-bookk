 # Recipe Book

A modern recipe sharing application built with React + TypeScript + Vite.

## Özellikler

- **Ana Sayfa**: Tarif defteri tanıtımı ve hızlı erişim kartları
- **Şefler**: Tarif sahiplerini yönetme (ekleme, düzenleme, silme)
- **Tarifler**: Detaylı tarif kartları (malzemeler, adımlar, süre, sıcaklık, püf noktaları)
- **Malzemelerim**: Elindeki malzemelere göre uygun tarif önerileri
- **Profil**: Kişisel bilgileri kaydetme

## Teknolojiler

- React 18 + TypeScript
- Vite (build tool)
- React Router (sayfa yönlendirme)
- ESLint (kod kalitesi)
- localStorage (veri saklama)

## Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## Proje Yapısı

- `src/pages/`: Sayfa bileşenleri (Home, Users, Posts, Ingredients, Profile)
- `src/lib.ts`: Veri yönetimi ve CRUD işlemleri
- `src/App.tsx`: Ana uygulama ve yönlendirme
- `src/index.css`: Tema ve stil tanımları

## Veri Yönetimi

- İlk açılışta örnek veriler `https://jsonplaceholder.typicode.com/` üzerinden alınır
- Tüm CRUD işlemleri tarayıcı `localStorage` üzerinde çalışır
- Veriler sayfa yenilense bile korunur
