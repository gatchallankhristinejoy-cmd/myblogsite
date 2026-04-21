import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);

  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');

  const [msg, setMsg] = useState('');
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);

    if (pic) fd.append('profilePic', pic);

    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      await API.put('/auth/change-password', {
        currentPassword: curPw,
        newPassword: newPw
      });

      setMsg('Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const picSrc = user?.profilePic
    ? `https://myblogsite-cov8.onrender.com/uploads/${user.profilePic}`
    : '/default-avatar.png';

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const { data } = await API.get('/posts');
        const userPosts = data.filter(post => post.author?._id === user?._id);
        setPosts(userPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    };

    if (user?._id) {
      fetchUserPosts();
    }
  }, [user?._id]);

  return (
    <div className='profile-page'>
      <h2>My Profile</h2>

      <img src={picSrc} alt='Profile' className='profile-pic-preview' />

      {msg && <p className='success-msg'>{msg}</p>}

      <form onSubmit={handleProfile}>
        <h3>Edit Profile</h3>
        <input value={name} onChange={e => setName(e.target.value)} placeholder='Display name' />
        <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder='Short bio...' rows={3} />
        <label>Change Profile Picture:</label>
        <input type='file' accept='image/*' onChange={e => setPic(e.target.files[0])} />
        <button type='submit'>Save Profile</button>
      </form>

      <form onSubmit={handlePassword}>
        <h3>Change Password</h3>
        <input type='password' placeholder='Current password' value={curPw} onChange={e => setCurPw(e.target.value)} required />
        <input type='password' placeholder='New password (min 6 chars)' value={newPw} onChange={e => setNewPw(e.target.value)} required minLength={6} />
        <button type='submit'>Change Password</button>
      </form>

      <section className='user-posts-section'>
        <h3>My Posts</h3>
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>You haven't written any posts yet. <Link to='/create-post'>Create one now!</Link></p>
        ) : (
          <div className='posts-list'>
            {posts.map(post => (
              <div key={post._id} className='post-item'>
                <div className='post-header'>
                  <Link to={`/posts/${post._id}`} className='post-link'><h4>{post.title}</h4></Link>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
                <p className='post-preview'>{post.body.substring(0, 150)}...</p>
                <div className='post-actions'>
                  <Link to={`/posts/${post._id}`} className='btn-view'>View</Link>
                  <Link to={`/edit/${post._id}`} className='btn-edit'>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;