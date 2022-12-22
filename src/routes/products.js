const router = require('express').Router();

const DB = require('../services/database/DB');

const contDB = new DB( 'products' );

router.get('/api/products', async (_req, res, next) => {

    try {

        const allProducts = await contDB.getAll();

        if ( allProducts.length > 0 ) {

            res.status(200).json( { products: allProducts } );

        } else {

            res.status(500).json({

                success: false,
                error: "Nothing found"

            });

        }        
        
    } catch (error) {
        
        next( error );

    }

});


router.get('/api/products/:id', async (req, res, next) => {

    try {

        const id = req.params.id;

        const oneProduct = await contDB.getById( id );

        if ( oneProduct ) {

            res.status(200).send( oneProduct );
            
        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }
        

    } catch (error) {
        
        next( error );

    }

});

router.post('/api/products', async (req, res, next) => {

    try {

        const product = req.body;

        const saveProduct = await contDB.save( product );
        
        res.status(200).json( { saveProduct } );

    } catch (error) {
        
        next( error );

    }

});


router.put('/api/products/:id', async (req, res, next) => {

    try {

        const id = req.params.id;
        
        const change = req.body;

        const updating = await contDB.putById( id, change );

        if ( updating.success ) {

            res.status(200).json({

                updated: updating
    
            });
           
        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }        

    } catch (error) {
        
        next( error );

    }

});

router.delete('/api/products/:id', async (req, res, next) => {

    try {
        
        const id = req.params.id;

        let deleted = await contDB.deleteById( id );
        
        if ( deleted.success ) {

            res.status(200).json({

                message: deleted

            });

        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }

    } catch (error) {
        
        next( error );

    }

});

router.get('/', async (_req, res, next) => {

    try {

        res.render('formulario', { products: await contDB.getAll() });

    } catch (error) {
        
        next( error );

    }

});

router.get('/productos', async (_req, res, next) => {

    try {

        res.render( 'productos', { products: await contDB.getAll() } );

    } catch ( error ) {
        
        next( error );

    }

});


module.exports = router;