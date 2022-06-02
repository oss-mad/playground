import { ParseError, TypeMismatchError } from '../errors';

export const parseValidJsonObject = <T extends object>(
  stringValue: string | undefined
): T => {
  if (stringValue === undefined) {
    throw new ParseError(`Invalid 'undefined' JSON value.`);
  }
  // we may want to allow the parsing to be customized.
  try {
    const value = JSON.parse(stringValue);
    if (typeof value !== 'object') {
      throw new TypeMismatchError(
        `Flag value ${stringValue} had unexpected type ${typeof value}, expected "object"`
      );
    }
    return value;
  } catch (err) {
    throw new ParseError(`Error parsing ${stringValue} as JSON, ${err}`);
  }
};
