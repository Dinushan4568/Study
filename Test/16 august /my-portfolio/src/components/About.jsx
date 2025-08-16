export default function About() {
  const skills = [
    'React', 'JavaScript', 'TypeScript', 'Node', 'Express',
    'HTML', 'CSS', 'Tailwind', 'Vite', 'Git', 'REST', 'Testing'
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <h2>About</h2>
        <p className="lead">
          I’m a frontend developer who enjoys turning complex problems into simple,
          beautiful interfaces. When I’m not coding, I’m probably sketching UI ideas or
          reading about performance and accessibility.
        </p>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <strong>Skills</strong>
          <div className="skills">
            {skills.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}