const express = require('express');
const router = express.Router();
const { 
    getNavbarItems, 
    seedNavbarItems, 
    createNavbarItem, 
    updateNavbarItem, 
    deleteNavbarItem 
} = require('../controllers/navbarController');
const { validateNavbar } = require('../middleware/validate');

router.get('/', getNavbarItems);
router.post('/seed', seedNavbarItems);
router.post('/', validateNavbar, createNavbarItem);
router.put('/:id', validateNavbar, updateNavbarItem);
router.delete('/:id', deleteNavbarItem);

module.exports = router;
