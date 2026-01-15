"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, X, Calendar } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  panitia: string;
  imageUrl?: string | null;
};

type EventForm = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  panitia: string;
  image: File | null;
};

const EMPTY_FORM: EventForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  panitia: "",
  image: null,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<EventForm>(EMPTY_FORM);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setEvents([]);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, image: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setPreview(null);
    setEditId(null);
    setApiError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    try {
      let res: Response;

      if (editId) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("date", form.date);
        fd.append("time", form.time);
        fd.append("location", form.location);
        fd.append("panitia", form.panitia);
        if (form.image) {
          fd.append("image", form.image);
        }

        res = await fetch(`/api/events/${editId}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
          if (v) fd.append(k, v as string | Blob);
        });

        res = await fetch("/api/events", {
          method: "POST",
          body: fd,
        });
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal menyimpan");
      }

      resetForm();
      fetchEvents();
      alert(editId ? "Acara berhasil diperbarui" : "Acara berhasil ditambahkan");
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Terjadi kesalahan";
      setApiError(errorMsg);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus acara "${title}"?`)) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      fetchEvents();
      alert("Acara berhasil dihapus");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus acara");
    }
  }

  function handleEdit(ev: Event) {
    setEditId(ev.id);
    setForm({
      title: ev.title,
      description: ev.description,
      date: ev.date.slice(0, 10),
      time: ev.time,
      location: ev.location,
      panitia: ev.panitia,
      image: null,
    });
    setPreview(ev.imageUrl || null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Kelola Acara</h1>
          <p className="text-gray-600">Tambah, edit, atau hapus acara Wihara Chatra</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section - 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editId ? "Edit Acara" : "Tambah Acara Baru"}
                </h2>
                {editId && (
                  <button
                    onClick={resetForm}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {apiError}
                </div>
              )}

              {/* Form Fields */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Acara *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                  placeholder="Contoh: Pelatihan Meditasi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition resize-none"
                  placeholder="Jelaskan detail acara..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jam *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lokasi *
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                  placeholder="Contoh: Ruang Utama Wihara"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Panitia *
                </label>
                <input
                  name="panitia"
                  value={form.panitia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                  placeholder="Contoh: Tim Dharma"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gambar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:cursor-pointer"
                />
              </div>

              {preview && (
                <div className="relative h-48 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {loading ? "Menyimpan..." : editId ? "Perbarui Acara" : "Tambah Acara"}
                </button>
                {editId && (
                  <button
                    onClick={resetForm}
                    className="px-6 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Events List Section - 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Daftar Acara ({events.length})
              </h3>

              {events.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada acara</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-md transition group"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={ev.imageUrl || "/placeholder.jpg"}
                            alt={ev.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 line-clamp-1 text-sm">
                            {ev.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(ev.date).toLocaleDateString("id-ID", {
                              month: "short",
                              day: "numeric",
                            })}
                            {" • "}
                            {ev.time}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {ev.location}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleEdit(ev)}
                              className="flex-1 flex items-center justify-center gap-1 text-xs bg-gray-100 text-gray-700 py-1.5 rounded hover:bg-gray-200 transition"
                            >
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(ev.id, ev.title)}
                              className="flex-1 flex items-center justify-center gap-1 text-xs bg-red-50 text-red-600 py-1.5 rounded hover:bg-red-100 transition"
                            >
                              <Trash2 className="w-3 h-3" />
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}