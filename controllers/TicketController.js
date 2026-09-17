const { Ticket, Category } = require('../models');

class TicketController {
  // GET /tickets  -> daftar paket untuk customer
  static async list(req, res) {
    const { search, sort } = req.query;
    try {
      const tickets = await Ticket.getTickets(search, sort);
      res.render('tickets/index', { tickets, search, sort });
    } catch (err) {
      res.send(err);
    }
  }

  // GET /admin/tickets  -> READ: tabel semua paket + kategori (eager loading)
  static async adminList(req, res) {
    const { search, sort } = req.query;
    try {
      const tickets = await Ticket.getTickets(search, sort);
      res.render('admin/tickets', { tickets, search, sort });
    } catch (err) {
      res.send(err);
    }
  }

  // GET /admin/tickets/:id/edit
  static async editForm(req, res) {
    try {
      const ticket = await Ticket.findByPk(req.params.id, { include: Category });
      const categories = await Category.findAll({ order: [['name', 'ASC']] });
      const selectedIds = ticket.Categories.map((category) => category.id);

      res.render('admin/edit', { ticket, categories, selectedIds });
    } catch (err) {
      res.send(err);
    }
  }

  // POST /admin/tickets/:id/edit  -> UPDATE nama, deskripsi, dan kategori
  static async update(req, res) {
    const { id } = req.params;
    const { name, description, CategoryIds } = req.body;

    try {
      const ticket = await Ticket.findByPk(id);
      await ticket.update({ name, description });
      await ticket.setCategories(CategoryIds || []);

      res.redirect('/admin/tickets?success=Perubahan paket tersimpan');
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((e) => e.message);
        return res.redirect(`/admin/tickets/${id}/edit?errors=${errors.join(';')}`);
      }
      res.send(err);
    }
  }

  // POST /admin/tickets/:id/delete  -> DELETE pakai promise chaining 
  static async delete(req, res) {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    const ticketName = ticket.name;

    await ticket.destroy();

    res.redirect(`/admin/tickets?deleted=${encodeURIComponent(ticketName)}`);
    
  } catch (err) {
    res.send(err);
  }
}
}

module.exports = TicketController;
