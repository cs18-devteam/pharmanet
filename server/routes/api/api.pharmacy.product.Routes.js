const SubRouter = require("../../common/SubRouter");

exports.pharmacyProductApiRouter = SubRouter.route('/api/v1/pharmacy/:pharmacyId/products')
.subRoute('/' , {
    get:''
})
.subRoute('/create' , {
    post :"",
})
.subRoute("/:productId" , {
    delete:"",
    update:"",
    get:"",
})