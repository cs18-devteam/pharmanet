class Product{
    #name;
    #description;
    #id;
    #price;

    constructor({name , description , id , price}){
        this.#id = id;
        this.#price = price;
        this.#description = description;
        this.#name = name;
    }

    get(){
        const product = {
            name : this.#name,
            description : this.#description,
            id : this.#id,
            price : this.#price,
        }

        return product;
    }


}

export default Product;