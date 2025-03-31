
export class ProductService {

    getProductsSmall() {
        return fetch('http://127.0.0.1:3009/products/products-small').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('http://127.0.0.1:3009/products/products-small').then(res => res.json()).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('http://127.0.0.1:3009/products/products-small').then(res => res.json()).then(d => d.data);
    }
}
