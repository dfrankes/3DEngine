export default class Observer {
    observe = (target, origin = false, cb = false) => {
        if (typeof target === 'undefined') throw new Error('Invalid target type');
        if (typeof origin === 'undefined') throw new Error('Invalid origin type');
        if (!cb) throw new Error('Variable observer must have a callback!');


        if(typeof this[target] !== "undefined"){
            throw new Error(`Variable with name ${target} already defined`)
        }

        return new Proxy(origin, {
            set: (obj, prop, value) => {
                cb(obj, prop, value);
                obj[prop] = value;
                return obj;
            }
        });
    }

}