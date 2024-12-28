/**
 * 生成成功的响应
 */
export function successResponse<T>(data: T) {
    if (typeof data === 'string') {
        return {
            code: 0,
            msg: data,
        }
    }
    return {
        code: 0,
        msg: 'success',
        data,
    }
}

/**
 * 生成失败的响应
 */
export function failResponse(msg: string) {
    return {
        code: -1,
        msg,
    }
}
/**
 * 从对象中选择指定的键值对
 * @param obj - 要从中选择键值对的对象
 * @param keys - 要选择的键的列表
 * @returns 一个新对象，包含从原对象中选择的键值对
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const ret: any = {};
    keys.forEach((key) => {
        if (key in obj) {
            ret[key] = obj[key];
        }
    });
    return ret;
}
/**
 * 从对象中排除指定的键值对
 * @param obj - 要从中排除键值对的对象
 * @param keys - 要排除的键的列表
 * @returns 一个新对象，包含从原对象中排除的键值对
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const ret: any = { ...obj };
    keys.forEach((key) => {
        if (key in ret) {
            delete ret[key];
        }
    });
    return ret;
}