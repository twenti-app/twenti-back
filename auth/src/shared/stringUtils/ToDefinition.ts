export function toDefinition(object: any): any {
    const keys = Object.keys(object)
    const result = {};
    keys.forEach(k => {
        const type = typeof object[k];
        if (type === 'object') {
            result[k] = completeObject(object[k]);
            return;
        }
        result[k] = {
            "type": typeof object[k]
        };
    })
    return result;
}

function completeObject(value) {
    if (value instanceof Date) return {type: 'string', format: 'date-time'};
    const result = toDefinition(value);
    const isArray = Array.isArray(value);
    if (isArray) return completeArray(value[0]);
    return {properties: result, type: 'object'};
}

function completeArray(value) {
    const items = completeObject(value);
    return {items: items, type: 'array'}
}