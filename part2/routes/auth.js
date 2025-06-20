const express = require('express');
const router  = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const db = req.app.get('db');
    const [rows] = await db.execute(
      'SELECT user_id, role FROM Users WHERE username = ? AND password_hash = ?',
      [username, password]
    );
    if (rows.length !== 1) {
      return res.redirect('/?error=Invalid%20credentials');
    }
    req.session.userId = rows[0].user_id;
    req.session.role   = rows[0].role;
    if (rows[0].role === 'owner')  return res.redirect('/owner');
    else                             return res.redirect('/walker');
  } catch (err) {
    next(err);
  }
});

// GET /logout — end session, clear cookie, redirect to login
router.get('/logout', (req, res, next) => {
      req.session.destroy(err => {
        if (err) return next(err);
        // Clear the session cookie
        res.clearCookie('connect.sid');
        // Redirect back to login form
        res.redirect('/');
      });
    });

module.exports = router;
