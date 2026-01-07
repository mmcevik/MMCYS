# MMCYS - Proje Planı

## Amaç
Mevcut uygulamayı bozmadan, yeniden kullanılabilir bileşenler, sayfa bazlı routing ve temiz bir klasör yapısıyla ölçeklenebilir hale getirmek. Mevcut işlevsellik korunarak (filtreler, export, pagination) kod temizlenecek ve gereksiz/varsayılan template kalıntıları kaldırılacaktır.

## Kapsam
- Proje klasör yapısının yeniden düzenlenmesi
- Router (react-router-dom) eklenmesi ve sol menü başlıklarına karşılık sayfaların oluşturulması
- Genel `Layout` bileşeni oluşturulması (Sidebar + Topbar + Main)
- Ortak `Button`, `IconButton`, `Topbar`, `Table` bileşenlerinin oluşturulması
- `Gorevler` sayfasının refactor edilmesi, export ve filtre işlevselliğinin korunması
- ESLint uyarılarının giderilmesi ve README güncellemesi

## Önerilen klasör yapısı
```
src/
  assets/
  components/
    Button/
    IconButton/
    Topbar/
    Sidebar/
    Layout/
    Table/
  pages/
    Home/
    Reports/
    EypIslemleri/
    BasiliIleti/
    KepIleti/
    Gorevler/
  hooks/
  utils/
  App.jsx
  main.jsx
  index.css
```

## Aşamalar ve teslimler
1. Proje planı ve klasör yapısı (bu doküman)
2. Scaffold: sayfa ve bileşen skeletonları (Pages + Components)
3. Routing entegrasyonu ve nav bağlantıları
4. `Gorevler` refactor'u ve ortak bileşenlere bağlama
5. Test & lint düzeltmeleri, çalıştırma talimatları
6. Gereksiz kodların silinmesi ve README güncellemesi

## Zamanlama (öneri)
- Sprint 1 (1-2 gün): Scaffold ve routing
- Sprint 2 (1-2 gün): `Gorevler` refactor ve bileşenler
- Sprint 3 (0.5-1 gün): Test/cleanup ve dokümantasyon

## Bağımlılıklar
- `react-router-dom` (v6) — routing için
- (Mevcut) `xlsx` — export için

## Kabul Kriterleri
- Sol menüdeki her başlık ayrı sayfada erişilebilir olmalı
- `Gorevler` sayfası mevcut işlevleri korumalı (filtre, export, seçim, sayfalama)
- Ortak butonlar ve topbar bileşenleri yeniden kullanılabilir olmalı
- `npm run dev` ve `npm run build` çalışmalı

---

## Notlar
- Öncelik: mevcut işlevselliği korumak. Görsel ve CSS iyileştirmeleri minimal tutulacak; gerekli yerlerde bileşen bazlı CSS taşınacak.
- Onay verildiğinde ben scaffold ve routing adımlarını uygulamaya başlıyorum.