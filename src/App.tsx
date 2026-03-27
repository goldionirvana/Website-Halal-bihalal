/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Clock, Heart, Share2, Music, Music2, Volume2, VolumeX, Moon, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const EVENT_DETAILS = {
  title: "Halal Bihalal",
  subtitle: "Store Operational & Store Development",
  quote: "Kerja Keras Menyatukan, Silaturahmi Menguatkan",
  location: "Panderman Resto by El Hotel Malang",
  address: "Jl. Bukit Palem Raya No.1-3, Karanglo, Kec. Singosari, Kabupaten Malang, Jawa Timur 65153",
  date: "12 April 2026",
  time: "11.00 WIB – Selesai",
  googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Halal+Bihalal+Store+Ops+%26+Dev&details=Halal+Bihalal+Store+Operational+%26+Store+Development&location=El+Hotel+Malang&dates=20260412T040000Z/20260412T090000Z",
  mapsLink: "https://maps.app.goo.gl/W4UyiFxFBPAXS5Dr5",
  audioUrl: "https://assets.mixkit.co/music/preview/mixkit-islamic-dream-614.mp3", // Islamic Instrumental
};

const IslamicOrnament = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const targetDate = new Date("2026-04-12T11:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Auto play music when opened (if browser allows)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Auto-play blocked:", e));
      }
    }, 500);
  };

  if (!isOpened) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#064e3b] text-[#f5f2ed] p-6 text-center overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-md w-full space-y-10 relative z-10"
        >
          <div className="flex justify-center gap-4 opacity-40">
            <Moon className="w-6 h-6" />
            <Star className="w-6 h-6" />
            <Moon className="w-6 h-6" />
          </div>

          <div className="space-y-4">
            <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#d4af37]">Assalamu'alaikum Wr. Wb.</p>
            <h1 className="serif text-5xl md:text-6xl font-light leading-tight">Halal Bihalal</h1>
            <p className="text-xs tracking-[0.2em] opacity-70 uppercase">{EVENT_DETAILS.subtitle}</p>
          </div>

          <div className="relative h-72 w-full rounded-t-full overflow-hidden border-2 border-[#d4af37]/30 p-2">
            <div className="w-full h-full rounded-t-full overflow-hidden">
              <img
                src="https://disparekrafbudpora.gresikkab.go.id/content/uploads/gacoan.jpg"
                alt="Background"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm italic opacity-60">Kepada Bapak/Ibu/Saudara/i</p>
            <button
              onClick={handleOpenInvitation}
              className="group relative px-12 py-4 bg-[#d4af37] text-[#064e3b] rounded-full overflow-hidden transition-all hover:bg-[#fcf6ba] font-bold shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-3 tracking-[0.2em] text-xs">
                BUKA UNDANGAN
              </span>
            </button>
          </div>
        </motion.div>

        {/* Decorative Ornaments */}
        <IslamicOrnament className="absolute -top-10 -left-10 w-40 h-40 text-[#d4af37] opacity-20 rotate-45" />
        <IslamicOrnament className="absolute -bottom-10 -right-10 w-40 h-40 text-[#d4af37] opacity-20 -rotate-45" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-[#064e3b] selection:text-[#f5f2ed] overflow-x-hidden">
      <audio ref={audioRef} src={EVENT_DETAILS.audioUrl} loop />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden bg-[#064e3b]">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://disparekrafbudpora.gresikkab.go.id/content/uploads/gacoan.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b] via-transparent to-[#064e3b]" />
        </motion.div>

        <div className="relative z-10 space-y-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-center gap-2 text-[#d4af37] opacity-60">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="uppercase tracking-[0.5em] text-[10px] font-bold text-[#d4af37]">Silaturahmi Keluarga Besar</p>
            <h1 className="serif text-7xl md:text-9xl font-light tracking-tighter leading-none text-[#f5f2ed]">
              Halal <br /> <span className="italic text-[#d4af37]">Bihalal</span>
            </h1>
            <div className="h-px w-32 bg-[#d4af37]/40 mx-auto my-8" />
            <p className="text-lg md:text-xl tracking-widest font-light text-[#f5f2ed]/80 uppercase">
              {EVENT_DETAILS.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="serif italic text-2xl md:text-3xl text-[#d4af37] max-w-lg mx-auto leading-relaxed"
          >
            "{EVENT_DETAILS.quote}"
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#d4af37] opacity-40"
        >
          <div className="w-px h-16 bg-current mx-auto" />
        </motion.div>
      </section>

      {/* Opening Verse */}
      <section className="py-24 px-6 text-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8 relative z-10"
        >
          <IslamicOrnament className="w-12 h-12 mx-auto text-[#d4af37] opacity-30" />
          <p className="serif text-2xl md:text-3xl text-[#064e3b] leading-relaxed">
            "Dan bertakwalah kepada Allah yang dengan (mempergunakan) nama-Nya kamu saling meminta satu sama lain, dan (peliharalah) hubungan silaturahmi. Sesungguhnya Allah selalu menjaga dan mengawasi kamu."
          </p>
          <p className="text-xs font-bold tracking-widest opacity-40 uppercase">(QS. An-Nisa: 1)</p>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[#d4af37]" />
              <h2 className="serif text-5xl font-light text-[#064e3b]">Waktu & Tempat</h2>
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-md">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengharapkan kehadiran Bapak/Ibu/Rekan-rekan dalam acara Halal Bihalal ini.
            </p>
          </div>

          <div className="grid gap-8">
            {[
              { icon: Calendar, label: "Hari & Tanggal", value: EVENT_DETAILS.date },
              { icon: Clock, label: "Waktu Pelaksanaan", value: EVENT_DETAILS.time },
              { icon: MapPin, label: "Lokasi Acara", value: EVENT_DETAILS.location, sub: EVENT_DETAILS.address },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="p-4 rounded-xl bg-[#064e3b]/5 text-[#064e3b] transition-colors group-hover:bg-[#064e3b] group-hover:text-white">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#d4af37] mb-1">{item.label}</p>
                  <p className="text-xl font-medium text-[#064e3b]">{item.value}</p>
                  {item.sub && <p className="text-xs opacity-60 mt-2 max-w-xs">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 border-2 border-[#d4af37]/20 rounded-[40px] -rotate-3" />
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="https://pix10.agoda.net/hotelImages/536337/-1/7ebe389394e90a4df754dd15303aa3f4.jpg?ce=0&s=414x232"
              alt="Event Venue"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/40 to-transparent" />
          </div>
          <IslamicOrnament className="absolute -bottom-8 -right-8 w-24 h-24 text-[#d4af37] drop-shadow-lg" />
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="bg-[#064e3b] text-[#f5f2ed] py-32 px-6 text-center overflow-hidden relative">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-16">
          <div className="space-y-4">
            <h3 className="serif text-4xl md:text-5xl font-light italic text-[#d4af37]">Menuju Hari Kemenangan</h3>
            <p className="text-xs tracking-[0.3em] opacity-60 uppercase">Insya Allah akan dilaksanakan dalam:</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="serif text-7xl md:text-9xl font-light text-[#d4af37]">{String(item.value).padStart(2, '0')}</div>
                <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mt-4">{item.label}</div>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-[#d4af37]/20 text-4xl">:</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-32 px-6 text-center space-y-16 bg-white relative">
        <div className="absolute inset-0 islamic-pattern opacity-5" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-8 relative z-10"
        >
          <div className="flex justify-center gap-4 text-[#d4af37]">
            <Moon className="w-8 h-8 fill-current opacity-20" />
            <Heart className="w-8 h-8 text-[#064e3b]" />
            <Moon className="w-8 h-8 fill-current opacity-20" />
          </div>
          <h2 className="serif text-5xl font-light text-[#064e3b]">Konfirmasi Kehadiran</h2>
          <p className="text-sm opacity-60 leading-relaxed max-w-lg mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk bersilaturahmi.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "#065f46" }}
            whileTap={{ scale: 0.95 }}
            href={EVENT_DETAILS.googleCalendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-10 py-5 bg-[#064e3b] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-2xl shadow-[#064e3b]/20"
          >
            <Calendar className="w-5 h-5" />
            Simpan Tanggal
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, borderColor: "#064e3b", color: "#064e3b" }}
            whileTap={{ scale: 0.95 }}
            href={EVENT_DETAILS.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-10 py-5 border-2 border-[#d4af37] text-[#d4af37] rounded-full text-xs font-bold tracking-widest uppercase transition-all"
          >
            <MapPin className="w-5 h-5" />
            Petunjuk Lokasi
          </motion.a>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 px-6 text-center bg-[#fdfbf7] border-t border-[#064e3b]/5">
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-sm opacity-70 leading-relaxed">
            Atas kehadiran dan perhatiannya, kami ucapkan terima kasih yang sebesar-besarnya.
          </p>
          <p className="serif text-3xl text-[#064e3b]">Wassalamu'alaikum Wr. Wb.</p>
          
          <div className="pt-12 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#d4af37]">Hormat Kami,</p>
            <p className="serif text-2xl font-light text-[#064e3b]">{EVENT_DETAILS.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#064e3b] text-[#f5f2ed]/40 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em]">
          &copy; 2026 Store Operational & Store Development
        </div>
      </footer>

      {/* Floating Controls */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="w-14 h-14 rounded-full bg-white text-[#064e3b] flex items-center justify-center shadow-2xl border border-[#064e3b]/10"
        >
          {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 opacity-40" />}
        </motion.button>
      </div>
    </div>
  );
}
