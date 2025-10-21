class Pharmacy{
    constructor({name , googleLink , longitude , latitude , addressNo , open , closed , mobileNumber , email , password , docs , street , road , town , province , postalCode}){
        //basic info
        this.name = name;
        this.password = password;
        
        //contact info
        this.mobileNumber = mobileNumber;
        this.email = email;
        
        //location info
        this.addressNo = addressNo;
        this.street = street;
        this.road = road;
        this.town = town;
        this.province = province;
        this.postalCode = postalCode;
        this.googleLink = googleLink;
        this.latitude = latitude;
        this.longitude = longitude;
        
        //time info
        this.open = open;
        this.closed = closed;
        
        //additional info
        this.docs = docs;

    }


    addBasicDetails({name = this.name , password = this.password}){
        this.name = name;
        this.password = password;
    }

    addContactDetails({mobileNumber = this.mobileNumber , email = this.email}){
        //contact info
        this.mobileNumber = mobileNumber;
        this.email = email;
    }

    addLocationDetails({addressNo = this.addressNo , street = this.street , road = this.road , town = this.town , province = this.province , postalCode = this.postalCode , googleLink = this.googleLink , latitude = this.latitude , longitude=this.longitude
    }){
        this.addressNo = addressNo;
        this.street = street;
        this.road = road;
        this.town = town;
        this.province = province;
        this.postalCode = postalCode;
        this.googleLink = googleLink;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    addAdditionalDetails({docs = this.docs}){
        this.docs = docs;
    }
}

export default Pharmacy;