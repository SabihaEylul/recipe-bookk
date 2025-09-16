import { useEffect, useMemo, useState } from 'react'
import { createUser, deleteUser, loadUsers, updateUser, type User } from '../lib'

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [editing, setEditing] = useState<User | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    loadUsers().then(setUsers)
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    )
  }, [users, query])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '')
    const username = String(form.get('username') || '')
    const email = String(form.get('email') || '')
    if (!name || !username || !email) return

    if (editing) {
      const next = { ...editing, name, username, email }
      updateUser(next)
      setUsers((prev) => prev.map((u) => (u.id === next.id ? next : u)))
      setEditing(null)
    } else {
      const created = createUser({ name, username, email })
      setUsers((prev) => [...prev, created])
    }
    e.currentTarget.reset()
  }

  function onEdit(user: User) {
    setEditing(user)
  }

  function onDelete(id: number) {
    deleteUser(id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div>
      <h2>Kullanıcılar</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, margin: '12px 0' }}>
        <input name="name" placeholder="Ad Soyad" defaultValue={editing?.name} />
        <input name="username" placeholder="Kullanıcı Adı" defaultValue={editing?.username} />
        <input name="email" type="email" placeholder="E-Posta" defaultValue={editing?.email} />
        <button type="submit">{editing ? 'Güncelle' : 'Ekle'}</button>
      </form>

      <input placeholder="Ara..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ marginBottom: 8 }} />

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Kullanıcı</th>
              <th>E-Posta</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => onEdit(u)} style={{ marginRight: 6 }}>Düzenle</button>
                  <button onClick={() => onDelete(u.id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


