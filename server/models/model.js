const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// categories => field => ['type','color']
const categories_model = new Schema({
    type: {type: String, default: 'Chi phí sinh hoạt'},
    color: {type: String, default: '#FCHD55'}
})

// transactions => field => ['name','type','cost','date']
const transactions_model = new Schema({
    name: {type: String, default: 'Chưa có giao dịch'},
    type: {type: String, default: 'Chi phí sinh hoạt'},
    cost: {type: Number},
    month: {type: String, default: 'Tháng 1'},
    date: {type: Date, default: Date.now}
})

const Categories = mongoose.model('categories', categories_model);
const Transactions = mongoose.model('transactions',transactions_model);

module.exports = {
    Categories,
    Transactions
}