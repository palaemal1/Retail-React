import * as product from "./products";
import * as admin from "./admin";
class API{
    product :typeof product;
    admin:typeof admin;
    constructor(){
        this.product=product;
        this.admin=admin;
    }
}
const api=new API();
export default api;