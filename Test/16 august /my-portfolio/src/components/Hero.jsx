export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1>
            Hey, I’m <span className="highlight">Lakshitha</span> — a frontend developer crafting clean,
            accessible interfaces.
          </h1>
          <p>
            I build fast, responsive web apps with React and a focus on great UX.
            I love design systems, delightful micro‑interactions, and type safety.
          </p>
          <div className="buttons">
            <a className="btn" href="#projects">View my work</a>
            <a className="btn secondary" href="#contact">Get in touch</a>
          </div>
        </div>

        <div className="avatar-wrap">
          <img
            className="avatar"
            src="https://scontent.xx.fbcdn.net/v/t39.30808-1/533116247_1279123560588919_9159019427345483772_n.jpg?stp=c238.0.1067.1067a_dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEMvZ0CeOa6AqHdpRhnusAUiXLgOCdJPkmJcuA4J0k-STC-6gUIgwHoBM-59VBvb6wipMXyr_yRuNR2fRM1rw7l&_nc_ohc=H_2u8XHUT60Q7kNvwE9i7oW&_nc_oc=AdlRP4icTZQjFBnXcv3Vx-YzZixsHAff4SqQg0hf6B3ycNRwpqAcSkGJ6NQpODDwVM4&_nc_zt=24&_nc_ht=scontent.xx&_nc_gid=g7Z5Xg_9Pf8dz2JsM-dOow&oh=00_AfV7MGS15tp9nuA4zUYBG6_a2q2D6DrA4P-cEjxZGtUyEg&oe=68A648EF"
            alt="Your portrait"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}