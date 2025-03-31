export class CustomerService {

    getCustomersSmall() {
        return fetch('http://127.0.0.1:3009/accountTag/getFHAccountTag').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersMedium() {
        return fetch('http://127.0.0.1:3009/accountTag/getFHAccountTag').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersLarge() {
        return fetch('http://127.0.0.1:3009/accountTag/getFHAccountTag').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersXLarge() {
        return fetch('http://127.0.0.1:3009/accountTag/getFHAccountTag').then(res => res.json())
                .then(d => d.data);
    }

    getCustomers(params:any) {
        const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : '';
        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then(res => res.json())
    }
    fhgetCustomers() {
        const queryParams ='';
        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then(res => res.json())
    }
}
