class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;

    }
}

class ProductManager {
    products;
    productFileName;
    productDirName;
    fileSystem;
    currentId;

    constructor() {
        this.products = new Array;
        this.currentId = 1;
        this.productDirName = "./dirfile";
        this.productFileName = this.productDirName + "/Productos.json";
        this.fileSystem = require('fs')
    }

    addProduct = async (product) => {
        const { title, description, price, thumbnail, code, stock, id } = product
        const newProduct = new Product(title, description, price, thumbnail, code, stock, id)
        try {
            await this.fileSystem.promises.mkdir(this.productDirName, { recursive: true })

            if (this.fileSystem.existsSync(this.productFileName)) {
                const productsData = await this.fileSystem.promises.readFile(this.productFileName, 'utf-8')
                if (productsData) {
                    this.products = JSON.parse(productsData)
                    const getCode = this.products.find(p => p.code === newProduct.code)
                    if (newProduct.id === undefined) {
                        newProduct.id = this.products.length + 1
                    }
                    //console.log(newProduct.id)
                    if (getCode) {
                        console.log(`There is already a product with the code: ${newProduct.code}`)
                    } else {
                        this.products.push(newProduct)
                        //
                        let mostrarConFormato = {
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            thumbnail: product.thumbnail,
                            code: product.code,
                            stock: product.stock
                        }
                        //"I am doing it this way and not using ${products} because when I print it to the console, it puts all the data together and they are easy to understand, so this new way of showing them makes them easy to read."
                        console.log('Product Added:')
                        console.log(mostrarConFormato)
                        //console.log(`Products Added:${JSON.stringify(this.products)}`);
                        await this.fileSystem.promises.writeFile(this.productFileName, JSON.stringify(this.products, null, 2, '\t'))
                        let productsListUpdated = await this.fileSystem.promises.readFile(this.productFileName)
                        console.log('List of all updated products')
                        console.log(JSON.parse(productsListUpdated))
                    }
                }
            }

        } catch (error) {
            if (error) {
                console.log(`Error creating new product: ${JSON.stringify(newProduct)}, detail error: ${error}`);
                throw Error(error)
            }
        }
    }


    getAllProduct = async () => {
        const productFinded = await this.fileSystem.promises.readFile(this.productFileName, 'utf-8')
        if (productFinded) {
            const products = JSON.parse(productFinded);
            console.log(`It was found ${products.length} Product Saved.`)
            console.log(await this.fileSystem.promises.readFile(this.productFileName, 'utf-8'))
        } else {
            await this.fileSystem.promises.writeFile(this.productFileName, "[]")
            console.log(`There are no products loaded in the file ${this.productFileName}`)
        }
    }

    getProductById = async (id) => {
        try {
            const productFinded = await this.fileSystem.promises.readFile(this.productFileName, 'utf-8')

            if (productFinded) {
                this.products = JSON.parse(productFinded)
                const product = this.products.find(p => p.id === id)
                if (product) {
                    //console.log(`Product not Found: ${JSON.stringify(product)}`);
                    let mostrarConFormato = {
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        thumbnail: product.thumbnail,
                        code: product.code,
                        stock: product.stock
                    }
                    //"I am doing it this way and not using ${products} because when I print it to the console, it puts all the data together and they are easy to understand, so this new way of showing them makes them easy to read."

                    console.log(mostrarConFormato)
                } else {
                    console.log(`A product with the id was not found: ${id}`);
                }
            }

        } catch (error) {
            console.error(error);
        }
    }


    updateProduct = async (product) => {
        const { title, description, price, thumbnail, code, stock, id } = product
        const updateProduct = new Product(title, description, price, thumbnail, code, stock, id)
        try {
            const productFinded = await this.fileSystem.promises.readFile(this.productFileName, 'utf-8')

            if (productFinded) {
                this.products = JSON.parse(productFinded)
                const getprd = this.products.find(p => p.id === updateProduct.id)
                if (getprd) {
                    console.log(`File ${JSON.stringify(getprd)}`)
                    getprd.title = product.title
                    getprd.description = product.description
                }

                let jsonData = JSON.stringify(this.products, null, 2);

                await this.fileSystem.promises.writeFile(this.productFileName, jsonData);
                console.log(`The following fields were updated: title:${getprd.title} description:${getprd.description} del producto guardado.`);
            }
            console.log(product)

        } catch (error) {
            console.error(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const productFinded = await this.fileSystem.promises.readFile(this.productFileName, 'utf-8')

            if (productFinded) {
                this.products = JSON.parse(productFinded)
                const updatedProducts = this.products.filter(p => p.id !== id)
                let jsonData = JSON.stringify(updatedProducts, null, 2);
                await this.fileSystem.promises.writeFile(this.productFileName, jsonData);
                console.log(`Producto with id: ${id} deleted.`);
            }

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ProductManager;