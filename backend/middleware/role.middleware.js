// backend/middleware/role.middleware.js

// Only admins can pass
const adminOnly = (req, res, next) => {
  console.log('adminOnly check - req.user:', req.user ? `${req.user.email} (${req.user.role})` : 'undefined');
  
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ message: 'Access denied — Admins only' });
};

// Members or Admins can pass (but not guests/unauthenticated users)
const memberOrAdmin = (req, res, next) => {
  console.log('memberOrAdmin check - req.user:', req.user ? `${req.user.email} (${req.user.role})` : 'undefined');
  
  if (req.user && (req.user.role === 'member' || req.user.role === 'admin')) {
    return next();
  }
  
  return res.status(403).json({ message: 'Access denied — Members only' });
};

module.exports = { adminOnly, memberOrAdmin };
