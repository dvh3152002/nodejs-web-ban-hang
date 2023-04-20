import db from "../models";

const payToCart=async(dataCustomer,dataOrder)=>{
    try {
        let customer=await db.Customer.create(dataCustomer);
        if(customer){
            dataOrder.map(item=>{
                item.customer_id=customer.id;
                return item;
            })
            await db.Order.bulkCreate(dataOrder)
        }
    } catch (error) {
        console.log(error);
    } 
}

const padTo2Digits=(num)=> {
    return num.toString().padStart(2, '0');
}

const formatDate=(date)=> {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
}

const getAllCustomer=async()=>{
    try {
        let customers=await db.Customer.findAll({});
        customers.map(item=>{
            item.createdAt=formatDate(item.createdAt);
            return item;
        })
        return customers;
    } catch (error) {
        console.log(error)
    }
}

module.exports={payToCart,getAllCustomer}