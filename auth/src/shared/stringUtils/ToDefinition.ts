export function toDefinition(object: any): any {
    const keys = Object.keys(object)
    const result = {};
    keys.forEach(k => {
        result[k] = {
            "type": typeof object[k]
        };
    })

    return result;
}