import { useEffect, useMemo, useState } from 'react'
import { createPost, deletePost, loadPosts, loadUsers, updatePost } from '../lib'
import type { Post } from '../lib'
import type { User } from '../lib'

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [editing, setEditing] = useState<Post | null>(null)
  const [userFilter, setUserFilter] = useState<number | 'all'>('all')
  const [q, setQ] = useState('')

  useEffect(() => {
    loadPosts().then(setPosts)
    loadUsers().then(setUsers)
  }, [])

  const filtered = useMemo(() => {
    const base = userFilter === 'all' ? posts : posts.filter((p) => p.userId === userFilter)
    const lower = q.toLowerCase()
    return base.filter((p: any) =>
      (p.baslik || '').toLowerCase().includes(lower) ||
      (p.puf || '').toLowerCase().includes(lower) ||
      (p.malzemeler || []).some((m: string) => String(m).toLowerCase().includes(lower))
    )
  }, [posts, userFilter, q])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const userId = Number(form.get('userId'))
    const baslik = String(form.get('baslik') || '')
    const puf = String(form.get('puf') || '')
    const malzemeler = String(form.get('malzemeler') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (!userId || !baslik) return

    if (editing) {
      const next = { ...editing, userId, baslik, puf, malzemeler }
      updatePost(next)
      setPosts((prev) => prev.map((p) => (p.id === next.id ? next : p)))
      setEditing(null)
    } else {
      const created = createPost({ userId, baslik, puf, malzemeler })
      setPosts((prev) => [...prev, created])
    }
    e.currentTarget.reset()
  }

  function onEdit(post: Post) {
    setEditing(post)
  }

  function onDelete(id: number) {
    deletePost(id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <h2>Tarifler</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr 1fr auto', gap: 8, margin: '12px 0' }}>
        <select name="userId" defaultValue={editing?.userId ?? ''}>
          <option value="" disabled>
            Şef Seçin
          </option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <input name="baslik" placeholder="Tarif Başlığı" defaultValue={(editing as any)?.baslik} />
        <input name="puf" placeholder="Püf Noktası" defaultValue={(editing as any)?.puf} />
        <input name="malzemeler" placeholder="Malzemeler (ör: tavuk, patates)" defaultValue={(editing as any)?.malzemeler?.join(', ')} />
        <button type="submit">{editing ? 'Güncelle' : 'Ekle'}</button>
      </form>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <label style={{ marginRight: 8 }}>Şef Filtresi:</label>
        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
          <option value="all">Tümü</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <input placeholder="Ara (başlık, püf, malzeme)" value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1 }} />
      </div>

      <div style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        alignItems: 'stretch'
      }}>
        {filtered.map((p) => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>#{p.id} · {users.find((u) => u.id === p.userId)?.name || p.userId}</div>
              <div style={{ marginTop: 6, fontSize: 18, fontWeight: 700 }}>{(p as any).baslik}</div>
              <div style={{ marginTop: 6 }}>
                <strong>Malzemeler</strong>
                <ul style={{ margin: '6px 0 0 18px' }}>
                  {((p as any).malzemeler || []).map((m: any, idx: number) => (
                    <li key={idx}>{m.miktar} {m.ad}</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>Tarif</strong>
                <ol style={{ margin: '6px 0 0 18px' }}>
                  {((p as any).adimlar || []).map((a: string, idx: number) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ol>
                <div style={{ marginTop: 6, opacity: 0.8 }}>
                  {((p as any).sicaklikC) ? `Sıcaklık: ${(p as any).sicaklikC}°C` : ''}
                  {((p as any).sureDakika) ? ` · Süre: ${(p as any).sureDakika} dk` : ''}
                  {((p as any).porsiyon) ? ` · Porsiyon: ${(p as any).porsiyon}` : ''}
                  {((p as any).kalori) ? ` · Kalori: ${(p as any).kalori} kcal` : ''}
                  {((p as any).zorluk) ? ` · Zorluk: ${(p as any).zorluk}` : ''}
                </div>
              </div>
              <div style={{ marginTop: 6 }}>En püf noktası: {(p as any).puf}</div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={() => onEdit(p)}>Düzenle</button>
              <button onClick={() => onDelete(p.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


