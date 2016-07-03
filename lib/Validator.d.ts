export interface RulesSchema {
    [key: string]: string | Array<string> | RulesSchema;
}
export declare type AttributeFormatter = (attribute: string) => string;
