import React from 'react';

const Contact = () => (
  <>
    <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <h2>Contact Me</h2>
      <p style={{ color: '#666', fontSize: '1.05rem', marginBottom: '2rem' }}>
        Have any questions or feedback? I'd love to hear from you!
      </p>
      <form className="form-container" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Your Name" required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="example@email.com" required />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" placeholder="Your message" required></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </section>

    <section>
      <h2>Music Resources</h2>
      <table>
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Spotify</td><td>Music streaming platform</td></tr>
          <tr><td>YouTube Music</td><td>Music videos and playlists</td></tr>
          <tr><td>Billboard</td><td>Music charts and news</td></tr>
        </tbody>
      </table>
    </section>
  </>
);

export default Contact;