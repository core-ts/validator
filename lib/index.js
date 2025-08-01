"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmpty(str) {
  return !str || str === "";
}
exports.isEmpty = isEmpty;
var resources = (function () {
  function resources() {
  }
  resources.isEmpty = function (str) {
    return str === "";
  };
  resources.isPhone = function (str) {
    if (!str || str.length === 0 || str === "+") {
      return false;
    }
    if (str.charAt(0) !== "+") {
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
            var countryCode = phoneNumber.substring(0, degit);
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
  resources.isFax = function (fax) {
    return resources.isPhone(fax);
  };
  resources.digit = /^\d+$/;
  resources.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/i;
  resources.url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  resources.ipv4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  resources.ipv6 = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/;
  return resources;
}());
exports.resources = resources;
function isPhone(str) {
  return resources.isPhone(str);
}
exports.isPhone = isPhone;
function isFax(str) {
  return resources.isFax(str);
}
exports.isFax = isFax;
function isStrings(s) {
  if (!s || s.length === 0) {
    return true;
  }
  for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
    var x = s_1[_i];
    if (typeof x !== "string") {
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
  for (var i = 0; i < s.length; i++) {
    var x = toDate(s[i]);
    if (x) {
      s[i] = x;
    }
    else {
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
  for (var _i = 0, s_2 = s; _i < s_2.length; _i++) {
    var x = s_2[_i];
    if (typeof x !== "number") {
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
  for (var _i = 0, s_3 = s; _i < s_3.length; _i++) {
    var x = s_3[_i];
    if (!Number.isInteger(x)) {
      return false;
    }
  }
  return true;
}
exports.isIntegers = isIntegers;
function exist(v, s) {
  for (var _i = 0, s_4 = s; _i < s_4.length; _i++) {
    var x = s_4[_i];
    if (v === x) {
      return true;
    }
  }
  return false;
}
exports.exist = exist;
function toString(s) {
  if (!s || s.length === 0) {
    return "";
  }
  var x = [];
  for (var _i = 0, s_5 = s; _i < s_5.length; _i++) {
    var u = s_5[_i];
    x.push("" + u);
  }
  return x.join(", ");
}
exports.toString = toString;
function isDigitOnly(str) {
  if (!str) {
    return false;
  }
  var r = new RegExp(resources.digit);
  return r.test(str);
}
exports.isDigitOnly = isDigitOnly;
function isIPv4(ipv4) {
  if (!ipv4 || ipv4.length === 0) {
    return false;
  }
  var r = new RegExp(resources.ipv4);
  return r.test(ipv4);
}
exports.isIPv4 = isIPv4;
function isIPv6(ipv6) {
  if (!ipv6 || ipv6.length === 0) {
    return false;
  }
  var r = new RegExp(resources.ipv6);
  return r.test(ipv6);
}
exports.isIPv6 = isIPv6;
function isEmail(email) {
  if (!email || email.length === 0) {
    return false;
  }
  var r = new RegExp(resources.email);
  return r.test(email);
}
exports.isEmail = isEmail;
function isUrl(url) {
  var r = new RegExp(resources.url);
  return r.test(url);
}
exports.isUrl = isUrl;
function isValidScale(n, scale) {
  if (isNaN(n) || n === undefined || n == null) {
    return true;
  }
  if (scale === undefined || scale < 0) {
    return true;
  }
  var s = n.toString();
  var i = s.indexOf(".");
  if (i < 0) {
    return true;
  }
  var s2 = s.substring(i + 1);
  return s2.length <= scale;
}
exports.isValidScale = isValidScale;
function isValidPrecision(n, precision, scale) {
  if (isNaN(n) || n === undefined || n == null) {
    return true;
  }
  if (precision === undefined || precision < 0) {
    return isValidScale(n, scale);
  }
  if (scale === undefined || scale < 0) {
    scale = 0;
  }
  var s = n.toString();
  var i = s.indexOf(".");
  if (i < 0) {
    return s.length <= precision - scale;
  }
  var s2 = s.substring(i + 1);
  if (s2.length > scale) {
    return false;
  }
  var s3 = s.substring(0, i);
  return s3.length <= precision - scale;
}
exports.isValidPrecision = isValidPrecision;
function format() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var formatted = args[0];
  if (!formatted || formatted === "") {
    return "";
  }
  if (args.length > 1 && Array.isArray(args[1])) {
    var params = args[1];
    for (var i = 0; i < params.length; i++) {
      var regexp = new RegExp("\\{" + i + "\\}", "gi");
      formatted = formatted.replace(regexp, params[i]);
    }
  }
  else {
    for (var i = 1; i < args.length; i++) {
      var regexp = new RegExp("\\{" + (i - 1) + "\\}", "gi");
      formatted = formatted.replace(regexp, args[i]);
    }
  }
  return formatted;
}
exports.format = format;
function createError(path, name, code, msg, param) {
  var x = name;
  if (path && path.length > 0) {
    x = path + "." + name;
  }
  if (!code) {
    code = "string";
  }
  var error = {
    field: x,
    code: code,
  };
  if (msg) {
    error.message = msg;
  }
  if (param) {
    error.param = param;
  }
  return error;
}
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
var _datereg = "/Date(";
var _re = /-?\d+/;
function toDate(v) {
  if (!v) {
    return null;
  }
  if (v instanceof Date) {
    return v;
  }
  else {
    return new Date(v);
  }
}
function handleArrayMinMax(v, attr, path, errors, key, resource) {
  if (attr.min && typeof attr.min === "number" && attr.min > 0 && v < attr.min) {
    var msg = createMessage(key, "min", "error_array_min", resource, attr.resource, attr.min);
    errors.push(createError(path, key, "min", msg, attr.min));
  }
  if (attr.max && typeof attr.max === "number" && attr.max > 0 && v > attr.max) {
    var msg = createMessage(key, "max", "error_array_max", resource, attr.resource, attr.max);
    errors.push(createError(path, key, "max", msg, attr.max));
  }
}
function handleMinMax(v, attr, path, errors, key, resource) {
  var na = attr.name;
  if (!na) {
    na = "";
  }
  if (attr.min !== undefined) {
    if (getNumber(v) < getNumber(attr.min)) {
      var msg = createMessage(key, "min", "error_min", resource, attr.resource, attr.min);
      errors.push(createError(path, na, "min", msg, attr.min));
    }
  }
  else if (attr.gt !== undefined) {
    if (getNumber(v) <= getNumber(attr.gt)) {
      var msg = createMessage(key, "gt", "error_gt", resource, attr.resource, attr.gt);
      errors.push(createError(path, na, "gt", msg, attr.gt));
    }
  }
  if (attr.max !== undefined) {
    if (getNumber(v) > getNumber(attr.max)) {
      var msg = createMessage(key, "max", "error_max", resource, attr.resource, attr.max);
      errors.push(createError(path, na, "max", msg, attr.max));
    }
  }
  else if (attr.lt !== undefined) {
    if (getNumber(v) >= getNumber(attr.lt)) {
      var msg = createMessage(key, "lt", "error_lt", resource, attr.resource, attr.lt);
      errors.push(createError(path, na, "lt", msg, attr.lt));
    }
  }
}
function getNumber(v) {
  return typeof v === "number" ? v : v.getTime();
}
exports.getNumber = getNumber;
function createMessage(field, code, errorKey, resource, resourceKey, param) {
  if (!resource) {
    return "";
  }
  var p1b = resourceKey && resourceKey.length > 0 ? resource[resourceKey] : field;
  var p1 = p1b ? p1b : field;
  var um = resource[errorKey];
  if (!um) {
    return code;
  }
  else {
    return format(um, p1, param);
  }
}
exports.createMessage = createMessage;
function validateObject(obj, attributes, errors, path, resource, allowUndefined, patch, max) {
  var keys = Object.keys(attributes);
  var count = 0;
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    count = count + 1;
    var attr = attributes[key];
    attr.name = key;
    if (attr.noValidate) {
      continue;
    }
    var na = attr.name;
    var v = obj[na];
    if (v === undefined) {
      if (attr.required && !patch) {
        var msg = createMessage(key, "required", "error_required", resource, attr.resource);
        errors.push(createError(path, na, "required", msg));
      }
    }
    else if (v == null) {
      if (attr.required) {
        var msg = createMessage(key, "required", "error_required", resource, attr.resource);
        errors.push(createError(path, na, "required", msg));
      }
    }
    else {
      var t = typeof v;
      var at = attr.type;
      switch (at) {
        case "datetime":
          var date = toDate(v);
          if (date) {
            if (isValidDate(date)) {
              obj[na] = date;
              handleMinMax(date, attr, path, errors, key, resource);
            }
            else {
              var msg = createMessage(key, "date", "error_date", resource, attr.resource);
              errors.push(createError(path, na, "date", msg));
              return;
            }
          }
          break;
        case "date": {
          if (resources.ignoreDate) {
            var date2 = toDate(v);
            if (date2) {
              if (isValidDate(date2)) {
                obj[na] = date2;
                handleMinMax(date2, attr, path, errors, key, resource);
              }
              else {
                var msg = createMessage(key, "date", "error_date", resource, attr.resource);
                errors.push(createError(path, na, "date", msg));
                return;
              }
            }
          }
          break;
        }
        default: {
          switch (t) {
            case "string":
              if (at === undefined || at === "text" || at === "ObjectId" || at === "string") {
                var ne = true;
                if (v.length === 0 && attr.required) {
                  if (resources.isEmpty(v)) {
                    var msg = createMessage(key, "required", "error_required", resource, attr.resource);
                    var err = createError(path, na, "required", msg);
                    errors.push(err);
                    ne = false;
                  }
                }
                if (ne) {
                  if (attr.min && typeof attr.min === "number" && attr.min > 0 && v.length < attr.min) {
                    var msg = createMessage(key, "minlength", "error_minlength", resource, attr.resource, attr.min);
                    errors.push(createError(path, na, "minlength", msg, attr.min));
                  }
                  if (attr.length && attr.length > 0 && v.length > attr.length) {
                    var msg = createMessage(key, "maxlength", "error_maxlength", resource, attr.resource, attr.length);
                    errors.push(createError(path, na, "maxlength", msg, attr.length));
                  }
                  if (attr.format) {
                    switch (attr.format) {
                      case "email": {
                        if (!isEmail(v)) {
                          var msg = createMessage(key, "email", "error_email", resource, attr.resource);
                          errors.push(createError(path, na, "email", msg));
                        }
                        break;
                      }
                      case "url": {
                        if (!isUrl(v)) {
                          var msg = createMessage(key, "url", "error_url", resource, attr.resource);
                          errors.push(createError(path, na, "url", msg));
                        }
                        break;
                      }
                      case "phone": {
                        if (!resources.isPhone(v)) {
                          var msg = createMessage(key, "phone", "error_phone", resource, attr.resource);
                          errors.push(createError(path, na, "phone", msg));
                        }
                        break;
                      }
                      case "fax": {
                        if (!resources.isFax(v)) {
                          var msg = createMessage(key, "fax", "error_fax", resource, attr.resource);
                          errors.push(createError(path, na, "fax", msg));
                        }
                        break;
                      }
                      case "ipv4": {
                        if (!isIPv4(v)) {
                          var msg = createMessage(key, "ipv4", "error_ipv4", resource, attr.resource);
                          errors.push(createError(path, na, "ipv4", msg));
                        }
                        break;
                      }
                      case "ipv6": {
                        if (!isIPv6(v)) {
                          var msg = createMessage(key, "ipv6", "error_ipv6", resource, attr.resource);
                          errors.push(createError(path, na, "ipv6", msg));
                        }
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  }
                  if (attr.exp) {
                    if (typeof attr.exp === "string") {
                      attr.exp = new RegExp(attr.exp);
                    }
                    var exp = attr.exp;
                    if (!exp.test(v)) {
                      var code = attr.code ? attr.code : "exp";
                      var msg = resource && attr.resource ? resource[attr.resource] : createMessage(key, "exp", "error_exp", resource);
                      errors.push(createError(path, na, code, msg));
                    }
                  }
                  if (attr.enum && attr.enum.length > 0) {
                    if (!exist(v, attr.enum)) {
                      var msg = createMessage(key, "enum", "error_enum", resource, attr.resource, toString(attr.enum));
                      errors.push(createError(path, na, "enum", msg, toString(attr.enum)));
                    }
                  }
                }
              }
              else {
                var msg = createMessage(key, "type", "error_type", resource, attr.resource, "string");
                errors.push(createError(path, na, "type", msg, "string"));
                return;
              }
              break;
            case "number":
              if (attr.type === "integer") {
                if (!Number.isInteger(v) || isNaN(v)) {
                  var msg = createMessage(key, "integer", "error_integer", resource, attr.resource);
                  errors.push(createError(path, na, "integer", msg));
                }
              }
              else if (attr.type === "number") {
                if (isNaN(v)) {
                  var msg = createMessage(key, "number", "error_number", resource, attr.resource);
                  errors.push(createError(path, na, "number", msg));
                }
                else {
                  if (!isValidScale(v, attr.scale)) {
                    var msg = createMessage(key, "scale", "error_scale", resource, attr.resource, attr.scale);
                    errors.push(createError(path, na, "scale", msg));
                  }
                  else if (attr.precision) {
                    if (!isValidPrecision(v, attr.precision, attr.scale)) {
                      var msg = createMessage(key, "precision", "error_precision", resource, attr.resource, attr.precision);
                      errors.push(createError(path, na, "precision", msg));
                    }
                  }
                }
              }
              else {
                var msg = createMessage(key, "type", "error_type", resource, attr.resource, "number");
                errors.push(createError(path, na, "type", msg, "number"));
                return;
              }
              handleMinMax(v, attr, path, errors, key, resource);
              if (attr.enum && attr.enum.length > 0) {
                if (!exist(v, attr.enum)) {
                  var msg = createMessage(key, "enum", "error_enum", resource, attr.resource, toString(attr.enum));
                  errors.push(createError(path, na, "enum", msg, toString(attr.enum)));
                }
              }
              break;
            case "boolean":
              if (at !== "boolean") {
                var msg = createMessage(key, "boolean", "error_boolean", resource, attr.resource);
                errors.push(createError(path, na, at, msg));
                return;
              }
              break;
            case "object":
              if (Array.isArray(v)) {
                switch (at) {
                  case "strings": {
                    if (!isStrings(v)) {
                      var msg_1 = createMessage(key, "strings", "error_strings", resource, attr.resource);
                      errors.push(createError(path, na, "strings", msg_1));
                    }
                    else {
                      handleArrayMinMax(v.length, attr, path, errors, key, resource);
                      if (attr.enum && attr.enum.length > 0) {
                        for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
                          var x = v_1[_a];
                          if (!exist(x, attr.enum)) {
                            var msg_2 = createMessage(key, "enum", "error_enum", resource, attr.resource, toString(attr.enum));
                            errors.push(createError(path, na, "enum", msg_2, toString(attr.enum)));
                          }
                        }
                      }
                    }
                    break;
                  }
                  case "numbers": {
                    if (!isNumbers(v)) {
                      var msg_3 = createMessage(key, "numbers", "error_numbers", resource, attr.resource);
                      errors.push(createError(path, na, "numbers", msg_3));
                    }
                    else {
                      handleArrayMinMax(v.length, attr, path, errors, key, resource);
                      if (attr.enum && attr.enum.length > 0) {
                        for (var _b = 0, v_2 = v; _b < v_2.length; _b++) {
                          var x = v_2[_b];
                          if (!exist(x, attr.enum)) {
                            var msg_4 = createMessage(key, "enum", "error_enum", resource, attr.resource, toString(attr.enum));
                            errors.push(createError(path, na, "enum", msg_4, toString(attr.enum)));
                          }
                        }
                      }
                    }
                    break;
                  }
                  case "integers": {
                    if (!isIntegers(v)) {
                      var msg_5 = createMessage(key, "integers", "error_integers", resource, attr.resource);
                      errors.push(createError(path, na, "integers", msg_5));
                    }
                    else {
                      handleArrayMinMax(v.length, attr, path, errors, key, resource);
                      if (attr.enum && attr.enum.length > 0) {
                        for (var _c = 0, v_3 = v; _c < v_3.length; _c++) {
                          var x = v_3[_c];
                          if (!exist(x, attr.enum)) {
                            var msg_6 = createMessage(key, "enum", "error_enum", resource, attr.resource, toString(attr.enum));
                            errors.push(createError(path, na, "enum", msg_6, toString(attr.enum)));
                          }
                        }
                      }
                    }
                    break;
                  }
                  case "datetimes": {
                    if (!isDates(v)) {
                      var msg_7 = createMessage(key, "datetimes", "error_datetimes", resource, attr.resource);
                      errors.push(createError(path, na, "datetimes", msg_7));
                    }
                    break;
                  }
                  case "dates": {
                    if (resources.ignoreDate) {
                      if (!isDates(v)) {
                        var msg_8 = createMessage(key, "dates", "error_dates", resource, attr.resource);
                        errors.push(createError(path, na, "dates", msg_8));
                      }
                    }
                    break;
                  }
                  case "array": {
                    handleArrayMinMax(v.length, attr, path, errors, key, resource);
                    for (var i = 0; i < v.length; i++) {
                      if (typeof v[i] !== "object") {
                        var y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]";
                        var msg_9 = createMessage(key, "type", "error_type", resource, attr.resource, typeof v[i]);
                        errors.push(createError("", y, "type", msg_9, typeof v[i]));
                      }
                      else if (attr.typeof) {
                        var y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]";
                        validateObject(v[i], attr.typeof, errors, y, resource);
                      }
                    }
                    break;
                  }
                  case "primitives": {
                    if (typeof v !== "object") {
                      var msg_10 = createMessage(key, "type", "error_type", resource, attr.resource, typeof v);
                      errors.push(createError(path, na, "type", msg_10, "array"));
                      return;
                    }
                    else {
                      if (!Array.isArray(v)) {
                        var msg_11 = createMessage(key, "type", "error_type", resource, attr.resource, typeof v);
                        errors.push(createError(path, na, "type", msg_11, "array"));
                        return;
                      }
                      else {
                        if (attr.code) {
                          if (attr.code === "date") {
                            for (var i = 0; i < v.length; i++) {
                              if (v[i]) {
                                var date3 = toDate(v[i]);
                                if (date3) {
                                  if (!isValidDate(date3)) {
                                    var y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]";
                                    var msg_12 = createMessage(key, "date", "error_date", resource, attr.resource);
                                    var err = createError("", y, "date", msg_12);
                                    errors.push(err);
                                  }
                                  else {
                                    v[i] = date3;
                                  }
                                }
                              }
                            }
                          }
                          else {
                            for (var i = 0; i < v.length; i++) {
                              if (v[i] && typeof v[i] !== attr.code) {
                                var y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]";
                                var msg_13 = createMessage(key, "type", "error_type", resource, attr.resource, typeof v[i]);
                                var err = createError("", y, "type", msg_13, typeof v[i]);
                                errors.push(err);
                              }
                            }
                          }
                        }
                      }
                    }
                    break;
                  }
                  case "times":
                    break;
                  default:
                    var msg = createMessage(key, "type", "error_type", resource, attr.resource, typeof v);
                    errors.push(createError(path, na, "type", msg, at));
                    return;
                }
              }
              else if (at === "object") {
                if (typeof v !== "object") {
                  var msg = createMessage(key, "max", "error_max", resource, attr.resource, typeof v);
                  errors.push(createError(path, na, "type", msg, "object"));
                  return;
                }
                else {
                  if (Array.isArray(v)) {
                    var msg = createMessage(key, "max", "error_max", resource, attr.resource, typeof v);
                    errors.push(createError(path, na, "type", msg, "object"));
                  }
                  else if (attr.typeof) {
                    var x = path != null && path.length > 0 ? path + "." + key : key;
                    validateObject(v, attr.typeof, errors, x, resource);
                  }
                }
              }
              break;
            default:
              break;
          }
          break;
        }
      }
      if (max !== undefined && errors.length >= max) {
        return;
      }
    }
  }
  if (!allowUndefined) {
    checkUndefined(obj, attributes, errors, path, resource);
  }
}
function checkUndefined(obj, attrs, errors, path, resource) {
  var keys = Object.keys(obj);
  for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
    var key = keys_2[_i];
    var attr = attrs[key];
    if (!attr) {
      var msg = createMessage(key, "undefined", "error_undefined", resource);
      errors.push(createError(path, key, "undefined", msg));
    }
  }
}
exports.checkUndefined = checkUndefined;
function check(obj, attributes, resource, patch, allowUndefined, max) {
  var errors = [];
  var path = "";
  if (max === null) {
    max = undefined;
  }
  validateObject(obj, attributes, errors, path, resource, allowUndefined, patch, max);
  return errors;
}
exports.check = check;
function validate(obj, attributes, resource, allowUndefined, patch, max) {
  return check(obj, attributes, resource, patch, allowUndefined, max);
}
exports.validate = validate;
var Validator = (function () {
  function Validator(attributes, allowUndefined, max) {
    this.attributes = attributes;
    this.allowUndefined = allowUndefined;
    this.max = max ? max : 10;
    this.validate = this.validate.bind(this);
  }
  Validator.prototype.validate = function (obj, resource, patch) {
    var errors = check(obj, this.attributes, resource, patch, this.allowUndefined, this.max);
    return Promise.resolve(errors);
  };
  return Validator;
}());
exports.Validator = Validator;
function createValidator(attributes, allowUndefined, max) {
  return new Validator(attributes, allowUndefined, max);
}
exports.createValidator = createValidator;
