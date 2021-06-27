"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resources = (function () {
  function resources() {
  }
  resources.digit = /^\d+$/;
  resources.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/i;
  resources.url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  resources.ipv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  resources.ipv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  return resources;
}());
exports.resources = resources;
function isDigitOnly(str) {
  if (!str) {
    return false;
  }
  return resources.digit.test(str);
}
exports.isDigitOnly = isDigitOnly;
var tel = (function () {
  function tel() {
  }
  tel.isPhone = function (str) {
    if (!str || str.length === 0 || str === '+') {
      return false;
    }
    if (str.charAt(0) !== '+') {
      return isDigitOnly(str);
    }
    else {
      var phoneNumber = str.substring(1);
      if (!resources.phonecodes) {
        return isDigitOnly(phoneNumber);
      }
      else {
        if (isDigitOnly(phoneNumber)) {
          for (var degit = 1; degit <= 3; degit++) {
            var countryCode = phoneNumber.substr(0, degit);
            if (countryCode in resources.phonecodes) {
              return true;
            }
          }
          return false;
        }
        else {
          return false;
        }
      }
    }
  };
  tel.isFax = function (fax) {
    return tel.isPhone(fax);
  };
  return tel;
}());
exports.tel = tel;
function isIPv4(ipv4) {
  if (!ipv4 || ipv4.length === 0) {
    return false;
  }
  return resources.ipv4.test(ipv4);
}
exports.isIPv4 = isIPv4;
function isIPv6(ipv6) {
  if (!ipv6 || ipv6.length === 0) {
    return false;
  }
  return resources.ipv6.test(ipv6);
}
exports.isIPv6 = isIPv6;
function isEmail(email) {
  if (!email || email.length === 0) {
    return false;
  }
  return resources.email.test(email);
}
exports.isEmail = isEmail;
function isUrl(url) {
  return resources.url.test(url);
}
exports.isUrl = isUrl;
function createError(path, name, code, param) {
  var x = name;
  if (path && path.length > 0) {
    x = path + '.' + name;
  }
  var error = {
    field: x,
    code: code
  };
  if (param) {
    error.param = param;
  }
  return error;
}
var _datereg = '/Date(';
var _re = /-?\d+/;
function toDate(v) {
  if (!v || v === '') {
    return null;
  }
  if (v instanceof Date) {
    return v;
  }
  else if (typeof v === 'number') {
    return new Date(v);
  }
  var i = v.indexOf(_datereg);
  if (i >= 0) {
    var m = _re.exec(v);
    var d = parseInt(m[0], null);
    return new Date(d);
  }
  else {
    if (isNaN(v)) {
      return new Date(v);
    }
    else {
      var d = parseInt(v, null);
      return new Date(d);
    }
  }
}
function handleMinMax(v, attr, path, errors) {
  var na = attr.name;
  if (attr.min) {
    if (v < attr.min) {
      errors.push(createError(path, na, 'min', attr.min));
    }
  }
  else if (attr.gt) {
    if (v <= attr.gt) {
      errors.push(createError(path, na, 'gt', attr.gt));
    }
  }
  if (attr.max) {
    if (v > attr.max) {
      errors.push(createError(path, na, 'max', attr.max));
    }
  }
  else if (attr.lt) {
    if (v >= attr.lt) {
      errors.push(createError(path, na, 'lt', attr.lt));
    }
  }
}
function validateObject(obj, attributes, errors, path, allowUndefined, max, patch) {
  var keys = Object.keys(obj);
  var count = 0;
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    count = count + 1;
    var attr = attributes[key];
    if (!attr) {
      if (!allowUndefined) {
        errors.push(createError(path, key, 'undefined'));
      }
    }
    else {
      var na = attr.name;
      var v = obj[na];
      if (!v) {
        if (attr.required && !patch) {
          errors.push(createError(path, na, 'required'));
        }
      }
      else {
        switch (attr.type) {
          case undefined:
          case 'string':
          case 'text': {
            if (typeof v !== 'string') {
              errors.push(createError(path, na, 'string'));
              return;
            }
            else {
              if (v.length === 0) {
                if (attr.required) {
                  errors.push(createError(path, na, 'required'));
                }
              }
              else {
                if (attr.min && attr.min > 0 && v.length < attr.min) {
                  errors.push(createError(path, na, 'minlength', attr.min));
                }
                if (attr.length && attr.length > 0 && v.length > attr.length) {
                  errors.push(createError(path, na, 'maxlength', attr.length));
                }
                if (attr.format) {
                  switch (attr.format) {
                    case 'email': {
                      if (!isEmail(v)) {
                        errors.push(createError(path, na, 'email'));
                      }
                      break;
                    }
                    case 'url': {
                      if (!isUrl(v)) {
                        errors.push(createError(path, na, 'url'));
                      }
                      break;
                    }
                    case 'phone': {
                      if (!tel.isPhone(v)) {
                        errors.push(createError(path, na, 'phone'));
                      }
                      break;
                    }
                    case 'fax': {
                      if (!tel.isFax(v)) {
                        errors.push(createError(path, na, 'fax'));
                      }
                      break;
                    }
                    case 'ipv4': {
                      if (!isIPv4(v)) {
                        errors.push(createError(path, na, 'ipv4'));
                      }
                      break;
                    }
                    case 'ipv6': {
                      if (!isIPv6(v)) {
                        errors.push(createError(path, na, 'ipv6'));
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
                  var exp = attr.exp;
                  if (!exp.test(v)) {
                    var code = (attr.code ? attr.code : 'exp');
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
          case 'number':
          case 'integer': {
            if (typeof v !== 'number') {
              errors.push(createError(path, na, 'number'));
              return;
            }
            else {
              handleMinMax(v, attr, path, errors);
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case 'datetime':
            var date = toDate(v);
            var error = date.toString();
            if (!(date instanceof Date) || error === 'Invalid Date') {
              errors.push(createError(path, na, 'date'));
              return;
            }
            else {
              handleMinMax(v, attr, path, errors);
            }
            if (errors.length >= max) {
              return;
            }
            break;
          case 'date': {
            if (resources.ignoreDate) {
              var date2 = toDate(v);
              var error2 = date2.toString();
              if (!(date2 instanceof Date) || error2 === 'Invalid Date') {
                errors.push(createError(path, na, 'date'));
                return;
              }
              else {
                handleMinMax(v, attr, path, errors);
              }
              if (errors.length >= max) {
                return;
              }
            }
            break;
          }
          case 'boolean': {
            if ((typeof v === 'boolean') !== true) {
              errors.push(createError(path, na, 'boolean'));
              return;
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case 'object': {
            if (typeof v !== 'object') {
              errors.push(createError(path, na, 'object'));
              return;
            }
            else {
              if (Array.isArray(v)) {
                errors.push(createError(path, na, 'object'));
              }
              else {
                var x = (path != null && path.length > 0 ? path + '.' + key : key);
                validateObject(v, attr.typeof.attributes, errors, x);
              }
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case 'array': {
            if (typeof v !== 'object') {
              errors.push(createError(path, na, 'array'));
              return;
            }
            else {
              if (!Array.isArray(v)) {
                errors.push(createError(path, na, 'array'));
              }
              else {
                if (attr.min && attr.min > 0 && v.length < attr.min) {
                  errors.push(createError(path, na, 'min', attr.min));
                }
                if (attr.max && attr.max > 0 && v.length > attr.max) {
                  errors.push(createError(path, na, 'max', attr.max));
                }
                for (var i = 0; i < v.length; i++) {
                  if (typeof v !== 'object') {
                    var y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                    errors.push(createError('', y, 'object'));
                    if (errors.length >= max) {
                      return;
                    }
                  }
                  else {
                    var y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                    validateObject(v[i], attr.typeof.attributes, errors, y);
                  }
                }
              }
            }
            if (errors.length >= max) {
              return;
            }
            break;
          }
          case 'primitives': {
            if (typeof v !== 'object') {
              errors.push(createError(path, na, 'array'));
              return;
            }
            else {
              if (!Array.isArray(v)) {
                errors.push(createError(path, na, 'array'));
                return;
              }
              else {
                if (attr.code) {
                  if (attr.code === 'date') {
                    for (var i = 0; i < v.length; i++) {
                      if (v[i]) {
                        var date3 = toDate(v);
                        var error3 = date.toString();
                        if (!(date3 instanceof Date) || error3 === 'Invalid Date') {
                          var y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                          var err = createError('', y, 'date');
                          errors.push(err);
                          if (errors.length >= max) {
                            return;
                          }
                        }
                      }
                    }
                  }
                  else {
                    for (var i = 0; i < v.length; i++) {
                      if (v[i] && typeof v[i] !== attr.code) {
                        var y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                        var err = createError('', y, attr.code);
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
  if (patch) {
    return;
  }
  var aks = Object.keys(attributes);
  if (!allowUndefined) {
    if (count >= aks.length) {
      return;
    }
  }
  checkUndefined(obj, attributes, errors, aks);
}
function checkUndefined(obj, attrs, errors, keys) {
  if (!keys) {
    keys = Object.keys(attrs);
  }
  for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
    var key = keys_2[_i];
    var attr = attrs[key];
    if (attr.required) {
      var v = obj[key];
      if (!v) {
        errors.push(createError('', key, 'required'));
      }
    }
  }
}
exports.checkUndefined = checkUndefined;
function validate(obj, attributes, allowUndefined, max, patch) {
  var errors = [];
  var path = '';
  if (max == null) {
    max = undefined;
  }
  validateObject(obj, attributes, errors, path, allowUndefined, max, patch);
  return errors;
}
exports.validate = validate;
var Validator = (function () {
  function Validator(attributes, allowUndefined, max) {
    this.attributes = attributes;
    this.allowUndefined = allowUndefined;
    this.max = (max ? max : 5);
    this.validate = this.validate.bind(this);
  }
  Validator.prototype.validate = function (obj, patch) {
    var errors = validate(obj, this.attributes, this.allowUndefined, undefined, patch);
    return Promise.resolve(errors);
  };
  return Validator;
}());
exports.Validator = Validator;
function createValidator(attributes, allowUndefined, max) {
  var v = new Validator(attributes, allowUndefined, max);
  return v;
}
exports.createValidator = createValidator;
