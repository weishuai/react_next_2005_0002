
import store2_1 from "store2";
import js_cookie_1 from "js-cookie";
import eventemitter3_1 from "eventemitter3";
import lodash_1 from "lodash";
const ns = {namespace:''};
const getKey = (key: any) => (ns.namespace ? `${ns.namespace}:${key}` : key);
export const globalStorage = {
    set namespace(namespace) {
        ns.namespace = namespace;
    },
    get namespace() {
        var _a: string;
        return (_a = ns.namespace) !== null && _a !== void 0 ? _a : '';
    },
    events: new eventemitter3_1(),
    set: (key: any, data: any, saveToLS = true) => {
        if (saveToLS) {
            store2_1.set(getKey(key), data);
        }
        js_cookie_1.set(getKey(key), JSON.stringify(data), { sameSite: 'strict' });
    },
    get: (key: any) => {
        var _a: any;
        const val = store2_1.get(getKey(key));
        if (lodash_1.isEmpty(val)) {
            return JSON.parse((_a = js_cookie_1.get(getKey(key))) !== null && _a !== void 0 ? _a : 'null');
        }
        return val;
    },
    remove: (key: any) => {
        store2_1.remove(getKey(key));
        js_cookie_1.remove(getKey(key), { sameSite: 'strict' });
    },
};
