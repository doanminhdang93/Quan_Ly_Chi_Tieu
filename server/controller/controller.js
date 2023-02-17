const model = require('../models/model');

// post: http://localhost:8080/api/categories
async function create_Categories(req,res) {
    const Create = new model.Categories({
        type: 'Chi phí phát sinh',
        color: '#00f700' 
    })

    await Create.save(function (err){
        if(!err) return res.json(Create);
        return res.status(400).json({message: `Error while creating categories ${err}`});
    });
}

// get: http://localhost:8080/api/categories
async function get_Categories(req, res){
    let data = await model.Categories.find({});
    let filter = await data.map(v => Object.assign({}, {type: v.type, color: v.color}));
    return res.json(filter);
}

// post: http://localhost:8080/api/transaction
async function create_Transaction(req, res){
    let {name,type,cost,month} = req.body;
    if(!req.body) return res.status(400).json("Post HTTP Data not provided");

    const create = await new model.Transactions({
        name,
        type,
        cost,
        month,
        date: new Date()
    });
    
    create.save(function(err){
        if(!err) return res.json(create);
        return res.status(400).json({message: `Error while creating transaction: ${err}`});
    })
}

// get: http://localhost:8080/api/transaction
async function get_Transaction(req, res){
    let data = await model.Transactions.find({});
    return res.json(data);
}

// delete: http://localhost:8080/api/transaction
async function delete_Transaction(req,res){
    if(!req.body) return res.status(404).json({message: "Request body is not found"});
    await model.Transactions.deleteOne(req.body,function(err){
        if(!err) return res.json("Record has Deleted...!");
    }).clone().catch(function(err){res.json("Error while deleting transaction record")})
}

// update: http://localhost:8080/api/transaction
async function update_Transaction(req, res){
    if(!req.body) return res.status(400).json({message: "Request body is not found"});
    //console.log(req.body);
    let data = req.body;
    //let newTransaction = {month: "Tháng 1", name: "Mua trái phiếu",type: "Gửi tiết kiệm",cost: 150};
    let newTransaction = data[1];
    await model.Transactions.updateOne(data[0],{$set: newTransaction},function(err){
        if(err) throw err;
        return res.status(200).json({
            success: true,
            message: 'Updated transaction successfully',
            update_Transaction: newTransaction,
        });       
    }).clone().catch(function(err){res.json("Error while updating transaction record")})  
}

// get: http://localhost:8080/api/labels
async function get_Labels(req, res){
    model.Transactions.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info",
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({},{_id: v._id, name: v.name, type: v.type, cost: v.cost, month: v.month, color: v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Lookup Collection Error");
    })
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels,
    update_Transaction
};