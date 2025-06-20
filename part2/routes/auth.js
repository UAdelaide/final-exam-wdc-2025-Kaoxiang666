const express = require('express');
const router  = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // 假设你在 app.js 里通过 app.set/get('db') 暴露了 db 连接
    const db = req.app.get('db');
    const [rows] = await db.execute(
      'SELECT user_id, role FROM Users WHERE username = ? AND password_hash = ?',
      [username, password]
    );
    if (rows.length !== 1) {
      // 登录失败，重定向回根路径并携带错误查询
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

module.exports = router;
