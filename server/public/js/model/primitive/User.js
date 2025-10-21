
class User{
    #firstName ;
    #lastName ;
    #email ;
    #nic ;
    #fullName ;
    #dateOfBirth ;
    #addressNo ;
    #street ;
    #town ;
    #province ;
    #postalCode ;
    #bank ;
    #accountNo ;
    #bankBranch ;
    #userName ;
    #mobileNumber;
    #road ;
    #id ;
    #role ;
    #profile;



    constructor({
        firstName , lastName , email , nic , fullName , dateOfBirth , addressNo , street , town , province , postalCode , bank ,accountNo , bankBranch , userName , mobileNumber , road , id  , profile  , role
    }){
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#nic = nic;
        this.#fullName  = fullName;
        this.#dateOfBirth = dateOfBirth;
        this.#addressNo = addressNo;
        this.#street = street;
        this.#town = town;
        this.#province = province;
        this.#postalCode = postalCode;
        this.#bank = bank;
        this.#accountNo = accountNo;
        this.#bankBranch = bankBranch;
        this.#userName = userName;
        this.#mobileNumber = mobileNumber;
        this.#road = road;
        this.#id = id;
        this.#role = role;
        this.#profile = profile;
    }

    addBankDetails({
        bank = this.#bank , 
        branch = this.#bankBranch , 
        accountNo = this.#accountNo 
    }){
        this.#bank = bank;
        this.#accountNo = accountNo;
        this.#bankBranch = branch;
    }
    
    get(){
        const user = {
            firstName : this.#firstName,
            lastName : this.#lastName,
            nic : this.#nic,
            fullName  : this.#fullName,
            dateOfBirth : this.#dateOfBirth,
            userName : this.#userName,
            id : this.#id,
            profile : this.#profile,
            
            // location info
            addressNo : this.#addressNo,
            street : this.#street,
            road : this.#road,
            town : this.#town,
            province : this.#province,
            postalCode : this.#postalCode,
            
            //banking info
            bank : this.#bank,
            accountNo : this.#accountNo,
            bankBranch : this.#bankBranch,
            
            //contact info
            mobileNumber : this.#mobileNumber,
            email : this.#email,
        }

        return user;
    }

    addBasicDetails({firstName=this.#firstName , lastName=this.#lastName , nic=this.#nic , fullName=this.#fullName , dateOfBirth=this.#dateOfBirth , id = this.#id , userName = this.#userName , role = this.#role}){
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#nic = nic;
        this.#fullName = fullName;
        this.#dateOfBirth = dateOfBirth;
        this.#id = id;
        this.#userName = userName;
        this.#role = role;
    }

    addContactDetails({
        email = this.#email,
        mobileNumber = this.#mobileNumber,
        addressNo = this.#addressNo,
        street = this.#street , 
        town = this.#town,
        road = this.#road,
        province = this.#province , 
        postalCode = this.#postalCode,
    }){
        this.#mobileNumber = mobileNumber;
        this.#addressNo = addressNo;
        this.#street = street;
        this.#town = town;
        this.#road = road;
        this.#province = province;
        this.#postalCode = postalCode;
        this.#email = email;
    }
}

export default User;