export default function Home() {
  return (
    <div>
      <div style={{
        padding: 18,
        background: 'linear-gradient(135deg, var(--accent), #fff)',
        border: '1px solid #eadfce',
        borderRadius: 16,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: 12,
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 36 }}>Tarif Defterim</h1>
          <p style={{ marginTop: 8 }}>Malzemelerine göre tarif öneren, adım adım rehber sunan modern bir tarif defteri. Dilersen kendi tariflerini de ekleyip kullanıcılarla paylaşabilirsin.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <a href="/posts"><button>🍲 Tarifleri Gör</button></a>
            <a href="/ingredients"><button style={{ background: 'transparent', color: 'var(--primary)', borderColor: 'var(--primary)' }}>🧺 Malzemelerim</button></a>
          </div>
        </div>
        <img src="/hero-tarif.svg" alt="Tarif Defterim" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12 }} />
      </div>
      <section style={{ marginTop: 16, lineHeight: 1.6 }}>
        <h2>Keşfet</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 12,
          marginTop: 8
        }}>
          <a href="/posts" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 28 }}>🍛</div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>Tarifler</div>
            <div style={{ opacity: .8, marginTop: 4 }}>Malzemeler, adımlar, süre ve sıcaklıkla tam tarif kartları.</div>
          </a>
          <a href="/ingredients" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 28 }}>🧺</div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>Malzemelerim</div>
            <div style={{ opacity: .8, marginTop: 4 }}>Elindeki malzemelere göre sana uygun tarif önerileri.</div>
          </a>
          <a href="/users" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 28 }}>👩‍🍳</div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>Şefler</div>
            <div style={{ opacity: .8, marginTop: 4 }}>Tarif sahiplerini düzenle, yeni şef ekle veya kaldır.</div>
          </a>
        </div>
      </section>
      <section style={{ marginTop: 16 }}>
        <h2>Öne çıkan</h2>
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
          <div style={{ alignSelf: 'center', fontSize: 42 }}>🔥</div>
          <div>
            <div style={{ fontWeight: 700 }}>Haftanın Tarifi: Fırında Tavuk Baget</div>
            <div style={{ marginTop: 6 }}>
              Püf: Tepsiyi önceden ısıt; derisi çıtır olur. 200°C · 35 dk · 4 porsiyon
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


