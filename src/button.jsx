import React, { useState, useEffect, useRef } from 'react'

/* ── Spinner icon ── */
const Spinner = () => (
  <span className="spinner" style={{
    display: 'inline-block',
    width: 13, height: 13,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'btn-spin 0.7s linear infinite',
    flexShrink: 0,
  }} />
)

/* ── Inline SVG icons ── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
const Download = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
  </svg>
)
const Chat = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
)
const Plus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

const Section = ({ title, children }) => (
  <div className="section mb-8">
    <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>{title}</p>
    {children}
  </div>
)

const ButtonEffect = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setSaved(true); setTimeout(() => setSaved(false), 2000) }, 1600)
  }

  return (
    <div className="min-h-screen bg-main p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
          SWC — Premium Hover Effects Showcase
        </h1>
        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
          5 Premium Hover Animations with Reverse Effects
        </p>
      </div>

      {/* EFFECT 1: Sliding Background Left to Right */}
      <Section title="🎨 EFFECT 1: Sliding Background (Left → Right / Right → Left)">
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-slide-bg">
            <ArrowRight /> Hover Me
          </button>
          <button className="btn btn-slide-bg btn-teal">
            <Star /> Gradient Sweep
          </button>
          <button className="btn btn-slide-bg btn-outline">
            Outline Version
          </button>
        </div>
        <p className="text-secondary text-sm mt-3">Background slides from left to right on hover, reverses on mouse leave</p>
      </Section>

      {/* EFFECT 2: Text Slide Up/Down */}
      <Section title="📤 EFFECT 2: Text Slide Up/Down">
        <div className="flex flex-wrap gap-4">
          <button 
            className="btn btn-text-slide-simple" 
            data-hover="✨ Amazing!"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <span>Hover Me →</span>
          </button>
          <button 
            className="btn btn-teal btn-text-slide-simple" 
            data-hover="🚀 Let's Go!"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <span>Get Started</span>
          </button>
          <button 
            className="btn btn-gradient btn-text-slide-simple" 
            data-hover="⭐ Premium!"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <span>Upgrade Now</span>
          </button>
        </div>
        <p className="text-secondary text-sm mt-3">Text slides up on hover, new text ButtonEffectears from bottom, reverses on leave</p>
      </Section>

      {/* EFFECT 4: Pulse Ring */}
      <Section title="💫 EFFECT 3: Pulse Ring">
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-pulse-ring">
            Pulse Effect
          </button>
          <button className="btn btn-teal btn-pulse-ring">
            <Chat /> Pulse Ring
          </button>
          <button className="btn btn-gradient btn-pulse-ring">
            <Star /> Premium Pulse
          </button>
        </div>
        <p className="text-secondary text-sm mt-3">Radiating pulse ring animation on hover</p>
      </Section>

      {/* EFFECT 7: Bounce */}
      <Section title="🏀 EFFECT 4: Bounce">
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-bounce">
            Bounce Effect
          </button>
          <button className="btn btn-teal btn-bounce">
            <Star /> Bounce Up
          </button>
        </div>
        <p className="text-secondary text-sm mt-3">Button bounces upward on hover with smooth return</p>
      </Section>

      {/* EFFECT 10: Dual Color Reveal */}
      <Section title="🎨 EFFECT 5: Dual Color Reveal">
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-dual-reveal">
            Dual Color Shift
          </button>
          <button className="btn btn-dual-reveal btn-lg">
            <Star /> Premium Shift
          </button>
          <button className="btn btn-dual-reveal btn-teal">
            <Download /> Teal Shift
          </button>
        </div>
        <p className="text-secondary text-sm mt-3">Two colors slide across, revealing gradient transition</p>
      </Section>

      {/* Interactive Demo Section */}
      <Section title="🎮 Interactive Demo">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, marginBottom: '0.5rem' }}>
              Click Counter
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
              Test with different effects
            </p>
            <div className="flex gap-3 items-center">
              <button className="btn btn-slide-bg" onClick={() => setCount(c => c + 1)}>
                Count: {count}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setCount(0)}>Reset</button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, marginBottom: '0.5rem' }}>
              Save with Loading
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
              Async action simulation
            </p>
            <button
              className={`btn ${loading ? 'btn-loading' : ''} ${saved ? 'btn-teal' : ''} btn-pulse-ring`}
              onClick={handleSave}
            >
              {loading && <Spinner />}
              {loading ? 'Saving…' : saved ? '✓ Saved!' : 'Save changes'}
            </button>
          </div>
        </div>
      </Section>

      {/* Quick Reference */}
      <Section title="📋 Quick Reference - Your Selected Effects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="text-sm"><span className="text-teal">✨</span> Effect 1: Sliding Background (Left ↔ Right)</div>
          <div className="text-sm"><span className="text-teal">✨</span> Effect 2: Text Slide Up/Down</div>
          <div className="text-sm"><span className="text-teal">✨</span> Effect 3: Pulse Ring</div>
          <div className="text-sm"><span className="text-teal">✨</span> Effect 4: Bounce</div>
          <div className="text-sm"><span className="text-teal">✨</span> Effect 5: Dual Color Reveal</div>
        </div>
      </Section>

      <div className="text-center text-secondary mt-8" style={{ fontSize: '0.8rem' }}>
        <p>✨ All effects have smooth reverse animations on mouse leave | Spring physics on bounce effect</p>
      </div>
    </div>
  )
}

export default ButtonEffect