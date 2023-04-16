export function objectHasValue(obj: any, value: string) {
    for (let k in obj) {
        if (k.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            return obj[k];
    }
    return null;
}

export function objectHasKey(objectName: any, keyName: string) {
    let keyExist = Object.keys(objectName).some(key => key === keyName);
    return keyExist;
}

export function objectHasKeyLike(obj: any, prop: string) {

}