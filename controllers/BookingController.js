const QRCode = require('qrcode');
const { Booking, Ticket, Category, User, Profile } = require('../models');
const { getTodayString } = require('../helpers');

class BookingController {
  static async bookForm(req, res) {
    if (!req.session.userId) {
      return res.redirect('/login?error=Login dulu sebelum booking tiket');
    }
    try {
      const ticket = await Ticket.findByPk(req.params.id, { include: Category });
      res.render('bookings/form', { ticket, today: getTodayString() });
    } catch (err) {
      res.send(err);
    }
  }
  //halaman e-ticket (QR Code)
  static async create(req, res) {
    if (!req.session.userId) {
      return res.redirect('/login?error=Login dulu sebelum booking tiket');
    }

    const { id } = req.params;
    const { visitDate } = req.body;

    try {
      const booking = await Booking.create({
        visitDate: visitDate || null,
        TicketId: id,
        UserId: req.session.userId
      });

      res.redirect(`/bookings/${booking.id}?new=true`);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((e) => e.message);
        return res.redirect(`/tickets/${id}/book?errors=${errors.join(';')}`);
      }
      res.send(err);
    }
  }

  static async myBookings(req, res) {
    if (!req.session.userId) {
      return res.redirect('/login?error=Login dulu untuk melihat tiketmu');
    }

    try {
      const bookings = await Booking.getBookingsByUser(req.session.userId);
      res.render('bookings/index', { bookings });
    } catch (err) {
      res.send(err);
    }
  }
  // E-ticket + QR Code (MVP)
  static async eTicket(req, res) {
    try {
      const booking = await Booking.findByPk(req.params.id, {
        include: [
          { model: Ticket, include: Category },
          { model: User, include: Profile }
        ]
      });

      const qrText = `SAFARIYUK | ${booking.bookingCode} | ${booking.Ticket.name} | ${booking.visitDate}`;
      const qrCode = await QRCode.toDataURL(qrText, { width: 300, margin: 1 });

      res.render('bookings/eticket', { booking, qrCode, isNew: req.query.new });
    } catch (err) {
      res.send(err);
    }
  }
  static async cancel(req, res) {
    try {
      const booking = await Booking.findByPk(req.params.id);
      const code = booking.bookingCode;
      await booking.destroy();

      res.redirect(`/bookings?success=Booking ${code} dibatalkan`);
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = BookingController;
