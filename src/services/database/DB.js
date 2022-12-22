const knexConfig = require('./config');
const knex = require('knex');

class DB {

    constructor ( table ) {

        this.knex = knex(knexConfig),
        this.table = table

    }

    async save( object ) {

        try {

            await this.knex( this.table ).insert( object );

            return {
                
                success: true,
                data: object

            };
            
        } catch (error) {

            console.log(error);

            return {

                success: false,
                message: error.message

            };
            
        }

    }

    async getById( id ) {

        try {

            const data = await this.knex( this.table ).where( 'id', '=', id ).select('*');

            if ( data.length == 0 ) {

                return {

                    success: false,
                    message: 'Product not found'

                };

            }

            const dataFormatted = JSON.parse( JSON.stringify( data[0] ) );

            return {

                success: true,
                data: dataFormatted

            };
                        
        } catch (error) {
            
            console.log(error);

            return {

                success: false,
                message: error.message

            };

        }

    }

    async getAll() {

        try {

            const data = await this.knex( this.table ).select('*');

            const dataFormatted = data.map( i => JSON.parse( JSON.stringify( i ) ) );

            return dataFormatted;

            // return {

            //     success: true,
            //     data: dataFormatted

            // };
            
        } catch (error) {
            
            console.log(error);

            return {

                success: false,
                message: error.message

            };

        }

    }

    async putById( id, change ) {

        try {

            const newData = await this.knex.from( this.table ).where( 'id', '=', id ).update( change );

            if ( newData == 1 ) {

                let product = await contDB.getById( id );

                return {

                    success: true,
                    data: product.data
    
                };

            } else {

                return {

                    success: false,
                    message: 'Product not found'

                };

            }

        } catch (error) {

            console.error( error );

            return {

                success: false,
                message: error.message

            };
        
        }

    }

    async deleteById( id ) {

        try {

            let product = await this.knex.from( this.table ).where( 'id', '=', id ).del();  

            if ( product == 1 ) {

                return {

                    success: true,
                    message: 'Product deleted'
    
                };

            } else {

                return {

                    success: false,
                    message: 'Product not found'

                };

            }
 
        } catch ( error ) {

            console.error( error );

            return {

                success: false,
                message: error.message

            };

        }
    
    }

    async deleteAll() {

        try {

            let product = await this.knex.from( this.table ).del();

            if ( product == 1 ) {

                return {

                    success: true,
                    message: 'Product deleted'
    
                };

            } else {

                return {

                    success: false,
                    message: 'Product not found'

                };

            }
            
        } catch ( error ) {

            console.error( error );

            return {

                success: false,
                message: error.message

            };
            
        }

    }

}

const contDB = new DB( 'products' );

module.exports = DB;

