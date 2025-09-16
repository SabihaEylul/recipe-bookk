import { useEffect, useState } from 'react'
import { readProfile, saveProfile, type Profile } from '../lib'

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({ firstName: '', lastName: '', email: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const p = readProfile()
    if (p) setProfile(p)
  }, [])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    saveProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 1200)
  }

  return (
    <div>
      <h2>Profil</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, margin: '12px 0' }}>
        <input placeholder="Ad" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
        <input placeholder="Soyad" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
        <input placeholder="E-Posta" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
        <button type="submit">Kaydet</button>
      </form>
      {saved && <span style={{ color: 'green' }}>Kaydedildi</span>}
    </div>
  )
}


