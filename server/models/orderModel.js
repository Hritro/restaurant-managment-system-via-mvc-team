const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db')
const orderCollection = () => getDB().collection('orders');
const foodCollection = () => getDB().collection('foods');
const cartCollection = () => getDB().collection('carts');

const orderModel = {
  async ordersByEmail(email) {
        return await orderCollection().find({buyersEmail: email}).toArray()
    },
}


module.exports = { orderModel }