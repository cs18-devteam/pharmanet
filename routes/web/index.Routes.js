const SubRouter = require("../../common/SubRouter");
const indexController = require('../../controllers/index.controller');
const contactUsController = require('../../controllers/contactus.controller');


exports.indexRouter = SubRouter.route('/')
.subRoute('/' , {
    get: indexController.renderIndexPage,
})
.subRoute('/contactus' , {
    get : contactUsController.renderContactus,
})
.subRoute('/aboutus' , {
    get : contactUsController.renderAboutUs,
})