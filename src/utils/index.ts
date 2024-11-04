export * from "./cn";

export function throwOrReturn(data: any) {
    if (data instanceof Error) throw data;
    else return data;
}
