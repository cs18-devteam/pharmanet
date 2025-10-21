const Model = require("../common/Model");

class BlogModel extends Model{
    constructor(){
        super();
        this.user = {
            type:"INT",
            null: false,
        }

        this.publishedDate = {
            type:"DATE",
            null : false,
        }

        this.title = {
            type:"VARCHAR(100)",
        }

        this.content = {
            type : "VARCHAR(100)"
        }

        this.acceptedBy = {
            type:"INT"
        }

    }
}

const Blogs = new BlogModel();
Blogs.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Blogs;