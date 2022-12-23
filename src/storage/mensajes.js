const fs = require('fs');

class Contenedor {

    constructor ( archivo ) {

        this.archivo = archivo;

    }

    async save( object ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            dataToJson.mensajes.push( object );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( dataToJson, null, 2 ) );

            return object;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async getAll() {

        let array = [];

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            dataToJson.mensajes.forEach(element => {
                
                array.push( element );

            });

            return array;
            
        } catch (error) {
            
            console.log(error);

        }

    }

    print( objeto ) {

        return util.inspect( objeto, false, 12, true );
    
    }

    normalize() {

        const authorSchema = new schema.Entity( 'author', {}, { idAttribute: 'email' } );

        const empresaSchema = new schema.Entity( 'empresa', {

            gerente: empleadoSchema,
            encargado: empleadoSchema,
            empleados: [ empleadoSchema ]

        } );

        const empresasSchema = new schema.Entity( 'empresas', {

            empresas: [ empresaSchema ]

        } )

    }



}

const contMessage = new Contenedor( './src/storage/mensajes.txt' );

//cont.save( { 'tittle': 'Libro', 'price': 500, 'thumbnail': 'https://asd.com/2.png' } );

//cont.getById( 3 );

//cont.getAll();

//cont.deleteById( 2 );

//cont.deleteAll();

module.exports = contMessage;