module.exports = async function (context, req) {
    context.log('START getCustomers');
    var customers = context.bindings.customers; // returns array of customers objects, empty array if no customers
    //context.log('customers', customers);
    context.res = {
        body: customers
    };
    context.log('END getCustomers');    
};