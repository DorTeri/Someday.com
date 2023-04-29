const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection('product')
        console.log('filterBy', filterBy)
        if (filterBy.brand) var products = await collection.find({ brand: filterBy.brand }).toArray()
        else var products = await collection.find().toArray()
        if (products.length === 0) {
            products = await collection.find({ owner: "skdj8s7dkj38jsk92d23sdk" }).toArray()
        }
        return products
    } catch (err) {
        logger.error('cannot find products', err)
        throw err
    }
}

async function getById(productId) {
    try {
        const collection = await dbService.getCollection('product')
        const product = collection.findOne({ _id: ObjectId(productId) })
        return product
    } catch (err) {
        logger.error(`while finding product ${productId}`, err)
        throw err
    }
}

async function remove(productId) {
    try {
        const collection = await dbService.getCollection('product')
        await collection.deleteOne({ _id: ObjectId(productId) })
        return productId
    } catch (err) {
        logger.error(`cannot remove product ${productId}`, err)
        throw err
    }
}

async function add(product) {
    try {
        const collection = await dbService.getCollection('product')
        await collection.insertOne(product)
        return product
    } catch (err) {
        logger.error('cannot insert product', err)
        throw err
    }
}

async function update(product) {
    console.log('product', product)
    try {
        const productToSave = {
            brand: product.brand,
            ctg: product.ctg,
            model: product.model,
            type: product.type,
            price: product.price,
            prevPrice: product.prevPrice,
            url1: product.url1,
            url2: product.url2,
            url3: product.url3,
            url4: product.url4
        }
        console.log('productToSave', productToSave)
        const collection = await dbService.getCollection('product')
        await collection.updateOne({ _id: ObjectId(product._id) }, { $set: productToSave })
        return product
    } catch (err) {
        logger.error(`cannot update product ${productId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
