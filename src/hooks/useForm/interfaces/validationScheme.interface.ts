interface hasMessage {
  message: string;
}

interface requiredTypeScheme extends hasMessage{
  value: boolean;
}

interface patternTypeScheme extends hasMessage{
  value: RegExp;
}

interface customTypeScheme extends hasMessage{
  isValid(data: Record<string, unknown>): boolean;
}

interface ruleTypeScheme extends customTypeScheme{
  name: string;
}

export interface ValidationScheme {
    [key: string]: {
        required?: requiredTypeScheme,
        pattern?: patternTypeScheme,
        custom?: customTypeScheme,
        rules?: ruleTypeScheme[]
    }
}
