export enum Type {
  ObjectId = 'ObjectId',
  Date = 'date',
  Boolean = 'boolean',

  Number = 'number',
  Integer = 'integer',
  String = 'string',

  Object = 'object',
  Array = 'array',
  Primitives =  'primitives',
  Binary = 'binary'
}

export enum Format {
  Currency = 'currency',
  Percentage = 'percentage',

  Email = 'email',
  Url = 'url',
  Phone = 'phone',
  Fax = 'fax',

  IPv4 = 'ipv4',
  IPv6 = 'ipv6',
}


export interface ErrorMessage {
  field: string;
  code: string;
  param?: string|number|Date;
}

export interface Metadata {
  attributes: any;
}

export interface Attribute {
  name?: string;
  type: Type;
  format?: Format;
  required?: boolean;
  length?: number;
  min?: number;
  max?: number;
  gt?: number;
  lt?: number;
  exp?: RegExp|string;
  code?: string;
  typeof?: Metadata;
}

// tslint:disable-next-line:class-name
export class resources {
  static phonecodes: any = null;
  static digit = /^\d+$/;
  static email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/i;
  static url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  static ipv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  static ipv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
}

export function isDigitOnly(str: string): boolean {
  if (!str) {
    return false;
  }
  return resources.digit.test(str);
}

// tslint:disable-next-line:class-name
export class tel {
  static isPhone(str: string): boolean {
    if (!str || str.length === 0 || str === '+') {
      return false;
    }
    if (str.charAt(0) !== '+') {
      return isDigitOnly(str);
    } else {
      const phoneNumber = str.substring(1);
      if (!resources.phonecodes) {
        return isDigitOnly(phoneNumber);
      } else {
        if (isDigitOnly(phoneNumber)) {
          for (let degit = 1; degit <= 3; degit++) {
            const countryCode = phoneNumber.substr(0, degit);
            if (countryCode in resources.phonecodes) {
              return true;
            }
          }
          return false;
        } else {
          return false;
        }
      }
    }
  }
  static isFax(fax: string): boolean {
    return tel.isPhone(fax);
  }
}

export function isIPv4(ipv4: string): boolean {
  if (!ipv4 || ipv4.length === 0) {
    return false;
  }
  return resources.ipv4.test(ipv4);
}
export function isIPv6(ipv6: string): boolean {
  if (!ipv6 || ipv6.length === 0) {
    return false;
  }
  return resources.ipv6.test(ipv6);
}
export function isEmail(email: string): boolean {
  if (!email || email.length === 0) {
    return false;
  }
  return resources.email.test(email);
}
export function isUrl(url: string): boolean {
  return resources.url.test(url);
}

function createError(path: string, name: string, code: string, param?: string|number|Date): ErrorMessage {
  let x = name;
  if (path && path.length > 0) {
    x = path + '.' + name;
  }
  const error: ErrorMessage = {
    field: x,
    code
  };
  if (param) {
    error.param = param;
  }
  return error;
}

const _datereg = '/Date(';
const _re = /-?\d+/;
function toDate(v: any) {
  if (!v || v === '') {
    return null;
  }
  if (v instanceof Date) {
    return v;
  } else if (typeof v === 'number') {
    return new Date(v);
  }
  const i = v.indexOf(_datereg);
  if (i >= 0) {
    const m = _re.exec(v);
    const d = parseInt(m[0], null);
    return new Date(d);
  } else {
    if (isNaN(v)) {
      return new Date(v);
    } else {
      const d = parseInt(v, null);
      return new Date(d);
    }
  }
}

function handleMinMax(v: number|Date, attr: Attribute, path: string, errors: ErrorMessage[]): void {
  const na = attr.name;
  if (attr.min) {
    if (v < attr.min) {
      errors.push(createError(path, na, 'min', attr.min));
    }
  } else if (attr.gt) {
    if (v <= attr.gt) {
      errors.push(createError(path, na, 'gt', attr.gt));
    }
  }
  if (attr.max) {
    if (v > attr.max) {
      errors.push(createError(path, na, 'max', attr.max));
    }
  } else if (attr.lt) {
    if (v >= attr.lt) {
      errors.push(createError(path, na, 'lt', attr.lt));
    }
  }
}
function validateObject(obj: any, meta: Metadata, errors: ErrorMessage[], path: string, max?: number, allowUndefined?: boolean): void {
  const keys = Object.keys(obj);
  for (const key of keys) {
    const attr: Attribute = meta.attributes[key];
    if (!attr) {
      if (!allowUndefined) {
        errors.push(createError(path, key, 'undefined'));
      }
    } else {
      const na = attr.name;
      const v = obj[na];
      if (!v) {
        if (attr.required) {
          errors.push(createError(path, na, 'required'));
        }
      } else {
        switch (attr.type) {
          case Type.String: {
            if (typeof v !== 'string') {
              errors.push(createError(path, na, 'string'));
            } else {
              if (v.length === 0) {
                if (attr.required) {
                  errors.push(createError(path, na, 'required'));
                }
              } else {
                if (attr.min && attr.min > 0 && v.length < attr.min) {
                  errors.push(createError(path, na, 'minlength', attr.min));
                }
                if (attr.length && attr.length > 0 && v.length > attr.length) {
                  errors.push(createError(path, na, 'maxlength', attr.length));
                }
                if (attr.format) {
                  switch (attr.format) {
                    case Format.Email: {
                      if (!isEmail(v)) {
                        errors.push(createError(path, na, 'email'));
                      }
                      break;
                    }
                    case Format.Url: {
                      if (!isUrl(v)) {
                        errors.push(createError(path, na, 'url'));
                      }
                      break;
                    }
                    case Format.Phone: {
                      if (!tel.isPhone(v)) {
                        errors.push(createError(path, na, 'phone'));
                      }
                      break;
                    }
                    case Format.Fax: {
                      if (!tel.isFax(v)) {
                        errors.push(createError(path, na, 'fax'));
                      }
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                }
                if (attr.exp) {
                  if (typeof attr.exp === 'string') {
                    attr.exp = new RegExp(attr.exp);
                  }
                  const exp: RegExp = attr.exp;
                  if (!exp.test(v)) {
                    const code = (attr.code ? attr.code : 'exp');
                    errors.push(createError(path, na, code));
                  }
                }
              }
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case Type.Number:
          case Type.Integer: {
            // If value is not number
            if (typeof v !== 'number') {
              errors.push(createError(path, na, 'number'));
            } else {
              handleMinMax(v, attr, path, errors);
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case Type.Date: {
            // If value is not date
            const date = toDate(v);
            const error = date.toString();
            if (!(date instanceof Date) || error === 'Invalid Date') {
              errors.push(createError(path, na, 'date'));
            } else {
              handleMinMax(v, attr, path, errors);
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case Type.Boolean: {
            // If value is not bool
            if ((typeof v === 'boolean') !== true) {
              errors.push(createError(path, na, 'boolean'));
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case Type.Object: {
            if (typeof v !== 'object') {
              errors.push(createError(path, na, 'object'));
            } else {
              if (Array.isArray(v)) {
                errors.push(createError(path, na, 'object'));
              } else {
                const x = (path != null && path.length > 0 ? path + '.' + key : key);
                validateObject(v, attr.typeof, errors, x);
              }
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case Type.Array: {
            if (typeof v !== 'object') {
              errors.push(createError(path, na, 'array'));
            } else {
              if (!Array.isArray(v)) {
                errors.push(createError(path, na, 'array'));
              } else {
                if (attr.min && attr.min > 0 && v.length < attr.min) {
                  errors.push(createError(path, na, 'min', attr.min));
                }
                if (attr.max && attr.max > 0 && v.length > attr.max) {
                  errors.push(createError(path, na, 'max', attr.max));
                }
                for (let i = 0; i < v.length; i++) {
                  if (typeof v !== 'object') {
                    const y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                    errors.push(createError('', y, 'object'));
                    if (errors.length >= max) {
                      return;
                    }
                  } else {
                    const y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                    validateObject(v[i], attr.typeof, errors, y);
                  }
                }
              }
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case Type.Primitives: {
            if (typeof v !== 'object') {
              errors.push(createError(path, na, 'array'));
            } else {
              if (!Array.isArray(v)) {
                errors.push(createError(path, na, 'array'));
              } else {
                if (attr.code) {
                  if (attr.code === 'date') {
                    for (let i = 0; i < v.length; i++) {
                      if (v[i]) {
                        const date = toDate(v);
                        const error = date.toString();
                        if (!(date instanceof Date) || error === 'Invalid Date') {
                          const y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                          const err = createError('', y, 'date');
                          errors.push(err);
                          if (errors.length >= max) {
                            return;
                          }
                        }
                      }
                    }
                  } else {
                    for (let i = 0; i < v.length; i++) {
                      if (v[i] && typeof v[i] !== attr.code) {
                        const y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                        const err = createError('', y, attr.code);
                        errors.push(err);
                        if (errors.length >= max) {
                          return;
                        }
                      }
                    }
                  }
                }
                if (attr.min && attr.min > 0 && v.length < attr.min) {
                  errors.push(createError(path, na, 'min', attr.min));
                }
                if (attr.max && attr.max > 0 && v.length > attr.max) {
                  errors.push(createError(path, na, 'max', attr.max));
                }
              }
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }
}

export function validate(obj: any, meta: Metadata, max?: number, allowUndefined?: boolean): ErrorMessage[] {
  const errors: ErrorMessage[] = [];
  const path = '';
  if (max == null) {
    validateObject(obj, meta, errors, path, undefined, allowUndefined);
  } else {
    validateObject(obj, meta, errors, path, max, allowUndefined);
  }
  return errors;
}
