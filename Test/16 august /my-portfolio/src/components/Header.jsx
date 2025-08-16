import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container navbar">
        <a className="brand" href="#top" onClick={close}>
          <span className="dot" aria-hidden="true"></span>
          <span>Lakshitha</span>
        </a>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <a href="#about" onClick={close}>About</a>
          <a href="#projects" onClick={close}>Projects</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a className="btn secondary" href="/resume.pdf" target="_blank" rel="noreferrer" onClick={close}>
            Resume
          </a>
        </nav>

        <button
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span></span>
        </button>
      </div>
    </header>
  )
}