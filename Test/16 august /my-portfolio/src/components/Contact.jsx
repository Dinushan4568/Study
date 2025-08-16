export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2>Contact</h2>
        <p className="lead">Got an opportunity or just want to say hi? Let’s chat.</p>

        <div className="contact-card" style={{ marginTop: '1rem' }}>
          <div>
            <strong>Let’s build something great.</strong>
            <p>I’m open to freelance, full-time, and collaboration.</p>
            <div className="socials" style={{ marginTop: '0.6rem' }}>
              <a className="link" href="https://github.com/Dinushan4568" target="_blank" rel="noreferrer">GitHub</a>
              <a className="link" href="https://www.linkedin.com/in/your-username" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="link" href="https://wa.me/+94743022959" target="_blank" rel="noreferrer">Whatsapp</a>
            </div>
          </div>
          <a className="btn" href="mailto:dinushanlakshitha@4568.com">Email me</a>
        </div>
      </div>
    </section>
  )
}