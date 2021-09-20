const router = require('express').Router();
const { JobPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Render dashboard.handlebars
router.get('/', async (req, res) => {
  try {
    // If a session exists, redirect the request to the homepage
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    // Find all jobs
    const jobsData = await JobPost.findAll();

    const jobs = jobsData.map((job) => job.get({ plain: true }));

    // Render dashboard.handlebars with jobs data
    res.render('dashboard', {
      jobs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render job.handlebars
router.get('/:id', async (req, res) => {
  try {
    const jobData = await JobPost.findByPk(req.params.id)

    const job = jobData.get({ plain: true });

    res.render('job', job);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const jobsData = await JobPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const jobs = jobsData.get({ plain: true });

    //res.json(jobsData);
    res.render('dashboard', {
      jobs,
      //  Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
