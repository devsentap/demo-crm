const CosmosClient = require('@azure/cosmos').CosmosClient;
const config       = require('./config');
const endpoint     = config.endpoint;
const key          = config.key;
const client       = new CosmosClient({ endpoint, key });
const databaseId   = config.database.id;
const containerId  = config.container.id;

module.exports = async function (context, req) {
    context.log('START removeCustomer');

    checkParam(context, req, 'email');
    var email = req.query.email;
    
    var customer = context.bindings.inputCustomer;
    if (!customer) {
        context.res = {
            status: 400,
            body: `Customer with email ${email} not found.`
        };
        context.done();
    }

    try {        
        await client.database(databaseId).container(containerId).item(customer.id, customer.email).delete(customer);
        context.res = {            
            body: `Customer with email ${email} successfully removed.`
        };        
    } catch (error) {
        if (error.code === 404) {            
            context.res = {
                status: 400,
                body: `Customer with email ${email} to delete was not found.`
            };            
        }
        else {            
            context.res = {            
                body: `Something went wrong. Please try again after a few minutes.`
            };
        }
    }

    context.log('END removeCustomer');
};

function checkParam(context, req, param_name) {
    var hasParam = req.query[param_name];
    if (!hasParam) {
        context.res = {
            status: 400,
            body: `Missing param ${param_name}`
        };
        context.done();
    }
}