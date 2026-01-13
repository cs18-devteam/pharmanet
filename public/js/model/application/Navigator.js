export default class Navigator{
    static redirect(url = "/"){
        document.location.href = url;
    }

    static refresh(){
        document.location.href = document.location.href;
    }
}