import { Rules } from "../Rules"
import { Rule, RuleValidator } from "./Rule"

export class RuleIP extends Rule {

    public static ruleName: string = "ip"

    // tslint:disable-next-line:max-line-length
    public static regexIPv4: RegExp = /(?:^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}$)/i
    public static regexIPv6: RegExp = /(?:^(?:(?:[0-9a-f:]){1,4}(?:(?::(?:[0-9a-f]){1,4}|:)){2,7})+$)/i

    public name: string = RuleIP.ruleName
    public fn: RuleValidator = (value: any) => {
        return RuleIP.regexIPv4.test(value) || RuleIP.regexIPv6.test(value)
    }

}

Rules.registered[RuleIP.ruleName] = new RuleIP()
