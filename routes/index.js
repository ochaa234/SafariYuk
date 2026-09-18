const router = require('express').Router();
const UserController = require('../controllers/UserController');

const ticketsRouter = require('./tickets');
const bookingsRouter = require('./bookings');
const adminRouter = require('./admin');

const isLoggedIn = function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login?error=Harap login terlebih dahulu');
  }
  next();
};

const isAdmin = function(req, res, next) {
  if (req.session.role !== 'admin') {
    return res.redirect('/tickets?error=Anda tidak memiliki akses admin');
  }
  next();
};

router.get('/', UserController.home);
router.get('/register', UserController.registerForm);
router.post('/register', UserController.register);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.login);

router.use(isLoggedIn);

router.get('/logout', UserController.logout);
router.use('/tickets', ticketsRouter);
router.use('/bookings', bookingsRouter);

router.use(isAdmin);

router.use('/admin', adminRouter);

module.exports = router;