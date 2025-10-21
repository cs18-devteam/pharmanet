import Application from "../application/Application.js";
import Server from "../primitive/Server.js";
import User from "../primitive/User.js";


class StaffMember extends User{
    constructor({firstName , lastName , email , nic , fullName , dateOfBirth , addressNo , street , town , province , postalCode , bank ,accountNo , bankBranch , userName, id }){

        super({firstName , lastName , email , nic , fullName , dateOfBirth , addressNo , street , town , province , postalCode , bank ,accountNo , bankBranch , userName, id });
    }

    static getAllStaff(){
        const respond = Server.get({
            url : Application.registry.DynamicURL(Application.registry.URL_STAFF , { id : ' '}),
        });

        console.log(respond);
    }

}


export default StaffMember;




