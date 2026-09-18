const router = require('express').Router();
const TicketController = require('../controllers/TicketController');
const BookingController = require('../controllers/BookingController');

router.get('/', TicketController.list);
router.get('/:id/book', BookingController.bookForm);
router.post('/:id/book', BookingController.create);

module.exports = router;