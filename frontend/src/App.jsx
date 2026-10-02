import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  // Mengambil data dari backend Express saat halaman dimuat
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal terhubung ke backend')
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-8">
      {/* 1. Header Dashboard */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Support System Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Slicing komponen Figma menggunakan React & Tailwind CSS v4</p>
      </div>

      {/* 2. Konten Utama / Tempat Menampilkan Data */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Daftar Pengguna</h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100">
            {error}. Pastikan <code className="bg-red-100 px-1 py-0.5 rounded font-mono text-xs">node server.js</code> sudah dijalankan!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.length === 0 && !error ? (
            <p className="text-slate-400 italic text-sm">Tidak ada data user atau database kosong...</p>
          ) : (
            users.map((user, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400 transition-colors">
                <h3 className="font-semibold text-slate-800">{user.username || user.nama || 'Tanpa Nama'}</h3>
                <p className="text-xs text-slate-500 mt-1">{user.email || 'email@kosong.com'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
