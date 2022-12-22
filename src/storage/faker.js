const { faker} = require("@faker-js/faker");

class fakerContenedor {

    constructor () {}

    fakersProducts() {

        try {

            let array = [];

            for (let i = 0; i < 5; i++) {
        
                array.push( 
                    { 
                        nombre: faker.commerce.product(),
                        precio: faker.datatype.float(),
                        foto: faker.image.image() 
                    } 
                );
                
            }

            return array;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    

}

const fakerCont = new fakerContenedor();


module.exports = fakerCont;