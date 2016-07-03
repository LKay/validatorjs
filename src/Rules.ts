export type RuleSync = (value: any, requirement: any, attribute: string) => boolean
export type RuleAync = (value: any, requirement: any, attribute: string, done?: Function) => Promise<boolean> | void
export type RuleCheck = RuleSync | RuleAync

export class Rules {
    
}