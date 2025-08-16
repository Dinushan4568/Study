import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Projects</h2>
        <p className="lead">A few things I’ve built recently.</p>

        <div className="grid" style={{ marginTop: '1rem' }}>
          {projects.map((p) => (
            <article key={p.title} className="card">
              <h3>{p.title}</h3>
              <p>{p.description}</p>

              <div className="tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              <div className="actions">
                <a className="link" href={p.demo} target="_blank" rel="noreferrer">Live Demo</a>
                <a className="link" href={p.code} target="_blank" rel="noreferrer">Source</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}