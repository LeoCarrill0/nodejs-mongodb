const {ObjectId} = require('mongodb');

const {Database} = require('../database/index') ;
const {ProductsUtils} =  require('./utils');

const COLLECTION = 'products';

const getAll = async() => {
    const collecction = await Database(COLLECTION)
    return await collecction.find({}).toArray();
}

const getById = async(id) => {
    const collecction = await Database(COLLECTION);
    const objectId = new ObjectId(id);
    return collecction.findOne({ _id: objectId});
}

const create = async(product) => {
    const collecction = await Database(COLLECTION);
    let results = await collecction.insertOne(product);
    return results.insertedId;
}

const generateReport = async(name, res) =>{
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport
}