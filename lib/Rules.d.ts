export declare type RuleSync = (value: any, requirement: any, attribute: string) => boolean;
export declare type RuleAync = (value: any, requirement: any, attribute: string, done?: Function) => Promise<boolean> | void;
export declare type RuleCheck = RuleSync | RuleAync;
export declare class Rules {
}
