module.exports = async function (context, req) {
    context.log('START insertCustomer');

    checkParam(context, req, 'email');
    checkParam(context, req, 'name');
    checkParam(context, req, 'mobile');
    checkParam(context, req, 'address');
    checkParam(context, req, 'product_ids');
    checkParam(context, req, 'source');
    checkParam(context, req, 'created');

    var customer = context.bindings.inputCustomer;
    if (customer) {
        context.res = {
            status: 400,
            body: `Customer with email ${req.query.email} already registered.`
        };
        context.done();
    }    
    
    // writes to azure cosmos db sql
    context.bindings.outputCustomer = {            
        "id":          req.query.id,
        "email":       req.query.email,
        "name":        req.query.name,
        "mobile":      req.query.mobile,
        "address":     req.query.address,
        "product_ids": req.query.product_ids,
        "source":      req.query.source,
        "created":     req.query.created
    };
    context.res = {        
        body: `Customer with email ${req.query.email} successfully registered.`
    };
    
    context.log('END insertCustomer');
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