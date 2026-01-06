const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db')
const foodCollection = () => getDB().collection('foods');

const foodModel = {
    async topFood(limit = 6){
        return await foodCollection().find().limit(6).toArray()
    },
    async update(food){
        const {_id,...data} = food;
        return  await foodCollection().updateOne({_id: new ObjectId(food._id)},{$set: data})
    },
    async getById(id){
        return await foodCollection().findOne({_id: new ObjectId(id)})
    },

    async getByMail(email){
        return await foodCollection().find({addedByEmail: email}).toArray()
    },
}


module.exports = { foodModel }