"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react";

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

export default function Acara() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(`API Error ${res.status}: ${errorData.error || "Unknown error"}`);
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
          setError(null);
        } else {
          setEvents([]);
          setError("Format data tidak valid");
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Gagal memuat acara";
        setError(errorMsg);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">
            Acara
          </h1>
          <p className="text-gray-500">Kegiatan dan acara Wihara Chatra</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from- to-black-600 bg-clip-text text-transparent mb-2">
            Acara
          </h1>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <div className="text-3xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-red-900">Gagal memuat acara</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!Array.isArray(events) || events.length === 0) {
    return (
      <section className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from- to-black-600 bg-clip-text text-transparent mb-2">
            Acara
          </h1>
          <p className="text-gray-600">Kegiatan dan acara Wihara Chatra</p>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">🙏</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum ada acara</h3>
          <p className="text-gray-600">Acara baru akan segera ditampilkan di sini</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="mb-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from- to-black bg-clip-text  mb-2">
          Acara
        </h1>
        <p className="text-gray-600">
          Temukan kegiatan dan acara menarik di Wihara Chatra
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => {
          const eventDate = new Date(event.date);
          const isUpcoming = eventDate > new Date();

          return (
            <article
              key={event.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Status Badge */}
              {isUpcoming && (
                <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Akan Datang
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                <Image
                  src={event.imageUrl || "/images/default-event.jpg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-2 group-hover:text- transition-colors">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text- flex-shrink-0" />
                    <span>
                      {eventDate.toLocaleDateString("id-ID", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text- flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text- flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users className="w-4 h-4 text- flex-shrink-0" />
                    <span className="truncate">{event.panitia}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-gray-200 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg group/btn">
                  <a href={`https://wa.me/6285871154799?text=Halo Admin, saya tertarik dengan acara "${event.title}"...`}>Selengkapnya</a>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}