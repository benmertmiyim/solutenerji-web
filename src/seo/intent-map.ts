/**
 * SEO niyet haritası — Search Console verisiyle periyodik güncellenmeli.
 * Sayfa başlıkları ve içerik planına referans; anahtar kelime doldurma amaçlı değil.
 */
export const seoIntentClusters = [
  {
    intent: 'Yerel ticari (GES)',
    exampleQueries: [
      'izmir güneş enerjisi kurulumu',
      'ege çatı ges',
      'izmir mesken güneş paneli',
      'ev tipi ges izmir',
    ],
    primaryUrl: '/hizmetler/mesken-cati-ges/',
  },
  {
    intent: 'Yerel ticari (EV şarj)',
    exampleQueries: [
      'izmir ev şarj istasyonu',
      'elektrikli araç şarj kurulumu izmir',
      'ac şarj izmir',
      'konut ev şarjı ege',
    ],
    primaryUrl: '/hizmetler/ev-sarj-istasyonu/',
  },
  {
    intent: 'Danışmanlık',
    exampleQueries: ['ges danışmanlık izmir', 'güneş enerjisi fizibilite ege'],
    primaryUrl: '/hizmetler/ges-danismanlik/',
  },
  {
    intent: 'Bilgilendirme (2. faz)',
    exampleQueries: ['ges geri dönüş süresi', 'çatı güneş paneli maliyeti'],
    primaryUrl: null,
    note: 'Blog veya rehber sayfaları; şimdilik ana/hizmet sayfalarında doğal yanıt verilir.',
  },
] as const;
