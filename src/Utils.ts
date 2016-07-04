export function flatten (obj: Object): Object {
    const flattened: any = {}

    function recurse (current: any, property?: string) {
        if (!property && Object.getOwnPropertyNames(current).length === 0) {
            return
        }

        if (Object(current) !== current || Array.isArray(current)) {
            flattened[property] = current
        } else {
            if (Object.getOwnPropertyNames(current).length === 0) {
                flattened[property] = {}
            } else {
                for (let p in current) {
                    recurse(current[p], property ? property + "." + p : p)
                }
            }
        }
    }

    if (obj) {
        recurse(obj)
    }

    return flattened
}

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