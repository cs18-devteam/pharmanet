const SubRouter = require("../../common/SubRouter");
const { queryHandler } = require("../../controllers/docs/querHandler");



const docsApiRouter = SubRouter.route("/api/v1/docs")
.subRoute('/:pharmacyId' , {
    post : queryHandler,
})


module.exports = docsApiRouter;