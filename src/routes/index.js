const router = require('express').Router();

const products = require('./products');
const fakerProducts = require('./fakerProducts');

router.use('/', products);
router.use('/productos-test', fakerProducts);

module.exports = router;