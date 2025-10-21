export default class Model{

    static create = async (url , params , data) => {
        const respond = await Application.server.save({
            url : Application.registry.DynamicURL(url , params
            ),
            data,
        })

        return respond;
    }

    static getById = async (url ,params)=>{
        const respond = await Application.server.get({
            url : Application.registry.DynamicURL(url , params)
        });
    }
    static deleteById = async (url ,params)=>{
        const respond = await Application.server.delete({
            url : Application.registry.DynamicURL(url , params)
        });
    }

    static all = async (url = "" , params = {}) =>{
        const respond = await Application.server.get({
            url : Application.registry.DynamicURL( url , params),
        });

        return respond;
    }

    static delete = async (url="")=>{

        const respond = await Application.server.delete({
            url,
        });
        return respond;

    }

    static update = async (url , params , data)=>{
        const respond = await Application.server.update({
            url : Application.registry.DynamicURL(url , params),
            data ,
        });
        const results =  await respond.json();
        return results;
    }


    delete(){}
    get(){}
    create(){}
    update(){}



}

