"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Generated by CoffeeScript 2.4.1
// # CSV Stringifier
// Please look at the [project documentation](https://csv.js.org/stringify/) for additional
// information.
var Stringifier, castPath, charCodeOfDot, get, getTag, isKey, isObject, isSymbol, reEscapeChar, reIsDeepProp, reIsPlainProp, rePropName, stream, stringToPath, toKey, underscore, util;
stream = require('stream');
util = require('util'); // ## Usage
// This module export a function as its main entry point and return a transform
// stream.
// Refers to the [official prject documentation](http://csv.adaltas.com/stringify/)
// on how to call this function.

module.exports = function () {
  var callback, chunks, data, options, stringifier;

  if (arguments.length === 3) {
    data = arguments[0];
    options = arguments[1];
    callback = arguments[2];
  } else if (arguments.length === 2) {
    if (Array.isArray(arguments[0])) {
      data = arguments[0];
    } else {
      options = arguments[0];
    }

    if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    } else {
      options = arguments[1];
    }
  } else if (arguments.length === 1) {
    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
    } else if (Array.isArray(arguments[0])) {
      data = arguments[0];
    } else {
      options = arguments[0];
    }
  }

  if (options == null) {
    options = {};
  }

  stringifier = new Stringifier(options);

  if (data) {
    process.nextTick(function () {
      var d, j, len;

      for (j = 0, len = data.length; j < len; j++) {
        d = data[j];
        stringifier.write(d);
      }

      return stringifier.end();
    });
  }

  if (callback) {
    chunks = [];
    stringifier.on('readable', function () {
      var chunk, results;
      results = [];

      while (chunk = stringifier.read()) {
        results.push(chunks.push(chunk));
      }

      return results;
    });
    stringifier.on('error', function (err) {
      return callback(err);
    });
    stringifier.on('end', function () {
      return callback(null, chunks.join(''));
    });
  }

  return stringifier;
}; // You can also use *util.promisify* native function (Node.js 8+) in order to wrap callbacks into promises for more convenient use when source is a readable stream and you are OK with storing entire result set in memory:
// ```
// const { promisify } = require('util');
// const csv = require('csv');
// const stringifyAsync = promisify(csv.stringify);
// //returns promise
// function generateCsv(sourceData) {
//     return stringifyAsync(sourceData);
// }
// ```
// ## `Stringifier([options])`
// Options are documented [here](http://csv.adaltas.com/stringify/).


Stringifier =
/*#__PURE__*/
function (_stream$Transform) {
  _inherits(Stringifier, _stream$Transform);

  function Stringifier() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Stringifier);

    var base, base1, base2, base3, base4, isRegExp, isString, j, k, len, options, quoted_match, ref, v;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stringifier).call(this, _objectSpread({}, {
      writableObjectMode: true
    }, {}, options)));
    options = {};

    for (k in opts) {
      v = opts[k]; // Immutable options and camelcase conversion

      options[underscore(k)] = v;
    } // Normalize option `delimiter`


    if (options.delimiter === null || options.delimiter === void 0) {
      options.delimiter = ',';
    } else {
      if (Buffer.isBuffer(options.delimiter)) {
        options.delimiter = options.delimiter.toString();
      } else if (typeof options.delimiter !== 'string') {
        throw new Error("Invalid Option: delimiter must be a buffer or a string, got ".concat(JSON.stringify(options.delimiter)));
      }
    } // Normalize option `quote`


    if (options.quote === null || options.quote === void 0) {
      options.quote = '"';
    } else {
      if (options.quote === true) {
        options.quote = '"';
      } else if (options.quote === false) {
        options.quote = '';
      } else if (Buffer.isBuffer(options.quote)) {
        options.quote = options.quote.toString();
      } else if (typeof options.quote !== 'string') {
        throw new Error("Invalid Option: quote must be a boolean, a buffer or a string, got ".concat(JSON.stringify(options.quote)));
      }
    } // Normalize option `quoted`


    if (options.quoted == null) {
      options.quoted = false;
    }

    if (options.quoted_empty == null) {
      options.quoted_empty = void 0;
    }

    if (options.quoted_string == null) {
      options.quoted_string = false;
    }

    if (options.eof == null) {
      options.eof = true;
    } // Normalize option `escape`


    if (options.escape === null || options.escape === void 0) {
      options.escape = '"';
    } else {
      if (Buffer.isBuffer(options.escape)) {
        options.escape = options.escape.toString();
      }

      if (typeof options.escape !== 'string') {
        throw new Error("Invalid Option: escape must be a buffer or a string, got ".concat(JSON.stringify(options.escape)));
      } else if (options.escape.length > 1) {
        throw new Error("Invalid Option: escape must be one character, got ".concat(options.escape.length, " characters"));
      }
    }

    if (options.header == null) {
      options.header = false;
    } // Normalize the columns option


    options.columns = _this.normalize_columns(options.columns);

    if (options.cast == null) {
      options.cast = {};
    } // Normalize option `quoted_match`


    if (options.quoted_match === void 0 || options.quoted_match === null || options.quoted_match === false) {
      options.quoted_match = null;
    } else if (!Array.isArray(options.quoted_match)) {
      options.quoted_match = [options.quoted_match];
    }

    if (options.quoted_match) {
      ref = options.quoted_match;

      for (j = 0, len = ref.length; j < len; j++) {
        quoted_match = ref[j];
        isString = typeof quoted_match === 'string';
        isRegExp = quoted_match instanceof RegExp;

        if (!isString && !isRegExp) {
          throw new Error("Invalid Option: quoted_match must be a string or a regex, got ".concat(JSON.stringify(quoted_match)));
        }
      }
    }

    if (options.cast.bool) {
      // Backward compatibility
      options.cast["boolean"] = options.cast.bool;
    } // Custom cast


    if ((base = options.cast)["boolean"] == null) {
      base["boolean"] = function (value) {
        // Cast boolean to string by default
        if (value) {
          return '1';
        } else {
          return '';
        }
      };
    }

    if ((base1 = options.cast).date == null) {
      base1.date = function (value) {
        // Cast date to timestamp string by default
        return '' + value.getTime();
      };
    }

    if ((base2 = options.cast).number == null) {
      base2.number = function (value) {
        // Cast number to string using native casting by default
        return '' + value;
      };
    }

    if ((base3 = options.cast).object == null) {
      base3.object = function (value) {
        // Stringify object as JSON by default
        return JSON.stringify(value);
      };
    }

    if ((base4 = options.cast).string == null) {
      base4.string = function (value) {
        return value;
      };
    } // Normalize option `record_delimiter`


    if (options.record_delimiter === void 0 || options.record_delimiter === null) {
      if (options.record_delimiter == null) {
        options.record_delimiter = '\n';
      }
    } else {
      if (Buffer.isBuffer(options.record_delimiter)) {
        options.record_delimiter = options.record_delimiter.toString();
      } else if (typeof options.record_delimiter !== 'string') {
        throw new Error("Invalid Option: record_delimiter must be a buffer or a string, got ".concat(JSON.stringify(options.record_delimiter)));
      }

      switch (options.record_delimiter) {
        case 'auto':
          options.record_delimiter = null;
          break;

        case 'unix':
          options.record_delimiter = "\n";
          break;

        case 'mac':
          options.record_delimiter = "\r";
          break;

        case 'windows':
          options.record_delimiter = "\r\n";
          break;

        case 'ascii':
          options.record_delimiter = "\x1E";
          break;

        case 'unicode':
          options.record_delimiter = "\u2028";
      }
    } // Expose options


    _this.options = options; // Internal state

    _this.state = {
      stop: false
    }; // Information

    _this.info = {
      records: 0
    };

    _assertThisInitialized(_this);

    return _this;
  } // ## `Stringifier.prototype._transform(chunk, encoding, callback)`
  // Implementation of the [transform._transform function](https://nodejs.org/api/stream.html#stream_transform_transform_chunk_encoding_callback).


  _createClass(Stringifier, [{
    key: "_transform",
    value: function _transform(chunk, encoding, callback) {
      var base, e;

      if (this.state.stop === true) {
        return;
      } // Chunk validation


      if (!(Array.isArray(chunk) || _typeof(chunk) === 'object')) {
        this.state.stop = true;
        return callback(Error("Invalid Record: expect an array or an object, got ".concat(JSON.stringify(chunk))));
      } // Detect columns from the first record


      if (this.info.records === 0) {
        if (Array.isArray(chunk)) {
          if (this.options.header === true && !this.options.columns) {
            this.state.stop = true;
            return callback(Error('Undiscoverable Columns: header option requires column option or object records'));
          }
        } else {
          if ((base = this.options).columns == null) {
            base.columns = this.normalize_columns(Object.keys(chunk));
          }
        }
      }

      if (this.info.records === 0) {
        // Emit the header
        this.headers();
      }

      try {
        // Emit and stringify the record if an object or an array
        this.emit('record', chunk, this.info.records);
      } catch (error) {
        e = error;
        this.state.stop = true;
        return this.emit('error', e);
      } // Convert the record into a string


      if (this.options.eof) {
        chunk = this.stringify(chunk);

        if (chunk == null) {
          return;
        }

        chunk = chunk + this.options.record_delimiter;
      } else {
        chunk = this.stringify(chunk);

        if (chunk == null) {
          return;
        }

        if (this.options.header || this.info.records) {
          chunk = this.options.record_delimiter + chunk;
        }
      } // Emit the csv


      this.info.records++;
      this.push(chunk);
      return callback();
    } // ## `Stringifier.prototype._flush(callback)`
    // Implementation of the [transform._flush function](https://nodejs.org/api/stream.html#stream_transform_flush_callback).

  }, {
    key: "_flush",
    value: function _flush(callback) {
      if (this.info.records === 0) {
        this.headers();
      }

      return callback();
    } // ## `Stringifier.prototype.stringify(line)`
    // Convert a line to a string. Line may be an object, an array or a string.

  }, {
    key: "stringify",
    value: function stringify(chunk) {
      var column, columns, containsEscape, containsQuote, containsRowDelimiter, containsdelimiter, csvrecord, delimiter, err, escape, field, header, i, j, l, len, m, options, quote, quoted, quotedMatch, quotedString, quoted_empty, quoted_match, quoted_string, record, record_delimiter, ref, ref1, regexp, shouldQuote, value;

      if (_typeof(chunk) !== 'object') {
        return chunk;
      }

      var _this$options = this.options;
      columns = _this$options.columns;
      header = _this$options.header;
      record = []; // Record is an array

      if (Array.isArray(chunk)) {
        if (columns) {
          // We are getting an array but the user has specified output columns. In
          // this case, we respect the columns indexes
          chunk.splice(columns.length);
        } // Cast record elements


        for (i = j = 0, len = chunk.length; j < len; i = ++j) {
          field = chunk[i];

          var _this$__cast = this.__cast(field, {
            index: i,
            column: i,
            records: this.info.records,
            header: header && this.info.records === 0
          });

          var _this$__cast2 = _slicedToArray(_this$__cast, 2);

          err = _this$__cast2[0];
          value = _this$__cast2[1];

          if (err) {
            this.emit('error', err);
            return;
          }

          record[i] = [value, field];
        }
      } else {
        // Record is a literal object
        if (columns) {
          for (i = l = 0, ref = columns.length; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
            field = get(chunk, columns[i].key);

            var _this$__cast3 = this.__cast(field, {
              index: i,
              column: columns[i].key,
              records: this.info.records,
              header: header && this.info.records === 0
            });

            var _this$__cast4 = _slicedToArray(_this$__cast3, 2);

            err = _this$__cast4[0];
            value = _this$__cast4[1];

            if (err) {
              this.emit('error', err);
              return;
            }

            record[i] = [value, field];
          }
        } else {
          for (column in chunk) {
            field = chunk[column];

            var _this$__cast5 = this.__cast(field, {
              index: i,
              column: columns[i].key,
              records: this.info.records,
              header: header && this.info.records === 0
            });

            var _this$__cast6 = _slicedToArray(_this$__cast5, 2);

            err = _this$__cast6[0];
            value = _this$__cast6[1];

            if (err) {
              this.emit('error', err);
              return;
            }

            record.push([value, field]);
          }
        }
      }

      csvrecord = '';

      for (i = m = 0, ref1 = record.length; 0 <= ref1 ? m < ref1 : m > ref1; i = 0 <= ref1 ? ++m : --m) {
        var _record$i = _slicedToArray(record[i], 2);

        value = _record$i[0];
        field = _record$i[1];

        if (typeof value === 'string') {
          options = this.options;
        } else if (isObject(value)) {
          var _value = value;
          value = _value.value;
          options = _objectWithoutProperties(_value, ["value"]);

          if (!(typeof value === 'string' || value === void 0 || value === null)) {
            this.emit('error', Error("Invalid Casting Value: returned value must return a string, null or undefined, got ".concat(JSON.stringify(value))));
            return;
          }

          options = _objectSpread({}, this.options, {}, options);
        } else if (value === void 0 || value === null) {
          options = this.options;
        } else {
          this.emit('error', Error("Invalid Casting Value: returned value must return a string, an object, null or undefined, got ".concat(JSON.stringify(value))));
          return;
        }

        var _options = options;
        delimiter = _options.delimiter;
        escape = _options.escape;
        quote = _options.quote;
        quoted = _options.quoted;
        quoted_empty = _options.quoted_empty;
        quoted_string = _options.quoted_string;
        quoted_match = _options.quoted_match;
        record_delimiter = _options.record_delimiter;

        if (value) {
          if (typeof value !== 'string') {
            this.emit('error', Error("Formatter must return a string, null or undefined, got ".concat(JSON.stringify(value))));
            return null;
          }

          containsdelimiter = delimiter.length && value.indexOf(delimiter) >= 0;
          containsQuote = quote !== '' && value.indexOf(quote) >= 0;
          containsEscape = value.indexOf(escape) >= 0 && escape !== quote;
          containsRowDelimiter = value.indexOf(record_delimiter) >= 0;
          quotedString = quoted_string && typeof field === 'string';
          quotedMatch = quoted_match && typeof field === 'string' && quoted_match.filter(function (quoted_match) {
            if (typeof quoted_match === 'string') {
              return value.indexOf(quoted_match) !== -1;
            } else {
              return quoted_match.test(value);
            }
          });
          quotedMatch = quotedMatch && quotedMatch.length > 0;
          shouldQuote = containsQuote || containsdelimiter || containsRowDelimiter || quoted || quotedString || quotedMatch;

          if (shouldQuote && containsEscape) {
            regexp = escape === '\\' ? new RegExp(escape + escape, 'g') : new RegExp(escape, 'g');
            value = value.replace(regexp, escape + escape);
          }

          if (containsQuote) {
            regexp = new RegExp(quote, 'g');
            value = value.replace(regexp, escape + quote);
          }

          if (shouldQuote) {
            value = quote + value + quote;
          }

          csvrecord += value;
        } else if (quoted_empty || quoted_empty == null && field === '' && quoted_string) {
          csvrecord += quote + quote;
        }

        if (i !== record.length - 1) {
          csvrecord += delimiter;
        }
      }

      return csvrecord;
    } // ## `Stringifier.prototype.headers`
    // Print the header line if the option "header" is "true".

  }, {
    key: "headers",
    value: function headers() {
      var headers;

      if (!this.options.header) {
        return;
      }

      if (!this.options.columns) {
        return;
      }

      headers = this.options.columns.map(function (column) {
        return column.header;
      });

      if (this.options.eof) {
        headers = this.stringify(headers) + this.options.record_delimiter;
      } else {
        headers = this.stringify(headers);
      }

      return this.push(headers);
    }
  }, {
    key: "__cast",
    value: function __cast(value, context) {
      var err, type;
      type = _typeof(value);

      try {
        if (type === 'string') {
          // Fine for 99% of the cases
          return [void 0, this.options.cast.string(value, context)];
        } else if (type === 'number') {
          return [void 0, this.options.cast.number(value, context)];
        } else if (type === 'boolean') {
          return [void 0, this.options.cast["boolean"](value, context)];
        } else if (value instanceof Date) {
          return [void 0, this.options.cast.date(value, context)];
        } else if (type === 'object' && value !== null) {
          return [void 0, this.options.cast.object(value, context)];
        } else {
          return [void 0, value, value];
        }
      } catch (error) {
        err = error;
        return [err];
      }
    } // ## `Stringifier.prototype.normalize_columns`

  }, {
    key: "normalize_columns",
    value: function normalize_columns(columns) {
      var column, k, v;

      if (columns == null) {
        return null;
      }

      if (columns != null) {
        if (_typeof(columns) !== 'object') {
          throw Error('Invalid option "columns": expect an array or an object');
        }

        if (!Array.isArray(columns)) {
          columns = function () {
            var results;
            results = [];

            for (k in columns) {
              v = columns[k];
              results.push({
                key: k,
                header: v
              });
            }

            return results;
          }();
        } else {
          columns = function () {
            var j, len, results;
            results = [];

            for (j = 0, len = columns.length; j < len; j++) {
              column = columns[j];

              if (typeof column === 'string') {
                results.push({
                  key: column,
                  header: column
                });
              } else if (_typeof(column) === 'object' && column != null && !Array.isArray(column)) {
                if (!column.key) {
                  throw Error('Invalid column definition: property "key" is required');
                }

                if (column.header == null) {
                  column.header = column.key;
                }

                results.push(column);
              } else {
                throw Error('Invalid column definition: expect a string or an object');
              }
            }

            return results;
          }();
        }
      }

      return columns;
    }
  }]);

  return Stringifier;
}(stream.Transform);

module.exports.Stringifier = Stringifier;

isObject = function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null && !Array.isArray(obj);
};

underscore = function underscore(str) {
  return str.replace(/([A-Z])/g, function (_, match, index) {
    return '_' + match.toLowerCase();
  });
}; // ## Lodash implementation of `get`


charCodeOfDot = '.'.charCodeAt(0);
reEscapeChar = /\\(\\)?/g; // Match anything that isn't a dot or bracket.
// Or match property names within brackets.
// Match a non-string expression.
// Or match strings (supports escaping characters).
// Or match "" as the space between consecutive dots or empty brackets.

rePropName = RegExp('[^.[\\]]+' + '|' + '\\[(?:' + '([^"\'][^[]*)' + '|' + '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' + ')\\]' + '|' + '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
reIsPlainProp = /^\w*$/;

getTag = function getTag(value) {
  if (value != null) {
    if (value === void 0) {
      '[object Undefined]';
    } else {
      '[object Null]';
    }
  }

  return Object.prototype.toString.call(value);
};

isKey = function isKey(value, object) {
  var type;

  if (Array.isArray(value)) {
    return false;
  }

  type = _typeof(value);

  if (type === 'number' || type === 'symbol' || type === 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
};

isSymbol = function isSymbol(value) {
  var type;
  type = _typeof(value);
  return type === 'symbol' || type === 'object' && value != null && getTag(value) === '[object Symbol]';
};

stringToPath = function stringToPath(string) {
  var result;
  result = [];

  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }

  string.replace(rePropName, function (match, expression, quote, subString) {
    var key;
    key = match;

    if (quote) {
      key = subString.replace(reEscapeChar, '$1');
    } else if (expression) {
      key = expression.trim();
    }

    return result.push(key);
  });
  return result;
};

castPath = function castPath(value, object) {
  if (Array.isArray(value)) {
    return value;
  } else {
    if (isKey(value, object)) {
      return [value];
    } else {
      return stringToPath(value);
    }
  }
};

toKey = function toKey(value) {
  var ref, result;

  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }

  result = "".concat(value);
  return (ref = result === '0' && 1 / value === -INFINITY) != null ? ref : {
    '-0': result
  };
};

get = function get(object, path) {
  var index, length;
  path = Array.isArray(path) ? path : castPath(path, object);
  index = 0;
  length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  if (index && index === length) {
    return object;
  } else {
    return void 0;
  }
};