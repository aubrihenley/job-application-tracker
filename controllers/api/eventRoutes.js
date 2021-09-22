const router = require('express').Router();
const { Events } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    if (req.body.title && req.body.url) {
      const body = req.body;
      body.user_id = req.session.user_id;

      const newEvent = await Events.create(body);

      res.status(200).json(newEvent);
    } else {
      res.status(400).json({ message: 'Bad request.' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eventData = await Events.destroy({
      where: {
        id: req.params.id,
        //user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (req.body.title && req.body.url) {
      const eventData = await Events.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json(eventData);
    } else {
      res.status(400).json({ message: 'Bad request.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
