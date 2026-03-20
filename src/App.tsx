import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Settings, 
  Maximize, 
  Tv, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Gamepad2, 
  Send,
  MessageCircle,
  ThumbsUp,
  Share2,
  User,
  CheckCircle2,
  Clock
} from 'lucide-react';

const DIRECT_LINK = "https://lofij.com/af?o=fa87a6dd86c2b51cd664f9c90bafc6ca:3e11b53af2124c080986968e236e2a1b&img=332&kw=333";

const IMAGES = [
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1920&auto=format&fit=crop"
];

const INITIAL_COMMENTS = [
  { id: 1, user: "John Smith", text: "Amazing quality! Loving the show from California 🇺🇸", time: "2m ago", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, user: "Sarah Wilson", text: "Finally a working link for the awards! Watching from London 🇬🇧", time: "5m ago", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, user: "Michael Brown", text: "The performance was incredible! 4K is super clear.", time: "8m ago", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, user: "Emily Davis", text: "USA traffic here, works perfectly! No lag at all.", time: "12m ago", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, user: "David Miller", text: "Best live stream site so far. Thanks for sharing!", time: "15m ago", avatar: "https://i.pravatar.cc/150?u=5" },
];

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(1);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");

  // Carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Timer logic for clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fake notification logic
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ["Alex", "Jessica", "Ryan", "Sophia", "Daniel", "Olivia"];
      const actions = ["just liked the stream", "commented: Wow!", "is watching from NY", "just shared the link"];
      const newNotif = {
        id: Date.now(),
        text: `${names[Math.floor(Math.random() * names.length)]} ${actions[Math.floor(Math.random() * actions.length)]}`,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      };
      setNotifications((prev) => [newNotif, ...prev.slice(0, 2)]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter(n => n.id !== newNotif.id));
      }, 5000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: "Guest User",
      text: newComment,
      time: "Just now",
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleAction = () => {
    setIsRedirecting(true);
    setCountdown(1);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.open(DIRECT_LINK, '_blank');
          setIsRedirecting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-sans">
      <main className="w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center gap-2">
            iHeartRadio Music <span className="text-red-600">🔴 Live</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm md:text-base">
            TV Channel HD - iHeartRadio Music Awards (LA) – March 26, 2026
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 group">
          {/* Carousel Images */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={IMAGES[currentImageIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>

          {/* Overlays */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              LIVE
            </div>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="bg-black/60 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded border border-white/20">
              HD 4K
            </div>
          </div>

          {/* Center Play Button */}
          <button 
            onClick={handleAction}
            className="absolute inset-0 flex items-center justify-center group/play"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover/play:scale-110 duration-300">
              <Play className="w-8 h-8 md:w-12 md:h-12 text-white fill-current ml-1" />
            </div>
          </button>

          {/* Player Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-zinc-700 rounded-full mb-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-red-600"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={handleAction} className="text-white hover:text-red-500 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </button>
                <div className="text-white text-xs font-mono">
                  {currentTime}
                </div>
                <button className="text-white hover:text-red-500 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-[10px] font-bold">
                  <Settings className="w-3 h-3" />
                  HD
                </div>
                <button className="text-white hover:text-red-500 transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Redirect Overlay */}
          <AnimatePresence>
            {isRedirecting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
              >
                <div className="text-white text-xl font-bold mb-4">Connecting to Secure Server...</div>
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-zinc-400 mt-4">Redirecting in {countdown}s</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAction}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 text-lg uppercase tracking-wider transition-all"
          >
            <Tv className="w-6 h-6" />
            GO LIVE
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAction}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 text-lg uppercase tracking-wider transition-all"
          >
            <Play className="w-6 h-6 fill-current" />
            WATCH LIVE NOW
          </motion.button>
        </div>

        {/* Features Text */}
        <div className="mt-8 text-center max-w-3xl">
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            Live Stream on Today Stream Online, TV Coverage, Replays, Highlights from Anywhere at Anytime. 
            Optimized for PC, Mac, iPad, iPhone, Android, PS4, Xbox One, and Smart TVs.
          </p>
          
          {/* Device Icons */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 opacity-60">
            <div className="flex flex-col items-center gap-1">
              <Monitor className="w-6 h-6" />
              <span className="text-[10px] uppercase">PC/Mac</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Smartphone className="w-6 h-6" />
              <span className="text-[10px] uppercase">Mobile</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Tablet className="w-6 h-6" />
              <span className="text-[10px] uppercase">Tablet</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Gamepad2 className="w-6 h-6" />
              <span className="text-[10px] uppercase">Console</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Tv className="w-6 h-6" />
              <span className="text-[10px] uppercase">Smart TV</span>
            </div>
          </div>
        </div>

        {/* Secondary Action */}
        <div className="mt-12 w-full flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAction}
            className="w-full max-w-md bg-zinc-100 text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 text-lg hover:bg-white transition-colors"
          >
            CREATE A FREE ACCOUNT
          </motion.button>
          
          <a 
            href="https://t.me/+14O_azoxb-U4MDVl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            Join our Telegram for Live Links
          </a>
        </div>

        {/* Comments Section */}
        <div className="w-full bg-zinc-900/30 rounded-2xl p-6 border border-zinc-800 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-red-500" />
              Live Chat & Comments
            </h2>
            <div className="text-zinc-500 text-sm">2,482 people watching</div>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <img 
                  src={comment.avatar} 
                  alt={comment.user} 
                  className="w-10 h-10 rounded-full border border-zinc-700"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{comment.user}</span>
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                    <span className="text-zinc-500 text-[10px]">{comment.time}</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="text-zinc-500 hover:text-white flex items-center gap-1 text-[10px] uppercase font-bold">
                      <ThumbsUp className="w-3 h-3" /> Like
                    </button>
                    <button className="text-zinc-500 hover:text-white flex items-center gap-1 text-[10px] uppercase font-bold">
                      <Share2 className="w-3 h-3" /> Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="mt-8 pt-8 border-t border-zinc-800 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-6 h-6 text-zinc-500" />
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a public comment..." 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Floating Notifications */}
      <div className="fixed bottom-4 left-4 z-[100] space-y-2">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg flex items-center gap-3 shadow-2xl min-w-[240px]"
            >
              <img 
                src={notif.avatar} 
                alt="user" 
                className="w-8 h-8 rounded-full border border-white/20"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs text-white font-medium">{notif.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-zinc-900 bg-black/50 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tv className="w-5 h-5 text-red-600" />
            <span className="font-bold tracking-tighter">iHeartRadio Live</span>
          </div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            © 2026 iHeartMedia, Inc. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-zinc-500 text-[10px]">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">DMCA</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
