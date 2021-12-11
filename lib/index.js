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
function isStrings(s) {
  if (!s || s.length === 0) {
    return true;
  }
  for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
    var x = s_1[_i];
    if (typeof x !== 'string') {
      return false;
    }
  }
  return true;
}
exports.isStrings = isStrings;
function isDates(s) {
  if (!s || s.length === 0) {
    return true;
  }
  for (var _i = 0, s_2 = s; _i < s_2.length; _i++) {
    var x = s_2[_i];
    if (!(x instanceof Date)) {
      return false;
    }
  }
  return true;
}
exports.isDates = isDates;
function isNumbers(s) {
  if (!s || s.length === 0) {
    return true;
  }
  for (var _i = 0, s_3 = s; _i < s_3.length; _i++) {
    var x = s_3[_i];
    if (typeof x !== 'number') {
      return false;
    }
  }
  return true;
}
exports.isNumbers = isNumbers;
function isIntegers(s) {
  if (!s || s.length === 0) {
    return true;
  }
  for (var _i = 0, s_4 = s; _i < s_4.length; _i++) {
    var x = s_4[_i];
    if (Number.isInteger(x)) {
      return false;
    }
  }
  return true;
}
exports.isIntegers = isIntegers;
function exist(v, s) {
  for (var _i = 0, s_5 = s; _i < s_5.length; _i++) {
    var x = s_5[_i];
    if (v === x) {
      return true;
    }
  }
  return false;
}
exports.exist = exist;
function toString(s) {
  if (!s || s.length === 0) {
    return '';
  }
  var x = [];
  for (var _i = 0, s_6 = s; _i < s_6.length; _i++) {
    var u = s_6[_i];
    x.push('' + u);
  }
  return x.join(',');
}
exports.toString = toString;
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
function isValidScale(n, scale) {
  if (isNaN(n) || n === undefined || n == null) {
    return true;
  }
  if (scale === undefined || scale == null || scale < 0) {
    return true;
  }
  var s = n.toString();
  var i = s.indexOf('.');
  if (i < 0) {
    return true;
  }
  var s2 = s.substr(i + 1);
  return (s2.length <= scale);
}
exports.isValidScale = isValidScale;
function isValidPrecision(n, precision, scale) {
  if (isNaN(n) || n === undefined || n == null) {
    return true;
  }
  if (precision === undefined || precision == null || precision < 0) {
    return isValidScale(n, scale);
  }
  if (scale === undefined || scale == null || scale < 0) {
    scale = 0;
  }
  var s = n.toString();
  var i = s.indexOf('.');
  if (i < 0) {
    return (s.length <= (precision - scale));
  }
  var s2 = s.substr(i + 1);
  if (s2.length > scale) {
    return false;
  }
  var s3 = s.substr(0, i);
  return (s3.length <= (precision - scale));
}
exports.isValidPrecision = isValidPrecision;
function createError(path, name, code, param) {
  var x = name;
  if (path && path.length > 0) {
    x = path + '.' + name;
  }
  if (!code) {
    code = 'string';
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
  if (!v) {
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
    if (m !== null) {
      var d = parseInt(m[0], 10);
      return new Date(d);
    }
    else {
      return null;
    }
  }
  else {
    if (isNaN(v)) {
      return new Date(v);
    }
    else {
      var d = parseInt(v, 10);
      return new Date(d);
    }
  }
}
function handleMinMax(v, attr, path, errors) {
  var na = attr.name;
  if (!na) {
    na = '';
  }
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
function validateObject(obj, attributes, errors, path, allowUndefined, patch, max) {
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
      attr.name = key;
      var na = attr.name;
      var v = obj[na];
      if (v == null) {
        if (attr.required && !patch) {
          errors.push(createError(path, na, 'required'));
        }
      }
      else {
        var t = typeof v;
        var at = attr.type;
        switch (t) {
          case 'string':
            if (at === undefined || at === 'string' || at === 'text') {
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
                if (attr.enum && attr.enum.length > 0) {
                  if (!exist(v, attr.enum)) {
                    errors.push(createError(path, na, 'enum', toString(attr.enum)));
                  }
                }
              }
            }
            else {
              errors.push(createError(path, na, at));
              return;
            }
            break;
          case 'number':
            if (attr.type === 'integer') {
              if (!Number.isInteger(v)) {
                errors.push(createError(path, na, 'integer'));
              }
            }
            else if (attr.type === 'number') {
              if (!attr.precision) {
                if (!isValidScale(v, attr.scale)) {
                  errors.push(createError(path, na, 'scale'));
                }
              }
              else {
                if (!isValidPrecision(v, attr.precision, attr.scale)) {
                  errors.push(createError(path, na, 'precision'));
                }
              }
            }
            else {
              errors.push(createError(path, na, 'number'));
              return;
            }
            handleMinMax(v, attr, path, errors);
            if (attr.enum && attr.enum.length > 0) {
              if (!exist(v, attr.enum)) {
                errors.push(createError(path, na, 'enum', toString(attr.enum)));
              }
            }
            break;
          case 'boolean':
            if (at !== 'boolean') {
              errors.push(createError(path, na, at));
              return;
            }
            break;
          case 'object':
            if (Array.isArray(v)) {
              switch (attr.type) {
                case 'strings': {
                  if (!isStrings(v)) {
                    errors.push(createError(path, na, 'strings'));
                  }
                  break;
                }
                case 'numbers': {
                  if (!isNumbers(v)) {
                    errors.push(createError(path, na, 'numbers'));
                  }
                  break;
                }
                case 'integers': {
                  if (!isIntegers(v)) {
                    errors.push(createError(path, na, 'integers'));
                  }
                  break;
                }
                case 'datetimes': {
                  if (!isDates(v)) {
                    errors.push(createError(path, na, 'datetimes'));
                  }
                  break;
                }
                case 'dates': {
                  if (resources.ignoreDate) {
                    if (!isDates(v)) {
                      errors.push(createError(path, na, 'dates'));
                    }
                  }
                  break;
                }
                case 'array': {
                  for (var i = 0; i < v.length; i++) {
                    if (typeof v !== 'object') {
                      var y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                      errors.push(createError('', y, 'object'));
                    }
                    else if (attr.typeof) {
                      var y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                      validateObject(v[i], attr.typeof, errors, y);
                    }
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
                              if (date3) {
                                var error3 = date3.toString();
                                if (!(date3 instanceof Date) || error3 === 'Invalid Date') {
                                  var y = (path != null && path.length > 0 ? path + '.' + key + '[' + i + ']' : key + '[' + i + ']');
                                  var err = createError('', y, 'date');
                                  errors.push(err);
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
                            }
                          }
                        }
                      }
                    }
                  }
                  break;
                }
                case 'times':
                  break;
                default:
                  errors.push(createError(path, na, at));
                  return;
              }
              if (attr.min && attr.min > 0 && v.length < attr.min) {
                errors.push(createError(path, na, 'min', attr.min));
              }
              if (attr.max && attr.max > 0 && v.length > attr.max) {
                errors.push(createError(path, na, 'max', attr.max));
              }
            }
            else {
              switch (attr.type) {
                case 'datetime':
                  var date = toDate(v);
                  if (date) {
                    var error = date.toString();
                    if (!(date instanceof Date) || error === 'Invalid Date') {
                      errors.push(createError(path, na, 'date'));
                      return;
                    }
                    else {
                      if (!(v instanceof Date)) {
                        obj[na] = date;
                      }
                      handleMinMax(v, attr, path, errors);
                    }
                  }
                  break;
                case 'date': {
                  if (resources.ignoreDate) {
                    var date2 = toDate(v);
                    if (date2) {
                      var error2 = date2.toString();
                      if (!(date2 instanceof Date) || error2 === 'Invalid Date') {
                        errors.push(createError(path, na, 'date'));
                        return;
                      }
                      else {
                        if (!(v instanceof Date)) {
                          obj[na] = date;
                        }
                        handleMinMax(v, attr, path, errors);
                      }
                    }
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
                    else if (attr.typeof) {
                      var x = (path != null && path.length > 0 ? path + '.' + key : key);
                      validateObject(v, attr.typeof, errors, x);
                    }
                  }
                  break;
                }
                default: {
                  break;
                }
              }
            }
            break;
          default:
            break;
        }
        if (max !== undefined && errors.length >= max) {
          return;
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
function check(obj, attributes, allowUndefined, patch, max) {
  var errors = [];
  var path = '';
  if (max == null) {
    max = undefined;
  }
  validateObject(obj, attributes, errors, path, allowUndefined, patch, max);
  return errors;
}
exports.check = check;
exports.validate = check;
var Validator = (function () {
  function Validator(attributes, allowUndefined, max) {
    this.attributes = attributes;
    this.allowUndefined = allowUndefined;
    this.max = (max ? max : 10);
    this.validate = this.validate.bind(this);
  }
  Validator.prototype.validate = function (obj, patch) {
    var errors = check(obj, this.attributes, this.allowUndefined, patch, this.max);
    return Promise.resolve(errors);
  };
  return Validator;
}());
exports.Validator = Validator;
function createValidator(attributes, allowUndefined, max) {
  return new Validator(attributes, allowUndefined, max);
}
exports.createValidator = createValidator;
