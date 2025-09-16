import { useEffect, useMemo, useState } from 'react'
import { loadPosts } from '../lib'
import type { Post } from '../lib'

export default function Ingredients() {
  const [malzemelerim, setMalzemelerim] = useState<string>('')
  const [tarifler, setTarifler] = useState<Post[]>([])

  useEffect(() => {
    loadPosts().then(setTarifler)
  }, [])

  const eldeki = useMemo(() => (
    malzemelerim
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  ), [malzemelerim])

  const oneriler = useMemo(() => {
    if (!eldeki.length) return [] as Post[]
    return tarifler
      .map((t) => ({
        t,
        puan: (t as any).malzemeler?.reduce((acc: number, m: string) => acc + (eldeki.includes(m.toLowerCase()) ? 1 : 0), 0) || 0,
      }))
      .filter((x) => x.puan > 0)
      .sort((a, b) => b.puan - a.puan)
      .map((x) => x.t)
  }, [tarifler, eldeki])

  return (
    <div>
      <h2>Malzemelerim</h2>
      <input
        placeholder="Elindeki malzemeleri virgülle yaz (örn: tavuk, patates, zeytinyağı)"
        value={malzemelerim}
        onChange={(e) => setMalzemelerim(e.target.value)}
        style={{ width: '100%', margin: '12px 0' }}
      />

      <div style={{ display: 'grid', gap: 8 }}>
        {oneriler.map((p) => (
          <div key={p.id} style={{ border: '1px solid #2a2f3a', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{(p as any).baslik}</div>
            <div style={{ marginTop: 4 }}>Püf Noktası: {(p as any).puf}</div>
            <small>Malzemeler: {(p as any).malzemeler?.join(', ')}</small>
          </div>
        ))}
        {!oneriler.length && <small>Malzeme girdiğinde uygun tarifleri burada önereceğiz.</small>}
      </div>
    </div>
  )
}


