const { User, Profile, Ticket } = require('../models');
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
  static async home(req, res) {
    try {
      const tickets = await Ticket.getTickets();
      res.render('landing', { tickets: tickets.slice(0, 3) });
    } catch (err) {
      res.send(err);
    }
  }

  static registerForm(req, res) {
    res.render('auth/register');
  }

  static async register(req, res) {
    const { fullName, phone, email, password } = req.body;
    let user = null;

    try {
      user = await User.create({ email, password, role: 'customer' });
      await Profile.create({ fullName, phone, UserId: user.id });

      res.redirect('/login?success=Akun berhasil dibuat, silakan login');
    } catch (err) {
      if (user) await user.destroy();

      if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map((e) => e.message);
        return res.redirect(`/register?errors=${errors.join(';')}`);
      }
      res.send(err);
    }
  }
  static loginForm(req, res) {
    res.render('auth/login');
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email }, include: Profile });

      if (!user || !comparePassword(password, user.password)) {
        return res.redirect('/login?error=Email atau password salah');
      }

      req.session.userId = user.id;
      req.session.role = user.role;
      req.session.name = user.Profile ? user.Profile.fullName : user.email;

      if (user.role === 'admin') {
        return res.redirect('/admin/tickets');
      }
      res.redirect('/tickets');
    } catch (err) {
      res.send(err);
    }
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
}

module.exports = UserController;
