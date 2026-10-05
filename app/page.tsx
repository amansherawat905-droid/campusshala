'use client';
import { useState } from 'react';

type Role = 'student' | 'organizer' | 'faculty';
type Tab = 'dashboard' | 'events' | 'clubs' | 'approvals';

interface EventItem {
  id: number;
  title: string;
  club: string;
  date: string;
  category: string;
  status: 'Approved' | 'Pending';
}

export default function CampusShalaApp() {
  const [role, setRole] = useState<Role>('student');
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [events, setEvents] = useState<EventItem[]>([
    { id: 1, title: 'TechNova Hackathon 2026', club: 'CodeGeeks MUJ', date: '15 Oct 2026', category: 'Technical', status: 'Approved' },
    { id: 2, title: 'Oneiros Cultural Fest', club: 'Cultural Society', date: '22 Oct 2026', category: 'Cultural', status: 'Approved' },
    { id: 3, title: 'RoboWars Arena', club: 'Robotics Club', date: '05 Nov 2026', category: 'Technical', status: 'Pending' },
  ]);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventClub, setNewEventClub] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsLoggedIn(true);
      setCurrentTab('dashboard');
    } else {
      alert('Kripya valid email aur password bharein!');
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && newEventClub) {
      const newItem: EventItem = {
        id: events.length + 1,
        title: newEventTitle,
        club: newEventClub,
        date: '30 Nov 2026',
        category: 'General',
        status: role === 'faculty' ? 'Approved' : 'Pending',
      };
      setEvents([newItem, ...events]);
      setNewEventTitle('');
      setNewEventClub('');
      alert('Event successfully submitted in the system!');
    }
  };

  const approveEvent = (id: number) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, status: 'Approved' } : ev));
  };

  // 1. LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen relative overflow-hidden bg-[#050507] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-rose-900/20 rounded-full blur-[180px] pointer-events-none"></div>

        <div className="w-full max-w-md p-8 rounded-3xl bg-neutral-950/90 backdrop-blur-3xl border border-red-600/45 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10">
          <div className="text-center mb-6">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-red-600/20 text-red-500 rounded border border-red-600/40">
              MUJ UNIFIED ECOSYSTEM
            </span>
            <h1 className="text-3xl font-black tracking-wider uppercase mt-3 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
              CAMPUSSHALA
            </h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Select Role & Authenticate</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {(['student', 'organizer', 'faculty'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition border ${
                  role === r
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-300">University Mail</label>
              <input
                type="email"
                required
                placeholder="name@muj.manipal.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded-xl text-xs outline-none text-white font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-300">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded-xl text-xs outline-none text-white font-medium"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition cursor-pointer"
            >
              LOGIN TO {role.toUpperCase()} PORTAL &rarr;
            </button>
          </form>
        </div>
      </main>
    );
  }

  // 2. DASHBOARD / INNER INTERFACES SCREEN
  return (
    <main className="min-h-screen relative bg-[#050507] text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            CAMPUSSHALA <span className="text-xs px-2 py-0.5 rounded bg-red-600/20 text-red-500 border border-red-600/40 not-italic uppercase">{role}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-semibold hidden md:inline">MUJ Campus Network</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider text-red-500 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main App Layout */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto p-6 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-64 hidden md:flex flex-col gap-2">
          <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 mb-4">
            <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Active Session</p>
            <p className="text-sm font-bold text-white truncate mt-0.5">{email}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-red-600/20 text-red-500 text-[10px] font-black uppercase rounded border border-red-600/30">
              Role: {role}
            </span>
          </div>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
              currentTab === 'dashboard' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            📊 System Dashboard
          </button>

          <button
            onClick={() => setCurrentTab('events')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
              currentTab === 'events' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            🎉 Events & Registrations
          </button>

          {(role === 'organizer' || role === 'faculty') && (
            <button
              onClick={() => setCurrentTab('clubs')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                currentTab === 'clubs' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              ⚡ Manage Club Events
            </button>
          )}

          {role === 'faculty' && (
            <button
              onClick={() => setCurrentTab('approvals')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                currentTab === 'approvals' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              ✅ Pending Approvals
            </button>
          )}
        </aside>

        {/* Content Workspace */}
        <section className="flex-1 flex flex-col gap-6">
          
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
            <button onClick={() => setCurrentTab('dashboard')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${currentTab === 'dashboard' ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400'}`}>Dashboard</button>
            <button onClick={() => setCurrentTab('events')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${currentTab === 'events' ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400'}`}>Events</button>
            {(role === 'organizer' || role === 'faculty') && <button onClick={() => setCurrentTab('clubs')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${currentTab === 'clubs' ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400'}`}>Manage</button>}
            {role === 'faculty' && <button onClick={() => setCurrentTab('approvals')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${currentTab === 'approvals' ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400'}`}>Approvals</button>}
          </div>

          {/* TAB 1: DASHBOARD */}
          {currentTab === 'dashboard' && (
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Welcome to your <span className="text-red-500">Command Center</span></h2>
                <p className="text-neutral-400 text-sm max-w-xl mb-6">Manage all campus activities, track fest registrations, and execute club operations seamlessly with high-performance metrics.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Active Events</p>
                    <p className="text-3xl font-black text-white mt-1">{events.length}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">System Status</p>
                    <p className="text-xl font-black text-emerald-400 mt-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Access Level</p>
                    <p className="text-xl font-black text-red-500 mt-2 uppercase">{role} ALPHA</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVENTS & REGISTRATIONS */}
          {currentTab === 'events' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider">Live Campus Events</h3>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider mt-0.5">Explore & register for upcoming fests</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev) => (
                  <div key={ev.id} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-red-600/50 transition flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-red-600/20 text-red-500 rounded border border-red-600/30">
                          {ev.category}
                        </span>
                        <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded border ${ev.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                          {ev.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-wide">{ev.title}</h4>
                      <p className="text-xs text-neutral-400 font-medium mt-1">Organized by <span className="text-white">{ev.club}</span> • {ev.date}</p>
                    </div>

                    <button 
                      onClick={() => alert(`Successfully registered for ${ev.title}! Pass generated.`)}
                      className="w-full py-2.5 bg-neutral-950 hover:bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-xl border border-neutral-800 hover:border-red-600 transition cursor-pointer"
                    >
                      Register Now &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLUB / ORGANIZER MANAGE */}
          {currentTab === 'clubs' && (
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <h3 className="text-xl font-black uppercase tracking-wider mb-1">Launch New Event</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-4">Submit your club event for administrative review</p>

                <form onSubmit={handleCreateEvent} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-300">Event Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI Symposium 2026"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      className="px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-xs outline-none text-white font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-300">Club / Society Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Google Developer Student Club"
                      value={newEventClub}
                      onChange={(e) => setNewEventClub(e.target.value)}
                      className="px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-xs outline-none text-white font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition cursor-pointer"
                  >
                    Submit Event Proposal &rarr;
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: FACULTY APPROVALS */}
          {currentTab === 'approvals' && role === 'faculty' && (
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-black uppercase tracking-wider">Pending Event Approvals</h3>
              <div className="flex flex-col gap-4">
                {events.filter(e => e.status === 'Pending').length === 0 ? (
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">No pending approvals required at this time.</p>
                ) : (
                  events.filter(e => e.status === 'Pending').map((ev) => (
                    <div key={ev.id} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-black uppercase">{ev.title}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">Club: {ev.club} • Date: {ev.date}</p>
                      </div>
                      <button
                        onClick={() => approveEvent(ev.id)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition cursor-pointer"
                      >
                        Approve Event
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </section>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-[10px] font-black uppercase tracking-widest text-neutral-500 py-4 border-t border-neutral-900 mt-auto">
        &copy; 2026 CAMPUSSHALA SYSTEM // MANIPAL UNIVERSITY JAIPUR
      </footer>

    </main>
  );
}