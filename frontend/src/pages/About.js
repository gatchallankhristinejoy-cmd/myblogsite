import React from 'react';

const About = () => (
  <div className="about-page">
    <section>
      <h2>What I Love About Music</h2>
      <p>Music allows me to express emotions that words cannot. It's a universal language that connects people across cultures and generations, creating moments of pure joy and reflection.</p>
      <img src="/instrument.jpg" alt="Musical instrument" />
    </section>

    <section>
      <h2>My Journey with Music</h2>
        <p>I started enjoying music at a young age by listening to different songs. Over the years, I've developed a deep appreciation for various genres and the artistry behind every composition.</p>

      <div className="feature-grid">
        <div className="card">
          <img src="/music-hero.jpg" alt="Guitar" />
          <div className="card-content"><h3>Learning Guitar</h3><p>A personal story about practicing daily and slowly getting better.</p></div>
        </div>
        <div className="card">
          <img src="/playlist.jpg" alt="Piano" />
          <div className="card-content"><h3>Classic Piano</h3><p>Exploring classical pieces that shaped my ear and taste.</p></div>
        </div>
        <div className="card">
          <img src="/instrument.jpg" alt="Music production" />
          <div className="card-content"><h3>Studio Workflow</h3><p>From bedroom demos to polished tracks, the creative process grows.</p></div>
        </div>
      </div>
    </section>

    <section>
      <h2>My Music Timeline</h2>
      <ol>
        <li>Listening to music as a child</li>
        <li>Discovering favorite artists</li>
        <li>Exploring different music genres</li>
      </ol>

      <blockquote>
        "Where words fail, music speaks." – Hans Christian Andersen
      </blockquote>
    </section>
  </div>
);

export default About;