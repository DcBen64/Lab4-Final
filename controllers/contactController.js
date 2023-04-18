const Contact = require('../models/contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('contacts', { contacts });
  } catch (error) {
    res.status(500).send('Error retrieving contacts: ' + error.message);
  }
};

exports.getContactsList = (req, res) => {
  res.render('contact-list');
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.redirect('/contact-list');
  } catch (error) {
    res.status(500).send('Error creating contact: ' + error.message);
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render('update', { contact });
  } catch (error) {
    res.status(500).send('Error retrieving contact: ' + error.message);
  }
};

exports.updateContact = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/contact-list');
  } catch (error) {
    res.status(500).send('Error updating contact: ' + error.message);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndRemove(req.params.id);
    res.redirect('/contact-list');
  } catch (error) {
    res.status(500).send('Error deleting contact: ' + error.message);
  }
};
