const Model = require("../common/Model");

class BlogModel extends Model{
    constructor(){
        super();
        this.title = {
            type:"VARCHAR(100)",
            null: false,
        }

        this.slug = {
            type:"VARCHAR(100)",
            null : false,
        }

        this.excerpt = {
            type:"VARCHAR(100)",
        }

        this.content = {
            type : "VARCHAR(100)"
        }

        this.status = {
            type:"VARCHAR(20)"
        }

        this.category = {
            type:"VARCHAR(20)"
        }

        this.author = {
            type:"VARCHAR(20)"
        }

         this.tag = {
            type:"VARCHAR(20)"
        }

        this.links = {
            type : "VARCHAR(200)",
        }
        

    }
}

const Blogs = new BlogModel();
Blogs.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Blogs;