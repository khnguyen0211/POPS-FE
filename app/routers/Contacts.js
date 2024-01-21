const express = require('express');
const router = express.Router();
const contactsRouter = require('../controllers/ContactsController');

router.get('/contacts', contactsRouter.index);

router.get('/contacts/create-staffs', contactsRouter.create);

router.get('/contacts/staffs/:id', contactsRouter.detail);

module.exports = router;