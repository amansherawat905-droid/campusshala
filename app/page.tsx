'use client';

import React, { useState } from 'react';
import { 
  Shield, QrCode, Calendar, CheckCircle2, Clock, PlusCircle, 
  UserCheck, AlertTriangle, Search, Filter, ArrowRight, Lock, 
  Terminal, Award, DollarSign, Activity, Check, X
} from 'lucide-react';

type Role = 'student' | 'organizer' | 'faculty' | 'admin';

interface EventItem {
  id: string;
  title: string;
  club: string;
  category: string;
  date: string;
  venue: string;
  type: 'Free' | 'Paid';
  price?: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  description: string;
}

export default function CampusShalaEndgame() {
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [activeTab, setActiveTab] = useState<'discover' | 'passport' | 'create' | 'approvals' | 'admin'>('discover');
  
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 'MUJ-EG-01',
      title: 'Quantum Computing & AI Hackathon 2026',
      club: 'Google Developer Group MUJ',
      category: 'Technical',
      date: '15 Oct 2026, 10:00 AM',
      venue: 'Tatrix Lab, AB-1',
      type: 'Free',
      status: 'Approved',
      description: 'A 24-hour hackathon to build timeline-saving algorithms inspired by Stark tech.'
    },
    {
      id: 'MUJ-EG-02',
      title: 'RoboWars Mechatronics Arena',
      club: 'Department of Mechatronics',
      category: 'Workshop',
      date: '20 Oct 2026, 02:00 PM',
      venue: 'IoT Fab Lab',
      type: 'Paid',
      price: 250,
      status: 'Pending',
      description: 'Battle bots across structured testing tracks with Arduino & RPi integration.'
    },
    {
      id: 'MUJ-EG-03',
      title: 'VibeCheck Cultural Fest: Endgame Night',
      club: 'Student Council MUJ',
      category: 'Cultural',
      date: '30 Oct 2026, 06:00 PM',
      venue: 'MUJ Quadrangle',
      type: 'Paid',
      price: 500,
      status: 'Approved',
      description: 'The ultimate musical and dance showdown to close out the semester.'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    club: 'ACM MUJ Chapter',
    category: 'Technical',
    date: '',
    venue: '',
    type: 'Free' as 'Free' | 'Paid',
    price: 0,
    description: ''
  });

  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['MUJ-EG-01']);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const handleRegister = (id: string, type: 'Free' | 'Paid') => {
    if (type === 'Paid') {
      alert('Redirecting to secure Razorpay Gateway (Stark Pay)...');
    }
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
      alert('Registration successful! Unique QR Ticket generated in your Campus Passport.');
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const item: EventItem = {
      id: `MUJ-EG-0${events.length + 1}`,
      ...newEvent,
      status: 'Pending'
    };
    setEvents([item, ...events]);
    alert('Event proposal submitted to Faculty / HOD for approval review!');
    setNewEvent({ title: '', club: 'ACM MUJ Chapter', category: 'Technical', date: '', venue: '', type: 'Free', price: 0, description: '' });
    setActiveTab('discover');
  };

  const updateEventStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, status } : ev));
  };

  const totalEvents = events.length;
  const activeEvents = events.filter(e => e.status === 'Approved').length;
  const pendingEvents = events.filter(e => e.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      <header className="border-b border-cyan-500/30 bg-[#090d16]/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            <Shield className="w-6 h-6 text-black animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-widest text-cyan-400 uppercase flex items-center gap-2">
              CAMPUSSHALA <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-300">MUJ x ENDGAME</span>
            </h1>
            <p className="text-xs text-slate-400">Manipal University Jaipur • Verified Tactical Portal</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 px-2 font-mono">ROLE:</span>
          {(['student', 'organizer', 'faculty', 'admin'] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => setCurrentRole(r)}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                currentRole === r 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-[#0a1124] to-slate-950 p-8 shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Terminal className="w-64 h-64 text-cyan-400" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
              <Activity className="w-3.5 h-3.5 animate-spin" /> QUANTUM STARK PROTOCOL V2.6 ACTIVE
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
              {currentRole === 'student' && "Discover Your Next Mission, Avenger."}
              {currentRole === 'organizer' && "Deploy & Manage Campus Operations."}
              {currentRole === 'faculty' && "Review & Authorize Event Submissions."}
              {currentRole === 'admin' && "Central Command & University Analytics."}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Unified event discovery, tamper-proof QR attendance tracking, and verified co-curricular credentials across Manipal University Jaipur.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-800/80">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'discover' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/50'}`}
            >
              <Search className="w-4 h-4" /> Discover Events
            </button>

            {currentRole === 'student' && (
              <button 
                onClick={() => setActiveTab('passport')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'passport' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/50'}`}
              >
                <QrCode className="w-4 h-4" /> My Campus Passport & QR
              </button>
            )}

            {(currentRole === 'organizer' || currentRole === 'admin') && (
              <button 
                onClick={() => setActiveTab('create')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'create' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/50'}`}
              >
                <PlusCircle className="w-4 h-4" /> Create Event Proposal
              </button>
            )}

            {(currentRole === 'faculty' || currentRole === 'admin') && (
              <button 
                onClick={() => setActiveTab('approvals')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'approvals' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/50'}`}
              >
                <UserCheck className="w-4 h-4" /> HOD Approvals ({pendingEvents})
              </button>
            )}

            {currentRole === 'admin' && (
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'admin' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/50'}`}
              >
                <Award className="w-4 h-4" /> Admin Analytics
              </button>
            )}
          </div>
        </div>

        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="text-cyan-400 w-5 h-5" /> Approved Campus Missions
              </h3>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search events, clubs..." 
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(ev => ev.status === 'Approved').map((ev) => (
                <div key={ev.id} className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/60 transition-all group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono">
                        {ev.category}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${ev.type === 'Free' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'}`}>
                        {ev.type === 'Paid' ? `₹${ev.price}` : 'Free'}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{ev.title}</h4>
                    <p className="text-xs text-cyan-500 font-mono">{ev.club}</p>
                    <p className="text-sm text-slate-400 line-clamp-2">{ev.description}</p>
                    
                    <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                      <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-cyan-400" /> {ev.date}</p>
                      <p className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-cyan-400" /> {ev.venue}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    {registeredEvents.includes(ev.id) ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Registered & Ticket Issued
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleRegister(ev.id, ev.type)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
                      >
                        {ev.type === 'Paid' ? <DollarSign className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
                        {ev.type === 'Paid' ? `Pay ₹${ev.price} & Register` : 'Instant Register & QR'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'passport' && currentRole === 'student' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <QrCode className="text-cyan-400 w-5 h-5" /> Campus Passport & Attendance Passes
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {registeredEvents.map((eventId) => {
                  const ev = events.find(e => e.id === eventId);
                  if (!ev) return null;
                  return (
                    <div key={eventId} className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-2">
                        <span className="text-xs text-cyan-400 font-mono">TICKET ID: MUJ-PASS-{ev.id}</span>
                        <h4 className="text-lg font-bold text-white">{ev.title}</h4>
                        <p className="text-xs text-slate-400">{ev.date} • {ev.venue}</p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/30 font-mono mt-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified Ticket Active
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedQR(ev.title)}
                        className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2 shrink-0"
                      >
                        <QrCode className="w-4 h-4" /> Show QR Ticket
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-900/90 border border-cyan-500/50 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <h4 className="text-sm font-bold text-cyan-400 tracking-widest uppercase">Live Attendance Pass</h4>
                <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center border-4 border-cyan-500/50 shadow-inner">
                  <div className="w-full h-full bg-slate-950 rounded grid grid-cols-6 gap-1 p-2">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className={`${i % 2 === 0 || i % 5 === 0 ? 'bg-cyan-400' : 'bg-slate-900'} rounded-xs`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-400">Scan at event entrance with organizer scanner to record verified attendance.</p>
                <p className="text-xs font-mono text-cyan-300">{selectedQR ? `Selected: ${selectedQR}` : 'Select a ticket to display QR'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-8 space-y-6 shadow-[0_0_25px_rgba(6,182,212,0.1)]">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <PlusCircle className="text-cyan-400 w-5 h-5" /> Submit New Event Proposal
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 mb-1 block">EVENT TITLE</label>
                <input 
                  type="text" 
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. Stark AI Workshop" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-1 block">CLUB / ORGANIZER</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.club}
                    onChange={(e) => setNewEvent({ ...newEvent, club: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-1 block">CATEGORY</label>
                  <select 
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option>Technical</option>
                    <option>Workshop</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-1 block">DATE & TIME</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="25 Nov 2026, 11:00 AM" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-1 block">VENUE</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    placeholder="Auditorium / Lab" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 mb-1 block">EVENT TYPE</label>
                  <select 
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'Free' | 'Paid' })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Free">Free Event</option>
                    <option value="Paid">Paid Event (Razorpay)</option>
                  </select>
                </div>
                {newEvent.type === 'Paid' && (
                  <div>
                    <label className="text-xs font-mono text-slate-400 mb-1 block">REGISTRATION FEE (₹)</label>
                    <input 
                      type="number" 
                      value={newEvent.price}
                      onChange={(e) => setNewEvent({ ...newEvent, price: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 mb-1 block">DESCRIPTION</label>
                <textarea 
                  rows={3}
                  required
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Describe event agenda, speakers, and guidelines..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
              >
                Submit Proposal for Faculty Review
              </button>
            </form>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="text-cyan-400 w-5 h-5" /> Faculty Event Approval Dashboard
            </h3>

            <div className="space-y-4">
              {events.map((ev) => (
                <div key={ev.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400">{ev.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        ev.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                        ev.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                        'bg-rose-950 text-rose-400 border border-rose-500/30'
                      }`}>
                        {ev.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{ev.title}</h4>
                    <p className="text-xs text-slate-400">{ev.club} • {ev.date} • {ev.venue}</p>
                  </div>

                  {ev.status === 'Pending' ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateEventStatus(ev.id, 'Approved')}
                        className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button 
                        onClick={() => updateEventStatus(ev.id, 'Rejected')}
                        className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">Reviewed by HOD / Faculty</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="text-cyan-400 w-5 h-5" /> University Admin Command Center
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6">
                <p className="text-xs font-mono text-slate-400">TOTAL EVENTS</p>
                <p className="text-3xl font-black text-cyan-400 mt-2">{totalEvents}</p>
              </div>
              <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6">
                <p className="text-xs font-mono text-slate-400">ACTIVE PUBLISHED</p>
                <p className="text-3xl font-black text-emerald-400 mt-2">{activeEvents}</p>
              </div>
              <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6">
                <p className="text-xs font-mono text-slate-400">PENDING APPROVALS</p>
                <p className="text-3xl font-black text-amber-400 mt-2">{pendingEvents}</p>
              </div>
              <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6">
                <p className="text-xs font-mono text-slate-400">VERIFIED ATTENDANCE</p>
                <p className="text-3xl font-black text-purple-400 mt-2">{1428}</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}