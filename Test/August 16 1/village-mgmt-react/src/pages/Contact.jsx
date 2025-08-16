export default function Contact() {
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Contact</h1>
      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-3">
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>
        <label className="block">Name<input className="w-full mt-1 px-3 py-2 border rounded" type="text" name="name" required /></label>
        <label className="block">Email<input className="w-full mt-1 px-3 py-2 border rounded" type="email" name="email" required /></label>
        <label className="block">Message<textarea className="w-full mt-1 px-3 py-2 border rounded" name="message" rows="5" required /></label>
        <button className="px-4 py-2 bg-sky-600 text-white rounded" type="submit">Send</button>
      </form>
    </div>
  );
}