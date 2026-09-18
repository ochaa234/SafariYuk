const router = require('express').Router();
const BookingController = require('../controllers/BookingController');

router.get('/', BookingController.myBookings);
router.get('/:id', BookingController.eTicket);
router.post('/:id/cancel', BookingController.cancel);

module.exports = router;