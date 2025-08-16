export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="container">
        © {year} Lakshitha · Built with React
      </div>
    </footer>
  )
}