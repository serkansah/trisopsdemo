# Trisops — Demo

Bu repo, Trisops (PS Portal) uygulamasının **statik, backend'siz bir demo klonu**dur. Tamamen
uydurma (dummy) verilerle önceden oluşturulmuş HTML sayfalarından oluşur; sunucu, veritabanı
veya gerçek entegrasyon yoktur.

- Giriş: **Admin** / **Qazwsx123+++**
- Tüm veriler kurgusaldır; gerçek müşteri/altyapı bilgisi içermez.
- Sayfa içi "kaydet/aç/kapat" gibi işlemler tarayıcıda simüle edilir, hiçbir istek bu sitenin
  dışına çıkmaz (bkz. `demo-shim.js`).
- `localStorage` her gün ilk ziyarette otomatik temizlenir — demo her gün ilk günkü haline döner.

Barındırma: statik dosya sunan herhangi bir servis (Vercel, GitHub Pages, Netlify) yeterlidir.
