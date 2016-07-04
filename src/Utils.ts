export function objectPath (obj: Object, path: string = ""): any {
    const keys: Array<string> = path
        .replace(/\[(\w+)\]/g, ".$1")
        .replace(/^\./, "")
        .split(".")
    let value: any = Object.assign({}, obj)

    for (let key in keys) {
        if (value.hasOwnProperty(key)) {
            value = value[key]
        } else {
            return
        }
    }
    return value
}