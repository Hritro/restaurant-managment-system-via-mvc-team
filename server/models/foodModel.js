const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db')
const foodCollection = () => getDB().collection('foods');

const foodModel = {
    async topFood(limit = 6){
        return await foodCollection().find().limit(6).toArray()
    }
}


module.exports = { foodModel }