export function withoutProperty(obj: any, property: any) {
    const { [property]: unused, ...rest } = obj

    return rest
}