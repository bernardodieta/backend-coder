const ProductManager = require('./ProductManager.js')
const productManager = new ProductManager()

const SaveData = async () => {
    await productManager.addProduct(product1)

    //await productManager.getAllProduct();  //Consult all the products saved in the Json file
    //await productManager.updateProduct(product2) //Update the (Title and Description) of the product saved in the Json file
    //await productManager.deleteProduct(1) // Delete the product with id number 1
    //await productManager.getProductById(2) // Get the product that has the provided id number
}


let product1 = {
    title: 'Product Modificado',
    description: 'Descripcion modificada',
    price: 100,
    thumbnail: 'http://website.com/product1.jpg',
    code: 'P5',
    stock: 10,
    id: 1
};


let product2 = {
    title: 'Product 2 mod',
    description: 'This is product 2',
    price: 200,
    thumbnail: 'http://website.com/product2.jpg',
    code: 'P2',
    stock: 20,
    id: 2
};


let product3 = {
    title: 'Product 3',
    description: 'This is product 2',
    price: 200,
    thumbnail: 'http://website.com/product3.jpg',
    code: 'P3',
    stock: 20,
    id: 3
};
SaveData()