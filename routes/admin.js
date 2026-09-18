const router = require('express').Router();
const TicketController = require('../controllers/TicketController');

router.get('/tickets', TicketController.adminList);
router.get('/tickets/:id/edit', TicketController.editForm);
router.post('/tickets/:id/edit', TicketController.update);
router.post('/tickets/:id/delete', TicketController.delete);

module.exports = router;