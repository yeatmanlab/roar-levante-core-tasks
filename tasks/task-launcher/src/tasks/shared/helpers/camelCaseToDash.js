export function camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
