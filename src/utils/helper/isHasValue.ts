import { isNull, isUndefined } from "lodash";

//Function check value | available : data , unavailable: data?.object.name , function
export function isHasValue(input: any): boolean {
  if (input == undefined) {
    return false;
  }else if (input == null) {
    return false;
  } else {
    switch (typeof input) {
      case "string":
        return input.trim() !== "";
      case "object":
        return Object.keys(input).length > 0;
      case "boolean":
        return input;
      case "number":
        return input > 0;
      default:
        return Array.isArray(input) ? input.length > 0 : true;
    }
  }
}
