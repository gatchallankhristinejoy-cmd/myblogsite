import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/posts');
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
  <>
    <section className="hero">
      <h1>Music World</h1>
      <p>Dive into the world of music — sounds filled with emotion, rhythm, and heart.</p>
      <div className="service-icons">
        <span>▶️</span>
        <span>🎧</span>
        <span>🎶</span>
        <span>🟢</span>
        <span>🔊</span>
      </div>
      <img src="/music-hero.jpg" alt="Headphones and music notes" />
    </section>

    <section className="feature-grid">
      <div className="card">
        <img src="/headphones.jpg" alt="Studio mixing" />
        <div className="card-content"><h3>Studio Mixing</h3><p>Learn about production and audio mixing from pro engineers.</p></div>
      </div>
      <div className="card">
        <img src="/map.jpg" alt="Live concert" />
        <div className="card-content"><h3>Live Performance</h3><p>Experience the energy of live shows and stage presence.</p></div>
      </div>
      <div className="card">
        <img src="/oip2.jpg" alt="Vinyl records" />
        <div className="card-content"><h3>Collecting Classics</h3><p>Discover classic records and rare vinyl to enrich your music library.</p></div>
      </div>
      <div className="card">
        <img src="/instrument.jpg" alt="Musical instruments" />
        <div className="card-content"><h3>Instruments</h3><p>Explore string, wind, and digital instruments for composition.</p></div>
      </div>
      <div className="card">
        <img src="/playlist.jpg" alt="Playlist" />
        <div className="card-content"><h3>Curated Playlists</h3><p>Enjoy custom playlists for study, workouts, and relaxation.</p></div>
      </div>
    </section>

    <section className="gallery">
      <h2>All Pictures</h2>
      <div className="gallery-grid">
        <img src="/music-hero.jpg" alt="Headphones and music notes" />
        <img src="/headphones.jpg" alt="Studio mixing" />
        <img src="/map.jpg" alt="Live concert" />
        <img src="/oip2.jpg" alt="Vinyl records" />
        <img src="/instrument.jpg" alt="Musical instruments" />
        <img src="/playlist.jpg" alt="Playlist" />
      </div>
    </section>

    <section className="highlights">
      <h2>All Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <Link to={`/posts/${post._id}`} key={post._id} style={{ textDecoration: 'none' }}>
              <div className="post-card">
                <img 
                  src={post.image || '/music-hero.jpg'} 
                  alt={post.title}
                  className="post-image"
                />
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p className="post-preview">
                    {post.body?.substring(0, 100)}...
                  </p>
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No posts yet. Stay tuned!</p>
      )}
    </section>
  </>
  );
};

export default Home;