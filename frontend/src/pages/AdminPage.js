// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('AdminPage: Fetching users and posts...');
        const [usersRes, postsRes] = await Promise.all([
          API.get('/admin/users'),
          API.get('/admin/posts'),
        ]);
        console.log('AdminPage: Data fetched successfully');
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error('AdminPage: Error fetching data:', err);
        setError(err.response?.data?.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map(u => (u._id === id ? data.user : u)));
  };

  const removePost = async (id) => {
    await API.put(`/admin/posts/${id}/remove`);
    setPosts(
      posts.map(p =>
        p._id === id ? { ...p, status: 'removed' } : p
      )
    );
  };

  return (
    <div className='admin-page'>
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading admin data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className='admin-tabs'>
            <button
              onClick={() => setTab('users')}
              className={tab === 'users' ? 'active' : ''}
            >
              Members ({users.length})
            </button>

            <button
              onClick={() => setTab('posts')}
              className={tab === 'posts' ? 'active' : ''}
            >
              All Posts ({posts.length})
            </button>
          </div>

      {tab === 'users' && (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <span className={`status-badge ${u.status}`}>
                    {u.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => toggleStatus(u._id)}
                    className={
                      u.status === 'active'
                        ? 'btn-danger'
                        : 'btn-success'
                    }
                  >
                    {u.status === 'active'
                      ? 'Deactivate'
                      : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'posts' && (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {posts.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.author?.name}</td>

                <td>
                  <span className={`status-badge ${p.status}`}>
                    {p.status}
                  </span>
                </td>

                <td>
                  {p.status === 'published' && (
                    <button
                      className='btn-danger'
                      onClick={() => removePost(p._id)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </>
      )}
    </div>
  );
};

export default AdminPage;