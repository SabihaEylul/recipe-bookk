export type User = {
  id: number
  name: string
  username: string
  email: string
}

export type Post = {
  userId: number
  id: number
  baslik: string
  puf: string
  malzemeler: { ad: string; miktar: string }[]
  adimlar: string[]
  sicaklikC?: number
  sureDakika?: number
  porsiyon?: number
  kalori?: number
  zorluk?: 'Kolay' | 'Orta' | 'Zor'
  kategori?: string
}

const LS_KEYS = {
  users: 'dv_users',
  posts: 'dv_posts',
  profile: 'dv_profile',
}

function readLocal<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  return raw ? (JSON.parse(raw) as T) : null
}

function writeLocal<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export async function loadUsers(): Promise<User[]> {
  const cached = readLocal<User[]>(LS_KEYS.users)
  if (cached) {
    const turkified = turkifyUsers(cached)
    writeLocal(LS_KEYS.users, turkified)
    return turkified
  }
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data: User[] = await res.json()
  const users = turkifyUsers(data)
  writeLocal(LS_KEYS.users, users)
  return users
}

export async function loadPosts(): Promise<Post[]> {
  const cached = readLocal<Post[]>(LS_KEYS.posts)
  if (cached) {
    const turkified = turkifyPosts(cached)
    writeLocal(LS_KEYS.posts, turkified)
    return turkified
  }
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data: Post[] = await res.json()
  const posts = turkifyPosts(data)
  writeLocal(LS_KEYS.posts, posts)
  return posts
}

function turkifyUsers(arr: User[]): User[] {
  const turkishNames = [
    'Ayşe Yılmaz',
    'Mehmet Demir',
    'Elif Kaya',
    'Mustafa Çetin',
    'Zeynep Karakaş',
    'Ahmet Şahin',
    'Fatma Aydın',
    'Emre Koç',
    'İrem Arslan',
    'Ali Özkan',
  ]
  return arr.map((u, i) => {
    const name = turkishNames[(u.id - 1) % turkishNames.length] ?? turkishNames[i % turkishNames.length]
    const username = name
      .toLowerCase()
      .replace(/[^a-zğüşöçı0-9]+/g, '-')
      .replace(/^-|-$|--+/g, '-')
    const email = `${username.replace(/-/g, '')}@ornek.com`
    return { id: u.id, name, username, email }
  })
}

function turkifyPosts(arr: any[]): Post[] {
  const basliklar = [
    'Fırında Tavuk Baget',
    'Zeytinyağlı Enginar',
    'Kremalı Makarna',
    'Simit Poğaça',
    'Mercimek Çorbası',
    'Kabak Mücver',
    'Mangal Köfte',
    'Tavada Somon',
    'Mozaik Pasta',
    'Sütlaç',
  ]
  const pufler = [
    'Tepsiyi önceden ısıt; derisi çıtır olur.',
    'Enginarı limonlu suda beklet; rengi korunur.',
    'Makarnayı sosla birlikte son 2 dk pişir.',
    'Hamuru 10 dk dinlendir; daha kabarık olur.',
    'Soğanı düşük ısıda uzun kavur; lezzet derinleşir.',
    'Rendeyi iri kullan; daha az yağ çeker.',
    'Köfteye biraz soda ekle; daha yumuşak olur.',
    'Somonu çok çevirmeden mühürle.',
    'Bisküviyi çok ufaltma; doku kalsın.',
    'Piştikten sonra 10 dk dinlendir.',
  ]
  const malzemeHavuzu: { ad: string; miktar: string }[][] = [
    [
      { ad: 'tavuk', miktar: '600 g' },
      { ad: 'patates', miktar: '3 adet' },
      { ad: 'zeytinyağı', miktar: '2 yemek kaşığı' },
      { ad: 'tuz', miktar: '1 çay kaşığı' },
      { ad: 'karabiber', miktar: '1 çay kaşığı' },
    ],
    [
      { ad: 'enginar', miktar: '4 adet' },
      { ad: 'zeytinyağı', miktar: '4 yemek kaşığı' },
      { ad: 'limon', miktar: '1 adet' },
      { ad: 'tuz', miktar: '1 çay kaşığı' },
    ],
    [
      { ad: 'makarna', miktar: '300 g' },
      { ad: 'krema', miktar: '200 ml' },
      { ad: 'tereyağı', miktar: '1 yemek kaşığı' },
      { ad: 'peynir', miktar: '50 g' },
      { ad: 'tuz', miktar: '1 çay kaşığı' },
    ],
    [
      { ad: 'un', miktar: '3 su bardağı' },
      { ad: 'süt', miktar: '1 su bardağı' },
      { ad: 'şeker', miktar: '1 yemek kaşığı' },
      { ad: 'maya', miktar: '1 paket' },
      { ad: 'susam', miktar: '2 yemek kaşığı' },
    ],
    [
      { ad: 'mercimek', miktar: '1 su bardağı' },
      { ad: 'soğan', miktar: '1 adet' },
      { ad: 'tereyağı', miktar: '1 yemek kaşığı' },
      { ad: 'un', miktar: '1 yemek kaşığı' },
      { ad: 'tuz', miktar: '1 çay kaşığı' },
    ],
    [
      { ad: 'kabak', miktar: '3 adet' },
      { ad: 'yumurta', miktar: '2 adet' },
      { ad: 'un', miktar: '3 yemek kaşığı' },
      { ad: 'dereotu', miktar: 'yarım demet' },
      { ad: 'tuz', miktar: '1 çay kaşığı' },
    ],
    [
      { ad: 'kıyma', miktar: '500 g' },
      { ad: 'soğan', miktar: '1 adet' },
      { ad: 'ekmek içi', miktar: '1 su bardağı' },
      { ad: 'soda', miktar: '2 yemek kaşığı' },
      { ad: 'tuz', miktar: '1 çay kaşığı' },
    ],
    [
      { ad: 'somon', miktar: '2 dilim' },
      { ad: 'zeytinyağı', miktar: '1 yemek kaşığı' },
      { ad: 'limon', miktar: 'yarım adet' },
      { ad: 'tuz', miktar: '1 çay kaşığı' },
      { ad: 'karabiber', miktar: 'yarım çay kaşığı' },
    ],
    [
      { ad: 'bisküvi', miktar: '2 paket' },
      { ad: 'tereyağı', miktar: '100 g' },
      { ad: 'kakao', miktar: '2 yemek kaşığı' },
      { ad: 'süt', miktar: '1 çay bardağı' },
    ],
    [
      { ad: 'pirinç', miktar: '1 çay bardağı' },
      { ad: 'süt', miktar: '1 litre' },
      { ad: 'şeker', miktar: '1 çay bardağı' },
      { ad: 'tarçın', miktar: 'isteğe bağlı' },
    ],
  ]
  const adimHavuzu: string[][] = [
    ['Fırını 200°C ısıt.', 'Tavuğu baharatla karıştır.', 'Tepsiye diz ve 35 dk pişir.'],
    ['Enginarları temizle.', 'Zeytinyağı, limon ve tuzla harmanla.', '20 dk kısık ateşte pişir.'],
    ['Makarnayı haşla.', 'Krema ve tereyağıyla sos hazırla.', 'Sosla 2 dk birlikte pişir.'],
    ['Hamuru yoğur ve dinlendir.', 'Şekil ver, susama batır.', '180°C fırında 18 dk pişir.'],
    ['Soğanı kavur.', 'Mercimeği ekle ve suyla kaynat.', 'Blenderdan geçir ve 5 dk kaynat.'],
    ['Kabakları rendele ve suyunu sık.', 'Yumurta ve unla karıştır.', 'Az yağda iki yüzünü kızart.'],
    ['Harç hazırla.', 'Köfteleri şekillendir.', 'Izgarada her yüz 3-4 dk pişir.'],
    ['Somonu tuzla yağla.', 'Tavada mühürle.', 'Yanlarını 2-3 dk pişir.'],
    ['Bisküviyi kır.', 'Kakao ve sütle karıştır.', 'Rulo yap ve buzdolabında dinlendir.'],
    ['Pirinci yıka.', 'Süt ve şekerle kaynat.', 'Fırında üstünü kızart.'],
  ]
  const sicakliklar = [200, undefined, undefined, 180, undefined, undefined, undefined, undefined, undefined, 190]
  const sureler = [35, 20, 12, 18, 25, 12, 10, 8, 0, 20]
  return arr.map((p: any, i: number) => ({
    userId: p.userId,
    id: p.id,
    baslik: basliklar[(p.id - 1) % basliklar.length] ?? basliklar[i % basliklar.length],
    puf: pufler[(p.id - 1) % pufler.length] ?? pufler[i % pufler.length],
    malzemeler: malzemeHavuzu[(p.id - 1) % malzemeHavuzu.length] ?? malzemeHavuzu[i % malzemeHavuzu.length],
    adimlar: adimHavuzu[(p.id - 1) % adimHavuzu.length] ?? adimHavuzu[i % adimHavuzu.length],
    sicaklikC: sicakliklar[(p.id - 1) % sicakliklar.length],
    sureDakika: sureler[(p.id - 1) % sureler.length],
  }))
}

export function createUser(user: Omit<User, 'id'>): User {
  const users = readLocal<User[]>(LS_KEYS.users) ?? []
  const next: User = { ...user, id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1 }
  const updated = [...users, next]
  writeLocal(LS_KEYS.users, updated)
  return next
}

export function updateUser(updatedUser: User) {
  const users = readLocal<User[]>(LS_KEYS.users) ?? []
  writeLocal(
    LS_KEYS.users,
    users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
  )
}

export function deleteUser(id: number) {
  const users = readLocal<User[]>(LS_KEYS.users) ?? []
  writeLocal(
    LS_KEYS.users,
    users.filter((u) => u.id !== id),
  )
}

export function createPost(post: Omit<Post, 'id'>): Post {
  const posts = readLocal<Post[]>(LS_KEYS.posts) ?? []
  const next: Post = { ...post, id: posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1 }
  const updated = [...posts, next]
  writeLocal(LS_KEYS.posts, updated)
  return next
}

export function updatePost(updatedPost: Post) {
  const posts = readLocal<Post[]>(LS_KEYS.posts) ?? []
  writeLocal(
    LS_KEYS.posts,
    posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
  )
}

export function deletePost(id: number) {
  const posts = readLocal<Post[]>(LS_KEYS.posts) ?? []
  writeLocal(
    LS_KEYS.posts,
    posts.filter((p) => p.id !== id),
  )
}

export type Profile = { firstName: string; lastName: string; email?: string }

export function readProfile(): Profile | null {
  return readLocal<Profile>(LS_KEYS.profile)
}

export function saveProfile(profile: Profile) {
  writeLocal(LS_KEYS.profile, profile)
}


