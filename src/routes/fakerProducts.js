const router = require('express').Router();

const fakerCont = require('../storage/faker');

router.get('/', (_req, res, next) => {

    try {

        res.render( 'fakerProducts', { products: fakerCont.fakersProducts() } );   
        
    } catch (error) {
        
        next( error );

    }

});


module.exports = router;