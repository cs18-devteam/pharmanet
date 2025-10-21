class Registry{
    static URL_HOME = "/";
    static URL_REGISTER_PHARMACY = "/pharmacies/"
    static URL_LOG_IN = "/login";
    static URL_SIGNUP = "/signup";
    static URL_STAFF = "/pharmacies/:pharmacyId/staff/:staffId";
    static URL_CUSTOMERS = "/users/customers/:id";
    static URL_PRODUCTS = '/products/:id';
    static URL_PHARMACY = '/pharmacies/:id';
    static URL_TRANSACTIONS = '/transactions/:id';
    static URL_ADMIN_MEDICINES = '/admin/:adminId/medicines';
    static URL_ADMIN_MEDICINES_CREATE = '/admin/:adminId/medicine/create';
    static URL_ADMIN_MEDICINES_MEDICINE = '/admin/:adminId/medicines/:id';
    static URL_BLOGS = '/blogs/:id';
    static URL_STAFF_ATTENDANCE = Registry.URL_STAFF + "/attendance"
    static URL_LEAVE = Registry.URL_STAFF + "/leaves/:leaveId";

    static DynamicURL(Url = "" , params = {}){
        let replaceUrl = Url;
        console.log(params);

        for(const [name , value] of Object.entries(params)){
            replaceUrl = replaceUrl.replace(`:${name}` , value);
        }
        return replaceUrl;
    }
}


export default Registry;