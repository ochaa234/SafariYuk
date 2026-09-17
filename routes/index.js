const router = require('express').Router();
const UserController = require('../controllers/UserController');
const TicketController = require('../controllers/TicketController');
const BookingController = require('../controllers/BookingController');

// Landing, register, login, logout
router.get('/', UserController.home);
router.get('/register', UserController.registerForm);
router.post('/register', UserController.register);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

// Customer
router.get('/tickets', TicketController.list);
router.get('/tickets/:id/book', BookingController.bookForm);
router.post('/tickets/:id/book', BookingController.create);
router.get('/bookings', BookingController.myBookings);
router.get('/bookings/:id', BookingController.eTicket);
router.post('/bookings/:id/cancel', BookingController.cancel);

// Admin
router.get('/admin/tickets', TicketController.adminList);
router.get('/admin/tickets/:id/edit', TicketController.editForm);
router.post('/admin/tickets/:id/edit', TicketController.update);
router.post('/admin/tickets/:id/delete', TicketController.delete);

module.exports = router;
