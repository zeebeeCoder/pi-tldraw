"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e2) {
      throw err = [e2], e2;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/zod/v4/core/core.js
  // @__NO_SIDE_EFFECTS__
  function $constructor(name, initializer3, params) {
    function init(inst, def) {
      if (!inst._zod) {
        Object.defineProperty(inst, "_zod", {
          value: {
            def,
            constr: _2,
            traits: /* @__PURE__ */ new Set()
          },
          enumerable: false
        });
      }
      if (inst._zod.traits.has(name)) {
        return;
      }
      inst._zod.traits.add(name);
      initializer3(inst, def);
      const proto = _2.prototype;
      const keys = Object.keys(proto);
      for (let i = 0; i < keys.length; i++) {
        const k2 = keys[i];
        if (!(k2 in inst)) {
          inst[k2] = proto[k2].bind(inst);
        }
      }
    }
    const Parent = params?.Parent ?? Object;
    class Definition extends Parent {
    }
    Object.defineProperty(Definition, "name", { value: name });
    function _2(def) {
      var _a3;
      const inst = params?.Parent ? new Definition() : this;
      init(inst, def);
      (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
      for (const fn of inst._zod.deferred) {
        fn();
      }
      return inst;
    }
    Object.defineProperty(_2, "init", { value: init });
    Object.defineProperty(_2, Symbol.hasInstance, {
      value: (inst) => {
        if (params?.Parent && inst instanceof params.Parent)
          return true;
        return inst?._zod?.traits?.has(name);
      }
    });
    Object.defineProperty(_2, "name", { value: name });
    return _2;
  }
  function config(newConfig) {
    if (newConfig)
      Object.assign(globalConfig, newConfig);
    return globalConfig;
  }
  var _a, NEVER, $brand, $ZodAsyncError, $ZodEncodeError, globalConfig;
  var init_core = __esm({
    "node_modules/zod/v4/core/core.js"() {
      NEVER = /* @__PURE__ */ Object.freeze({
        status: "aborted"
      });
      $brand = /* @__PURE__ */ Symbol("zod_brand");
      $ZodAsyncError = class extends Error {
        constructor() {
          super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
        }
      };
      $ZodEncodeError = class extends Error {
        constructor(name) {
          super(`Encountered unidirectional transform during encode: ${name}`);
          this.name = "ZodEncodeError";
        }
      };
      (_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
      globalConfig = globalThis.__zod_globalConfig;
    }
  });

  // node_modules/zod/v4/core/util.js
  var util_exports = {};
  __export(util_exports, {
    BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
    Class: () => Class,
    NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
    aborted: () => aborted,
    allowsEval: () => allowsEval,
    assert: () => assert,
    assertEqual: () => assertEqual,
    assertIs: () => assertIs,
    assertNever: () => assertNever,
    assertNotEqual: () => assertNotEqual,
    assignProp: () => assignProp,
    base64ToUint8Array: () => base64ToUint8Array,
    base64urlToUint8Array: () => base64urlToUint8Array,
    cached: () => cached,
    captureStackTrace: () => captureStackTrace,
    cleanEnum: () => cleanEnum,
    cleanRegex: () => cleanRegex,
    clone: () => clone,
    cloneDef: () => cloneDef,
    createTransparentProxy: () => createTransparentProxy,
    defineLazy: () => defineLazy,
    esc: () => esc,
    escapeRegex: () => escapeRegex,
    explicitlyAborted: () => explicitlyAborted,
    extend: () => extend,
    finalizeIssue: () => finalizeIssue,
    floatSafeRemainder: () => floatSafeRemainder,
    getElementAtPath: () => getElementAtPath,
    getEnumValues: () => getEnumValues,
    getLengthableOrigin: () => getLengthableOrigin,
    getParsedType: () => getParsedType,
    getSizableOrigin: () => getSizableOrigin,
    hexToUint8Array: () => hexToUint8Array,
    isObject: () => isObject,
    isPlainObject: () => isPlainObject,
    issue: () => issue,
    joinValues: () => joinValues,
    jsonStringifyReplacer: () => jsonStringifyReplacer,
    merge: () => merge,
    mergeDefs: () => mergeDefs,
    normalizeParams: () => normalizeParams,
    nullish: () => nullish,
    numKeys: () => numKeys,
    objectClone: () => objectClone,
    omit: () => omit,
    optionalKeys: () => optionalKeys,
    parsedType: () => parsedType,
    partial: () => partial,
    pick: () => pick,
    prefixIssues: () => prefixIssues,
    primitiveTypes: () => primitiveTypes,
    promiseAllObject: () => promiseAllObject,
    propertyKeyTypes: () => propertyKeyTypes,
    randomString: () => randomString,
    required: () => required,
    safeExtend: () => safeExtend,
    shallowClone: () => shallowClone,
    slugify: () => slugify,
    stringifyPrimitive: () => stringifyPrimitive,
    uint8ArrayToBase64: () => uint8ArrayToBase64,
    uint8ArrayToBase64url: () => uint8ArrayToBase64url,
    uint8ArrayToHex: () => uint8ArrayToHex,
    unwrapMessage: () => unwrapMessage
  });
  function assertEqual(val) {
    return val;
  }
  function assertNotEqual(val) {
    return val;
  }
  function assertIs(_arg) {
  }
  function assertNever(_x) {
    throw new Error("Unexpected value in exhaustive check");
  }
  function assert(_2) {
  }
  function getEnumValues(entries) {
    const numericValues = Object.values(entries).filter((v2) => typeof v2 === "number");
    const values = Object.entries(entries).filter(([k2, _2]) => numericValues.indexOf(+k2) === -1).map(([_2, v2]) => v2);
    return values;
  }
  function joinValues(array2, separator = "|") {
    return array2.map((val) => stringifyPrimitive(val)).join(separator);
  }
  function jsonStringifyReplacer(_2, value) {
    if (typeof value === "bigint")
      return value.toString();
    return value;
  }
  function cached(getter) {
    const set2 = false;
    return {
      get value() {
        if (!set2) {
          const value = getter();
          Object.defineProperty(this, "value", { value });
          return value;
        }
        throw new Error("cached value already set");
      }
    };
  }
  function nullish(input) {
    return input === null || input === void 0;
  }
  function cleanRegex(source) {
    const start = source.startsWith("^") ? 1 : 0;
    const end = source.endsWith("$") ? source.length - 1 : source.length;
    return source.slice(start, end);
  }
  function floatSafeRemainder(val, step) {
    const ratio = val / step;
    const roundedRatio = Math.round(ratio);
    const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
    if (Math.abs(ratio - roundedRatio) < tolerance)
      return 0;
    return ratio - roundedRatio;
  }
  function defineLazy(object3, key, getter) {
    let value = void 0;
    Object.defineProperty(object3, key, {
      get() {
        if (value === EVALUATING) {
          return void 0;
        }
        if (value === void 0) {
          value = EVALUATING;
          value = getter();
        }
        return value;
      },
      set(v2) {
        Object.defineProperty(object3, key, {
          value: v2
          // configurable: true,
        });
      },
      configurable: true
    });
  }
  function objectClone(obj) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
  }
  function assignProp(target, prop, value) {
    Object.defineProperty(target, prop, {
      value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  }
  function mergeDefs(...defs) {
    const mergedDescriptors = {};
    for (const def of defs) {
      const descriptors = Object.getOwnPropertyDescriptors(def);
      Object.assign(mergedDescriptors, descriptors);
    }
    return Object.defineProperties({}, mergedDescriptors);
  }
  function cloneDef(schema) {
    return mergeDefs(schema._zod.def);
  }
  function getElementAtPath(obj, path) {
    if (!path)
      return obj;
    return path.reduce((acc, key) => acc?.[key], obj);
  }
  function promiseAllObject(promisesObj) {
    const keys = Object.keys(promisesObj);
    const promises = keys.map((key) => promisesObj[key]);
    return Promise.all(promises).then((results) => {
      const resolvedObj = {};
      for (let i = 0; i < keys.length; i++) {
        resolvedObj[keys[i]] = results[i];
      }
      return resolvedObj;
    });
  }
  function randomString(length = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
  function esc(str) {
    return JSON.stringify(str);
  }
  function slugify(input) {
    return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function isObject(data) {
    return typeof data === "object" && data !== null && !Array.isArray(data);
  }
  function isPlainObject(o2) {
    if (isObject(o2) === false)
      return false;
    const ctor = o2.constructor;
    if (ctor === void 0)
      return true;
    if (typeof ctor !== "function")
      return true;
    const prot = ctor.prototype;
    if (isObject(prot) === false)
      return false;
    if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
      return false;
    }
    return true;
  }
  function shallowClone(o2) {
    if (isPlainObject(o2))
      return { ...o2 };
    if (Array.isArray(o2))
      return [...o2];
    if (o2 instanceof Map)
      return new Map(o2);
    if (o2 instanceof Set)
      return new Set(o2);
    return o2;
  }
  function numKeys(data) {
    let keyCount = 0;
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        keyCount++;
      }
    }
    return keyCount;
  }
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function clone(inst, def, params) {
    const cl = new inst._zod.constr(def ?? inst._zod.def);
    if (!def || params?.parent)
      cl._zod.parent = inst;
    return cl;
  }
  function normalizeParams(_params) {
    const params = _params;
    if (!params)
      return {};
    if (typeof params === "string")
      return { error: () => params };
    if (params?.message !== void 0) {
      if (params?.error !== void 0)
        throw new Error("Cannot specify both `message` and `error` params");
      params.error = params.message;
    }
    delete params.message;
    if (typeof params.error === "string")
      return { ...params, error: () => params.error };
    return params;
  }
  function createTransparentProxy(getter) {
    let target;
    return new Proxy({}, {
      get(_2, prop, receiver) {
        target ?? (target = getter());
        return Reflect.get(target, prop, receiver);
      },
      set(_2, prop, value, receiver) {
        target ?? (target = getter());
        return Reflect.set(target, prop, value, receiver);
      },
      has(_2, prop) {
        target ?? (target = getter());
        return Reflect.has(target, prop);
      },
      deleteProperty(_2, prop) {
        target ?? (target = getter());
        return Reflect.deleteProperty(target, prop);
      },
      ownKeys(_2) {
        target ?? (target = getter());
        return Reflect.ownKeys(target);
      },
      getOwnPropertyDescriptor(_2, prop) {
        target ?? (target = getter());
        return Reflect.getOwnPropertyDescriptor(target, prop);
      },
      defineProperty(_2, prop, descriptor) {
        target ?? (target = getter());
        return Reflect.defineProperty(target, prop, descriptor);
      }
    });
  }
  function stringifyPrimitive(value) {
    if (typeof value === "bigint")
      return value.toString() + "n";
    if (typeof value === "string")
      return `"${value}"`;
    return `${value}`;
  }
  function optionalKeys(shape) {
    return Object.keys(shape).filter((k2) => {
      return shape[k2]._zod.optin === "optional" && shape[k2]._zod.optout === "optional";
    });
  }
  function pick(schema, mask) {
    const currDef = schema._zod.def;
    const checks = currDef.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
      throw new Error(".pick() cannot be used on object schemas containing refinements");
    }
    const def = mergeDefs(schema._zod.def, {
      get shape() {
        const newShape = {};
        for (const key in mask) {
          if (!(key in currDef.shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          newShape[key] = currDef.shape[key];
        }
        assignProp(this, "shape", newShape);
        return newShape;
      },
      checks: []
    });
    return clone(schema, def);
  }
  function omit(schema, mask) {
    const currDef = schema._zod.def;
    const checks = currDef.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
      throw new Error(".omit() cannot be used on object schemas containing refinements");
    }
    const def = mergeDefs(schema._zod.def, {
      get shape() {
        const newShape = { ...schema._zod.def.shape };
        for (const key in mask) {
          if (!(key in currDef.shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          delete newShape[key];
        }
        assignProp(this, "shape", newShape);
        return newShape;
      },
      checks: []
    });
    return clone(schema, def);
  }
  function extend(schema, shape) {
    if (!isPlainObject(shape)) {
      throw new Error("Invalid input to extend: expected a plain object");
    }
    const checks = schema._zod.def.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
      const existingShape = schema._zod.def.shape;
      for (const key in shape) {
        if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
          throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
      }
    }
    const def = mergeDefs(schema._zod.def, {
      get shape() {
        const _shape = { ...schema._zod.def.shape, ...shape };
        assignProp(this, "shape", _shape);
        return _shape;
      }
    });
    return clone(schema, def);
  }
  function safeExtend(schema, shape) {
    if (!isPlainObject(shape)) {
      throw new Error("Invalid input to safeExtend: expected a plain object");
    }
    const def = mergeDefs(schema._zod.def, {
      get shape() {
        const _shape = { ...schema._zod.def.shape, ...shape };
        assignProp(this, "shape", _shape);
        return _shape;
      }
    });
    return clone(schema, def);
  }
  function merge(a2, b2) {
    if (a2._zod.def.checks?.length) {
      throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
    }
    const def = mergeDefs(a2._zod.def, {
      get shape() {
        const _shape = { ...a2._zod.def.shape, ...b2._zod.def.shape };
        assignProp(this, "shape", _shape);
        return _shape;
      },
      get catchall() {
        return b2._zod.def.catchall;
      },
      checks: b2._zod.def.checks ?? []
    });
    return clone(a2, def);
  }
  function partial(Class2, schema, mask) {
    const currDef = schema._zod.def;
    const checks = currDef.checks;
    const hasChecks = checks && checks.length > 0;
    if (hasChecks) {
      throw new Error(".partial() cannot be used on object schemas containing refinements");
    }
    const def = mergeDefs(schema._zod.def, {
      get shape() {
        const oldShape = schema._zod.def.shape;
        const shape = { ...oldShape };
        if (mask) {
          for (const key in mask) {
            if (!(key in oldShape)) {
              throw new Error(`Unrecognized key: "${key}"`);
            }
            if (!mask[key])
              continue;
            shape[key] = Class2 ? new Class2({
              type: "optional",
              innerType: oldShape[key]
            }) : oldShape[key];
          }
        } else {
          for (const key in oldShape) {
            shape[key] = Class2 ? new Class2({
              type: "optional",
              innerType: oldShape[key]
            }) : oldShape[key];
          }
        }
        assignProp(this, "shape", shape);
        return shape;
      },
      checks: []
    });
    return clone(schema, def);
  }
  function required(Class2, schema, mask) {
    const def = mergeDefs(schema._zod.def, {
      get shape() {
        const oldShape = schema._zod.def.shape;
        const shape = { ...oldShape };
        if (mask) {
          for (const key in mask) {
            if (!(key in shape)) {
              throw new Error(`Unrecognized key: "${key}"`);
            }
            if (!mask[key])
              continue;
            shape[key] = new Class2({
              type: "nonoptional",
              innerType: oldShape[key]
            });
          }
        } else {
          for (const key in oldShape) {
            shape[key] = new Class2({
              type: "nonoptional",
              innerType: oldShape[key]
            });
          }
        }
        assignProp(this, "shape", shape);
        return shape;
      }
    });
    return clone(schema, def);
  }
  function aborted(x2, startIndex = 0) {
    if (x2.aborted === true)
      return true;
    for (let i = startIndex; i < x2.issues.length; i++) {
      if (x2.issues[i]?.continue !== true) {
        return true;
      }
    }
    return false;
  }
  function explicitlyAborted(x2, startIndex = 0) {
    if (x2.aborted === true)
      return true;
    for (let i = startIndex; i < x2.issues.length; i++) {
      if (x2.issues[i]?.continue === false) {
        return true;
      }
    }
    return false;
  }
  function prefixIssues(path, issues) {
    return issues.map((iss) => {
      var _a3;
      (_a3 = iss).path ?? (_a3.path = []);
      iss.path.unshift(path);
      return iss;
    });
  }
  function unwrapMessage(message) {
    return typeof message === "string" ? message : message?.message;
  }
  function finalizeIssue(iss, ctx, config2) {
    const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
    rest.path ?? (rest.path = []);
    rest.message = message;
    if (ctx?.reportInput) {
      rest.input = _input;
    }
    return rest;
  }
  function getSizableOrigin(input) {
    if (input instanceof Set)
      return "set";
    if (input instanceof Map)
      return "map";
    if (input instanceof File)
      return "file";
    return "unknown";
  }
  function getLengthableOrigin(input) {
    if (Array.isArray(input))
      return "array";
    if (typeof input === "string")
      return "string";
    return "unknown";
  }
  function parsedType(data) {
    const t2 = typeof data;
    switch (t2) {
      case "number": {
        return Number.isNaN(data) ? "nan" : "number";
      }
      case "object": {
        if (data === null) {
          return "null";
        }
        if (Array.isArray(data)) {
          return "array";
        }
        const obj = data;
        if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
          return obj.constructor.name;
        }
      }
    }
    return t2;
  }
  function issue(...args) {
    const [iss, input, inst] = args;
    if (typeof iss === "string") {
      return {
        message: iss,
        code: "custom",
        input,
        inst
      };
    }
    return { ...iss };
  }
  function cleanEnum(obj) {
    return Object.entries(obj).filter(([k2, _2]) => {
      return Number.isNaN(Number.parseInt(k2, 10));
    }).map((el) => el[1]);
  }
  function base64ToUint8Array(base643) {
    const binaryString = atob(base643);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  function uint8ArrayToBase64(bytes) {
    let binaryString = "";
    for (let i = 0; i < bytes.length; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
  }
  function base64urlToUint8Array(base64url3) {
    const base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - base643.length % 4) % 4);
    return base64ToUint8Array(base643 + padding);
  }
  function uint8ArrayToBase64url(bytes) {
    return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
  function hexToUint8Array(hex3) {
    const cleanHex = hex3.replace(/^0x/, "");
    if (cleanHex.length % 2 !== 0) {
      throw new Error("Invalid hex string length");
    }
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
    }
    return bytes;
  }
  function uint8ArrayToHex(bytes) {
    return Array.from(bytes).map((b2) => b2.toString(16).padStart(2, "0")).join("");
  }
  var EVALUATING, captureStackTrace, allowsEval, getParsedType, propertyKeyTypes, primitiveTypes, NUMBER_FORMAT_RANGES, BIGINT_FORMAT_RANGES, Class;
  var init_util = __esm({
    "node_modules/zod/v4/core/util.js"() {
      init_core();
      EVALUATING = /* @__PURE__ */ Symbol("evaluating");
      captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
      };
      allowsEval = /* @__PURE__ */ cached(() => {
        if (globalConfig.jitless) {
          return false;
        }
        if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
          return false;
        }
        try {
          const F2 = Function;
          new F2("");
          return true;
        } catch (_2) {
          return false;
        }
      });
      getParsedType = (data) => {
        const t2 = typeof data;
        switch (t2) {
          case "undefined":
            return "undefined";
          case "string":
            return "string";
          case "number":
            return Number.isNaN(data) ? "nan" : "number";
          case "boolean":
            return "boolean";
          case "function":
            return "function";
          case "bigint":
            return "bigint";
          case "symbol":
            return "symbol";
          case "object":
            if (Array.isArray(data)) {
              return "array";
            }
            if (data === null) {
              return "null";
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
              return "promise";
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
              return "map";
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
              return "set";
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
              return "date";
            }
            if (typeof File !== "undefined" && data instanceof File) {
              return "file";
            }
            return "object";
          default:
            throw new Error(`Unknown data type: ${t2}`);
        }
      };
      propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
      primitiveTypes = /* @__PURE__ */ new Set([
        "string",
        "number",
        "bigint",
        "boolean",
        "symbol",
        "undefined"
      ]);
      NUMBER_FORMAT_RANGES = {
        safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
        int32: [-2147483648, 2147483647],
        uint32: [0, 4294967295],
        float32: [-34028234663852886e22, 34028234663852886e22],
        float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
      };
      BIGINT_FORMAT_RANGES = {
        int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
        uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
      };
      Class = class {
        constructor(..._args) {
        }
      };
    }
  });

  // node_modules/zod/v4/core/errors.js
  function flattenError(error51, mapper = (issue2) => issue2.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of error51.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  function formatError(error51, mapper = (issue2) => issue2.message) {
    const fieldErrors = { _errors: [] };
    const processError = (error52, path = []) => {
      for (const issue2 of error52.issues) {
        if (issue2.code === "invalid_union" && issue2.errors.length) {
          issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
        } else if (issue2.code === "invalid_key") {
          processError({ issues: issue2.issues }, [...path, ...issue2.path]);
        } else if (issue2.code === "invalid_element") {
          processError({ issues: issue2.issues }, [...path, ...issue2.path]);
        } else {
          const fullpath = [...path, ...issue2.path];
          if (fullpath.length === 0) {
            fieldErrors._errors.push(mapper(issue2));
          } else {
            let curr = fieldErrors;
            let i = 0;
            while (i < fullpath.length) {
              const el = fullpath[i];
              const terminal = i === fullpath.length - 1;
              if (!terminal) {
                curr[el] = curr[el] || { _errors: [] };
              } else {
                curr[el] = curr[el] || { _errors: [] };
                curr[el]._errors.push(mapper(issue2));
              }
              curr = curr[el];
              i++;
            }
          }
        }
      }
    };
    processError(error51);
    return fieldErrors;
  }
  function treeifyError(error51, mapper = (issue2) => issue2.message) {
    const result = { errors: [] };
    const processError = (error52, path = []) => {
      var _a3, _b;
      for (const issue2 of error52.issues) {
        if (issue2.code === "invalid_union" && issue2.errors.length) {
          issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
        } else if (issue2.code === "invalid_key") {
          processError({ issues: issue2.issues }, [...path, ...issue2.path]);
        } else if (issue2.code === "invalid_element") {
          processError({ issues: issue2.issues }, [...path, ...issue2.path]);
        } else {
          const fullpath = [...path, ...issue2.path];
          if (fullpath.length === 0) {
            result.errors.push(mapper(issue2));
            continue;
          }
          let curr = result;
          let i = 0;
          while (i < fullpath.length) {
            const el = fullpath[i];
            const terminal = i === fullpath.length - 1;
            if (typeof el === "string") {
              curr.properties ?? (curr.properties = {});
              (_a3 = curr.properties)[el] ?? (_a3[el] = { errors: [] });
              curr = curr.properties[el];
            } else {
              curr.items ?? (curr.items = []);
              (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
              curr = curr.items[el];
            }
            if (terminal) {
              curr.errors.push(mapper(issue2));
            }
            i++;
          }
        }
      }
    };
    processError(error51);
    return result;
  }
  function toDotPath(_path) {
    const segs = [];
    const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
    for (const seg of path) {
      if (typeof seg === "number")
        segs.push(`[${seg}]`);
      else if (typeof seg === "symbol")
        segs.push(`[${JSON.stringify(String(seg))}]`);
      else if (/[^\w$]/.test(seg))
        segs.push(`[${JSON.stringify(seg)}]`);
      else {
        if (segs.length)
          segs.push(".");
        segs.push(seg);
      }
    }
    return segs.join("");
  }
  function prettifyError(error51) {
    const lines = [];
    const issues = [...error51.issues].sort((a2, b2) => (a2.path ?? []).length - (b2.path ?? []).length);
    for (const issue2 of issues) {
      lines.push(`✖ ${issue2.message}`);
      if (issue2.path?.length)
        lines.push(`  → at ${toDotPath(issue2.path)}`);
    }
    return lines.join("\n");
  }
  var initializer, $ZodError, $ZodRealError;
  var init_errors = __esm({
    "node_modules/zod/v4/core/errors.js"() {
      init_core();
      init_util();
      initializer = (inst, def) => {
        inst.name = "$ZodError";
        Object.defineProperty(inst, "_zod", {
          value: inst._zod,
          enumerable: false
        });
        Object.defineProperty(inst, "issues", {
          value: def,
          enumerable: false
        });
        inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
        Object.defineProperty(inst, "toString", {
          value: () => inst.message,
          enumerable: false
        });
      };
      $ZodError = $constructor("$ZodError", initializer);
      $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
    }
  });

  // node_modules/zod/v4/core/parse.js
  var _parse, parse, _parseAsync, parseAsync, _safeParse, safeParse, _safeParseAsync, safeParseAsync, _encode, encode, _decode, decode, _encodeAsync, encodeAsync, _decodeAsync, decodeAsync, _safeEncode, safeEncode, _safeDecode, safeDecode, _safeEncodeAsync, safeEncodeAsync, _safeDecodeAsync, safeDecodeAsync;
  var init_parse = __esm({
    "node_modules/zod/v4/core/parse.js"() {
      init_core();
      init_errors();
      init_util();
      _parse = (_Err) => (schema, value, _ctx, _params) => {
        const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
        const result = schema._zod.run({ value, issues: [] }, ctx);
        if (result instanceof Promise) {
          throw new $ZodAsyncError();
        }
        if (result.issues.length) {
          const e2 = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
          captureStackTrace(e2, _params?.callee);
          throw e2;
        }
        return result.value;
      };
      parse = /* @__PURE__ */ _parse($ZodRealError);
      _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
        const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
        let result = schema._zod.run({ value, issues: [] }, ctx);
        if (result instanceof Promise)
          result = await result;
        if (result.issues.length) {
          const e2 = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
          captureStackTrace(e2, params?.callee);
          throw e2;
        }
        return result.value;
      };
      parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
      _safeParse = (_Err) => (schema, value, _ctx) => {
        const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
        const result = schema._zod.run({ value, issues: [] }, ctx);
        if (result instanceof Promise) {
          throw new $ZodAsyncError();
        }
        return result.issues.length ? {
          success: false,
          error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
        } : { success: true, data: result.value };
      };
      safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
      _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
        const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
        let result = schema._zod.run({ value, issues: [] }, ctx);
        if (result instanceof Promise)
          result = await result;
        return result.issues.length ? {
          success: false,
          error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
        } : { success: true, data: result.value };
      };
      safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
      _encode = (_Err) => (schema, value, _ctx) => {
        const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
        return _parse(_Err)(schema, value, ctx);
      };
      encode = /* @__PURE__ */ _encode($ZodRealError);
      _decode = (_Err) => (schema, value, _ctx) => {
        return _parse(_Err)(schema, value, _ctx);
      };
      decode = /* @__PURE__ */ _decode($ZodRealError);
      _encodeAsync = (_Err) => async (schema, value, _ctx) => {
        const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
        return _parseAsync(_Err)(schema, value, ctx);
      };
      encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
      _decodeAsync = (_Err) => async (schema, value, _ctx) => {
        return _parseAsync(_Err)(schema, value, _ctx);
      };
      decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
      _safeEncode = (_Err) => (schema, value, _ctx) => {
        const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
        return _safeParse(_Err)(schema, value, ctx);
      };
      safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
      _safeDecode = (_Err) => (schema, value, _ctx) => {
        return _safeParse(_Err)(schema, value, _ctx);
      };
      safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
      _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
        const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
        return _safeParseAsync(_Err)(schema, value, ctx);
      };
      safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
      _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
        return _safeParseAsync(_Err)(schema, value, _ctx);
      };
      safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);
    }
  });

  // node_modules/zod/v4/core/regexes.js
  var regexes_exports = {};
  __export(regexes_exports, {
    base64: () => base64,
    base64url: () => base64url,
    bigint: () => bigint,
    boolean: () => boolean,
    browserEmail: () => browserEmail,
    cidrv4: () => cidrv4,
    cidrv6: () => cidrv6,
    cuid: () => cuid,
    cuid2: () => cuid2,
    date: () => date,
    datetime: () => datetime,
    domain: () => domain,
    duration: () => duration,
    e164: () => e164,
    email: () => email,
    emoji: () => emoji,
    extendedDuration: () => extendedDuration,
    guid: () => guid,
    hex: () => hex,
    hostname: () => hostname,
    html5Email: () => html5Email,
    httpProtocol: () => httpProtocol,
    idnEmail: () => idnEmail,
    integer: () => integer,
    ipv4: () => ipv4,
    ipv6: () => ipv6,
    ksuid: () => ksuid,
    lowercase: () => lowercase,
    mac: () => mac,
    md5_base64: () => md5_base64,
    md5_base64url: () => md5_base64url,
    md5_hex: () => md5_hex,
    nanoid: () => nanoid,
    null: () => _null,
    number: () => number,
    rfc5322Email: () => rfc5322Email,
    sha1_base64: () => sha1_base64,
    sha1_base64url: () => sha1_base64url,
    sha1_hex: () => sha1_hex,
    sha256_base64: () => sha256_base64,
    sha256_base64url: () => sha256_base64url,
    sha256_hex: () => sha256_hex,
    sha384_base64: () => sha384_base64,
    sha384_base64url: () => sha384_base64url,
    sha384_hex: () => sha384_hex,
    sha512_base64: () => sha512_base64,
    sha512_base64url: () => sha512_base64url,
    sha512_hex: () => sha512_hex,
    string: () => string,
    time: () => time,
    ulid: () => ulid,
    undefined: () => _undefined,
    unicodeEmail: () => unicodeEmail,
    uppercase: () => uppercase,
    uuid: () => uuid,
    uuid4: () => uuid4,
    uuid6: () => uuid6,
    uuid7: () => uuid7,
    xid: () => xid
  });
  function emoji() {
    return new RegExp(_emoji, "u");
  }
  function timeSource(args) {
    const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
    const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
    return regex;
  }
  function time(args) {
    return new RegExp(`^${timeSource(args)}$`);
  }
  function datetime(args) {
    const time3 = timeSource({ precision: args.precision });
    const opts = ["Z"];
    if (args.local)
      opts.push("");
    if (args.offset)
      opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
    const timeRegex = `${time3}(?:${opts.join("|")})`;
    return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
  }
  function fixedBase64(bodyLength, padding) {
    return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
  }
  function fixedBase64url(length) {
    return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
  }
  var cuid, cuid2, ulid, xid, ksuid, nanoid, duration, extendedDuration, guid, uuid, uuid4, uuid6, uuid7, email, html5Email, rfc5322Email, unicodeEmail, idnEmail, browserEmail, _emoji, ipv4, ipv6, mac, cidrv4, cidrv6, base64, base64url, hostname, domain, httpProtocol, e164, dateSource, date, string, bigint, integer, number, boolean, _null, _undefined, lowercase, uppercase, hex, md5_hex, md5_base64, md5_base64url, sha1_hex, sha1_base64, sha1_base64url, sha256_hex, sha256_base64, sha256_base64url, sha384_hex, sha384_base64, sha384_base64url, sha512_hex, sha512_base64, sha512_base64url;
  var init_regexes = __esm({
    "node_modules/zod/v4/core/regexes.js"() {
      init_util();
      cuid = /^[cC][0-9a-z]{6,}$/;
      cuid2 = /^[0-9a-z]+$/;
      ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
      xid = /^[0-9a-vA-V]{20}$/;
      ksuid = /^[A-Za-z0-9]{27}$/;
      nanoid = /^[a-zA-Z0-9_-]{21}$/;
      duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
      extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
      guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
      uuid = (version2) => {
        if (!version2)
          return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
        return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
      };
      uuid4 = /* @__PURE__ */ uuid(4);
      uuid6 = /* @__PURE__ */ uuid(6);
      uuid7 = /* @__PURE__ */ uuid(7);
      email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
      html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
      idnEmail = unicodeEmail;
      browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
      ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
      ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
      mac = (delimiter) => {
        const escapedDelim = escapeRegex(delimiter ?? ":");
        return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
      };
      cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
      cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
      base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
      base64url = /^[A-Za-z0-9_-]*$/;
      hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
      domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      httpProtocol = /^https?$/;
      e164 = /^\+[1-9]\d{6,14}$/;
      dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
      date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
      string = (params) => {
        const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
        return new RegExp(`^${regex}$`);
      };
      bigint = /^-?\d+n?$/;
      integer = /^-?\d+$/;
      number = /^-?\d+(?:\.\d+)?$/;
      boolean = /^(?:true|false)$/i;
      _null = /^null$/i;
      _undefined = /^undefined$/i;
      lowercase = /^[^A-Z]*$/;
      uppercase = /^[^a-z]*$/;
      hex = /^[0-9a-fA-F]*$/;
      md5_hex = /^[0-9a-fA-F]{32}$/;
      md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
      md5_base64url = /* @__PURE__ */ fixedBase64url(22);
      sha1_hex = /^[0-9a-fA-F]{40}$/;
      sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
      sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
      sha256_hex = /^[0-9a-fA-F]{64}$/;
      sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
      sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
      sha384_hex = /^[0-9a-fA-F]{96}$/;
      sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
      sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
      sha512_hex = /^[0-9a-fA-F]{128}$/;
      sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
      sha512_base64url = /* @__PURE__ */ fixedBase64url(86);
    }
  });

  // node_modules/zod/v4/core/checks.js
  function handleCheckPropertyResult(result, payload, property) {
    if (result.issues.length) {
      payload.issues.push(...prefixIssues(property, result.issues));
    }
  }
  var $ZodCheck, numericOriginMap, $ZodCheckLessThan, $ZodCheckGreaterThan, $ZodCheckMultipleOf, $ZodCheckNumberFormat, $ZodCheckBigIntFormat, $ZodCheckMaxSize, $ZodCheckMinSize, $ZodCheckSizeEquals, $ZodCheckMaxLength, $ZodCheckMinLength, $ZodCheckLengthEquals, $ZodCheckStringFormat, $ZodCheckRegex, $ZodCheckLowerCase, $ZodCheckUpperCase, $ZodCheckIncludes, $ZodCheckStartsWith, $ZodCheckEndsWith, $ZodCheckProperty, $ZodCheckMimeType, $ZodCheckOverwrite;
  var init_checks = __esm({
    "node_modules/zod/v4/core/checks.js"() {
      init_core();
      init_regexes();
      init_util();
      $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
        var _a3;
        inst._zod ?? (inst._zod = {});
        inst._zod.def = def;
        (_a3 = inst._zod).onattach ?? (_a3.onattach = []);
      });
      numericOriginMap = {
        number: "number",
        bigint: "bigint",
        object: "date"
      };
      $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
        $ZodCheck.init(inst, def);
        const origin = numericOriginMap[typeof def.value];
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
          if (def.value < curr) {
            if (def.inclusive)
              bag.maximum = def.value;
            else
              bag.exclusiveMaximum = def.value;
          }
        });
        inst._zod.check = (payload) => {
          if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
            return;
          }
          payload.issues.push({
            origin,
            code: "too_big",
            maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
        $ZodCheck.init(inst, def);
        const origin = numericOriginMap[typeof def.value];
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
          if (def.value > curr) {
            if (def.inclusive)
              bag.minimum = def.value;
            else
              bag.exclusiveMinimum = def.value;
          }
        });
        inst._zod.check = (payload) => {
          if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
            return;
          }
          payload.issues.push({
            origin,
            code: "too_small",
            minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
        $ZodCheck.init(inst, def);
        inst._zod.onattach.push((inst2) => {
          var _a3;
          (_a3 = inst2._zod.bag).multipleOf ?? (_a3.multipleOf = def.value);
        });
        inst._zod.check = (payload) => {
          if (typeof payload.value !== typeof def.value)
            throw new Error("Cannot mix number and bigint in multiple_of check.");
          const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
          if (isMultiple)
            return;
          payload.issues.push({
            origin: typeof payload.value,
            code: "not_multiple_of",
            divisor: def.value,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
        $ZodCheck.init(inst, def);
        def.format = def.format || "float64";
        const isInt = def.format?.includes("int");
        const origin = isInt ? "int" : "number";
        const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.format = def.format;
          bag.minimum = minimum;
          bag.maximum = maximum;
          if (isInt)
            bag.pattern = integer;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          if (isInt) {
            if (!Number.isInteger(input)) {
              payload.issues.push({
                expected: origin,
                format: def.format,
                code: "invalid_type",
                continue: false,
                input,
                inst
              });
              return;
            }
            if (!Number.isSafeInteger(input)) {
              if (input > 0) {
                payload.issues.push({
                  input,
                  code: "too_big",
                  maximum: Number.MAX_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst,
                  origin,
                  inclusive: true,
                  continue: !def.abort
                });
              } else {
                payload.issues.push({
                  input,
                  code: "too_small",
                  minimum: Number.MIN_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst,
                  origin,
                  inclusive: true,
                  continue: !def.abort
                });
              }
              return;
            }
          }
          if (input < minimum) {
            payload.issues.push({
              origin: "number",
              input,
              code: "too_small",
              minimum,
              inclusive: true,
              inst,
              continue: !def.abort
            });
          }
          if (input > maximum) {
            payload.issues.push({
              origin: "number",
              input,
              code: "too_big",
              maximum,
              inclusive: true,
              inst,
              continue: !def.abort
            });
          }
        };
      });
      $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
        $ZodCheck.init(inst, def);
        const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.format = def.format;
          bag.minimum = minimum;
          bag.maximum = maximum;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          if (input < minimum) {
            payload.issues.push({
              origin: "bigint",
              input,
              code: "too_small",
              minimum,
              inclusive: true,
              inst,
              continue: !def.abort
            });
          }
          if (input > maximum) {
            payload.issues.push({
              origin: "bigint",
              input,
              code: "too_big",
              maximum,
              inclusive: true,
              inst,
              continue: !def.abort
            });
          }
        };
      });
      $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
        var _a3;
        $ZodCheck.init(inst, def);
        (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
          const val = payload.value;
          return !nullish(val) && val.size !== void 0;
        });
        inst._zod.onattach.push((inst2) => {
          const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
          if (def.maximum < curr)
            inst2._zod.bag.maximum = def.maximum;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          const size = input.size;
          if (size <= def.maximum)
            return;
          payload.issues.push({
            origin: getSizableOrigin(input),
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
        var _a3;
        $ZodCheck.init(inst, def);
        (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
          const val = payload.value;
          return !nullish(val) && val.size !== void 0;
        });
        inst._zod.onattach.push((inst2) => {
          const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
          if (def.minimum > curr)
            inst2._zod.bag.minimum = def.minimum;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          const size = input.size;
          if (size >= def.minimum)
            return;
          payload.issues.push({
            origin: getSizableOrigin(input),
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
        var _a3;
        $ZodCheck.init(inst, def);
        (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
          const val = payload.value;
          return !nullish(val) && val.size !== void 0;
        });
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.minimum = def.size;
          bag.maximum = def.size;
          bag.size = def.size;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          const size = input.size;
          if (size === def.size)
            return;
          const tooBig = size > def.size;
          payload.issues.push({
            origin: getSizableOrigin(input),
            ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
        var _a3;
        $ZodCheck.init(inst, def);
        (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
          const val = payload.value;
          return !nullish(val) && val.length !== void 0;
        });
        inst._zod.onattach.push((inst2) => {
          const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
          if (def.maximum < curr)
            inst2._zod.bag.maximum = def.maximum;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          const length = input.length;
          if (length <= def.maximum)
            return;
          const origin = getLengthableOrigin(input);
          payload.issues.push({
            origin,
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
        var _a3;
        $ZodCheck.init(inst, def);
        (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
          const val = payload.value;
          return !nullish(val) && val.length !== void 0;
        });
        inst._zod.onattach.push((inst2) => {
          const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
          if (def.minimum > curr)
            inst2._zod.bag.minimum = def.minimum;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          const length = input.length;
          if (length >= def.minimum)
            return;
          const origin = getLengthableOrigin(input);
          payload.issues.push({
            origin,
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
        var _a3;
        $ZodCheck.init(inst, def);
        (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
          const val = payload.value;
          return !nullish(val) && val.length !== void 0;
        });
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.minimum = def.length;
          bag.maximum = def.length;
          bag.length = def.length;
        });
        inst._zod.check = (payload) => {
          const input = payload.value;
          const length = input.length;
          if (length === def.length)
            return;
          const origin = getLengthableOrigin(input);
          const tooBig = length > def.length;
          payload.issues.push({
            origin,
            ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
        var _a3, _b;
        $ZodCheck.init(inst, def);
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.format = def.format;
          if (def.pattern) {
            bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
            bag.patterns.add(def.pattern);
          }
        });
        if (def.pattern)
          (_a3 = inst._zod).check ?? (_a3.check = (payload) => {
            def.pattern.lastIndex = 0;
            if (def.pattern.test(payload.value))
              return;
            payload.issues.push({
              origin: "string",
              code: "invalid_format",
              format: def.format,
              input: payload.value,
              ...def.pattern ? { pattern: def.pattern.toString() } : {},
              inst,
              continue: !def.abort
            });
          });
        else
          (_b = inst._zod).check ?? (_b.check = () => {
          });
      });
      $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
        $ZodCheckStringFormat.init(inst, def);
        inst._zod.check = (payload) => {
          def.pattern.lastIndex = 0;
          if (def.pattern.test(payload.value))
            return;
          payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "regex",
            input: payload.value,
            pattern: def.pattern.toString(),
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
        def.pattern ?? (def.pattern = lowercase);
        $ZodCheckStringFormat.init(inst, def);
      });
      $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
        def.pattern ?? (def.pattern = uppercase);
        $ZodCheckStringFormat.init(inst, def);
      });
      $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
        $ZodCheck.init(inst, def);
        const escapedRegex = escapeRegex(def.includes);
        const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
        def.pattern = pattern;
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
          bag.patterns.add(pattern);
        });
        inst._zod.check = (payload) => {
          if (payload.value.includes(def.includes, def.position))
            return;
          payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: def.includes,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
        $ZodCheck.init(inst, def);
        const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
        def.pattern ?? (def.pattern = pattern);
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
          bag.patterns.add(pattern);
        });
        inst._zod.check = (payload) => {
          if (payload.value.startsWith(def.prefix))
            return;
          payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: def.prefix,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
        $ZodCheck.init(inst, def);
        const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
        def.pattern ?? (def.pattern = pattern);
        inst._zod.onattach.push((inst2) => {
          const bag = inst2._zod.bag;
          bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
          bag.patterns.add(pattern);
        });
        inst._zod.check = (payload) => {
          if (payload.value.endsWith(def.suffix))
            return;
          payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: def.suffix,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
        $ZodCheck.init(inst, def);
        inst._zod.check = (payload) => {
          const result = def.schema._zod.run({
            value: payload.value[def.property],
            issues: []
          }, {});
          if (result instanceof Promise) {
            return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
          }
          handleCheckPropertyResult(result, payload, def.property);
          return;
        };
      });
      $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
        $ZodCheck.init(inst, def);
        const mimeSet = new Set(def.mime);
        inst._zod.onattach.push((inst2) => {
          inst2._zod.bag.mime = def.mime;
        });
        inst._zod.check = (payload) => {
          if (mimeSet.has(payload.value.type))
            return;
          payload.issues.push({
            code: "invalid_value",
            values: def.mime,
            input: payload.value.type,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
        $ZodCheck.init(inst, def);
        inst._zod.check = (payload) => {
          payload.value = def.tx(payload.value);
        };
      });
    }
  });

  // node_modules/zod/v4/core/doc.js
  var Doc;
  var init_doc = __esm({
    "node_modules/zod/v4/core/doc.js"() {
      Doc = class {
        constructor(args = []) {
          this.content = [];
          this.indent = 0;
          if (this)
            this.args = args;
        }
        indented(fn) {
          this.indent += 1;
          fn(this);
          this.indent -= 1;
        }
        write(arg) {
          if (typeof arg === "function") {
            arg(this, { execution: "sync" });
            arg(this, { execution: "async" });
            return;
          }
          const content = arg;
          const lines = content.split("\n").filter((x2) => x2);
          const minIndent = Math.min(...lines.map((x2) => x2.length - x2.trimStart().length));
          const dedented = lines.map((x2) => x2.slice(minIndent)).map((x2) => " ".repeat(this.indent * 2) + x2);
          for (const line of dedented) {
            this.content.push(line);
          }
        }
        compile() {
          const F2 = Function;
          const args = this?.args;
          const content = this?.content ?? [``];
          const lines = [...content.map((x2) => `  ${x2}`)];
          return new F2(...args, lines.join("\n"));
        }
      };
    }
  });

  // node_modules/zod/v4/core/versions.js
  var version;
  var init_versions = __esm({
    "node_modules/zod/v4/core/versions.js"() {
      version = {
        major: 4,
        minor: 4,
        patch: 3
      };
    }
  });

  // node_modules/zod/v4/core/schemas.js
  function isValidBase64(data) {
    if (data === "")
      return true;
    if (/\s/.test(data))
      return false;
    if (data.length % 4 !== 0)
      return false;
    try {
      atob(data);
      return true;
    } catch {
      return false;
    }
  }
  function isValidBase64URL(data) {
    if (!base64url.test(data))
      return false;
    const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
    const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
    return isValidBase64(padded);
  }
  function isValidJWT(token, algorithm = null) {
    try {
      const tokensParts = token.split(".");
      if (tokensParts.length !== 3)
        return false;
      const [header] = tokensParts;
      if (!header)
        return false;
      const parsedHeader = JSON.parse(atob(header));
      if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
        return false;
      if (!parsedHeader.alg)
        return false;
      if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
        return false;
      return true;
    } catch {
      return false;
    }
  }
  function handleArrayResult(result, final, index) {
    if (result.issues.length) {
      final.issues.push(...prefixIssues(index, result.issues));
    }
    final.value[index] = result.value;
  }
  function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
    const isPresent = key in input;
    if (result.issues.length) {
      if (isOptionalIn && isOptionalOut && !isPresent) {
        return;
      }
      final.issues.push(...prefixIssues(key, result.issues));
    }
    if (!isPresent && !isOptionalIn) {
      if (!result.issues.length) {
        final.issues.push({
          code: "invalid_type",
          expected: "nonoptional",
          input: void 0,
          path: [key]
        });
      }
      return;
    }
    if (result.value === void 0) {
      if (isPresent) {
        final.value[key] = void 0;
      }
    } else {
      final.value[key] = result.value;
    }
  }
  function normalizeDef(def) {
    const keys = Object.keys(def.shape);
    for (const k2 of keys) {
      if (!def.shape?.[k2]?._zod?.traits?.has("$ZodType")) {
        throw new Error(`Invalid element at key "${k2}": expected a Zod schema`);
      }
    }
    const okeys = optionalKeys(def.shape);
    return {
      ...def,
      keys,
      keySet: new Set(keys),
      numKeys: keys.length,
      optionalKeys: new Set(okeys)
    };
  }
  function handleCatchall(proms, input, payload, ctx, def, inst) {
    const unrecognized = [];
    const keySet = def.keySet;
    const _catchall = def.catchall._zod;
    const t2 = _catchall.def.type;
    const isOptionalIn = _catchall.optin === "optional";
    const isOptionalOut = _catchall.optout === "optional";
    for (const key in input) {
      if (key === "__proto__")
        continue;
      if (keySet.has(key))
        continue;
      if (t2 === "never") {
        unrecognized.push(key);
        continue;
      }
      const r2 = _catchall.run({ value: input[key], issues: [] }, ctx);
      if (r2 instanceof Promise) {
        proms.push(r2.then((r3) => handlePropertyResult(r3, payload, key, input, isOptionalIn, isOptionalOut)));
      } else {
        handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut);
      }
    }
    if (unrecognized.length) {
      payload.issues.push({
        code: "unrecognized_keys",
        keys: unrecognized,
        input,
        inst
      });
    }
    if (!proms.length)
      return payload;
    return Promise.all(proms).then(() => {
      return payload;
    });
  }
  function handleUnionResults(results, final, inst, ctx) {
    for (const result of results) {
      if (result.issues.length === 0) {
        final.value = result.value;
        return final;
      }
    }
    const nonaborted = results.filter((r2) => !aborted(r2));
    if (nonaborted.length === 1) {
      final.value = nonaborted[0].value;
      return nonaborted[0];
    }
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
    return final;
  }
  function handleExclusiveUnionResults(results, final, inst, ctx) {
    const successes = results.filter((r2) => r2.issues.length === 0);
    if (successes.length === 1) {
      final.value = successes[0].value;
      return final;
    }
    if (successes.length === 0) {
      final.issues.push({
        code: "invalid_union",
        input: final.value,
        inst,
        errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
      });
    } else {
      final.issues.push({
        code: "invalid_union",
        input: final.value,
        inst,
        errors: [],
        inclusive: false
      });
    }
    return final;
  }
  function mergeValues(a2, b2) {
    if (a2 === b2) {
      return { valid: true, data: a2 };
    }
    if (a2 instanceof Date && b2 instanceof Date && +a2 === +b2) {
      return { valid: true, data: a2 };
    }
    if (isPlainObject(a2) && isPlainObject(b2)) {
      const bKeys = Object.keys(b2);
      const sharedKeys = Object.keys(a2).filter((key) => bKeys.indexOf(key) !== -1);
      const newObj = { ...a2, ...b2 };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a2[key], b2[key]);
        if (!sharedValue.valid) {
          return {
            valid: false,
            mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
          };
        }
        newObj[key] = sharedValue.data;
      }
      return { valid: true, data: newObj };
    }
    if (Array.isArray(a2) && Array.isArray(b2)) {
      if (a2.length !== b2.length) {
        return { valid: false, mergeErrorPath: [] };
      }
      const newArray = [];
      for (let index = 0; index < a2.length; index++) {
        const itemA = a2[index];
        const itemB = b2[index];
        const sharedValue = mergeValues(itemA, itemB);
        if (!sharedValue.valid) {
          return {
            valid: false,
            mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
          };
        }
        newArray.push(sharedValue.data);
      }
      return { valid: true, data: newArray };
    }
    return { valid: false, mergeErrorPath: [] };
  }
  function handleIntersectionResults(result, left, right) {
    const unrecKeys = /* @__PURE__ */ new Map();
    let unrecIssue;
    for (const iss of left.issues) {
      if (iss.code === "unrecognized_keys") {
        unrecIssue ?? (unrecIssue = iss);
        for (const k2 of iss.keys) {
          if (!unrecKeys.has(k2))
            unrecKeys.set(k2, {});
          unrecKeys.get(k2).l = true;
        }
      } else {
        result.issues.push(iss);
      }
    }
    for (const iss of right.issues) {
      if (iss.code === "unrecognized_keys") {
        for (const k2 of iss.keys) {
          if (!unrecKeys.has(k2))
            unrecKeys.set(k2, {});
          unrecKeys.get(k2).r = true;
        }
      } else {
        result.issues.push(iss);
      }
    }
    const bothKeys = [...unrecKeys].filter(([, f2]) => f2.l && f2.r).map(([k2]) => k2);
    if (bothKeys.length && unrecIssue) {
      result.issues.push({ ...unrecIssue, keys: bothKeys });
    }
    if (aborted(result))
      return result;
    const merged = mergeValues(left.value, right.value);
    if (!merged.valid) {
      throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
    }
    result.value = merged.data;
    return result;
  }
  function getTupleOptStart(items, key) {
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i]._zod[key] !== "optional")
        return i + 1;
    }
    return 0;
  }
  function handleTupleResult(result, final, index) {
    if (result.issues.length) {
      final.issues.push(...prefixIssues(index, result.issues));
    }
    final.value[index] = result.value;
  }
  function handleTupleResults(itemResults, final, items, input, optoutStart) {
    for (let i = 0; i < items.length; i++) {
      const r2 = itemResults[i];
      const isPresent = i < input.length;
      if (r2.issues.length) {
        if (!isPresent && i >= optoutStart) {
          final.value.length = i;
          break;
        }
        final.issues.push(...prefixIssues(i, r2.issues));
      }
      final.value[i] = r2.value;
    }
    for (let i = final.value.length - 1; i >= input.length; i--) {
      if (items[i]._zod.optout === "optional" && final.value[i] === void 0) {
        final.value.length = i;
      } else {
        break;
      }
    }
    return final;
  }
  function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
    if (keyResult.issues.length) {
      if (propertyKeyTypes.has(typeof key)) {
        final.issues.push(...prefixIssues(key, keyResult.issues));
      } else {
        final.issues.push({
          code: "invalid_key",
          origin: "map",
          input,
          inst,
          issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        });
      }
    }
    if (valueResult.issues.length) {
      if (propertyKeyTypes.has(typeof key)) {
        final.issues.push(...prefixIssues(key, valueResult.issues));
      } else {
        final.issues.push({
          origin: "map",
          code: "invalid_element",
          input,
          inst,
          key,
          issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        });
      }
    }
    final.value.set(keyResult.value, valueResult.value);
  }
  function handleSetResult(result, final) {
    if (result.issues.length) {
      final.issues.push(...result.issues);
    }
    final.value.add(result.value);
  }
  function handleOptionalResult(result, input) {
    if (input === void 0 && (result.issues.length || result.fallback)) {
      return { issues: [], value: void 0 };
    }
    return result;
  }
  function handleDefaultResult(payload, def) {
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return payload;
  }
  function handleNonOptionalResult(payload, inst) {
    if (!payload.issues.length && payload.value === void 0) {
      payload.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: payload.value,
        inst
      });
    }
    return payload;
  }
  function handlePipeResult(left, next, ctx) {
    if (left.issues.length) {
      left.aborted = true;
      return left;
    }
    return next._zod.run({ value: left.value, issues: left.issues, fallback: left.fallback }, ctx);
  }
  function handleCodecAResult(result, def, ctx) {
    if (result.issues.length) {
      result.aborted = true;
      return result;
    }
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const transformed = def.transform(result.value, result);
      if (transformed instanceof Promise) {
        return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
      }
      return handleCodecTxResult(result, transformed, def.out, ctx);
    } else {
      const transformed = def.reverseTransform(result.value, result);
      if (transformed instanceof Promise) {
        return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
      }
      return handleCodecTxResult(result, transformed, def.in, ctx);
    }
  }
  function handleCodecTxResult(left, value, nextSchema, ctx) {
    if (left.issues.length) {
      left.aborted = true;
      return left;
    }
    return nextSchema._zod.run({ value, issues: left.issues }, ctx);
  }
  function handleReadonlyResult(payload) {
    payload.value = Object.freeze(payload.value);
    return payload;
  }
  function handleRefineResult(result, payload, input, inst) {
    if (!result) {
      const _iss = {
        code: "custom",
        input,
        inst,
        // incorporates params.error into issue reporting
        path: [...inst._zod.def.path ?? []],
        // incorporates params.error into issue reporting
        continue: !inst._zod.def.abort
        // params: inst._zod.def.params,
      };
      if (inst._zod.def.params)
        _iss.params = inst._zod.def.params;
      payload.issues.push(issue(_iss));
    }
  }
  var $ZodType, $ZodString, $ZodStringFormat, $ZodGUID, $ZodUUID, $ZodEmail, $ZodURL, $ZodEmoji, $ZodNanoID, $ZodCUID, $ZodCUID2, $ZodULID, $ZodXID, $ZodKSUID, $ZodISODateTime, $ZodISODate, $ZodISOTime, $ZodISODuration, $ZodIPv4, $ZodIPv6, $ZodMAC, $ZodCIDRv4, $ZodCIDRv6, $ZodBase64, $ZodBase64URL, $ZodE164, $ZodJWT, $ZodCustomStringFormat, $ZodNumber, $ZodNumberFormat, $ZodBoolean, $ZodBigInt, $ZodBigIntFormat, $ZodSymbol, $ZodUndefined, $ZodNull, $ZodAny, $ZodUnknown, $ZodNever, $ZodVoid, $ZodDate, $ZodArray, $ZodObject, $ZodObjectJIT, $ZodUnion, $ZodXor, $ZodDiscriminatedUnion, $ZodIntersection, $ZodTuple, $ZodRecord, $ZodMap, $ZodSet, $ZodEnum, $ZodLiteral, $ZodFile, $ZodTransform, $ZodOptional, $ZodExactOptional, $ZodNullable, $ZodDefault, $ZodPrefault, $ZodNonOptional, $ZodSuccess, $ZodCatch, $ZodNaN, $ZodPipe, $ZodCodec, $ZodPreprocess, $ZodReadonly, $ZodTemplateLiteral, $ZodFunction, $ZodPromise, $ZodLazy, $ZodCustom;
  var init_schemas = __esm({
    "node_modules/zod/v4/core/schemas.js"() {
      init_checks();
      init_core();
      init_doc();
      init_parse();
      init_regexes();
      init_util();
      init_versions();
      init_util();
      $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
        var _a3;
        inst ?? (inst = {});
        inst._zod.def = def;
        inst._zod.bag = inst._zod.bag || {};
        inst._zod.version = version;
        const checks = [...inst._zod.def.checks ?? []];
        if (inst._zod.traits.has("$ZodCheck")) {
          checks.unshift(inst);
        }
        for (const ch of checks) {
          for (const fn of ch._zod.onattach) {
            fn(inst);
          }
        }
        if (checks.length === 0) {
          (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
          inst._zod.deferred?.push(() => {
            inst._zod.run = inst._zod.parse;
          });
        } else {
          const runChecks = (payload, checks2, ctx) => {
            let isAborted = aborted(payload);
            let asyncResult;
            for (const ch of checks2) {
              if (ch._zod.def.when) {
                if (explicitlyAborted(payload))
                  continue;
                const shouldRun = ch._zod.def.when(payload);
                if (!shouldRun)
                  continue;
              } else if (isAborted) {
                continue;
              }
              const currLen = payload.issues.length;
              const _2 = ch._zod.check(payload);
              if (_2 instanceof Promise && ctx?.async === false) {
                throw new $ZodAsyncError();
              }
              if (asyncResult || _2 instanceof Promise) {
                asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                  await _2;
                  const nextLen = payload.issues.length;
                  if (nextLen === currLen)
                    return;
                  if (!isAborted)
                    isAborted = aborted(payload, currLen);
                });
              } else {
                const nextLen = payload.issues.length;
                if (nextLen === currLen)
                  continue;
                if (!isAborted)
                  isAborted = aborted(payload, currLen);
              }
            }
            if (asyncResult) {
              return asyncResult.then(() => {
                return payload;
              });
            }
            return payload;
          };
          const handleCanaryResult = (canary, payload, ctx) => {
            if (aborted(canary)) {
              canary.aborted = true;
              return canary;
            }
            const checkResult = runChecks(payload, checks, ctx);
            if (checkResult instanceof Promise) {
              if (ctx.async === false)
                throw new $ZodAsyncError();
              return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
            }
            return inst._zod.parse(checkResult, ctx);
          };
          inst._zod.run = (payload, ctx) => {
            if (ctx.skipChecks) {
              return inst._zod.parse(payload, ctx);
            }
            if (ctx.direction === "backward") {
              const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
              if (canary instanceof Promise) {
                return canary.then((canary2) => {
                  return handleCanaryResult(canary2, payload, ctx);
                });
              }
              return handleCanaryResult(canary, payload, ctx);
            }
            const result = inst._zod.parse(payload, ctx);
            if (result instanceof Promise) {
              if (ctx.async === false)
                throw new $ZodAsyncError();
              return result.then((result2) => runChecks(result2, checks, ctx));
            }
            return runChecks(result, checks, ctx);
          };
        }
        defineLazy(inst, "~standard", () => ({
          validate: (value) => {
            try {
              const r2 = safeParse(inst, value);
              return r2.success ? { value: r2.data } : { issues: r2.error?.issues };
            } catch (_2) {
              return safeParseAsync(inst, value).then((r2) => r2.success ? { value: r2.data } : { issues: r2.error?.issues });
            }
          },
          vendor: "zod",
          version: 1
        }));
      });
      $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
        inst._zod.parse = (payload, _2) => {
          if (def.coerce)
            try {
              payload.value = String(payload.value);
            } catch (_3) {
            }
          if (typeof payload.value === "string")
            return payload;
          payload.issues.push({
            expected: "string",
            code: "invalid_type",
            input: payload.value,
            inst
          });
          return payload;
        };
      });
      $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
        $ZodCheckStringFormat.init(inst, def);
        $ZodString.init(inst, def);
      });
      $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
        def.pattern ?? (def.pattern = guid);
        $ZodStringFormat.init(inst, def);
      });
      $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
        if (def.version) {
          const versionMap = {
            v1: 1,
            v2: 2,
            v3: 3,
            v4: 4,
            v5: 5,
            v6: 6,
            v7: 7,
            v8: 8
          };
          const v2 = versionMap[def.version];
          if (v2 === void 0)
            throw new Error(`Invalid UUID version: "${def.version}"`);
          def.pattern ?? (def.pattern = uuid(v2));
        } else
          def.pattern ?? (def.pattern = uuid());
        $ZodStringFormat.init(inst, def);
      });
      $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
        def.pattern ?? (def.pattern = email);
        $ZodStringFormat.init(inst, def);
      });
      $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
        $ZodStringFormat.init(inst, def);
        inst._zod.check = (payload) => {
          try {
            const trimmed = payload.value.trim();
            if (!def.normalize && def.protocol?.source === httpProtocol.source) {
              if (!/^https?:\/\//i.test(trimmed)) {
                payload.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid URL format",
                  input: payload.value,
                  inst,
                  continue: !def.abort
                });
                return;
              }
            }
            const url2 = new URL(trimmed);
            if (def.hostname) {
              def.hostname.lastIndex = 0;
              if (!def.hostname.test(url2.hostname)) {
                payload.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid hostname",
                  pattern: def.hostname.source,
                  input: payload.value,
                  inst,
                  continue: !def.abort
                });
              }
            }
            if (def.protocol) {
              def.protocol.lastIndex = 0;
              if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
                payload.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid protocol",
                  pattern: def.protocol.source,
                  input: payload.value,
                  inst,
                  continue: !def.abort
                });
              }
            }
            if (def.normalize) {
              payload.value = url2.href;
            } else {
              payload.value = trimmed;
            }
            return;
          } catch (_2) {
            payload.issues.push({
              code: "invalid_format",
              format: "url",
              input: payload.value,
              inst,
              continue: !def.abort
            });
          }
        };
      });
      $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
        def.pattern ?? (def.pattern = emoji());
        $ZodStringFormat.init(inst, def);
      });
      $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
        def.pattern ?? (def.pattern = nanoid);
        $ZodStringFormat.init(inst, def);
      });
      $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
        def.pattern ?? (def.pattern = cuid);
        $ZodStringFormat.init(inst, def);
      });
      $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
        def.pattern ?? (def.pattern = cuid2);
        $ZodStringFormat.init(inst, def);
      });
      $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
        def.pattern ?? (def.pattern = ulid);
        $ZodStringFormat.init(inst, def);
      });
      $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
        def.pattern ?? (def.pattern = xid);
        $ZodStringFormat.init(inst, def);
      });
      $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
        def.pattern ?? (def.pattern = ksuid);
        $ZodStringFormat.init(inst, def);
      });
      $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
        def.pattern ?? (def.pattern = datetime(def));
        $ZodStringFormat.init(inst, def);
      });
      $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
        def.pattern ?? (def.pattern = date);
        $ZodStringFormat.init(inst, def);
      });
      $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
        def.pattern ?? (def.pattern = time(def));
        $ZodStringFormat.init(inst, def);
      });
      $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
        def.pattern ?? (def.pattern = duration);
        $ZodStringFormat.init(inst, def);
      });
      $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
        def.pattern ?? (def.pattern = ipv4);
        $ZodStringFormat.init(inst, def);
        inst._zod.bag.format = `ipv4`;
      });
      $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
        def.pattern ?? (def.pattern = ipv6);
        $ZodStringFormat.init(inst, def);
        inst._zod.bag.format = `ipv6`;
        inst._zod.check = (payload) => {
          try {
            new URL(`http://[${payload.value}]`);
          } catch {
            payload.issues.push({
              code: "invalid_format",
              format: "ipv6",
              input: payload.value,
              inst,
              continue: !def.abort
            });
          }
        };
      });
      $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
        def.pattern ?? (def.pattern = mac(def.delimiter));
        $ZodStringFormat.init(inst, def);
        inst._zod.bag.format = `mac`;
      });
      $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
        def.pattern ?? (def.pattern = cidrv4);
        $ZodStringFormat.init(inst, def);
      });
      $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
        def.pattern ?? (def.pattern = cidrv6);
        $ZodStringFormat.init(inst, def);
        inst._zod.check = (payload) => {
          const parts = payload.value.split("/");
          try {
            if (parts.length !== 2)
              throw new Error();
            const [address, prefix] = parts;
            if (!prefix)
              throw new Error();
            const prefixNum = Number(prefix);
            if (`${prefixNum}` !== prefix)
              throw new Error();
            if (prefixNum < 0 || prefixNum > 128)
              throw new Error();
            new URL(`http://[${address}]`);
          } catch {
            payload.issues.push({
              code: "invalid_format",
              format: "cidrv6",
              input: payload.value,
              inst,
              continue: !def.abort
            });
          }
        };
      });
      $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
        def.pattern ?? (def.pattern = base64);
        $ZodStringFormat.init(inst, def);
        inst._zod.bag.contentEncoding = "base64";
        inst._zod.check = (payload) => {
          if (isValidBase64(payload.value))
            return;
          payload.issues.push({
            code: "invalid_format",
            format: "base64",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
        def.pattern ?? (def.pattern = base64url);
        $ZodStringFormat.init(inst, def);
        inst._zod.bag.contentEncoding = "base64url";
        inst._zod.check = (payload) => {
          if (isValidBase64URL(payload.value))
            return;
          payload.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
        def.pattern ?? (def.pattern = e164);
        $ZodStringFormat.init(inst, def);
      });
      $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
        $ZodStringFormat.init(inst, def);
        inst._zod.check = (payload) => {
          if (isValidJWT(payload.value, def.alg))
            return;
          payload.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
        $ZodStringFormat.init(inst, def);
        inst._zod.check = (payload) => {
          if (def.fn(payload.value))
            return;
          payload.issues.push({
            code: "invalid_format",
            format: def.format,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        };
      });
      $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.pattern = inst._zod.bag.pattern ?? number;
        inst._zod.parse = (payload, _ctx) => {
          if (def.coerce)
            try {
              payload.value = Number(payload.value);
            } catch (_2) {
            }
          const input = payload.value;
          if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
            return payload;
          }
          const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
          payload.issues.push({
            expected: "number",
            code: "invalid_type",
            input,
            inst,
            ...received ? { received } : {}
          });
          return payload;
        };
      });
      $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
        $ZodCheckNumberFormat.init(inst, def);
        $ZodNumber.init(inst, def);
      });
      $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.pattern = boolean;
        inst._zod.parse = (payload, _ctx) => {
          if (def.coerce)
            try {
              payload.value = Boolean(payload.value);
            } catch (_2) {
            }
          const input = payload.value;
          if (typeof input === "boolean")
            return payload;
          payload.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        };
      });
      $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.pattern = bigint;
        inst._zod.parse = (payload, _ctx) => {
          if (def.coerce)
            try {
              payload.value = BigInt(payload.value);
            } catch (_2) {
            }
          if (typeof payload.value === "bigint")
            return payload;
          payload.issues.push({
            expected: "bigint",
            code: "invalid_type",
            input: payload.value,
            inst
          });
          return payload;
        };
      });
      $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
        $ZodCheckBigIntFormat.init(inst, def);
        $ZodBigInt.init(inst, def);
      });
      $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, _ctx) => {
          const input = payload.value;
          if (typeof input === "symbol")
            return payload;
          payload.issues.push({
            expected: "symbol",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        };
      });
      $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.pattern = _undefined;
        inst._zod.values = /* @__PURE__ */ new Set([void 0]);
        inst._zod.parse = (payload, _ctx) => {
          const input = payload.value;
          if (typeof input === "undefined")
            return payload;
          payload.issues.push({
            expected: "undefined",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        };
      });
      $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.pattern = _null;
        inst._zod.values = /* @__PURE__ */ new Set([null]);
        inst._zod.parse = (payload, _ctx) => {
          const input = payload.value;
          if (input === null)
            return payload;
          payload.issues.push({
            expected: "null",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        };
      });
      $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload) => payload;
      });
      $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload) => payload;
      });
      $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, _ctx) => {
          payload.issues.push({
            expected: "never",
            code: "invalid_type",
            input: payload.value,
            inst
          });
          return payload;
        };
      });
      $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, _ctx) => {
          const input = payload.value;
          if (typeof input === "undefined")
            return payload;
          payload.issues.push({
            expected: "void",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        };
      });
      $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, _ctx) => {
          if (def.coerce) {
            try {
              payload.value = new Date(payload.value);
            } catch (_err) {
            }
          }
          const input = payload.value;
          const isDate = input instanceof Date;
          const isValidDate = isDate && !Number.isNaN(input.getTime());
          if (isValidDate)
            return payload;
          payload.issues.push({
            expected: "date",
            code: "invalid_type",
            input,
            ...isDate ? { received: "Invalid Date" } : {},
            inst
          });
          return payload;
        };
      });
      $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          if (!Array.isArray(input)) {
            payload.issues.push({
              expected: "array",
              code: "invalid_type",
              input,
              inst
            });
            return payload;
          }
          payload.value = Array(input.length);
          const proms = [];
          for (let i = 0; i < input.length; i++) {
            const item = input[i];
            const result = def.element._zod.run({
              value: item,
              issues: []
            }, ctx);
            if (result instanceof Promise) {
              proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
            } else {
              handleArrayResult(result, payload, i);
            }
          }
          if (proms.length) {
            return Promise.all(proms).then(() => payload);
          }
          return payload;
        };
      });
      $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
        $ZodType.init(inst, def);
        const desc = Object.getOwnPropertyDescriptor(def, "shape");
        if (!desc?.get) {
          const sh = def.shape;
          Object.defineProperty(def, "shape", {
            get: () => {
              const newSh = { ...sh };
              Object.defineProperty(def, "shape", {
                value: newSh
              });
              return newSh;
            }
          });
        }
        const _normalized = cached(() => normalizeDef(def));
        defineLazy(inst._zod, "propValues", () => {
          const shape = def.shape;
          const propValues = {};
          for (const key in shape) {
            const field = shape[key]._zod;
            if (field.values) {
              propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
              for (const v2 of field.values)
                propValues[key].add(v2);
            }
          }
          return propValues;
        });
        const isObject2 = isObject;
        const catchall = def.catchall;
        let value;
        inst._zod.parse = (payload, ctx) => {
          value ?? (value = _normalized.value);
          const input = payload.value;
          if (!isObject2(input)) {
            payload.issues.push({
              expected: "object",
              code: "invalid_type",
              input,
              inst
            });
            return payload;
          }
          payload.value = {};
          const proms = [];
          const shape = value.shape;
          for (const key of value.keys) {
            const el = shape[key];
            const isOptionalIn = el._zod.optin === "optional";
            const isOptionalOut = el._zod.optout === "optional";
            const r2 = el._zod.run({ value: input[key], issues: [] }, ctx);
            if (r2 instanceof Promise) {
              proms.push(r2.then((r3) => handlePropertyResult(r3, payload, key, input, isOptionalIn, isOptionalOut)));
            } else {
              handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut);
            }
          }
          if (!catchall) {
            return proms.length ? Promise.all(proms).then(() => payload) : payload;
          }
          return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
        };
      });
      $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
        $ZodObject.init(inst, def);
        const superParse = inst._zod.parse;
        const _normalized = cached(() => normalizeDef(def));
        const generateFastpass = (shape) => {
          const doc = new Doc(["shape", "payload", "ctx"]);
          const normalized = _normalized.value;
          const parseStr = (key) => {
            const k2 = esc(key);
            return `shape[${k2}]._zod.run({ value: input[${k2}], issues: [] }, ctx)`;
          };
          doc.write(`const input = payload.value;`);
          const ids = /* @__PURE__ */ Object.create(null);
          let counter = 0;
          for (const key of normalized.keys) {
            ids[key] = `key_${counter++}`;
          }
          doc.write(`const newResult = {};`);
          for (const key of normalized.keys) {
            const id = ids[key];
            const k2 = esc(key);
            const schema = shape[key];
            const isOptionalIn = schema?._zod?.optin === "optional";
            const isOptionalOut = schema?._zod?.optout === "optional";
            doc.write(`const ${id} = ${parseStr(key)};`);
            if (isOptionalIn && isOptionalOut) {
              doc.write(`
        if (${id}.issues.length) {
          if (${k2} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k2}, ...iss.path] : [${k2}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k2} in input) {
            newResult[${k2}] = undefined;
          }
        } else {
          newResult[${k2}] = ${id}.value;
        }
        
      `);
            } else if (!isOptionalIn) {
              doc.write(`
        const ${id}_present = ${k2} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k2}, ...iss.path] : [${k2}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k2}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k2}] = undefined;
          } else {
            newResult[${k2}] = ${id}.value;
          }
        }

      `);
            } else {
              doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k2}, ...iss.path] : [${k2}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k2} in input) {
            newResult[${k2}] = undefined;
          }
        } else {
          newResult[${k2}] = ${id}.value;
        }
        
      `);
            }
          }
          doc.write(`payload.value = newResult;`);
          doc.write(`return payload;`);
          const fn = doc.compile();
          return (payload, ctx) => fn(shape, payload, ctx);
        };
        let fastpass;
        const isObject2 = isObject;
        const jit = !globalConfig.jitless;
        const allowsEval2 = allowsEval;
        const fastEnabled = jit && allowsEval2.value;
        const catchall = def.catchall;
        let value;
        inst._zod.parse = (payload, ctx) => {
          value ?? (value = _normalized.value);
          const input = payload.value;
          if (!isObject2(input)) {
            payload.issues.push({
              expected: "object",
              code: "invalid_type",
              input,
              inst
            });
            return payload;
          }
          if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
            if (!fastpass)
              fastpass = generateFastpass(def.shape);
            payload = fastpass(payload, ctx);
            if (!catchall)
              return payload;
            return handleCatchall([], input, payload, ctx, value, inst);
          }
          return superParse(payload, ctx);
        };
      });
      $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
        $ZodType.init(inst, def);
        defineLazy(inst._zod, "optin", () => def.options.some((o2) => o2._zod.optin === "optional") ? "optional" : void 0);
        defineLazy(inst._zod, "optout", () => def.options.some((o2) => o2._zod.optout === "optional") ? "optional" : void 0);
        defineLazy(inst._zod, "values", () => {
          if (def.options.every((o2) => o2._zod.values)) {
            return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
          }
          return void 0;
        });
        defineLazy(inst._zod, "pattern", () => {
          if (def.options.every((o2) => o2._zod.pattern)) {
            const patterns = def.options.map((o2) => o2._zod.pattern);
            return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
          }
          return void 0;
        });
        const first = def.options.length === 1 ? def.options[0]._zod.run : null;
        inst._zod.parse = (payload, ctx) => {
          if (first) {
            return first(payload, ctx);
          }
          let async = false;
          const results = [];
          for (const option of def.options) {
            const result = option._zod.run({
              value: payload.value,
              issues: []
            }, ctx);
            if (result instanceof Promise) {
              results.push(result);
              async = true;
            } else {
              if (result.issues.length === 0)
                return result;
              results.push(result);
            }
          }
          if (!async)
            return handleUnionResults(results, payload, inst, ctx);
          return Promise.all(results).then((results2) => {
            return handleUnionResults(results2, payload, inst, ctx);
          });
        };
      });
      $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
        $ZodUnion.init(inst, def);
        def.inclusive = false;
        const first = def.options.length === 1 ? def.options[0]._zod.run : null;
        inst._zod.parse = (payload, ctx) => {
          if (first) {
            return first(payload, ctx);
          }
          let async = false;
          const results = [];
          for (const option of def.options) {
            const result = option._zod.run({
              value: payload.value,
              issues: []
            }, ctx);
            if (result instanceof Promise) {
              results.push(result);
              async = true;
            } else {
              results.push(result);
            }
          }
          if (!async)
            return handleExclusiveUnionResults(results, payload, inst, ctx);
          return Promise.all(results).then((results2) => {
            return handleExclusiveUnionResults(results2, payload, inst, ctx);
          });
        };
      });
      $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
        def.inclusive = false;
        $ZodUnion.init(inst, def);
        const _super = inst._zod.parse;
        defineLazy(inst._zod, "propValues", () => {
          const propValues = {};
          for (const option of def.options) {
            const pv = option._zod.propValues;
            if (!pv || Object.keys(pv).length === 0)
              throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
            for (const [k2, v2] of Object.entries(pv)) {
              if (!propValues[k2])
                propValues[k2] = /* @__PURE__ */ new Set();
              for (const val of v2) {
                propValues[k2].add(val);
              }
            }
          }
          return propValues;
        });
        const disc = cached(() => {
          const opts = def.options;
          const map2 = /* @__PURE__ */ new Map();
          for (const o2 of opts) {
            const values = o2._zod.propValues?.[def.discriminator];
            if (!values || values.size === 0)
              throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o2)}"`);
            for (const v2 of values) {
              if (map2.has(v2)) {
                throw new Error(`Duplicate discriminator value "${String(v2)}"`);
              }
              map2.set(v2, o2);
            }
          }
          return map2;
        });
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          if (!isObject(input)) {
            payload.issues.push({
              code: "invalid_type",
              expected: "object",
              input,
              inst
            });
            return payload;
          }
          const opt = disc.value.get(input?.[def.discriminator]);
          if (opt) {
            return opt._zod.run(payload, ctx);
          }
          if (def.unionFallback || ctx.direction === "backward") {
            return _super(payload, ctx);
          }
          payload.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: def.discriminator,
            options: Array.from(disc.value.keys()),
            input,
            path: [def.discriminator],
            inst
          });
          return payload;
        };
      });
      $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          const left = def.left._zod.run({ value: input, issues: [] }, ctx);
          const right = def.right._zod.run({ value: input, issues: [] }, ctx);
          const async = left instanceof Promise || right instanceof Promise;
          if (async) {
            return Promise.all([left, right]).then(([left2, right2]) => {
              return handleIntersectionResults(payload, left2, right2);
            });
          }
          return handleIntersectionResults(payload, left, right);
        };
      });
      $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
        $ZodType.init(inst, def);
        const items = def.items;
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          if (!Array.isArray(input)) {
            payload.issues.push({
              input,
              inst,
              expected: "tuple",
              code: "invalid_type"
            });
            return payload;
          }
          payload.value = [];
          const proms = [];
          const optinStart = getTupleOptStart(items, "optin");
          const optoutStart = getTupleOptStart(items, "optout");
          if (!def.rest) {
            if (input.length < optinStart) {
              payload.issues.push({
                code: "too_small",
                minimum: optinStart,
                inclusive: true,
                input,
                inst,
                origin: "array"
              });
              return payload;
            }
            if (input.length > items.length) {
              payload.issues.push({
                code: "too_big",
                maximum: items.length,
                inclusive: true,
                input,
                inst,
                origin: "array"
              });
            }
          }
          const itemResults = new Array(items.length);
          for (let i = 0; i < items.length; i++) {
            const r2 = items[i]._zod.run({ value: input[i], issues: [] }, ctx);
            if (r2 instanceof Promise) {
              proms.push(r2.then((rr) => {
                itemResults[i] = rr;
              }));
            } else {
              itemResults[i] = r2;
            }
          }
          if (def.rest) {
            let i = items.length - 1;
            const rest = input.slice(items.length);
            for (const el of rest) {
              i++;
              const result = def.rest._zod.run({ value: el, issues: [] }, ctx);
              if (result instanceof Promise) {
                proms.push(result.then((r2) => handleTupleResult(r2, payload, i)));
              } else {
                handleTupleResult(result, payload, i);
              }
            }
          }
          if (proms.length) {
            return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
          }
          return handleTupleResults(itemResults, payload, items, input, optoutStart);
        };
      });
      $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          if (!isPlainObject(input)) {
            payload.issues.push({
              expected: "record",
              code: "invalid_type",
              input,
              inst
            });
            return payload;
          }
          const proms = [];
          const values = def.keyType._zod.values;
          if (values) {
            payload.value = {};
            const recordKeys = /* @__PURE__ */ new Set();
            for (const key of values) {
              if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
                recordKeys.add(typeof key === "number" ? key.toString() : key);
                const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
                if (keyResult instanceof Promise) {
                  throw new Error("Async schemas not supported in object keys currently");
                }
                if (keyResult.issues.length) {
                  payload.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
                    input: key,
                    path: [key],
                    inst
                  });
                  continue;
                }
                const outKey = keyResult.value;
                const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                if (result instanceof Promise) {
                  proms.push(result.then((result2) => {
                    if (result2.issues.length) {
                      payload.issues.push(...prefixIssues(key, result2.issues));
                    }
                    payload.value[outKey] = result2.value;
                  }));
                } else {
                  if (result.issues.length) {
                    payload.issues.push(...prefixIssues(key, result.issues));
                  }
                  payload.value[outKey] = result.value;
                }
              }
            }
            let unrecognized;
            for (const key in input) {
              if (!recordKeys.has(key)) {
                unrecognized = unrecognized ?? [];
                unrecognized.push(key);
              }
            }
            if (unrecognized && unrecognized.length > 0) {
              payload.issues.push({
                code: "unrecognized_keys",
                input,
                inst,
                keys: unrecognized
              });
            }
          } else {
            payload.value = {};
            for (const key of Reflect.ownKeys(input)) {
              if (key === "__proto__")
                continue;
              if (!Object.prototype.propertyIsEnumerable.call(input, key))
                continue;
              let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
              if (keyResult instanceof Promise) {
                throw new Error("Async schemas not supported in object keys currently");
              }
              const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
              if (checkNumericKey) {
                const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
                if (retryResult instanceof Promise) {
                  throw new Error("Async schemas not supported in object keys currently");
                }
                if (retryResult.issues.length === 0) {
                  keyResult = retryResult;
                }
              }
              if (keyResult.issues.length) {
                if (def.mode === "loose") {
                  payload.value[key] = input[key];
                } else {
                  payload.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
                    input: key,
                    path: [key],
                    inst
                  });
                }
                continue;
              }
              const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
              if (result instanceof Promise) {
                proms.push(result.then((result2) => {
                  if (result2.issues.length) {
                    payload.issues.push(...prefixIssues(key, result2.issues));
                  }
                  payload.value[keyResult.value] = result2.value;
                }));
              } else {
                if (result.issues.length) {
                  payload.issues.push(...prefixIssues(key, result.issues));
                }
                payload.value[keyResult.value] = result.value;
              }
            }
          }
          if (proms.length) {
            return Promise.all(proms).then(() => payload);
          }
          return payload;
        };
      });
      $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          if (!(input instanceof Map)) {
            payload.issues.push({
              expected: "map",
              code: "invalid_type",
              input,
              inst
            });
            return payload;
          }
          const proms = [];
          payload.value = /* @__PURE__ */ new Map();
          for (const [key, value] of input) {
            const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
            const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
            if (keyResult instanceof Promise || valueResult instanceof Promise) {
              proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
                handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
              }));
            } else {
              handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
            }
          }
          if (proms.length)
            return Promise.all(proms).then(() => payload);
          return payload;
        };
      });
      $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, ctx) => {
          const input = payload.value;
          if (!(input instanceof Set)) {
            payload.issues.push({
              input,
              inst,
              expected: "set",
              code: "invalid_type"
            });
            return payload;
          }
          const proms = [];
          payload.value = /* @__PURE__ */ new Set();
          for (const item of input) {
            const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
            if (result instanceof Promise) {
              proms.push(result.then((result2) => handleSetResult(result2, payload)));
            } else
              handleSetResult(result, payload);
          }
          if (proms.length)
            return Promise.all(proms).then(() => payload);
          return payload;
        };
      });
      $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
        $ZodType.init(inst, def);
        const values = getEnumValues(def.entries);
        const valuesSet = new Set(values);
        inst._zod.values = valuesSet;
        inst._zod.pattern = new RegExp(`^(${values.filter((k2) => propertyKeyTypes.has(typeof k2)).map((o2) => typeof o2 === "string" ? escapeRegex(o2) : o2.toString()).join("|")})$`);
        inst._zod.parse = (payload, _ctx) => {
          const input = payload.value;
          if (valuesSet.has(input)) {
            return payload;
          }
          payload.issues.push({
            code: "invalid_value",
            values,
            input,
            inst
          });
          return payload;
        };
      });
      $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
        $ZodType.init(inst, def);
        if (def.values.length === 0) {
          throw new Error("Cannot create literal schema with no valid values");
        }
        const values = new Set(def.values);
        inst._zod.values = values;
        inst._zod.pattern = new RegExp(`^(${def.values.map((o2) => typeof o2 === "string" ? escapeRegex(o2) : o2 ? escapeRegex(o2.toString()) : String(o2)).join("|")})$`);
        inst._zod.parse = (payload, _ctx) => {
          const input = payload.value;
          if (values.has(input)) {
            return payload;
          }
          payload.issues.push({
            code: "invalid_value",
            values: def.values,
            input,
            inst
          });
          return payload;
        };
      });
      $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, _ctx) => {
          const input = payload.value;
          if (input instanceof File)
            return payload;
          payload.issues.push({
            expected: "file",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        };
      });
      $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.optin = "optional";
        inst._zod.parse = (payload, ctx) => {
          if (ctx.direction === "backward") {
            throw new $ZodEncodeError(inst.constructor.name);
          }
          const _out = def.transform(payload.value, payload);
          if (ctx.async) {
            const output = _out instanceof Promise ? _out : Promise.resolve(_out);
            return output.then((output2) => {
              payload.value = output2;
              payload.fallback = true;
              return payload;
            });
          }
          if (_out instanceof Promise) {
            throw new $ZodAsyncError();
          }
          payload.value = _out;
          payload.fallback = true;
          return payload;
        };
      });
      $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.optin = "optional";
        inst._zod.optout = "optional";
        defineLazy(inst._zod, "values", () => {
          return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
        });
        defineLazy(inst._zod, "pattern", () => {
          const pattern = def.innerType._zod.pattern;
          return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
        });
        inst._zod.parse = (payload, ctx) => {
          if (def.innerType._zod.optin === "optional") {
            const input = payload.value;
            const result = def.innerType._zod.run(payload, ctx);
            if (result instanceof Promise)
              return result.then((r2) => handleOptionalResult(r2, input));
            return handleOptionalResult(result, input);
          }
          if (payload.value === void 0) {
            return payload;
          }
          return def.innerType._zod.run(payload, ctx);
        };
      });
      $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
        $ZodOptional.init(inst, def);
        defineLazy(inst._zod, "values", () => def.innerType._zod.values);
        defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
        inst._zod.parse = (payload, ctx) => {
          return def.innerType._zod.run(payload, ctx);
        };
      });
      $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
        $ZodType.init(inst, def);
        defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
        defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
        defineLazy(inst._zod, "pattern", () => {
          const pattern = def.innerType._zod.pattern;
          return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
        });
        defineLazy(inst._zod, "values", () => {
          return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
        });
        inst._zod.parse = (payload, ctx) => {
          if (payload.value === null)
            return payload;
          return def.innerType._zod.run(payload, ctx);
        };
      });
      $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.optin = "optional";
        defineLazy(inst._zod, "values", () => def.innerType._zod.values);
        inst._zod.parse = (payload, ctx) => {
          if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
          }
          if (payload.value === void 0) {
            payload.value = def.defaultValue;
            return payload;
          }
          const result = def.innerType._zod.run(payload, ctx);
          if (result instanceof Promise) {
            return result.then((result2) => handleDefaultResult(result2, def));
          }
          return handleDefaultResult(result, def);
        };
      });
      $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.optin = "optional";
        defineLazy(inst._zod, "values", () => def.innerType._zod.values);
        inst._zod.parse = (payload, ctx) => {
          if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
          }
          if (payload.value === void 0) {
            payload.value = def.defaultValue;
          }
          return def.innerType._zod.run(payload, ctx);
        };
      });
      $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
        $ZodType.init(inst, def);
        defineLazy(inst._zod, "values", () => {
          const v2 = def.innerType._zod.values;
          return v2 ? new Set([...v2].filter((x2) => x2 !== void 0)) : void 0;
        });
        inst._zod.parse = (payload, ctx) => {
          const result = def.innerType._zod.run(payload, ctx);
          if (result instanceof Promise) {
            return result.then((result2) => handleNonOptionalResult(result2, inst));
          }
          return handleNonOptionalResult(result, inst);
        };
      });
      $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, ctx) => {
          if (ctx.direction === "backward") {
            throw new $ZodEncodeError("ZodSuccess");
          }
          const result = def.innerType._zod.run(payload, ctx);
          if (result instanceof Promise) {
            return result.then((result2) => {
              payload.value = result2.issues.length === 0;
              return payload;
            });
          }
          payload.value = result.issues.length === 0;
          return payload;
        };
      });
      $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.optin = "optional";
        defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
        defineLazy(inst._zod, "values", () => def.innerType._zod.values);
        inst._zod.parse = (payload, ctx) => {
          if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
          }
          const result = def.innerType._zod.run(payload, ctx);
          if (result instanceof Promise) {
            return result.then((result2) => {
              payload.value = result2.value;
              if (result2.issues.length) {
                payload.value = def.catchValue({
                  ...payload,
                  error: {
                    issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
                  },
                  input: payload.value
                });
                payload.issues = [];
                payload.fallback = true;
              }
              return payload;
            });
          }
          payload.value = result.value;
          if (result.issues.length) {
            payload.value = def.catchValue({
              ...payload,
              error: {
                issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
              },
              input: payload.value
            });
            payload.issues = [];
            payload.fallback = true;
          }
          return payload;
        };
      });
      $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, _ctx) => {
          if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
            payload.issues.push({
              input: payload.value,
              inst,
              expected: "nan",
              code: "invalid_type"
            });
            return payload;
          }
          return payload;
        };
      });
      $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
        $ZodType.init(inst, def);
        defineLazy(inst._zod, "values", () => def.in._zod.values);
        defineLazy(inst._zod, "optin", () => def.in._zod.optin);
        defineLazy(inst._zod, "optout", () => def.out._zod.optout);
        defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
        inst._zod.parse = (payload, ctx) => {
          if (ctx.direction === "backward") {
            const right = def.out._zod.run(payload, ctx);
            if (right instanceof Promise) {
              return right.then((right2) => handlePipeResult(right2, def.in, ctx));
            }
            return handlePipeResult(right, def.in, ctx);
          }
          const left = def.in._zod.run(payload, ctx);
          if (left instanceof Promise) {
            return left.then((left2) => handlePipeResult(left2, def.out, ctx));
          }
          return handlePipeResult(left, def.out, ctx);
        };
      });
      $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
        $ZodType.init(inst, def);
        defineLazy(inst._zod, "values", () => def.in._zod.values);
        defineLazy(inst._zod, "optin", () => def.in._zod.optin);
        defineLazy(inst._zod, "optout", () => def.out._zod.optout);
        defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
        inst._zod.parse = (payload, ctx) => {
          const direction = ctx.direction || "forward";
          if (direction === "forward") {
            const left = def.in._zod.run(payload, ctx);
            if (left instanceof Promise) {
              return left.then((left2) => handleCodecAResult(left2, def, ctx));
            }
            return handleCodecAResult(left, def, ctx);
          } else {
            const right = def.out._zod.run(payload, ctx);
            if (right instanceof Promise) {
              return right.then((right2) => handleCodecAResult(right2, def, ctx));
            }
            return handleCodecAResult(right, def, ctx);
          }
        };
      });
      $ZodPreprocess = /* @__PURE__ */ $constructor("$ZodPreprocess", (inst, def) => {
        $ZodPipe.init(inst, def);
      });
      $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
        $ZodType.init(inst, def);
        defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
        defineLazy(inst._zod, "values", () => def.innerType._zod.values);
        defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
        defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
        inst._zod.parse = (payload, ctx) => {
          if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
          }
          const result = def.innerType._zod.run(payload, ctx);
          if (result instanceof Promise) {
            return result.then(handleReadonlyResult);
          }
          return handleReadonlyResult(result);
        };
      });
      $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
        $ZodType.init(inst, def);
        const regexParts = [];
        for (const part of def.parts) {
          if (typeof part === "object" && part !== null) {
            if (!part._zod.pattern) {
              throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
            }
            const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
            if (!source)
              throw new Error(`Invalid template literal part: ${part._zod.traits}`);
            const start = source.startsWith("^") ? 1 : 0;
            const end = source.endsWith("$") ? source.length - 1 : source.length;
            regexParts.push(source.slice(start, end));
          } else if (part === null || primitiveTypes.has(typeof part)) {
            regexParts.push(escapeRegex(`${part}`));
          } else {
            throw new Error(`Invalid template literal part: ${part}`);
          }
        }
        inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
        inst._zod.parse = (payload, _ctx) => {
          if (typeof payload.value !== "string") {
            payload.issues.push({
              input: payload.value,
              inst,
              expected: "string",
              code: "invalid_type"
            });
            return payload;
          }
          inst._zod.pattern.lastIndex = 0;
          if (!inst._zod.pattern.test(payload.value)) {
            payload.issues.push({
              input: payload.value,
              inst,
              code: "invalid_format",
              format: def.format ?? "template_literal",
              pattern: inst._zod.pattern.source
            });
            return payload;
          }
          return payload;
        };
      });
      $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
        $ZodType.init(inst, def);
        inst._def = def;
        inst._zod.def = def;
        inst.implement = (func) => {
          if (typeof func !== "function") {
            throw new Error("implement() must be called with a function");
          }
          return function(...args) {
            const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
            const result = Reflect.apply(func, this, parsedArgs);
            if (inst._def.output) {
              return parse(inst._def.output, result);
            }
            return result;
          };
        };
        inst.implementAsync = (func) => {
          if (typeof func !== "function") {
            throw new Error("implementAsync() must be called with a function");
          }
          return async function(...args) {
            const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
            const result = await Reflect.apply(func, this, parsedArgs);
            if (inst._def.output) {
              return await parseAsync(inst._def.output, result);
            }
            return result;
          };
        };
        inst._zod.parse = (payload, _ctx) => {
          if (typeof payload.value !== "function") {
            payload.issues.push({
              code: "invalid_type",
              expected: "function",
              input: payload.value,
              inst
            });
            return payload;
          }
          const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
          if (hasPromiseOutput) {
            payload.value = inst.implementAsync(payload.value);
          } else {
            payload.value = inst.implement(payload.value);
          }
          return payload;
        };
        inst.input = (...args) => {
          const F2 = inst.constructor;
          if (Array.isArray(args[0])) {
            return new F2({
              type: "function",
              input: new $ZodTuple({
                type: "tuple",
                items: args[0],
                rest: args[1]
              }),
              output: inst._def.output
            });
          }
          return new F2({
            type: "function",
            input: args[0],
            output: inst._def.output
          });
        };
        inst.output = (output) => {
          const F2 = inst.constructor;
          return new F2({
            type: "function",
            input: inst._def.input,
            output
          });
        };
        return inst;
      });
      $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, ctx) => {
          return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
        };
      });
      $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
        $ZodType.init(inst, def);
        defineLazy(inst._zod, "innerType", () => {
          const d2 = def;
          if (!d2._cachedInner)
            d2._cachedInner = def.getter();
          return d2._cachedInner;
        });
        defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
        defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
        defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
        defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
        inst._zod.parse = (payload, ctx) => {
          const inner = inst._zod.innerType;
          return inner._zod.run(payload, ctx);
        };
      });
      $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
        $ZodCheck.init(inst, def);
        $ZodType.init(inst, def);
        inst._zod.parse = (payload, _2) => {
          return payload;
        };
        inst._zod.check = (payload) => {
          const input = payload.value;
          const r2 = def.fn(input);
          if (r2 instanceof Promise) {
            return r2.then((r3) => handleRefineResult(r3, payload, input, inst));
          }
          handleRefineResult(r2, payload, input, inst);
          return;
        };
      });
    }
  });

  // node_modules/zod/v4/locales/ar.js
  function ar_default() {
    return {
      localeError: error()
    };
  }
  var error;
  var init_ar = __esm({
    "node_modules/zod/v4/locales/ar.js"() {
      init_util();
      error = () => {
        const Sizable = {
          string: { unit: "حرف", verb: "أن يحوي" },
          file: { unit: "بايت", verb: "أن يحوي" },
          array: { unit: "عنصر", verb: "أن يحوي" },
          set: { unit: "عنصر", verb: "أن يحوي" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "مدخل",
          email: "بريد إلكتروني",
          url: "رابط",
          emoji: "إيموجي",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "تاريخ ووقت بمعيار ISO",
          date: "تاريخ بمعيار ISO",
          time: "وقت بمعيار ISO",
          duration: "مدة بمعيار ISO",
          ipv4: "عنوان IPv4",
          ipv6: "عنوان IPv6",
          cidrv4: "مدى عناوين بصيغة IPv4",
          cidrv6: "مدى عناوين بصيغة IPv6",
          base64: "نَص بترميز base64-encoded",
          base64url: "نَص بترميز base64url-encoded",
          json_string: "نَص على هيئة JSON",
          e164: "رقم هاتف بمعيار E.164",
          jwt: "JWT",
          template_literal: "مدخل"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue2.expected}، ولكن تم إدخال ${received}`;
              }
              return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `مدخلات غير مقبولة: يفترض إدخال ${stringifyPrimitive(issue2.values[0])}`;
              return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return ` أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
              return `أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `نَص غير مقبول: يجب أن يبدأ بـ "${issue2.prefix}"`;
              if (_issue.format === "ends_with")
                return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
              return `${FormatDictionary[_issue.format] ?? issue2.format} غير مقبول`;
            }
            case "not_multiple_of":
              return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue2.divisor}`;
            case "unrecognized_keys":
              return `معرف${issue2.keys.length > 1 ? "ات" : ""} غريب${issue2.keys.length > 1 ? "ة" : ""}: ${joinValues(issue2.keys, "، ")}`;
            case "invalid_key":
              return `معرف غير مقبول في ${issue2.origin}`;
            case "invalid_union":
              return "مدخل غير مقبول";
            case "invalid_element":
              return `مدخل غير مقبول في ${issue2.origin}`;
            default:
              return "مدخل غير مقبول";
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/az.js
  function az_default() {
    return {
      localeError: error2()
    };
  }
  var error2;
  var init_az = __esm({
    "node_modules/zod/v4/locales/az.js"() {
      init_util();
      error2 = () => {
        const Sizable = {
          string: { unit: "simvol", verb: "olmalıdır" },
          file: { unit: "bayt", verb: "olmalıdır" },
          array: { unit: "element", verb: "olmalıdır" },
          set: { unit: "element", verb: "olmalıdır" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "input",
          email: "email address",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO datetime",
          date: "ISO date",
          time: "ISO time",
          duration: "ISO duration",
          ipv4: "IPv4 address",
          ipv6: "IPv6 address",
          cidrv4: "IPv4 range",
          cidrv6: "IPv6 range",
          base64: "base64-encoded string",
          base64url: "base64url-encoded string",
          json_string: "JSON string",
          e164: "E.164 number",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Yanlış dəyər: gözlənilən instanceof ${issue2.expected}, daxil olan ${received}`;
              }
              return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Yanlış dəyər: gözlənilən ${stringifyPrimitive(issue2.values[0])}`;
              return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
              return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
              if (_issue.format === "ends_with")
                return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
              if (_issue.format === "includes")
                return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
              if (_issue.format === "regex")
                return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
              return `Yanlış ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Yanlış ədəd: ${issue2.divisor} ilə bölünə bilən olmalıdır`;
            case "unrecognized_keys":
              return `Tanınmayan açar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `${issue2.origin} daxilində yanlış açar`;
            case "invalid_union":
              return "Yanlış dəyər";
            case "invalid_element":
              return `${issue2.origin} daxilində yanlış dəyər`;
            default:
              return `Yanlış dəyər`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/be.js
  function getBelarusianPlural(count, one, few, many) {
    const absCount = Math.abs(count);
    const lastDigit = absCount % 10;
    const lastTwoDigits = absCount % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return many;
    }
    if (lastDigit === 1) {
      return one;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return few;
    }
    return many;
  }
  function be_default() {
    return {
      localeError: error3()
    };
  }
  var error3;
  var init_be = __esm({
    "node_modules/zod/v4/locales/be.js"() {
      init_util();
      error3 = () => {
        const Sizable = {
          string: {
            unit: {
              one: "сімвал",
              few: "сімвалы",
              many: "сімвалаў"
            },
            verb: "мець"
          },
          array: {
            unit: {
              one: "элемент",
              few: "элементы",
              many: "элементаў"
            },
            verb: "мець"
          },
          set: {
            unit: {
              one: "элемент",
              few: "элементы",
              many: "элементаў"
            },
            verb: "мець"
          },
          file: {
            unit: {
              one: "байт",
              few: "байты",
              many: "байтаў"
            },
            verb: "мець"
          }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "увод",
          email: "email адрас",
          url: "URL",
          emoji: "эмодзі",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO дата і час",
          date: "ISO дата",
          time: "ISO час",
          duration: "ISO працягласць",
          ipv4: "IPv4 адрас",
          ipv6: "IPv6 адрас",
          cidrv4: "IPv4 дыяпазон",
          cidrv6: "IPv6 дыяпазон",
          base64: "радок у фармаце base64",
          base64url: "радок у фармаце base64url",
          json_string: "JSON радок",
          e164: "нумар E.164",
          jwt: "JWT",
          template_literal: "увод"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "лік",
          array: "масіў"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Няправільны ўвод: чакаўся instanceof ${issue2.expected}, атрымана ${received}`;
              }
              return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Няправільны ўвод: чакалася ${stringifyPrimitive(issue2.values[0])}`;
              return `Няправільны варыянт: чакаўся адзін з ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                const maxValue = Number(issue2.maximum);
                const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
              }
              return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна быць ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                const minValue = Number(issue2.minimum);
                const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                return `Занадта малы: чакалася, што ${issue2.origin} павінна ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
              }
              return `Занадта малы: чакалася, што ${issue2.origin} павінна быць ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
              return `Няправільны ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Няправільны лік: павінен быць кратным ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Нераспазнаны ${issue2.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Няправільны ключ у ${issue2.origin}`;
            case "invalid_union":
              return "Няправільны ўвод";
            case "invalid_element":
              return `Няправільнае значэнне ў ${issue2.origin}`;
            default:
              return `Няправільны ўвод`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/bg.js
  function bg_default() {
    return {
      localeError: error4()
    };
  }
  var error4;
  var init_bg = __esm({
    "node_modules/zod/v4/locales/bg.js"() {
      init_util();
      error4 = () => {
        const Sizable = {
          string: { unit: "символа", verb: "да съдържа" },
          file: { unit: "байта", verb: "да съдържа" },
          array: { unit: "елемента", verb: "да съдържа" },
          set: { unit: "елемента", verb: "да съдържа" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "вход",
          email: "имейл адрес",
          url: "URL",
          emoji: "емоджи",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO време",
          date: "ISO дата",
          time: "ISO време",
          duration: "ISO продължителност",
          ipv4: "IPv4 адрес",
          ipv6: "IPv6 адрес",
          cidrv4: "IPv4 диапазон",
          cidrv6: "IPv6 диапазон",
          base64: "base64-кодиран низ",
          base64url: "base64url-кодиран низ",
          json_string: "JSON низ",
          e164: "E.164 номер",
          jwt: "JWT",
          template_literal: "вход"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "число",
          array: "масив"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Невалиден вход: очакван instanceof ${issue2.expected}, получен ${received}`;
              }
              return `Невалиден вход: очакван ${expected}, получен ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Невалиден вход: очакван ${stringifyPrimitive(issue2.values[0])}`;
              return `Невалидна опция: очаквано едно от ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да съдържа ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елемента"}`;
              return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да бъде ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Твърде малко: очаква се ${issue2.origin} да съдържа ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Твърде малко: очаква се ${issue2.origin} да бъде ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Невалиден низ: трябва да включва "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
              let invalid_adj = "Невалиден";
              if (_issue.format === "emoji")
                invalid_adj = "Невалидно";
              if (_issue.format === "datetime")
                invalid_adj = "Невалидно";
              if (_issue.format === "date")
                invalid_adj = "Невалидна";
              if (_issue.format === "time")
                invalid_adj = "Невалидно";
              if (_issue.format === "duration")
                invalid_adj = "Невалидна";
              return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Невалидно число: трябва да бъде кратно на ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Неразпознат${issue2.keys.length > 1 ? "и" : ""} ключ${issue2.keys.length > 1 ? "ове" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Невалиден ключ в ${issue2.origin}`;
            case "invalid_union":
              return "Невалиден вход";
            case "invalid_element":
              return `Невалидна стойност в ${issue2.origin}`;
            default:
              return `Невалиден вход`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ca.js
  function ca_default() {
    return {
      localeError: error5()
    };
  }
  var error5;
  var init_ca = __esm({
    "node_modules/zod/v4/locales/ca.js"() {
      init_util();
      error5 = () => {
        const Sizable = {
          string: { unit: "caràcters", verb: "contenir" },
          file: { unit: "bytes", verb: "contenir" },
          array: { unit: "elements", verb: "contenir" },
          set: { unit: "elements", verb: "contenir" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "entrada",
          email: "adreça electrònica",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "data i hora ISO",
          date: "data ISO",
          time: "hora ISO",
          duration: "durada ISO",
          ipv4: "adreça IPv4",
          ipv6: "adreça IPv6",
          cidrv4: "rang IPv4",
          cidrv6: "rang IPv6",
          base64: "cadena codificada en base64",
          base64url: "cadena codificada en base64url",
          json_string: "cadena JSON",
          e164: "número E.164",
          jwt: "JWT",
          template_literal: "entrada"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Tipus invàlid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
              }
              return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Valor invàlid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
              return `Opció invàlida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "com a màxim" : "menys de";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingués ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
              return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? "com a mínim" : "més de";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Massa petit: s'esperava que ${issue2.origin} contingués ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Format invàlid: ha d'incloure "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
              return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Número invàlid: ha de ser múltiple de ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Clau invàlida a ${issue2.origin}`;
            case "invalid_union":
              return "Entrada invàlida";
            // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
            case "invalid_element":
              return `Element invàlid a ${issue2.origin}`;
            default:
              return `Entrada invàlida`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/cs.js
  function cs_default() {
    return {
      localeError: error6()
    };
  }
  var error6;
  var init_cs = __esm({
    "node_modules/zod/v4/locales/cs.js"() {
      init_util();
      error6 = () => {
        const Sizable = {
          string: { unit: "znaků", verb: "mít" },
          file: { unit: "bajtů", verb: "mít" },
          array: { unit: "prvků", verb: "mít" },
          set: { unit: "prvků", verb: "mít" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "regulární výraz",
          email: "e-mailová adresa",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "datum a čas ve formátu ISO",
          date: "datum ve formátu ISO",
          time: "čas ve formátu ISO",
          duration: "doba trvání ISO",
          ipv4: "IPv4 adresa",
          ipv6: "IPv6 adresa",
          cidrv4: "rozsah IPv4",
          cidrv6: "rozsah IPv6",
          base64: "řetězec zakódovaný ve formátu base64",
          base64url: "řetězec zakódovaný ve formátu base64url",
          json_string: "řetězec ve formátu JSON",
          e164: "číslo E.164",
          jwt: "JWT",
          template_literal: "vstup"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "číslo",
          string: "řetězec",
          function: "funkce",
          array: "pole"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Neplatný vstup: očekáváno instanceof ${issue2.expected}, obdrženo ${received}`;
              }
              return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Neplatný vstup: očekáváno ${stringifyPrimitive(issue2.values[0])}`;
              return `Neplatná možnost: očekávána jedna z hodnot ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvků"}`;
              }
              return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvků"}`;
              }
              return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
              return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Neplatné číslo: musí být násobkem ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Neznámé klíče: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Neplatný klíč v ${issue2.origin}`;
            case "invalid_union":
              return "Neplatný vstup";
            case "invalid_element":
              return `Neplatná hodnota v ${issue2.origin}`;
            default:
              return `Neplatný vstup`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/da.js
  function da_default() {
    return {
      localeError: error7()
    };
  }
  var error7;
  var init_da = __esm({
    "node_modules/zod/v4/locales/da.js"() {
      init_util();
      error7 = () => {
        const Sizable = {
          string: { unit: "tegn", verb: "havde" },
          file: { unit: "bytes", verb: "havde" },
          array: { unit: "elementer", verb: "indeholdt" },
          set: { unit: "elementer", verb: "indeholdt" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "input",
          email: "e-mailadresse",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO dato- og klokkeslæt",
          date: "ISO-dato",
          time: "ISO-klokkeslæt",
          duration: "ISO-varighed",
          ipv4: "IPv4-område",
          ipv6: "IPv6-område",
          cidrv4: "IPv4-spektrum",
          cidrv6: "IPv6-spektrum",
          base64: "base64-kodet streng",
          base64url: "base64url-kodet streng",
          json_string: "JSON-streng",
          e164: "E.164-nummer",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          nan: "NaN",
          string: "streng",
          number: "tal",
          boolean: "boolean",
          array: "liste",
          object: "objekt",
          set: "sæt",
          file: "fil"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
              }
              return `Ugyldigt input: forventede ${expected}, fik ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Ugyldig værdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
              return `Ugyldigt valg: forventede en af følgende ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              if (sizing)
                return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
              return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              if (sizing) {
                return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
              return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Ugyldigt tal: skal være deleligt med ${issue2.divisor}`;
            case "unrecognized_keys":
              return `${issue2.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Ugyldig nøgle i ${issue2.origin}`;
            case "invalid_union":
              return "Ugyldigt input: matcher ingen af de tilladte typer";
            case "invalid_element":
              return `Ugyldig værdi i ${issue2.origin}`;
            default:
              return `Ugyldigt input`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/de.js
  function de_default() {
    return {
      localeError: error8()
    };
  }
  var error8;
  var init_de = __esm({
    "node_modules/zod/v4/locales/de.js"() {
      init_util();
      error8 = () => {
        const Sizable = {
          string: { unit: "Zeichen", verb: "zu haben" },
          file: { unit: "Bytes", verb: "zu haben" },
          array: { unit: "Elemente", verb: "zu haben" },
          set: { unit: "Elemente", verb: "zu haben" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "Eingabe",
          email: "E-Mail-Adresse",
          url: "URL",
          emoji: "Emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO-Datum und -Uhrzeit",
          date: "ISO-Datum",
          time: "ISO-Uhrzeit",
          duration: "ISO-Dauer",
          ipv4: "IPv4-Adresse",
          ipv6: "IPv6-Adresse",
          cidrv4: "IPv4-Bereich",
          cidrv6: "IPv6-Bereich",
          base64: "Base64-codierter String",
          base64url: "Base64-URL-codierter String",
          json_string: "JSON-String",
          e164: "E.164-Nummer",
          jwt: "JWT",
          template_literal: "Eingabe"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "Zahl",
          array: "Array"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Ungültige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
              }
              return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Ungültige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
              return `Ungültige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
              return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
              }
              return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
              if (_issue.format === "ends_with")
                return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
              if (_issue.format === "includes")
                return `Ungültiger String: muss "${_issue.includes}" enthalten`;
              if (_issue.format === "regex")
                return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
              return `Ungültig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Ungültige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
            case "unrecognized_keys":
              return `${issue2.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Ungültiger Schlüssel in ${issue2.origin}`;
            case "invalid_union":
              return "Ungültige Eingabe";
            case "invalid_element":
              return `Ungültiger Wert in ${issue2.origin}`;
            default:
              return `Ungültige Eingabe`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/el.js
  function el_default() {
    return {
      localeError: error9()
    };
  }
  var error9;
  var init_el = __esm({
    "node_modules/zod/v4/locales/el.js"() {
      init_util();
      error9 = () => {
        const Sizable = {
          string: { unit: "χαρακτήρες", verb: "να έχει" },
          file: { unit: "bytes", verb: "να έχει" },
          array: { unit: "στοιχεία", verb: "να έχει" },
          set: { unit: "στοιχεία", verb: "να έχει" },
          map: { unit: "καταχωρήσεις", verb: "να έχει" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "είσοδος",
          email: "διεύθυνση email",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO ημερομηνία και ώρα",
          date: "ISO ημερομηνία",
          time: "ISO ώρα",
          duration: "ISO διάρκεια",
          ipv4: "διεύθυνση IPv4",
          ipv6: "διεύθυνση IPv6",
          mac: "διεύθυνση MAC",
          cidrv4: "εύρος IPv4",
          cidrv6: "εύρος IPv6",
          base64: "συμβολοσειρά κωδικοποιημένη σε base64",
          base64url: "συμβολοσειρά κωδικοποιημένη σε base64url",
          json_string: "συμβολοσειρά JSON",
          e164: "αριθμός E.164",
          jwt: "JWT",
          template_literal: "είσοδος"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (typeof issue2.expected === "string" && /^[A-Z]/.test(issue2.expected)) {
                return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${issue2.expected}, λήφθηκε ${received}`;
              }
              return `Μη έγκυρη είσοδος: αναμενόταν ${expected}, λήφθηκε ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Μη έγκυρη είσοδος: αναμενόταν ${stringifyPrimitive(issue2.values[0])}`;
              return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Πολύ μεγάλο: αναμενόταν ${issue2.origin ?? "τιμή"} να έχει ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "στοιχεία"}`;
              return `Πολύ μεγάλο: αναμενόταν ${issue2.origin ?? "τιμή"} να είναι ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Πολύ μικρό: αναμενόταν ${issue2.origin} να έχει ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Πολύ μικρό: αναμενόταν ${issue2.origin} να είναι ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${_issue.pattern}`;
              return `Μη έγκυρο: ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Άγνωστ${issue2.keys.length > 1 ? "α" : "ο"} κλειδ${issue2.keys.length > 1 ? "ιά" : "ί"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Μη έγκυρο κλειδί στο ${issue2.origin}`;
            case "invalid_union":
              return "Μη έγκυρη είσοδος";
            case "invalid_element":
              return `Μη έγκυρη τιμή στο ${issue2.origin}`;
            default:
              return `Μη έγκυρη είσοδος`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/en.js
  function en_default() {
    return {
      localeError: error10()
    };
  }
  var error10;
  var init_en = __esm({
    "node_modules/zod/v4/locales/en.js"() {
      init_util();
      error10 = () => {
        const Sizable = {
          string: { unit: "characters", verb: "to have" },
          file: { unit: "bytes", verb: "to have" },
          array: { unit: "items", verb: "to have" },
          set: { unit: "items", verb: "to have" },
          map: { unit: "entries", verb: "to have" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "input",
          email: "email address",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO datetime",
          date: "ISO date",
          time: "ISO time",
          duration: "ISO duration",
          ipv4: "IPv4 address",
          ipv6: "IPv6 address",
          mac: "MAC address",
          cidrv4: "IPv4 range",
          cidrv6: "IPv6 range",
          base64: "base64-encoded string",
          base64url: "base64url-encoded string",
          json_string: "JSON string",
          e164: "E.164 number",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          // Compatibility: "nan" -> "NaN" for display
          nan: "NaN"
          // All other type names omitted - they fall back to raw values via ?? operator
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              return `Invalid input: expected ${expected}, received ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
              return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
              return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Invalid string: must start with "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Invalid string: must end with "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Invalid string: must include "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Invalid string: must match pattern ${_issue.pattern}`;
              return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Invalid number: must be a multiple of ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Invalid key in ${issue2.origin}`;
            case "invalid_union":
              if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
                const opts = issue2.options.map((o2) => `'${o2}'`).join(" | ");
                return `Invalid discriminator value. Expected ${opts}`;
              }
              return "Invalid input";
            case "invalid_element":
              return `Invalid value in ${issue2.origin}`;
            default:
              return `Invalid input`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/eo.js
  function eo_default() {
    return {
      localeError: error11()
    };
  }
  var error11;
  var init_eo = __esm({
    "node_modules/zod/v4/locales/eo.js"() {
      init_util();
      error11 = () => {
        const Sizable = {
          string: { unit: "karaktrojn", verb: "havi" },
          file: { unit: "bajtojn", verb: "havi" },
          array: { unit: "elementojn", verb: "havi" },
          set: { unit: "elementojn", verb: "havi" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "enigo",
          email: "retadreso",
          url: "URL",
          emoji: "emoĝio",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO-datotempo",
          date: "ISO-dato",
          time: "ISO-tempo",
          duration: "ISO-daŭro",
          ipv4: "IPv4-adreso",
          ipv6: "IPv6-adreso",
          cidrv4: "IPv4-rango",
          cidrv6: "IPv6-rango",
          base64: "64-ume kodita karaktraro",
          base64url: "URL-64-ume kodita karaktraro",
          json_string: "JSON-karaktraro",
          e164: "E.164-nombro",
          jwt: "JWT",
          template_literal: "enigo"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "nombro",
          array: "tabelo",
          null: "senvalora"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Nevalida enigo: atendiĝis instanceof ${issue2.expected}, riceviĝis ${received}`;
              }
              return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Nevalida enigo: atendiĝis ${stringifyPrimitive(issue2.values[0])}`;
              return `Nevalida opcio: atendiĝis unu el ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
              return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Tro malgranda: atendiĝis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Tro malgranda: atendiĝis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
              return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Nekonata${issue2.keys.length > 1 ? "j" : ""} ŝlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Nevalida ŝlosilo en ${issue2.origin}`;
            case "invalid_union":
              return "Nevalida enigo";
            case "invalid_element":
              return `Nevalida valoro en ${issue2.origin}`;
            default:
              return `Nevalida enigo`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/es.js
  function es_default() {
    return {
      localeError: error12()
    };
  }
  var error12;
  var init_es = __esm({
    "node_modules/zod/v4/locales/es.js"() {
      init_util();
      error12 = () => {
        const Sizable = {
          string: { unit: "caracteres", verb: "tener" },
          file: { unit: "bytes", verb: "tener" },
          array: { unit: "elementos", verb: "tener" },
          set: { unit: "elementos", verb: "tener" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "entrada",
          email: "dirección de correo electrónico",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "fecha y hora ISO",
          date: "fecha ISO",
          time: "hora ISO",
          duration: "duración ISO",
          ipv4: "dirección IPv4",
          ipv6: "dirección IPv6",
          cidrv4: "rango IPv4",
          cidrv6: "rango IPv6",
          base64: "cadena codificada en base64",
          base64url: "URL codificada en base64",
          json_string: "cadena JSON",
          e164: "número E.164",
          jwt: "JWT",
          template_literal: "entrada"
        };
        const TypeDictionary = {
          nan: "NaN",
          string: "texto",
          number: "número",
          boolean: "booleano",
          array: "arreglo",
          object: "objeto",
          set: "conjunto",
          file: "archivo",
          date: "fecha",
          bigint: "número grande",
          symbol: "símbolo",
          undefined: "indefinido",
          null: "nulo",
          function: "función",
          map: "mapa",
          record: "registro",
          tuple: "tupla",
          enum: "enumeración",
          union: "unión",
          literal: "literal",
          promise: "promesa",
          void: "vacío",
          never: "nunca",
          unknown: "desconocido",
          any: "cualquiera"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Entrada inválida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
              }
              return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Entrada inválida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
              return `Opción inválida: se esperaba una de ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              if (sizing)
                return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
              return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              if (sizing) {
                return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Cadena inválida: debe incluir "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
              return `Inválido ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Número inválido: debe ser múltiplo de ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Llave inválida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
            case "invalid_union":
              return "Entrada inválida";
            case "invalid_element":
              return `Valor inválido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
            default:
              return `Entrada inválida`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/fa.js
  function fa_default() {
    return {
      localeError: error13()
    };
  }
  var error13;
  var init_fa = __esm({
    "node_modules/zod/v4/locales/fa.js"() {
      init_util();
      error13 = () => {
        const Sizable = {
          string: { unit: "کاراکتر", verb: "داشته باشد" },
          file: { unit: "بایت", verb: "داشته باشد" },
          array: { unit: "آیتم", verb: "داشته باشد" },
          set: { unit: "آیتم", verb: "داشته باشد" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "ورودی",
          email: "آدرس ایمیل",
          url: "URL",
          emoji: "ایموجی",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "تاریخ و زمان ایزو",
          date: "تاریخ ایزو",
          time: "زمان ایزو",
          duration: "مدت زمان ایزو",
          ipv4: "IPv4 آدرس",
          ipv6: "IPv6 آدرس",
          cidrv4: "IPv4 دامنه",
          cidrv6: "IPv6 دامنه",
          base64: "base64-encoded رشته",
          base64url: "base64url-encoded رشته",
          json_string: "JSON رشته",
          e164: "E.164 عدد",
          jwt: "JWT",
          template_literal: "ورودی"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "عدد",
          array: "آرایه"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `ورودی نامعتبر: می‌بایست instanceof ${issue2.expected} می‌بود، ${received} دریافت شد`;
              }
              return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
            }
            case "invalid_value":
              if (issue2.values.length === 1) {
                return `ورودی نامعتبر: می‌بایست ${stringifyPrimitive(issue2.values[0])} می‌بود`;
              }
              return `گزینه نامعتبر: می‌بایست یکی از ${joinValues(issue2.values, "|")} می‌بود`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
              }
              return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} باشد`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} باشد`;
              }
              return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} باشد`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
              }
              if (_issue.format === "ends_with") {
                return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
              }
              if (_issue.format === "includes") {
                return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
              }
              if (_issue.format === "regex") {
                return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
              }
              return `${FormatDictionary[_issue.format] ?? issue2.format} نامعتبر`;
            }
            case "not_multiple_of":
              return `عدد نامعتبر: باید مضرب ${issue2.divisor} باشد`;
            case "unrecognized_keys":
              return `کلید${issue2.keys.length > 1 ? "های" : ""} ناشناس: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `کلید ناشناس در ${issue2.origin}`;
            case "invalid_union":
              return `ورودی نامعتبر`;
            case "invalid_element":
              return `مقدار نامعتبر در ${issue2.origin}`;
            default:
              return `ورودی نامعتبر`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/fi.js
  function fi_default() {
    return {
      localeError: error14()
    };
  }
  var error14;
  var init_fi = __esm({
    "node_modules/zod/v4/locales/fi.js"() {
      init_util();
      error14 = () => {
        const Sizable = {
          string: { unit: "merkkiä", subject: "merkkijonon" },
          file: { unit: "tavua", subject: "tiedoston" },
          array: { unit: "alkiota", subject: "listan" },
          set: { unit: "alkiota", subject: "joukon" },
          number: { unit: "", subject: "luvun" },
          bigint: { unit: "", subject: "suuren kokonaisluvun" },
          int: { unit: "", subject: "kokonaisluvun" },
          date: { unit: "", subject: "päivämäärän" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "säännöllinen lauseke",
          email: "sähköpostiosoite",
          url: "URL-osoite",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO-aikaleima",
          date: "ISO-päivämäärä",
          time: "ISO-aika",
          duration: "ISO-kesto",
          ipv4: "IPv4-osoite",
          ipv6: "IPv6-osoite",
          cidrv4: "IPv4-alue",
          cidrv6: "IPv6-alue",
          base64: "base64-koodattu merkkijono",
          base64url: "base64url-koodattu merkkijono",
          json_string: "JSON-merkkijono",
          e164: "E.164-luku",
          jwt: "JWT",
          template_literal: "templaattimerkkijono"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
              }
              return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Virheellinen syöte: täytyy olla ${stringifyPrimitive(issue2.values[0])}`;
              return `Virheellinen valinta: täytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
              }
              return `Liian suuri: arvon täytyy olla ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
              }
              return `Liian pieni: arvon täytyy olla ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
              if (_issue.format === "regex") {
                return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
              }
              return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Virheellinen luku: täytyy olla luvun ${issue2.divisor} monikerta`;
            case "unrecognized_keys":
              return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return "Virheellinen avain tietueessa";
            case "invalid_union":
              return "Virheellinen unioni";
            case "invalid_element":
              return "Virheellinen arvo joukossa";
            default:
              return `Virheellinen syöte`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/fr.js
  function fr_default() {
    return {
      localeError: error15()
    };
  }
  var error15;
  var init_fr = __esm({
    "node_modules/zod/v4/locales/fr.js"() {
      init_util();
      error15 = () => {
        const Sizable = {
          string: { unit: "caractères", verb: "avoir" },
          file: { unit: "octets", verb: "avoir" },
          array: { unit: "éléments", verb: "avoir" },
          set: { unit: "éléments", verb: "avoir" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "entrée",
          email: "adresse e-mail",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "date et heure ISO",
          date: "date ISO",
          time: "heure ISO",
          duration: "durée ISO",
          ipv4: "adresse IPv4",
          ipv6: "adresse IPv6",
          cidrv4: "plage IPv4",
          cidrv6: "plage IPv6",
          base64: "chaîne encodée en base64",
          base64url: "chaîne encodée en base64url",
          json_string: "chaîne JSON",
          e164: "numéro E.164",
          jwt: "JWT",
          template_literal: "entrée"
        };
        const TypeDictionary = {
          string: "chaîne",
          number: "nombre",
          int: "entier",
          boolean: "booléen",
          bigint: "grand entier",
          symbol: "symbole",
          undefined: "indéfini",
          null: "null",
          never: "jamais",
          void: "vide",
          date: "date",
          array: "tableau",
          object: "objet",
          tuple: "tuple",
          record: "enregistrement",
          map: "carte",
          set: "ensemble",
          file: "fichier",
          nonoptional: "non-optionnel",
          nan: "NaN",
          function: "fonction"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Entrée invalide : instanceof ${issue2.expected} attendu, ${received} reçu`;
              }
              return `Entrée invalide : ${expected} attendu, ${received} reçu`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Entrée invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
              return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
              return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit être ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit être ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Chaîne invalide : doit inclure "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
              return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
            }
            case "not_multiple_of":
              return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Clé invalide dans ${issue2.origin}`;
            case "invalid_union":
              return "Entrée invalide";
            case "invalid_element":
              return `Valeur invalide dans ${issue2.origin}`;
            default:
              return `Entrée invalide`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/fr-CA.js
  function fr_CA_default() {
    return {
      localeError: error16()
    };
  }
  var error16;
  var init_fr_CA = __esm({
    "node_modules/zod/v4/locales/fr-CA.js"() {
      init_util();
      error16 = () => {
        const Sizable = {
          string: { unit: "caractères", verb: "avoir" },
          file: { unit: "octets", verb: "avoir" },
          array: { unit: "éléments", verb: "avoir" },
          set: { unit: "éléments", verb: "avoir" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "entrée",
          email: "adresse courriel",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "date-heure ISO",
          date: "date ISO",
          time: "heure ISO",
          duration: "durée ISO",
          ipv4: "adresse IPv4",
          ipv6: "adresse IPv6",
          cidrv4: "plage IPv4",
          cidrv6: "plage IPv6",
          base64: "chaîne encodée en base64",
          base64url: "chaîne encodée en base64url",
          json_string: "chaîne JSON",
          e164: "numéro E.164",
          jwt: "JWT",
          template_literal: "entrée"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Entrée invalide : attendu instanceof ${issue2.expected}, reçu ${received}`;
              }
              return `Entrée invalide : attendu ${expected}, reçu ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Entrée invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
              return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "≤" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
              return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? "≥" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Chaîne invalide : doit inclure "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
              return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
            }
            case "not_multiple_of":
              return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Clé invalide dans ${issue2.origin}`;
            case "invalid_union":
              return "Entrée invalide";
            case "invalid_element":
              return `Valeur invalide dans ${issue2.origin}`;
            default:
              return `Entrée invalide`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/he.js
  function he_default() {
    return {
      localeError: error17()
    };
  }
  var error17;
  var init_he = __esm({
    "node_modules/zod/v4/locales/he.js"() {
      init_util();
      error17 = () => {
        const TypeNames = {
          string: { label: "מחרוזת", gender: "f" },
          number: { label: "מספר", gender: "m" },
          boolean: { label: "ערך בוליאני", gender: "m" },
          bigint: { label: "BigInt", gender: "m" },
          date: { label: "תאריך", gender: "m" },
          array: { label: "מערך", gender: "m" },
          object: { label: "אובייקט", gender: "m" },
          null: { label: "ערך ריק (null)", gender: "m" },
          undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
          symbol: { label: "סימבול (Symbol)", gender: "m" },
          function: { label: "פונקציה", gender: "f" },
          map: { label: "מפה (Map)", gender: "f" },
          set: { label: "קבוצה (Set)", gender: "f" },
          file: { label: "קובץ", gender: "m" },
          promise: { label: "Promise", gender: "m" },
          NaN: { label: "NaN", gender: "m" },
          unknown: { label: "ערך לא ידוע", gender: "m" },
          value: { label: "ערך", gender: "m" }
        };
        const Sizable = {
          string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
          file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
          array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
          set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
          number: { unit: "", shortLabel: "קטן", longLabel: "גדול" }
          // no unit
        };
        const typeEntry = (t2) => t2 ? TypeNames[t2] : void 0;
        const typeLabel = (t2) => {
          const e2 = typeEntry(t2);
          if (e2)
            return e2.label;
          return t2 ?? TypeNames.unknown.label;
        };
        const withDefinite = (t2) => `ה${typeLabel(t2)}`;
        const verbFor = (t2) => {
          const e2 = typeEntry(t2);
          const gender = e2?.gender ?? "m";
          return gender === "f" ? "צריכה להיות" : "צריך להיות";
        };
        const getSizing = (origin) => {
          if (!origin)
            return null;
          return Sizable[origin] ?? null;
        };
        const FormatDictionary = {
          regex: { label: "קלט", gender: "m" },
          email: { label: "כתובת אימייל", gender: "f" },
          url: { label: "כתובת רשת", gender: "f" },
          emoji: { label: "אימוג'י", gender: "m" },
          uuid: { label: "UUID", gender: "m" },
          nanoid: { label: "nanoid", gender: "m" },
          guid: { label: "GUID", gender: "m" },
          cuid: { label: "cuid", gender: "m" },
          cuid2: { label: "cuid2", gender: "m" },
          ulid: { label: "ULID", gender: "m" },
          xid: { label: "XID", gender: "m" },
          ksuid: { label: "KSUID", gender: "m" },
          datetime: { label: "תאריך וזמן ISO", gender: "m" },
          date: { label: "תאריך ISO", gender: "m" },
          time: { label: "זמן ISO", gender: "m" },
          duration: { label: "משך זמן ISO", gender: "m" },
          ipv4: { label: "כתובת IPv4", gender: "f" },
          ipv6: { label: "כתובת IPv6", gender: "f" },
          cidrv4: { label: "טווח IPv4", gender: "m" },
          cidrv6: { label: "טווח IPv6", gender: "m" },
          base64: { label: "מחרוזת בבסיס 64", gender: "f" },
          base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
          json_string: { label: "מחרוזת JSON", gender: "f" },
          e164: { label: "מספר E.164", gender: "m" },
          jwt: { label: "JWT", gender: "m" },
          ends_with: { label: "קלט", gender: "m" },
          includes: { label: "קלט", gender: "m" },
          lowercase: { label: "קלט", gender: "m" },
          starts_with: { label: "קלט", gender: "m" },
          uppercase: { label: "קלט", gender: "m" }
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expectedKey = issue2.expected;
              const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `קלט לא תקין: צריך להיות instanceof ${issue2.expected}, התקבל ${received}`;
              }
              return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
            }
            case "invalid_value": {
              if (issue2.values.length === 1) {
                return `ערך לא תקין: הערך חייב להיות ${stringifyPrimitive(issue2.values[0])}`;
              }
              const stringified = issue2.values.map((v2) => stringifyPrimitive(v2));
              if (issue2.values.length === 2) {
                return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
              }
              const lastValue = stringified[stringified.length - 1];
              const restValues = stringified.slice(0, -1).join(", ");
              return `ערך לא תקין: האפשרויות המתאימות הן ${restValues} או ${lastValue}`;
            }
            case "too_big": {
              const sizing = getSizing(issue2.origin);
              const subject = withDefinite(issue2.origin ?? "value");
              if (issue2.origin === "string") {
                return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או פחות" : "לכל היותר"}`.trim();
              }
              if (issue2.origin === "number") {
                const comparison = issue2.inclusive ? `קטן או שווה ל-${issue2.maximum}` : `קטן מ-${issue2.maximum}`;
                return `גדול מדי: ${subject} צריך להיות ${comparison}`;
              }
              if (issue2.origin === "array" || issue2.origin === "set") {
                const verb = issue2.origin === "set" ? "צריכה" : "צריך";
                const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue2.maximum} ${sizing?.unit ?? ""}`;
                return `גדול מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
              }
              const adj = issue2.inclusive ? "<=" : "<";
              const be = verbFor(issue2.origin ?? "value");
              if (sizing?.unit) {
                return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
              }
              return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const sizing = getSizing(issue2.origin);
              const subject = withDefinite(issue2.origin ?? "value");
              if (issue2.origin === "string") {
                return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או יותר" : "לפחות"}`.trim();
              }
              if (issue2.origin === "number") {
                const comparison = issue2.inclusive ? `גדול או שווה ל-${issue2.minimum}` : `גדול מ-${issue2.minimum}`;
                return `קטן מדי: ${subject} צריך להיות ${comparison}`;
              }
              if (issue2.origin === "array" || issue2.origin === "set") {
                const verb = issue2.origin === "set" ? "צריכה" : "צריך";
                if (issue2.minimum === 1 && issue2.inclusive) {
                  const singularPhrase = issue2.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד";
                  return `קטן מדי: ${subject} ${verb} להכיל ${singularPhrase}`;
                }
                const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue2.minimum} ${sizing?.unit ?? ""}`;
                return `קטן מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
              }
              const adj = issue2.inclusive ? ">=" : ">";
              const be = verbFor(issue2.origin ?? "value");
              if (sizing?.unit) {
                return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `המחרוזת חייבת לכלול "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
              const nounEntry = FormatDictionary[_issue.format];
              const noun = nounEntry?.label ?? _issue.format;
              const gender = nounEntry?.gender ?? "m";
              const adjective = gender === "f" ? "תקינה" : "תקין";
              return `${noun} לא ${adjective}`;
            }
            case "not_multiple_of":
              return `מספר לא תקין: חייב להיות מכפלה של ${issue2.divisor}`;
            case "unrecognized_keys":
              return `מפתח${issue2.keys.length > 1 ? "ות" : ""} לא מזוה${issue2.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key": {
              return `שדה לא תקין באובייקט`;
            }
            case "invalid_union":
              return "קלט לא תקין";
            case "invalid_element": {
              const place = withDefinite(issue2.origin ?? "array");
              return `ערך לא תקין ב${place}`;
            }
            default:
              return `קלט לא תקין`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/hr.js
  function hr_default() {
    return {
      localeError: error18()
    };
  }
  var error18;
  var init_hr = __esm({
    "node_modules/zod/v4/locales/hr.js"() {
      init_util();
      error18 = () => {
        const Sizable = {
          string: { unit: "znakova", verb: "imati" },
          file: { unit: "bajtova", verb: "imati" },
          array: { unit: "stavki", verb: "imati" },
          set: { unit: "stavki", verb: "imati" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "unos",
          email: "email adresa",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO datum i vrijeme",
          date: "ISO datum",
          time: "ISO vrijeme",
          duration: "ISO trajanje",
          ipv4: "IPv4 adresa",
          ipv6: "IPv6 adresa",
          cidrv4: "IPv4 raspon",
          cidrv6: "IPv6 raspon",
          base64: "base64 kodirani tekst",
          base64url: "base64url kodirani tekst",
          json_string: "JSON tekst",
          e164: "E.164 broj",
          jwt: "JWT",
          template_literal: "unos"
        };
        const TypeDictionary = {
          nan: "NaN",
          string: "tekst",
          number: "broj",
          boolean: "boolean",
          array: "niz",
          object: "objekt",
          set: "skup",
          file: "datoteka",
          date: "datum",
          bigint: "bigint",
          symbol: "simbol",
          undefined: "undefined",
          null: "null",
          function: "funkcija",
          map: "mapa"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Neispravan unos: očekuje se instanceof ${issue2.expected}, a primljeno je ${received}`;
              }
              return `Neispravan unos: očekuje se ${expected}, a primljeno je ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Neispravna vrijednost: očekivano ${stringifyPrimitive(issue2.values[0])}`;
              return `Neispravna opcija: očekivano jedno od ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              if (sizing)
                return `Preveliko: očekivano da ${origin ?? "vrijednost"} ima ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
              return `Preveliko: očekivano da ${origin ?? "vrijednost"} bude ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              if (sizing) {
                return `Premalo: očekivano da ${origin} ima ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Premalo: očekivano da ${origin} bude ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Neispravan tekst: mora započinjati s "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Neispravan tekst: mora završavati s "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Neispravan tekst: mora sadržavati "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
              return `Neispravna ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Neispravan broj: mora biti višekratnik od ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Neprepoznat${issue2.keys.length > 1 ? "i ključevi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Neispravan ključ u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
            case "invalid_union":
              return "Neispravan unos";
            case "invalid_element":
              return `Neispravna vrijednost u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
            default:
              return `Neispravan unos`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/hu.js
  function hu_default() {
    return {
      localeError: error19()
    };
  }
  var error19;
  var init_hu = __esm({
    "node_modules/zod/v4/locales/hu.js"() {
      init_util();
      error19 = () => {
        const Sizable = {
          string: { unit: "karakter", verb: "legyen" },
          file: { unit: "byte", verb: "legyen" },
          array: { unit: "elem", verb: "legyen" },
          set: { unit: "elem", verb: "legyen" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "bemenet",
          email: "email cím",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO időbélyeg",
          date: "ISO dátum",
          time: "ISO idő",
          duration: "ISO időintervallum",
          ipv4: "IPv4 cím",
          ipv6: "IPv6 cím",
          cidrv4: "IPv4 tartomány",
          cidrv6: "IPv6 tartomány",
          base64: "base64-kódolt string",
          base64url: "base64url-kódolt string",
          json_string: "JSON string",
          e164: "E.164 szám",
          jwt: "JWT",
          template_literal: "bemenet"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "szám",
          array: "tömb"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Érvénytelen bemenet: a várt érték instanceof ${issue2.expected}, a kapott érték ${received}`;
              }
              return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Érvénytelen bemenet: a várt érték ${stringifyPrimitive(issue2.values[0])}`;
              return `Érvénytelen opció: valamelyik érték várt ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Túl nagy: ${issue2.origin ?? "érték"} mérete túl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
              return `Túl nagy: a bemeneti érték ${issue2.origin ?? "érték"} túl nagy: ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Túl kicsi: a bemeneti érték ${issue2.origin} mérete túl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Túl kicsi: a bemeneti érték ${issue2.origin} túl kicsi ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
              if (_issue.format === "ends_with")
                return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
              if (_issue.format === "includes")
                return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
              if (_issue.format === "regex")
                return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
              return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Érvénytelen szám: ${issue2.divisor} többszörösének kell lennie`;
            case "unrecognized_keys":
              return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Érvénytelen kulcs ${issue2.origin}`;
            case "invalid_union":
              return "Érvénytelen bemenet";
            case "invalid_element":
              return `Érvénytelen érték: ${issue2.origin}`;
            default:
              return `Érvénytelen bemenet`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/hy.js
  function getArmenianPlural(count, one, many) {
    return Math.abs(count) === 1 ? one : many;
  }
  function withDefiniteArticle(word) {
    if (!word)
      return "";
    const vowels = ["ա", "ե", "ը", "ի", "ո", "ու", "օ"];
    const lastChar = word[word.length - 1];
    return word + (vowels.includes(lastChar) ? "ն" : "ը");
  }
  function hy_default() {
    return {
      localeError: error20()
    };
  }
  var error20;
  var init_hy = __esm({
    "node_modules/zod/v4/locales/hy.js"() {
      init_util();
      error20 = () => {
        const Sizable = {
          string: {
            unit: {
              one: "նշան",
              many: "նշաններ"
            },
            verb: "ունենալ"
          },
          file: {
            unit: {
              one: "բայթ",
              many: "բայթեր"
            },
            verb: "ունենալ"
          },
          array: {
            unit: {
              one: "տարր",
              many: "տարրեր"
            },
            verb: "ունենալ"
          },
          set: {
            unit: {
              one: "տարր",
              many: "տարրեր"
            },
            verb: "ունենալ"
          }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "մուտք",
          email: "էլ. հասցե",
          url: "URL",
          emoji: "էմոջի",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO ամսաթիվ և ժամ",
          date: "ISO ամսաթիվ",
          time: "ISO ժամ",
          duration: "ISO տևողություն",
          ipv4: "IPv4 հասցե",
          ipv6: "IPv6 հասցե",
          cidrv4: "IPv4 միջակայք",
          cidrv6: "IPv6 միջակայք",
          base64: "base64 ձևաչափով տող",
          base64url: "base64url ձևաչափով տող",
          json_string: "JSON տող",
          e164: "E.164 համար",
          jwt: "JWT",
          template_literal: "մուտք"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "թիվ",
          array: "զանգված"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue2.expected}, ստացվել է ${received}`;
              }
              return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Սխալ մուտքագրում․ սպասվում էր ${stringifyPrimitive(issue2.values[1])}`;
              return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                const maxValue = Number(issue2.maximum);
                const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
                return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} կունենա ${adj}${issue2.maximum.toString()} ${unit}`;
              }
              return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} լինի ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                const minValue = Number(issue2.minimum);
                const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
                return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} կունենա ${adj}${issue2.minimum.toString()} ${unit}`;
              }
              return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} լինի ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
              if (_issue.format === "ends_with")
                return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
              if (_issue.format === "includes")
                return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
              return `Սխալ ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue2.divisor}-ի`;
            case "unrecognized_keys":
              return `Չճանաչված բանալի${issue2.keys.length > 1 ? "ներ" : ""}. ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Սխալ բանալի ${withDefiniteArticle(issue2.origin)}-ում`;
            case "invalid_union":
              return "Սխալ մուտքագրում";
            case "invalid_element":
              return `Սխալ արժեք ${withDefiniteArticle(issue2.origin)}-ում`;
            default:
              return `Սխալ մուտքագրում`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/id.js
  function id_default() {
    return {
      localeError: error21()
    };
  }
  var error21;
  var init_id = __esm({
    "node_modules/zod/v4/locales/id.js"() {
      init_util();
      error21 = () => {
        const Sizable = {
          string: { unit: "karakter", verb: "memiliki" },
          file: { unit: "byte", verb: "memiliki" },
          array: { unit: "item", verb: "memiliki" },
          set: { unit: "item", verb: "memiliki" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "input",
          email: "alamat email",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "tanggal dan waktu format ISO",
          date: "tanggal format ISO",
          time: "jam format ISO",
          duration: "durasi format ISO",
          ipv4: "alamat IPv4",
          ipv6: "alamat IPv6",
          cidrv4: "rentang alamat IPv4",
          cidrv6: "rentang alamat IPv6",
          base64: "string dengan enkode base64",
          base64url: "string dengan enkode base64url",
          json_string: "string JSON",
          e164: "angka E.164",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
              }
              return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
              return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
              return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `String tidak valid: harus menyertakan "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
              return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
            }
            case "not_multiple_of":
              return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Kunci tidak valid di ${issue2.origin}`;
            case "invalid_union":
              return "Input tidak valid";
            case "invalid_element":
              return `Nilai tidak valid di ${issue2.origin}`;
            default:
              return `Input tidak valid`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/is.js
  function is_default() {
    return {
      localeError: error22()
    };
  }
  var error22;
  var init_is = __esm({
    "node_modules/zod/v4/locales/is.js"() {
      init_util();
      error22 = () => {
        const Sizable = {
          string: { unit: "stafi", verb: "að hafa" },
          file: { unit: "bæti", verb: "að hafa" },
          array: { unit: "hluti", verb: "að hafa" },
          set: { unit: "hluti", verb: "að hafa" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "gildi",
          email: "netfang",
          url: "vefslóð",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO dagsetning og tími",
          date: "ISO dagsetning",
          time: "ISO tími",
          duration: "ISO tímalengd",
          ipv4: "IPv4 address",
          ipv6: "IPv6 address",
          cidrv4: "IPv4 range",
          cidrv6: "IPv6 range",
          base64: "base64-encoded strengur",
          base64url: "base64url-encoded strengur",
          json_string: "JSON strengur",
          e164: "E.164 tölugildi",
          jwt: "JWT",
          template_literal: "gildi"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "númer",
          array: "fylki"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue2.expected}`;
              }
              return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Rangt gildi: gert ráð fyrir ${stringifyPrimitive(issue2.values[0])}`;
              return `Ógilt val: má vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
              return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} sé ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Of lítið: gert er ráð fyrir að ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Of lítið: gert er ráð fyrir að ${issue2.origin} sé ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
              return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Röng tala: verður að vera margfeldi af ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Óþekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Rangur lykill í ${issue2.origin}`;
            case "invalid_union":
              return "Rangt gildi";
            case "invalid_element":
              return `Rangt gildi í ${issue2.origin}`;
            default:
              return `Rangt gildi`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/it.js
  function it_default() {
    return {
      localeError: error23()
    };
  }
  var error23;
  var init_it = __esm({
    "node_modules/zod/v4/locales/it.js"() {
      init_util();
      error23 = () => {
        const Sizable = {
          string: { unit: "caratteri", verb: "avere" },
          file: { unit: "byte", verb: "avere" },
          array: { unit: "elementi", verb: "avere" },
          set: { unit: "elementi", verb: "avere" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "input",
          email: "indirizzo email",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "data e ora ISO",
          date: "data ISO",
          time: "ora ISO",
          duration: "durata ISO",
          ipv4: "indirizzo IPv4",
          ipv6: "indirizzo IPv6",
          cidrv4: "intervallo IPv4",
          cidrv6: "intervallo IPv6",
          base64: "stringa codificata in base64",
          base64url: "URL codificata in base64",
          json_string: "stringa JSON",
          e164: "numero E.164",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "numero",
          array: "vettore"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
              }
              return `Input non valido: atteso ${expected}, ricevuto ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
              return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
              return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Stringa non valida: deve includere "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
              return `Input non valido: ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Chiave non valida in ${issue2.origin}`;
            case "invalid_union":
              return "Input non valido";
            case "invalid_element":
              return `Valore non valido in ${issue2.origin}`;
            default:
              return `Input non valido`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ja.js
  function ja_default() {
    return {
      localeError: error24()
    };
  }
  var error24;
  var init_ja = __esm({
    "node_modules/zod/v4/locales/ja.js"() {
      init_util();
      error24 = () => {
        const Sizable = {
          string: { unit: "文字", verb: "である" },
          file: { unit: "バイト", verb: "である" },
          array: { unit: "要素", verb: "である" },
          set: { unit: "要素", verb: "である" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "入力値",
          email: "メールアドレス",
          url: "URL",
          emoji: "絵文字",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO日時",
          date: "ISO日付",
          time: "ISO時刻",
          duration: "ISO期間",
          ipv4: "IPv4アドレス",
          ipv6: "IPv6アドレス",
          cidrv4: "IPv4範囲",
          cidrv6: "IPv6範囲",
          base64: "base64エンコード文字列",
          base64url: "base64urlエンコード文字列",
          json_string: "JSON文字列",
          e164: "E.164番号",
          jwt: "JWT",
          template_literal: "入力値"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "数値",
          array: "配列"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `無効な入力: instanceof ${issue2.expected}が期待されましたが、${received}が入力されました`;
              }
              return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `無効な入力: ${stringifyPrimitive(issue2.values[0])}が期待されました`;
              return `無効な選択: ${joinValues(issue2.values, "、")}のいずれかである必要があります`;
            case "too_big": {
              const adj = issue2.inclusive ? "以下である" : "より小さい";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
              return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${adj}必要があります`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? "以上である" : "より大きい";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${sizing.unit}${adj}必要があります`;
              return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${adj}必要があります`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
              if (_issue.format === "ends_with")
                return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
              if (_issue.format === "includes")
                return `無効な文字列: "${_issue.includes}"を含む必要があります`;
              if (_issue.format === "regex")
                return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
              return `無効な${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `無効な数値: ${issue2.divisor}の倍数である必要があります`;
            case "unrecognized_keys":
              return `認識されていないキー${issue2.keys.length > 1 ? "群" : ""}: ${joinValues(issue2.keys, "、")}`;
            case "invalid_key":
              return `${issue2.origin}内の無効なキー`;
            case "invalid_union":
              return "無効な入力";
            case "invalid_element":
              return `${issue2.origin}内の無効な値`;
            default:
              return `無効な入力`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ka.js
  function ka_default() {
    return {
      localeError: error25()
    };
  }
  var error25;
  var init_ka = __esm({
    "node_modules/zod/v4/locales/ka.js"() {
      init_util();
      error25 = () => {
        const Sizable = {
          string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
          file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
          array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
          set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "შეყვანა",
          email: "ელ-ფოსტის მისამართი",
          url: "URL",
          emoji: "ემოჯი",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "თარიღი-დრო",
          date: "თარიღი",
          time: "დრო",
          duration: "ხანგრძლივობა",
          ipv4: "IPv4 მისამართი",
          ipv6: "IPv6 მისამართი",
          cidrv4: "IPv4 დიაპაზონი",
          cidrv6: "IPv6 დიაპაზონი",
          base64: "base64-კოდირებული ველი",
          base64url: "base64url-კოდირებული ველი",
          json_string: "JSON ველი",
          e164: "E.164 ნომერი",
          jwt: "JWT",
          template_literal: "შეყვანა"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "რიცხვი",
          string: "ველი",
          boolean: "ბულეანი",
          function: "ფუნქცია",
          array: "მასივი"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue2.expected}, მიღებული ${received}`;
              }
              return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `არასწორი შეყვანა: მოსალოდნელი ${stringifyPrimitive(issue2.values[0])}`;
              return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${joinValues(issue2.values, "|")}-დან`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
              return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} იყოს ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `არასწორი ველი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
              }
              if (_issue.format === "ends_with")
                return `არასწორი ველი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
              if (_issue.format === "includes")
                return `არასწორი ველი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
              if (_issue.format === "regex")
                return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
              return `არასწორი ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `არასწორი რიცხვი: უნდა იყოს ${issue2.divisor}-ის ჯერადი`;
            case "unrecognized_keys":
              return `უცნობი გასაღებ${issue2.keys.length > 1 ? "ები" : "ი"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `არასწორი გასაღები ${issue2.origin}-ში`;
            case "invalid_union":
              return "არასწორი შეყვანა";
            case "invalid_element":
              return `არასწორი მნიშვნელობა ${issue2.origin}-ში`;
            default:
              return `არასწორი შეყვანა`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/km.js
  function km_default() {
    return {
      localeError: error26()
    };
  }
  var error26;
  var init_km = __esm({
    "node_modules/zod/v4/locales/km.js"() {
      init_util();
      error26 = () => {
        const Sizable = {
          string: { unit: "តួអក្សរ", verb: "គួរមាន" },
          file: { unit: "បៃ", verb: "គួរមាន" },
          array: { unit: "ធាតុ", verb: "គួរមាន" },
          set: { unit: "ធាតុ", verb: "គួរមាន" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "ទិន្នន័យបញ្ចូល",
          email: "អាសយដ្ឋានអ៊ីមែល",
          url: "URL",
          emoji: "សញ្ញាអារម្មណ៍",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
          date: "កាលបរិច្ឆេទ ISO",
          time: "ម៉ោង ISO",
          duration: "រយៈពេល ISO",
          ipv4: "អាសយដ្ឋាន IPv4",
          ipv6: "អាសយដ្ឋាន IPv6",
          cidrv4: "ដែនអាសយដ្ឋាន IPv4",
          cidrv6: "ដែនអាសយដ្ឋាន IPv6",
          base64: "ខ្សែអក្សរអ៊ិកូដ base64",
          base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
          json_string: "ខ្សែអក្សរ JSON",
          e164: "លេខ E.164",
          jwt: "JWT",
          template_literal: "ទិន្នន័យបញ្ចូល"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "លេខ",
          array: "អារេ (Array)",
          null: "គ្មានតម្លៃ (null)"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue2.expected} ប៉ុន្តែទទួលបាន ${received}`;
              }
              return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${stringifyPrimitive(issue2.values[0])}`;
              return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
              return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
              return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue2.divisor}`;
            case "unrecognized_keys":
              return `រកឃើញសោមិនស្គាល់៖ ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
            case "invalid_union":
              return `ទិន្នន័យមិនត្រឹមត្រូវ`;
            case "invalid_element":
              return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
            default:
              return `ទិន្នន័យមិនត្រឹមត្រូវ`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/kh.js
  function kh_default() {
    return km_default();
  }
  var init_kh = __esm({
    "node_modules/zod/v4/locales/kh.js"() {
      init_km();
    }
  });

  // node_modules/zod/v4/locales/ko.js
  function ko_default() {
    return {
      localeError: error27()
    };
  }
  var error27;
  var init_ko = __esm({
    "node_modules/zod/v4/locales/ko.js"() {
      init_util();
      error27 = () => {
        const Sizable = {
          string: { unit: "문자", verb: "to have" },
          file: { unit: "바이트", verb: "to have" },
          array: { unit: "개", verb: "to have" },
          set: { unit: "개", verb: "to have" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "입력",
          email: "이메일 주소",
          url: "URL",
          emoji: "이모지",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO 날짜시간",
          date: "ISO 날짜",
          time: "ISO 시간",
          duration: "ISO 기간",
          ipv4: "IPv4 주소",
          ipv6: "IPv6 주소",
          cidrv4: "IPv4 범위",
          cidrv6: "IPv6 범위",
          base64: "base64 인코딩 문자열",
          base64url: "base64url 인코딩 문자열",
          json_string: "JSON 문자열",
          e164: "E.164 번호",
          jwt: "JWT",
          template_literal: "입력"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `잘못된 입력: 예상 타입은 instanceof ${issue2.expected}, 받은 타입은 ${received}입니다`;
              }
              return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `잘못된 입력: 값은 ${stringifyPrimitive(issue2.values[0])} 이어야 합니다`;
              return `잘못된 옵션: ${joinValues(issue2.values, "또는 ")} 중 하나여야 합니다`;
            case "too_big": {
              const adj = issue2.inclusive ? "이하" : "미만";
              const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
              const sizing = getSizing(issue2.origin);
              const unit = sizing?.unit ?? "요소";
              if (sizing)
                return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
              return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()} ${adj}${suffix}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? "이상" : "초과";
              const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
              const sizing = getSizing(issue2.origin);
              const unit = sizing?.unit ?? "요소";
              if (sizing) {
                return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
              }
              return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()} ${adj}${suffix}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
              }
              if (_issue.format === "ends_with")
                return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
              if (_issue.format === "includes")
                return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
              if (_issue.format === "regex")
                return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
              return `잘못된 ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `잘못된 숫자: ${issue2.divisor}의 배수여야 합니다`;
            case "unrecognized_keys":
              return `인식할 수 없는 키: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `잘못된 키: ${issue2.origin}`;
            case "invalid_union":
              return `잘못된 입력`;
            case "invalid_element":
              return `잘못된 값: ${issue2.origin}`;
            default:
              return `잘못된 입력`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/lt.js
  function getUnitTypeFromNumber(number4) {
    const abs = Math.abs(number4);
    const last = abs % 10;
    const last2 = abs % 100;
    if (last2 >= 11 && last2 <= 19 || last === 0)
      return "many";
    if (last === 1)
      return "one";
    return "few";
  }
  function lt_default() {
    return {
      localeError: error28()
    };
  }
  var capitalizeFirstCharacter, error28;
  var init_lt = __esm({
    "node_modules/zod/v4/locales/lt.js"() {
      init_util();
      capitalizeFirstCharacter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      };
      error28 = () => {
        const Sizable = {
          string: {
            unit: {
              one: "simbolis",
              few: "simboliai",
              many: "simbolių"
            },
            verb: {
              smaller: {
                inclusive: "turi būti ne ilgesnė kaip",
                notInclusive: "turi būti trumpesnė kaip"
              },
              bigger: {
                inclusive: "turi būti ne trumpesnė kaip",
                notInclusive: "turi būti ilgesnė kaip"
              }
            }
          },
          file: {
            unit: {
              one: "baitas",
              few: "baitai",
              many: "baitų"
            },
            verb: {
              smaller: {
                inclusive: "turi būti ne didesnis kaip",
                notInclusive: "turi būti mažesnis kaip"
              },
              bigger: {
                inclusive: "turi būti ne mažesnis kaip",
                notInclusive: "turi būti didesnis kaip"
              }
            }
          },
          array: {
            unit: {
              one: "elementą",
              few: "elementus",
              many: "elementų"
            },
            verb: {
              smaller: {
                inclusive: "turi turėti ne daugiau kaip",
                notInclusive: "turi turėti mažiau kaip"
              },
              bigger: {
                inclusive: "turi turėti ne mažiau kaip",
                notInclusive: "turi turėti daugiau kaip"
              }
            }
          },
          set: {
            unit: {
              one: "elementą",
              few: "elementus",
              many: "elementų"
            },
            verb: {
              smaller: {
                inclusive: "turi turėti ne daugiau kaip",
                notInclusive: "turi turėti mažiau kaip"
              },
              bigger: {
                inclusive: "turi turėti ne mažiau kaip",
                notInclusive: "turi turėti daugiau kaip"
              }
            }
          }
        };
        function getSizing(origin, unitType, inclusive, targetShouldBe) {
          const result = Sizable[origin] ?? null;
          if (result === null)
            return result;
          return {
            unit: result.unit[unitType],
            verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
          };
        }
        const FormatDictionary = {
          regex: "įvestis",
          email: "el. pašto adresas",
          url: "URL",
          emoji: "jaustukas",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO data ir laikas",
          date: "ISO data",
          time: "ISO laikas",
          duration: "ISO trukmė",
          ipv4: "IPv4 adresas",
          ipv6: "IPv6 adresas",
          cidrv4: "IPv4 tinklo prefiksas (CIDR)",
          cidrv6: "IPv6 tinklo prefiksas (CIDR)",
          base64: "base64 užkoduota eilutė",
          base64url: "base64url užkoduota eilutė",
          json_string: "JSON eilutė",
          e164: "E.164 numeris",
          jwt: "JWT",
          template_literal: "įvestis"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "skaičius",
          bigint: "sveikasis skaičius",
          string: "eilutė",
          boolean: "loginė reikšmė",
          undefined: "neapibrėžta reikšmė",
          function: "funkcija",
          symbol: "simbolis",
          array: "masyvas",
          object: "objektas",
          null: "nulinė reikšmė"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue2.expected}`;
              }
              return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Privalo būti ${stringifyPrimitive(issue2.values[0])}`;
              return `Privalo būti vienas iš ${joinValues(issue2.values, "|")} pasirinkimų`;
            case "too_big": {
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
              if (sizing?.verb)
                return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "elementų"}`;
              const adj = issue2.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
              return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
            }
            case "too_small": {
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
              if (sizing?.verb)
                return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "elementų"}`;
              const adj = issue2.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
              return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Eilutė privalo prasidėti "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Eilutė privalo įtraukti "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Eilutė privalo atitikti ${_issue.pattern}`;
              return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Skaičius privalo būti ${issue2.divisor} kartotinis.`;
            case "unrecognized_keys":
              return `Neatpažint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return "Rastas klaidingas raktas";
            case "invalid_union":
              return "Klaidinga įvestis";
            case "invalid_element": {
              const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
              return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi klaidingą įvestį`;
            }
            default:
              return "Klaidinga įvestis";
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/mk.js
  function mk_default() {
    return {
      localeError: error29()
    };
  }
  var error29;
  var init_mk = __esm({
    "node_modules/zod/v4/locales/mk.js"() {
      init_util();
      error29 = () => {
        const Sizable = {
          string: { unit: "знаци", verb: "да имаат" },
          file: { unit: "бајти", verb: "да имаат" },
          array: { unit: "ставки", verb: "да имаат" },
          set: { unit: "ставки", verb: "да имаат" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "внес",
          email: "адреса на е-пошта",
          url: "URL",
          emoji: "емоџи",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO датум и време",
          date: "ISO датум",
          time: "ISO време",
          duration: "ISO времетраење",
          ipv4: "IPv4 адреса",
          ipv6: "IPv6 адреса",
          cidrv4: "IPv4 опсег",
          cidrv6: "IPv6 опсег",
          base64: "base64-енкодирана низа",
          base64url: "base64url-енкодирана низа",
          json_string: "JSON низа",
          e164: "E.164 број",
          jwt: "JWT",
          template_literal: "внес"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "број",
          array: "низа"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Грешен внес: се очекува instanceof ${issue2.expected}, примено ${received}`;
              }
              return `Грешен внес: се очекува ${expected}, примено ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
              return `Грешана опција: се очекува една ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да има ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементи"}`;
              return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да биде ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Премногу мал: се очекува ${issue2.origin} да има ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Премногу мал: се очекува ${issue2.origin} да биде ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
              return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Грешен број: мора да биде делив со ${issue2.divisor}`;
            case "unrecognized_keys":
              return `${issue2.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Грешен клуч во ${issue2.origin}`;
            case "invalid_union":
              return "Грешен внес";
            case "invalid_element":
              return `Грешна вредност во ${issue2.origin}`;
            default:
              return `Грешен внес`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ms.js
  function ms_default() {
    return {
      localeError: error30()
    };
  }
  var error30;
  var init_ms = __esm({
    "node_modules/zod/v4/locales/ms.js"() {
      init_util();
      error30 = () => {
        const Sizable = {
          string: { unit: "aksara", verb: "mempunyai" },
          file: { unit: "bait", verb: "mempunyai" },
          array: { unit: "elemen", verb: "mempunyai" },
          set: { unit: "elemen", verb: "mempunyai" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "input",
          email: "alamat e-mel",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "tarikh masa ISO",
          date: "tarikh ISO",
          time: "masa ISO",
          duration: "tempoh ISO",
          ipv4: "alamat IPv4",
          ipv6: "alamat IPv6",
          cidrv4: "julat IPv4",
          cidrv6: "julat IPv6",
          base64: "string dikodkan base64",
          base64url: "string dikodkan base64url",
          json_string: "string JSON",
          e164: "nombor E.164",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "nombor"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
              }
              return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
              return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
              return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
              return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
            }
            case "not_multiple_of":
              return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Kunci tidak sah dalam ${issue2.origin}`;
            case "invalid_union":
              return "Input tidak sah";
            case "invalid_element":
              return `Nilai tidak sah dalam ${issue2.origin}`;
            default:
              return `Input tidak sah`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/nl.js
  function nl_default() {
    return {
      localeError: error31()
    };
  }
  var error31;
  var init_nl = __esm({
    "node_modules/zod/v4/locales/nl.js"() {
      init_util();
      error31 = () => {
        const Sizable = {
          string: { unit: "tekens", verb: "heeft" },
          file: { unit: "bytes", verb: "heeft" },
          array: { unit: "elementen", verb: "heeft" },
          set: { unit: "elementen", verb: "heeft" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "invoer",
          email: "emailadres",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO datum en tijd",
          date: "ISO datum",
          time: "ISO tijd",
          duration: "ISO duur",
          ipv4: "IPv4-adres",
          ipv6: "IPv6-adres",
          cidrv4: "IPv4-bereik",
          cidrv6: "IPv6-bereik",
          base64: "base64-gecodeerde tekst",
          base64url: "base64 URL-gecodeerde tekst",
          json_string: "JSON string",
          e164: "E.164-nummer",
          jwt: "JWT",
          template_literal: "invoer"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "getal"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
              }
              return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
              return `Ongeldige optie: verwacht één van ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
              if (sizing)
                return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
              return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
              if (sizing) {
                return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
              }
              return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
              }
              if (_issue.format === "ends_with")
                return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
              if (_issue.format === "includes")
                return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
              if (_issue.format === "regex")
                return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
              return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
            case "unrecognized_keys":
              return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Ongeldige key in ${issue2.origin}`;
            case "invalid_union":
              return "Ongeldige invoer";
            case "invalid_element":
              return `Ongeldige waarde in ${issue2.origin}`;
            default:
              return `Ongeldige invoer`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/no.js
  function no_default() {
    return {
      localeError: error32()
    };
  }
  var error32;
  var init_no = __esm({
    "node_modules/zod/v4/locales/no.js"() {
      init_util();
      error32 = () => {
        const Sizable = {
          string: { unit: "tegn", verb: "å ha" },
          file: { unit: "bytes", verb: "å ha" },
          array: { unit: "elementer", verb: "å inneholde" },
          set: { unit: "elementer", verb: "å inneholde" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "input",
          email: "e-postadresse",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO dato- og klokkeslett",
          date: "ISO-dato",
          time: "ISO-klokkeslett",
          duration: "ISO-varighet",
          ipv4: "IPv4-område",
          ipv6: "IPv6-område",
          cidrv4: "IPv4-spekter",
          cidrv6: "IPv6-spekter",
          base64: "base64-enkodet streng",
          base64url: "base64url-enkodet streng",
          json_string: "JSON-streng",
          e164: "E.164-nummer",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "tall",
          array: "liste"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
              }
              return `Ugyldig input: forventet ${expected}, fikk ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
              return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
              return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Ugyldig streng: må starte med "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Ugyldig streng: må ende med "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Ugyldig streng: må inneholde "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
              return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Ugyldig tall: må være et multiplum av ${issue2.divisor}`;
            case "unrecognized_keys":
              return `${issue2.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Ugyldig nøkkel i ${issue2.origin}`;
            case "invalid_union":
              return "Ugyldig input";
            case "invalid_element":
              return `Ugyldig verdi i ${issue2.origin}`;
            default:
              return `Ugyldig input`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ota.js
  function ota_default() {
    return {
      localeError: error33()
    };
  }
  var error33;
  var init_ota = __esm({
    "node_modules/zod/v4/locales/ota.js"() {
      init_util();
      error33 = () => {
        const Sizable = {
          string: { unit: "harf", verb: "olmalıdır" },
          file: { unit: "bayt", verb: "olmalıdır" },
          array: { unit: "unsur", verb: "olmalıdır" },
          set: { unit: "unsur", verb: "olmalıdır" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "giren",
          email: "epostagâh",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO hengâmı",
          date: "ISO tarihi",
          time: "ISO zamanı",
          duration: "ISO müddeti",
          ipv4: "IPv4 nişânı",
          ipv6: "IPv6 nişânı",
          cidrv4: "IPv4 menzili",
          cidrv6: "IPv6 menzili",
          base64: "base64-şifreli metin",
          base64url: "base64url-şifreli metin",
          json_string: "JSON metin",
          e164: "E.164 sayısı",
          jwt: "JWT",
          template_literal: "giren"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "numara",
          array: "saf",
          null: "gayb"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Fâsit giren: umulan instanceof ${issue2.expected}, alınan ${received}`;
              }
              return `Fâsit giren: umulan ${expected}, alınan ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Fâsit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
              return `Fâsit tercih: mûteberler ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
              return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmalıydı.`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
              }
              return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmalıydı.`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
              if (_issue.format === "ends_with")
                return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
              if (_issue.format === "includes")
                return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
              if (_issue.format === "regex")
                return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
              return `Fâsit ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Fâsit sayı: ${issue2.divisor} katı olmalıydı.`;
            case "unrecognized_keys":
              return `Tanınmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `${issue2.origin} için tanınmayan anahtar var.`;
            case "invalid_union":
              return "Giren tanınamadı.";
            case "invalid_element":
              return `${issue2.origin} için tanınmayan kıymet var.`;
            default:
              return `Kıymet tanınamadı.`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ps.js
  function ps_default() {
    return {
      localeError: error34()
    };
  }
  var error34;
  var init_ps = __esm({
    "node_modules/zod/v4/locales/ps.js"() {
      init_util();
      error34 = () => {
        const Sizable = {
          string: { unit: "توکي", verb: "ولري" },
          file: { unit: "بایټس", verb: "ولري" },
          array: { unit: "توکي", verb: "ولري" },
          set: { unit: "توکي", verb: "ولري" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "ورودي",
          email: "بریښنالیک",
          url: "یو آر ال",
          emoji: "ایموجي",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "نیټه او وخت",
          date: "نېټه",
          time: "وخت",
          duration: "موده",
          ipv4: "د IPv4 پته",
          ipv6: "د IPv6 پته",
          cidrv4: "د IPv4 ساحه",
          cidrv6: "د IPv6 ساحه",
          base64: "base64-encoded متن",
          base64url: "base64url-encoded متن",
          json_string: "JSON متن",
          e164: "د E.164 شمېره",
          jwt: "JWT",
          template_literal: "ورودي"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "عدد",
          array: "ارې"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `ناسم ورودي: باید instanceof ${issue2.expected} وای, مګر ${received} ترلاسه شو`;
              }
              return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
            }
            case "invalid_value":
              if (issue2.values.length === 1) {
                return `ناسم ورودي: باید ${stringifyPrimitive(issue2.values[0])} وای`;
              }
              return `ناسم انتخاب: باید یو له ${joinValues(issue2.values, "|")} څخه وای`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
              }
              return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} وي`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} ولري`;
              }
              return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} وي`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
              }
              if (_issue.format === "ends_with") {
                return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
              }
              if (_issue.format === "includes") {
                return `ناسم متن: باید "${_issue.includes}" ولري`;
              }
              if (_issue.format === "regex") {
                return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
              }
              return `${FormatDictionary[_issue.format] ?? issue2.format} ناسم دی`;
            }
            case "not_multiple_of":
              return `ناسم عدد: باید د ${issue2.divisor} مضرب وي`;
            case "unrecognized_keys":
              return `ناسم ${issue2.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `ناسم کلیډ په ${issue2.origin} کې`;
            case "invalid_union":
              return `ناسمه ورودي`;
            case "invalid_element":
              return `ناسم عنصر په ${issue2.origin} کې`;
            default:
              return `ناسمه ورودي`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/pl.js
  function pl_default() {
    return {
      localeError: error35()
    };
  }
  var error35;
  var init_pl = __esm({
    "node_modules/zod/v4/locales/pl.js"() {
      init_util();
      error35 = () => {
        const Sizable = {
          string: { unit: "znaków", verb: "mieć" },
          file: { unit: "bajtów", verb: "mieć" },
          array: { unit: "elementów", verb: "mieć" },
          set: { unit: "elementów", verb: "mieć" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "wyrażenie",
          email: "adres email",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "data i godzina w formacie ISO",
          date: "data w formacie ISO",
          time: "godzina w formacie ISO",
          duration: "czas trwania ISO",
          ipv4: "adres IPv4",
          ipv6: "adres IPv6",
          cidrv4: "zakres IPv4",
          cidrv6: "zakres IPv6",
          base64: "ciąg znaków zakodowany w formacie base64",
          base64url: "ciąg znaków zakodowany w formacie base64url",
          json_string: "ciąg znaków w formacie JSON",
          e164: "liczba E.164",
          jwt: "JWT",
          template_literal: "wejście"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "liczba",
          array: "tablica"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
              }
              return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Nieprawidłowe dane wejściowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
              return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Za duża wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementów"}`;
              }
              return `Zbyt duż(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Za mała wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "elementów"}`;
              }
              return `Zbyt mał(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
              return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Nieprawidłowa liczba: musi być wielokrotnością ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Nieprawidłowy klucz w ${issue2.origin}`;
            case "invalid_union":
              return "Nieprawidłowe dane wejściowe";
            case "invalid_element":
              return `Nieprawidłowa wartość w ${issue2.origin}`;
            default:
              return `Nieprawidłowe dane wejściowe`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/pt.js
  function pt_default() {
    return {
      localeError: error36()
    };
  }
  var error36;
  var init_pt = __esm({
    "node_modules/zod/v4/locales/pt.js"() {
      init_util();
      error36 = () => {
        const Sizable = {
          string: { unit: "caracteres", verb: "ter" },
          file: { unit: "bytes", verb: "ter" },
          array: { unit: "itens", verb: "ter" },
          set: { unit: "itens", verb: "ter" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "padrão",
          email: "endereço de e-mail",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "data e hora ISO",
          date: "data ISO",
          time: "hora ISO",
          duration: "duração ISO",
          ipv4: "endereço IPv4",
          ipv6: "endereço IPv6",
          cidrv4: "faixa de IPv4",
          cidrv6: "faixa de IPv6",
          base64: "texto codificado em base64",
          base64url: "URL codificada em base64",
          json_string: "texto JSON",
          e164: "número E.164",
          jwt: "JWT",
          template_literal: "entrada"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "número",
          null: "nulo"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Tipo inválido: esperado instanceof ${issue2.expected}, recebido ${received}`;
              }
              return `Tipo inválido: esperado ${expected}, recebido ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Entrada inválida: esperado ${stringifyPrimitive(issue2.values[0])}`;
              return `Opção inválida: esperada uma das ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
              return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Texto inválido: deve começar com "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Texto inválido: deve terminar com "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Texto inválido: deve incluir "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
              return `${FormatDictionary[_issue.format] ?? issue2.format} inválido`;
            }
            case "not_multiple_of":
              return `Número inválido: deve ser múltiplo de ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Chave inválida em ${issue2.origin}`;
            case "invalid_union":
              return "Entrada inválida";
            case "invalid_element":
              return `Valor inválido em ${issue2.origin}`;
            default:
              return `Campo inválido`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ro.js
  function ro_default() {
    return {
      localeError: error37()
    };
  }
  var error37;
  var init_ro = __esm({
    "node_modules/zod/v4/locales/ro.js"() {
      init_util();
      error37 = () => {
        const Sizable = {
          string: { unit: "caractere", verb: "să aibă" },
          file: { unit: "octeți", verb: "să aibă" },
          array: { unit: "elemente", verb: "să aibă" },
          set: { unit: "elemente", verb: "să aibă" },
          map: { unit: "intrări", verb: "să aibă" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "intrare",
          email: "adresă de email",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "dată și oră ISO",
          date: "dată ISO",
          time: "oră ISO",
          duration: "durată ISO",
          ipv4: "adresă IPv4",
          ipv6: "adresă IPv6",
          mac: "adresă MAC",
          cidrv4: "interval IPv4",
          cidrv6: "interval IPv6",
          base64: "șir codat base64",
          base64url: "șir codat base64url",
          json_string: "șir JSON",
          e164: "număr E.164",
          jwt: "JWT",
          template_literal: "intrare"
        };
        const TypeDictionary = {
          nan: "NaN",
          string: "șir",
          number: "număr",
          boolean: "boolean",
          function: "funcție",
          array: "matrice",
          object: "obiect",
          undefined: "nedefinit",
          symbol: "simbol",
          bigint: "număr mare",
          void: "void",
          never: "never",
          map: "hartă",
          set: "set"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              return `Intrare invalidă: așteptat ${expected}, primit ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Intrare invalidă: așteptat ${stringifyPrimitive(issue2.values[0])}`;
              return `Opțiune invalidă: așteptat una dintre ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Prea mare: așteptat ca ${issue2.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemente"}`;
              return `Prea mare: așteptat ca ${issue2.origin ?? "valoarea"} să fie ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Prea mic: așteptat ca ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Prea mic: așteptat ca ${issue2.origin} să fie ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Șir invalid: trebuie să înceapă cu "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Șir invalid: trebuie să se termine cu "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Șir invalid: trebuie să includă "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Șir invalid: trebuie să se potrivească cu modelul ${_issue.pattern}`;
              return `Format invalid: ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Număr invalid: trebuie să fie multiplu de ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Chei nerecunoscute: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Cheie invalidă în ${issue2.origin}`;
            case "invalid_union":
              return "Intrare invalidă";
            case "invalid_element":
              return `Valoare invalidă în ${issue2.origin}`;
            default:
              return `Intrare invalidă`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ru.js
  function getRussianPlural(count, one, few, many) {
    const absCount = Math.abs(count);
    const lastDigit = absCount % 10;
    const lastTwoDigits = absCount % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return many;
    }
    if (lastDigit === 1) {
      return one;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return few;
    }
    return many;
  }
  function ru_default() {
    return {
      localeError: error38()
    };
  }
  var error38;
  var init_ru = __esm({
    "node_modules/zod/v4/locales/ru.js"() {
      init_util();
      error38 = () => {
        const Sizable = {
          string: {
            unit: {
              one: "символ",
              few: "символа",
              many: "символов"
            },
            verb: "иметь"
          },
          file: {
            unit: {
              one: "байт",
              few: "байта",
              many: "байт"
            },
            verb: "иметь"
          },
          array: {
            unit: {
              one: "элемент",
              few: "элемента",
              many: "элементов"
            },
            verb: "иметь"
          },
          set: {
            unit: {
              one: "элемент",
              few: "элемента",
              many: "элементов"
            },
            verb: "иметь"
          }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "ввод",
          email: "email адрес",
          url: "URL",
          emoji: "эмодзи",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO дата и время",
          date: "ISO дата",
          time: "ISO время",
          duration: "ISO длительность",
          ipv4: "IPv4 адрес",
          ipv6: "IPv6 адрес",
          cidrv4: "IPv4 диапазон",
          cidrv6: "IPv6 диапазон",
          base64: "строка в формате base64",
          base64url: "строка в формате base64url",
          json_string: "JSON строка",
          e164: "номер E.164",
          jwt: "JWT",
          template_literal: "ввод"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "число",
          array: "массив"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Неверный ввод: ожидалось instanceof ${issue2.expected}, получено ${received}`;
              }
              return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Неверный ввод: ожидалось ${stringifyPrimitive(issue2.values[0])}`;
              return `Неверный вариант: ожидалось одно из ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                const maxValue = Number(issue2.maximum);
                const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет иметь ${adj}${issue2.maximum.toString()} ${unit}`;
              }
              return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                const minValue = Number(issue2.minimum);
                const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
                return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет иметь ${adj}${issue2.minimum.toString()} ${unit}`;
              }
              return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Неверная строка: должна содержать "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
              return `Неверный ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Неверное число: должно быть кратным ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Нераспознанн${issue2.keys.length > 1 ? "ые" : "ый"} ключ${issue2.keys.length > 1 ? "и" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Неверный ключ в ${issue2.origin}`;
            case "invalid_union":
              return "Неверные входные данные";
            case "invalid_element":
              return `Неверное значение в ${issue2.origin}`;
            default:
              return `Неверные входные данные`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/sl.js
  function sl_default() {
    return {
      localeError: error39()
    };
  }
  var error39;
  var init_sl = __esm({
    "node_modules/zod/v4/locales/sl.js"() {
      init_util();
      error39 = () => {
        const Sizable = {
          string: { unit: "znakov", verb: "imeti" },
          file: { unit: "bajtov", verb: "imeti" },
          array: { unit: "elementov", verb: "imeti" },
          set: { unit: "elementov", verb: "imeti" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "vnos",
          email: "e-poštni naslov",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO datum in čas",
          date: "ISO datum",
          time: "ISO čas",
          duration: "ISO trajanje",
          ipv4: "IPv4 naslov",
          ipv6: "IPv6 naslov",
          cidrv4: "obseg IPv4",
          cidrv6: "obseg IPv6",
          base64: "base64 kodiran niz",
          base64url: "base64url kodiran niz",
          json_string: "JSON niz",
          e164: "E.164 številka",
          jwt: "JWT",
          template_literal: "vnos"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "število",
          array: "tabela"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Neveljaven vnos: pričakovano instanceof ${issue2.expected}, prejeto ${received}`;
              }
              return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Neveljaven vnos: pričakovano ${stringifyPrimitive(issue2.values[0])}`;
              return `Neveljavna možnost: pričakovano eno izmed ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
              return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Premajhno: pričakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Premajhno: pričakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
              return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Neveljavno število: mora biti večkratnik ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Neprepoznan${issue2.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Neveljaven ključ v ${issue2.origin}`;
            case "invalid_union":
              return "Neveljaven vnos";
            case "invalid_element":
              return `Neveljavna vrednost v ${issue2.origin}`;
            default:
              return "Neveljaven vnos";
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/sv.js
  function sv_default() {
    return {
      localeError: error40()
    };
  }
  var error40;
  var init_sv = __esm({
    "node_modules/zod/v4/locales/sv.js"() {
      init_util();
      error40 = () => {
        const Sizable = {
          string: { unit: "tecken", verb: "att ha" },
          file: { unit: "bytes", verb: "att ha" },
          array: { unit: "objekt", verb: "att innehålla" },
          set: { unit: "objekt", verb: "att innehålla" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "reguljärt uttryck",
          email: "e-postadress",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO-datum och tid",
          date: "ISO-datum",
          time: "ISO-tid",
          duration: "ISO-varaktighet",
          ipv4: "IPv4-intervall",
          ipv6: "IPv6-intervall",
          cidrv4: "IPv4-spektrum",
          cidrv6: "IPv6-spektrum",
          base64: "base64-kodad sträng",
          base64url: "base64url-kodad sträng",
          json_string: "JSON-sträng",
          e164: "E.164-nummer",
          jwt: "JWT",
          template_literal: "mall-literal"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "antal",
          array: "lista"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Ogiltig inmatning: förväntat instanceof ${issue2.expected}, fick ${received}`;
              }
              return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Ogiltig inmatning: förväntat ${stringifyPrimitive(issue2.values[0])}`;
              return `Ogiltigt val: förväntade en av ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `För stor(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
              }
              return `För stor(t): förväntat ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
              return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Ogiltigt tal: måste vara en multipel av ${issue2.divisor}`;
            case "unrecognized_keys":
              return `${issue2.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Ogiltig nyckel i ${issue2.origin ?? "värdet"}`;
            case "invalid_union":
              return "Ogiltig input";
            case "invalid_element":
              return `Ogiltigt värde i ${issue2.origin ?? "värdet"}`;
            default:
              return `Ogiltig input`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ta.js
  function ta_default() {
    return {
      localeError: error41()
    };
  }
  var error41;
  var init_ta = __esm({
    "node_modules/zod/v4/locales/ta.js"() {
      init_util();
      error41 = () => {
        const Sizable = {
          string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
          file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
          array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
          set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "உள்ளீடு",
          email: "மின்னஞ்சல் முகவரி",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO தேதி நேரம்",
          date: "ISO தேதி",
          time: "ISO நேரம்",
          duration: "ISO கால அளவு",
          ipv4: "IPv4 முகவரி",
          ipv6: "IPv6 முகவரி",
          cidrv4: "IPv4 வரம்பு",
          cidrv6: "IPv6 வரம்பு",
          base64: "base64-encoded சரம்",
          base64url: "base64url-encoded சரம்",
          json_string: "JSON சரம்",
          e164: "E.164 எண்",
          jwt: "JWT",
          template_literal: "input"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "எண்",
          array: "அணி",
          null: "வெறுமை"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue2.expected}, பெறப்பட்டது ${received}`;
              }
              return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${stringifyPrimitive(issue2.values[0])}`;
              return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${joinValues(issue2.values, "|")} இல் ஒன்று`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
              }
              return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ஆக இருக்க வேண்டும்`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
              }
              return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ஆக இருக்க வேண்டும்`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
              if (_issue.format === "ends_with")
                return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
              if (_issue.format === "includes")
                return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
              if (_issue.format === "regex")
                return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
              return `தவறான ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `தவறான எண்: ${issue2.divisor} இன் பலமாக இருக்க வேண்டும்`;
            case "unrecognized_keys":
              return `அடையாளம் தெரியாத விசை${issue2.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `${issue2.origin} இல் தவறான விசை`;
            case "invalid_union":
              return "தவறான உள்ளீடு";
            case "invalid_element":
              return `${issue2.origin} இல் தவறான மதிப்பு`;
            default:
              return `தவறான உள்ளீடு`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/th.js
  function th_default() {
    return {
      localeError: error42()
    };
  }
  var error42;
  var init_th = __esm({
    "node_modules/zod/v4/locales/th.js"() {
      init_util();
      error42 = () => {
        const Sizable = {
          string: { unit: "ตัวอักษร", verb: "ควรมี" },
          file: { unit: "ไบต์", verb: "ควรมี" },
          array: { unit: "รายการ", verb: "ควรมี" },
          set: { unit: "รายการ", verb: "ควรมี" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "ข้อมูลที่ป้อน",
          email: "ที่อยู่อีเมล",
          url: "URL",
          emoji: "อิโมจิ",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "วันที่เวลาแบบ ISO",
          date: "วันที่แบบ ISO",
          time: "เวลาแบบ ISO",
          duration: "ช่วงเวลาแบบ ISO",
          ipv4: "ที่อยู่ IPv4",
          ipv6: "ที่อยู่ IPv6",
          cidrv4: "ช่วง IP แบบ IPv4",
          cidrv6: "ช่วง IP แบบ IPv6",
          base64: "ข้อความแบบ Base64",
          base64url: "ข้อความแบบ Base64 สำหรับ URL",
          json_string: "ข้อความแบบ JSON",
          e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
          jwt: "โทเคน JWT",
          template_literal: "ข้อมูลที่ป้อน"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "ตัวเลข",
          array: "อาร์เรย์ (Array)",
          null: "ไม่มีค่า (null)"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue2.expected} แต่ได้รับ ${received}`;
              }
              return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `ค่าไม่ถูกต้อง: ควรเป็น ${stringifyPrimitive(issue2.values[0])}`;
              return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "ไม่เกิน" : "น้อยกว่า";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
              return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? "อย่างน้อย" : "มากกว่า";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
              }
              if (_issue.format === "ends_with")
                return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
              if (_issue.format === "regex")
                return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
              return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue2.divisor} ได้ลงตัว`;
            case "unrecognized_keys":
              return `พบคีย์ที่ไม่รู้จัก: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `คีย์ไม่ถูกต้องใน ${issue2.origin}`;
            case "invalid_union":
              return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
            case "invalid_element":
              return `ข้อมูลไม่ถูกต้องใน ${issue2.origin}`;
            default:
              return `ข้อมูลไม่ถูกต้อง`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/tr.js
  function tr_default() {
    return {
      localeError: error43()
    };
  }
  var error43;
  var init_tr = __esm({
    "node_modules/zod/v4/locales/tr.js"() {
      init_util();
      error43 = () => {
        const Sizable = {
          string: { unit: "karakter", verb: "olmalı" },
          file: { unit: "bayt", verb: "olmalı" },
          array: { unit: "öğe", verb: "olmalı" },
          set: { unit: "öğe", verb: "olmalı" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "girdi",
          email: "e-posta adresi",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO tarih ve saat",
          date: "ISO tarih",
          time: "ISO saat",
          duration: "ISO süre",
          ipv4: "IPv4 adresi",
          ipv6: "IPv6 adresi",
          cidrv4: "IPv4 aralığı",
          cidrv6: "IPv6 aralığı",
          base64: "base64 ile şifrelenmiş metin",
          base64url: "base64url ile şifrelenmiş metin",
          json_string: "JSON dizesi",
          e164: "E.164 sayısı",
          jwt: "JWT",
          template_literal: "Şablon dizesi"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Geçersiz değer: beklenen instanceof ${issue2.expected}, alınan ${received}`;
              }
              return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Geçersiz değer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
              return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "öğe"}`;
              return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
              if (_issue.format === "ends_with")
                return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
              if (_issue.format === "includes")
                return `Geçersiz metin: "${_issue.includes}" içermeli`;
              if (_issue.format === "regex")
                return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
              return `Geçersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Geçersiz sayı: ${issue2.divisor} ile tam bölünebilmeli`;
            case "unrecognized_keys":
              return `Tanınmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `${issue2.origin} içinde geçersiz anahtar`;
            case "invalid_union":
              return "Geçersiz değer";
            case "invalid_element":
              return `${issue2.origin} içinde geçersiz değer`;
            default:
              return `Geçersiz değer`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/uk.js
  function uk_default() {
    return {
      localeError: error44()
    };
  }
  var error44;
  var init_uk = __esm({
    "node_modules/zod/v4/locales/uk.js"() {
      init_util();
      error44 = () => {
        const Sizable = {
          string: { unit: "символів", verb: "матиме" },
          file: { unit: "байтів", verb: "матиме" },
          array: { unit: "елементів", verb: "матиме" },
          set: { unit: "елементів", verb: "матиме" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "вхідні дані",
          email: "адреса електронної пошти",
          url: "URL",
          emoji: "емодзі",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "дата та час ISO",
          date: "дата ISO",
          time: "час ISO",
          duration: "тривалість ISO",
          ipv4: "адреса IPv4",
          ipv6: "адреса IPv6",
          cidrv4: "діапазон IPv4",
          cidrv6: "діапазон IPv6",
          base64: "рядок у кодуванні base64",
          base64url: "рядок у кодуванні base64url",
          json_string: "рядок JSON",
          e164: "номер E.164",
          jwt: "JWT",
          template_literal: "вхідні дані"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "число",
          array: "масив"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Неправильні вхідні дані: очікується instanceof ${issue2.expected}, отримано ${received}`;
              }
              return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Неправильні вхідні дані: очікується ${stringifyPrimitive(issue2.values[0])}`;
              return `Неправильна опція: очікується одне з ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементів"}`;
              return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} буде ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Занадто мале: очікується, що ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Занадто мале: очікується, що ${issue2.origin} буде ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Неправильний рядок: повинен містити "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
              return `Неправильний ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Неправильне число: повинно бути кратним ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Нерозпізнаний ключ${issue2.keys.length > 1 ? "і" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Неправильний ключ у ${issue2.origin}`;
            case "invalid_union":
              return "Неправильні вхідні дані";
            case "invalid_element":
              return `Неправильне значення у ${issue2.origin}`;
            default:
              return `Неправильні вхідні дані`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/ua.js
  function ua_default() {
    return uk_default();
  }
  var init_ua = __esm({
    "node_modules/zod/v4/locales/ua.js"() {
      init_uk();
    }
  });

  // node_modules/zod/v4/locales/ur.js
  function ur_default() {
    return {
      localeError: error45()
    };
  }
  var error45;
  var init_ur = __esm({
    "node_modules/zod/v4/locales/ur.js"() {
      init_util();
      error45 = () => {
        const Sizable = {
          string: { unit: "حروف", verb: "ہونا" },
          file: { unit: "بائٹس", verb: "ہونا" },
          array: { unit: "آئٹمز", verb: "ہونا" },
          set: { unit: "آئٹمز", verb: "ہونا" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "ان پٹ",
          email: "ای میل ایڈریس",
          url: "یو آر ایل",
          emoji: "ایموجی",
          uuid: "یو یو آئی ڈی",
          uuidv4: "یو یو آئی ڈی وی 4",
          uuidv6: "یو یو آئی ڈی وی 6",
          nanoid: "نینو آئی ڈی",
          guid: "جی یو آئی ڈی",
          cuid: "سی یو آئی ڈی",
          cuid2: "سی یو آئی ڈی 2",
          ulid: "یو ایل آئی ڈی",
          xid: "ایکس آئی ڈی",
          ksuid: "کے ایس یو آئی ڈی",
          datetime: "آئی ایس او ڈیٹ ٹائم",
          date: "آئی ایس او تاریخ",
          time: "آئی ایس او وقت",
          duration: "آئی ایس او مدت",
          ipv4: "آئی پی وی 4 ایڈریس",
          ipv6: "آئی پی وی 6 ایڈریس",
          cidrv4: "آئی پی وی 4 رینج",
          cidrv6: "آئی پی وی 6 رینج",
          base64: "بیس 64 ان کوڈڈ سٹرنگ",
          base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
          json_string: "جے ایس او این سٹرنگ",
          e164: "ای 164 نمبر",
          jwt: "جے ڈبلیو ٹی",
          template_literal: "ان پٹ"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "نمبر",
          array: "آرے",
          null: "نل"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `غلط ان پٹ: instanceof ${issue2.expected} متوقع تھا، ${received} موصول ہوا`;
              }
              return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `غلط ان پٹ: ${stringifyPrimitive(issue2.values[0])} متوقع تھا`;
              return `غلط آپشن: ${joinValues(issue2.values, "|")} میں سے ایک متوقع تھا`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کے ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
              return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کا ${adj}${issue2.maximum.toString()} ہونا متوقع تھا`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `بہت چھوٹا: ${issue2.origin} کے ${adj}${issue2.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
              }
              return `بہت چھوٹا: ${issue2.origin} کا ${adj}${issue2.minimum.toString()} ہونا متوقع تھا`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
              }
              if (_issue.format === "ends_with")
                return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
              if (_issue.format === "includes")
                return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
              if (_issue.format === "regex")
                return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
              return `غلط ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `غلط نمبر: ${issue2.divisor} کا مضاعف ہونا چاہیے`;
            case "unrecognized_keys":
              return `غیر تسلیم شدہ کی${issue2.keys.length > 1 ? "ز" : ""}: ${joinValues(issue2.keys, "، ")}`;
            case "invalid_key":
              return `${issue2.origin} میں غلط کی`;
            case "invalid_union":
              return "غلط ان پٹ";
            case "invalid_element":
              return `${issue2.origin} میں غلط ویلیو`;
            default:
              return `غلط ان پٹ`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/uz.js
  function uz_default() {
    return {
      localeError: error46()
    };
  }
  var error46;
  var init_uz = __esm({
    "node_modules/zod/v4/locales/uz.js"() {
      init_util();
      error46 = () => {
        const Sizable = {
          string: { unit: "belgi", verb: "bo‘lishi kerak" },
          file: { unit: "bayt", verb: "bo‘lishi kerak" },
          array: { unit: "element", verb: "bo‘lishi kerak" },
          set: { unit: "element", verb: "bo‘lishi kerak" },
          map: { unit: "yozuv", verb: "bo‘lishi kerak" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "kirish",
          email: "elektron pochta manzili",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO sana va vaqti",
          date: "ISO sana",
          time: "ISO vaqt",
          duration: "ISO davomiylik",
          ipv4: "IPv4 manzil",
          ipv6: "IPv6 manzil",
          mac: "MAC manzil",
          cidrv4: "IPv4 diapazon",
          cidrv6: "IPv6 diapazon",
          base64: "base64 kodlangan satr",
          base64url: "base64url kodlangan satr",
          json_string: "JSON satr",
          e164: "E.164 raqam",
          jwt: "JWT",
          template_literal: "kirish"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "raqam",
          array: "massiv"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Noto‘g‘ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
              }
              return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Noto‘g‘ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
              return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
              return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
              }
              return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
              if (_issue.format === "ends_with")
                return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
              if (_issue.format === "includes")
                return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
              if (_issue.format === "regex")
                return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
              return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Noto‘g‘ri raqam: ${issue2.divisor} ning karralisi bo‘lishi kerak`;
            case "unrecognized_keys":
              return `Noma’lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `${issue2.origin} dagi kalit noto‘g‘ri`;
            case "invalid_union":
              return "Noto‘g‘ri kirish";
            case "invalid_element":
              return `${issue2.origin} da noto‘g‘ri qiymat`;
            default:
              return `Noto‘g‘ri kirish`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/vi.js
  function vi_default() {
    return {
      localeError: error47()
    };
  }
  var error47;
  var init_vi = __esm({
    "node_modules/zod/v4/locales/vi.js"() {
      init_util();
      error47 = () => {
        const Sizable = {
          string: { unit: "ký tự", verb: "có" },
          file: { unit: "byte", verb: "có" },
          array: { unit: "phần tử", verb: "có" },
          set: { unit: "phần tử", verb: "có" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "đầu vào",
          email: "địa chỉ email",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ngày giờ ISO",
          date: "ngày ISO",
          time: "giờ ISO",
          duration: "khoảng thời gian ISO",
          ipv4: "địa chỉ IPv4",
          ipv6: "địa chỉ IPv6",
          cidrv4: "dải IPv4",
          cidrv6: "dải IPv6",
          base64: "chuỗi mã hóa base64",
          base64url: "chuỗi mã hóa base64url",
          json_string: "chuỗi JSON",
          e164: "số E.164",
          jwt: "JWT",
          template_literal: "đầu vào"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "số",
          array: "mảng"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Đầu vào không hợp lệ: mong đợi instanceof ${issue2.expected}, nhận được ${received}`;
              }
              return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Đầu vào không hợp lệ: mong đợi ${stringifyPrimitive(issue2.values[0])}`;
              return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
              return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `Quá nhỏ: mong đợi ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `Quá nhỏ: mong đợi ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
              return `${FormatDictionary[_issue.format] ?? issue2.format} không hợp lệ`;
            }
            case "not_multiple_of":
              return `Số không hợp lệ: phải là bội số của ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Khóa không được nhận dạng: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Khóa không hợp lệ trong ${issue2.origin}`;
            case "invalid_union":
              return "Đầu vào không hợp lệ";
            case "invalid_element":
              return `Giá trị không hợp lệ trong ${issue2.origin}`;
            default:
              return `Đầu vào không hợp lệ`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/zh-CN.js
  function zh_CN_default() {
    return {
      localeError: error48()
    };
  }
  var error48;
  var init_zh_CN = __esm({
    "node_modules/zod/v4/locales/zh-CN.js"() {
      init_util();
      error48 = () => {
        const Sizable = {
          string: { unit: "字符", verb: "包含" },
          file: { unit: "字节", verb: "包含" },
          array: { unit: "项", verb: "包含" },
          set: { unit: "项", verb: "包含" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "输入",
          email: "电子邮件",
          url: "URL",
          emoji: "表情符号",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO日期时间",
          date: "ISO日期",
          time: "ISO时间",
          duration: "ISO时长",
          ipv4: "IPv4地址",
          ipv6: "IPv6地址",
          cidrv4: "IPv4网段",
          cidrv6: "IPv6网段",
          base64: "base64编码字符串",
          base64url: "base64url编码字符串",
          json_string: "JSON字符串",
          e164: "E.164号码",
          jwt: "JWT",
          template_literal: "输入"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "数字",
          array: "数组",
          null: "空值(null)"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `无效输入：期望 instanceof ${issue2.expected}，实际接收 ${received}`;
              }
              return `无效输入：期望 ${expected}，实际接收 ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `无效输入：期望 ${stringifyPrimitive(issue2.values[0])}`;
              return `无效选项：期望以下之一 ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "个元素"}`;
              return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `无效字符串：必须以 "${_issue.prefix}" 开头`;
              if (_issue.format === "ends_with")
                return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
              if (_issue.format === "includes")
                return `无效字符串：必须包含 "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
              return `无效${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `无效数字：必须是 ${issue2.divisor} 的倍数`;
            case "unrecognized_keys":
              return `出现未知的键(key): ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `${issue2.origin} 中的键(key)无效`;
            case "invalid_union":
              return "无效输入";
            case "invalid_element":
              return `${issue2.origin} 中包含无效值(value)`;
            default:
              return `无效输入`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/zh-TW.js
  function zh_TW_default() {
    return {
      localeError: error49()
    };
  }
  var error49;
  var init_zh_TW = __esm({
    "node_modules/zod/v4/locales/zh-TW.js"() {
      init_util();
      error49 = () => {
        const Sizable = {
          string: { unit: "字元", verb: "擁有" },
          file: { unit: "位元組", verb: "擁有" },
          array: { unit: "項目", verb: "擁有" },
          set: { unit: "項目", verb: "擁有" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "輸入",
          email: "郵件地址",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "ISO 日期時間",
          date: "ISO 日期",
          time: "ISO 時間",
          duration: "ISO 期間",
          ipv4: "IPv4 位址",
          ipv6: "IPv6 位址",
          cidrv4: "IPv4 範圍",
          cidrv6: "IPv6 範圍",
          base64: "base64 編碼字串",
          base64url: "base64url 編碼字串",
          json_string: "JSON 字串",
          e164: "E.164 數值",
          jwt: "JWT",
          template_literal: "輸入"
        };
        const TypeDictionary = {
          nan: "NaN"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `無效的輸入值：預期為 instanceof ${issue2.expected}，但收到 ${received}`;
              }
              return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `無效的輸入值：預期為 ${stringifyPrimitive(issue2.values[0])}`;
              return `無效的選項：預期為以下其中之一 ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "個元素"}`;
              return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing) {
                return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
              }
              return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with") {
                return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
              }
              if (_issue.format === "ends_with")
                return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
              if (_issue.format === "includes")
                return `無效的字串：必須包含 "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `無效的字串：必須符合格式 ${_issue.pattern}`;
              return `無效的 ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `無效的數字：必須為 ${issue2.divisor} 的倍數`;
            case "unrecognized_keys":
              return `無法識別的鍵值${issue2.keys.length > 1 ? "們" : ""}：${joinValues(issue2.keys, "、")}`;
            case "invalid_key":
              return `${issue2.origin} 中有無效的鍵值`;
            case "invalid_union":
              return "無效的輸入值";
            case "invalid_element":
              return `${issue2.origin} 中有無效的值`;
            default:
              return `無效的輸入值`;
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/yo.js
  function yo_default() {
    return {
      localeError: error50()
    };
  }
  var error50;
  var init_yo = __esm({
    "node_modules/zod/v4/locales/yo.js"() {
      init_util();
      error50 = () => {
        const Sizable = {
          string: { unit: "àmi", verb: "ní" },
          file: { unit: "bytes", verb: "ní" },
          array: { unit: "nkan", verb: "ní" },
          set: { unit: "nkan", verb: "ní" }
        };
        function getSizing(origin) {
          return Sizable[origin] ?? null;
        }
        const FormatDictionary = {
          regex: "ẹ̀rọ ìbáwọlé",
          email: "àdírẹ́sì ìmẹ́lì",
          url: "URL",
          emoji: "emoji",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "àkókò ISO",
          date: "ọjọ́ ISO",
          time: "àkókò ISO",
          duration: "àkókò tó pé ISO",
          ipv4: "àdírẹ́sì IPv4",
          ipv6: "àdírẹ́sì IPv6",
          cidrv4: "àgbègbè IPv4",
          cidrv6: "àgbègbè IPv6",
          base64: "ọ̀rọ̀ tí a kọ́ ní base64",
          base64url: "ọ̀rọ̀ base64url",
          json_string: "ọ̀rọ̀ JSON",
          e164: "nọ́mbà E.164",
          jwt: "JWT",
          template_literal: "ẹ̀rọ ìbáwọlé"
        };
        const TypeDictionary = {
          nan: "NaN",
          number: "nọ́mbà",
          array: "akopọ"
        };
        return (issue2) => {
          switch (issue2.code) {
            case "invalid_type": {
              const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
              const receivedType = parsedType(issue2.input);
              const received = TypeDictionary[receivedType] ?? receivedType;
              if (/^[A-Z]/.test(issue2.expected)) {
                return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue2.expected}, àmọ̀ a rí ${received}`;
              }
              return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
            }
            case "invalid_value":
              if (issue2.values.length === 1)
                return `Ìbáwọlé aṣìṣe: a ní láti fi ${stringifyPrimitive(issue2.values[0])}`;
              return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${joinValues(issue2.values, "|")}`;
            case "too_big": {
              const adj = issue2.inclusive ? "<=" : "<";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
              return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue2.maximum}`;
            }
            case "too_small": {
              const adj = issue2.inclusive ? ">=" : ">";
              const sizing = getSizing(issue2.origin);
              if (sizing)
                return `Kéré ju: a ní láti jẹ́ pé ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
              return `Kéré ju: a ní láti jẹ́ ${adj}${issue2.minimum}`;
            }
            case "invalid_format": {
              const _issue = issue2;
              if (_issue.format === "starts_with")
                return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
              if (_issue.format === "ends_with")
                return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
              if (_issue.format === "includes")
                return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
              if (_issue.format === "regex")
                return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
              return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue2.format}`;
            }
            case "not_multiple_of":
              return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue2.divisor}`;
            case "unrecognized_keys":
              return `Bọtìnì àìmọ̀: ${joinValues(issue2.keys, ", ")}`;
            case "invalid_key":
              return `Bọtìnì aṣìṣe nínú ${issue2.origin}`;
            case "invalid_union":
              return "Ìbáwọlé aṣìṣe";
            case "invalid_element":
              return `Iye aṣìṣe nínú ${issue2.origin}`;
            default:
              return "Ìbáwọlé aṣìṣe";
          }
        };
      };
    }
  });

  // node_modules/zod/v4/locales/index.js
  var locales_exports = {};
  __export(locales_exports, {
    ar: () => ar_default,
    az: () => az_default,
    be: () => be_default,
    bg: () => bg_default,
    ca: () => ca_default,
    cs: () => cs_default,
    da: () => da_default,
    de: () => de_default,
    el: () => el_default,
    en: () => en_default,
    eo: () => eo_default,
    es: () => es_default,
    fa: () => fa_default,
    fi: () => fi_default,
    fr: () => fr_default,
    frCA: () => fr_CA_default,
    he: () => he_default,
    hr: () => hr_default,
    hu: () => hu_default,
    hy: () => hy_default,
    id: () => id_default,
    is: () => is_default,
    it: () => it_default,
    ja: () => ja_default,
    ka: () => ka_default,
    kh: () => kh_default,
    km: () => km_default,
    ko: () => ko_default,
    lt: () => lt_default,
    mk: () => mk_default,
    ms: () => ms_default,
    nl: () => nl_default,
    no: () => no_default,
    ota: () => ota_default,
    pl: () => pl_default,
    ps: () => ps_default,
    pt: () => pt_default,
    ro: () => ro_default,
    ru: () => ru_default,
    sl: () => sl_default,
    sv: () => sv_default,
    ta: () => ta_default,
    th: () => th_default,
    tr: () => tr_default,
    ua: () => ua_default,
    uk: () => uk_default,
    ur: () => ur_default,
    uz: () => uz_default,
    vi: () => vi_default,
    yo: () => yo_default,
    zhCN: () => zh_CN_default,
    zhTW: () => zh_TW_default
  });
  var init_locales = __esm({
    "node_modules/zod/v4/locales/index.js"() {
      init_ar();
      init_az();
      init_be();
      init_bg();
      init_ca();
      init_cs();
      init_da();
      init_de();
      init_el();
      init_en();
      init_eo();
      init_es();
      init_fa();
      init_fi();
      init_fr();
      init_fr_CA();
      init_he();
      init_hr();
      init_hu();
      init_hy();
      init_id();
      init_is();
      init_it();
      init_ja();
      init_ka();
      init_kh();
      init_km();
      init_ko();
      init_lt();
      init_mk();
      init_ms();
      init_nl();
      init_no();
      init_ota();
      init_ps();
      init_pl();
      init_pt();
      init_ro();
      init_ru();
      init_sl();
      init_sv();
      init_ta();
      init_th();
      init_tr();
      init_ua();
      init_uk();
      init_ur();
      init_uz();
      init_vi();
      init_zh_CN();
      init_zh_TW();
      init_yo();
    }
  });

  // node_modules/zod/v4/core/registries.js
  function registry() {
    return new $ZodRegistry();
  }
  var _a2, $output, $input, $ZodRegistry, globalRegistry;
  var init_registries = __esm({
    "node_modules/zod/v4/core/registries.js"() {
      $output = /* @__PURE__ */ Symbol("ZodOutput");
      $input = /* @__PURE__ */ Symbol("ZodInput");
      $ZodRegistry = class {
        constructor() {
          this._map = /* @__PURE__ */ new WeakMap();
          this._idmap = /* @__PURE__ */ new Map();
        }
        add(schema, ..._meta) {
          const meta3 = _meta[0];
          this._map.set(schema, meta3);
          if (meta3 && typeof meta3 === "object" && "id" in meta3) {
            this._idmap.set(meta3.id, schema);
          }
          return this;
        }
        clear() {
          this._map = /* @__PURE__ */ new WeakMap();
          this._idmap = /* @__PURE__ */ new Map();
          return this;
        }
        remove(schema) {
          const meta3 = this._map.get(schema);
          if (meta3 && typeof meta3 === "object" && "id" in meta3) {
            this._idmap.delete(meta3.id);
          }
          this._map.delete(schema);
          return this;
        }
        get(schema) {
          const p = schema._zod.parent;
          if (p) {
            const pm = { ...this.get(p) ?? {} };
            delete pm.id;
            const f2 = { ...pm, ...this._map.get(schema) };
            return Object.keys(f2).length ? f2 : void 0;
          }
          return this._map.get(schema);
        }
        has(schema) {
          return this._map.has(schema);
        }
      };
      (_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
      globalRegistry = globalThis.__zod_globalRegistry;
    }
  });

  // node_modules/zod/v4/core/api.js
  // @__NO_SIDE_EFFECTS__
  function _string(Class2, params) {
    return new Class2({
      type: "string",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _coercedString(Class2, params) {
    return new Class2({
      type: "string",
      coerce: true,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _email(Class2, params) {
    return new Class2({
      type: "string",
      format: "email",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _guid(Class2, params) {
    return new Class2({
      type: "string",
      format: "guid",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _uuid(Class2, params) {
    return new Class2({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _uuidv4(Class2, params) {
    return new Class2({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: false,
      version: "v4",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _uuidv6(Class2, params) {
    return new Class2({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: false,
      version: "v6",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _uuidv7(Class2, params) {
    return new Class2({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: false,
      version: "v7",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _url(Class2, params) {
    return new Class2({
      type: "string",
      format: "url",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _emoji2(Class2, params) {
    return new Class2({
      type: "string",
      format: "emoji",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _nanoid(Class2, params) {
    return new Class2({
      type: "string",
      format: "nanoid",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _cuid(Class2, params) {
    return new Class2({
      type: "string",
      format: "cuid",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _cuid2(Class2, params) {
    return new Class2({
      type: "string",
      format: "cuid2",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _ulid(Class2, params) {
    return new Class2({
      type: "string",
      format: "ulid",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _xid(Class2, params) {
    return new Class2({
      type: "string",
      format: "xid",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _ksuid(Class2, params) {
    return new Class2({
      type: "string",
      format: "ksuid",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _ipv4(Class2, params) {
    return new Class2({
      type: "string",
      format: "ipv4",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _ipv6(Class2, params) {
    return new Class2({
      type: "string",
      format: "ipv6",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _mac(Class2, params) {
    return new Class2({
      type: "string",
      format: "mac",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _cidrv4(Class2, params) {
    return new Class2({
      type: "string",
      format: "cidrv4",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _cidrv6(Class2, params) {
    return new Class2({
      type: "string",
      format: "cidrv6",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _base64(Class2, params) {
    return new Class2({
      type: "string",
      format: "base64",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _base64url(Class2, params) {
    return new Class2({
      type: "string",
      format: "base64url",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _e164(Class2, params) {
    return new Class2({
      type: "string",
      format: "e164",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _jwt(Class2, params) {
    return new Class2({
      type: "string",
      format: "jwt",
      check: "string_format",
      abort: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _isoDateTime(Class2, params) {
    return new Class2({
      type: "string",
      format: "datetime",
      check: "string_format",
      offset: false,
      local: false,
      precision: null,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _isoDate(Class2, params) {
    return new Class2({
      type: "string",
      format: "date",
      check: "string_format",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _isoTime(Class2, params) {
    return new Class2({
      type: "string",
      format: "time",
      check: "string_format",
      precision: null,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _isoDuration(Class2, params) {
    return new Class2({
      type: "string",
      format: "duration",
      check: "string_format",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _number(Class2, params) {
    return new Class2({
      type: "number",
      checks: [],
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _coercedNumber(Class2, params) {
    return new Class2({
      type: "number",
      coerce: true,
      checks: [],
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _int(Class2, params) {
    return new Class2({
      type: "number",
      check: "number_format",
      abort: false,
      format: "safeint",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _float32(Class2, params) {
    return new Class2({
      type: "number",
      check: "number_format",
      abort: false,
      format: "float32",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _float64(Class2, params) {
    return new Class2({
      type: "number",
      check: "number_format",
      abort: false,
      format: "float64",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _int32(Class2, params) {
    return new Class2({
      type: "number",
      check: "number_format",
      abort: false,
      format: "int32",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _uint32(Class2, params) {
    return new Class2({
      type: "number",
      check: "number_format",
      abort: false,
      format: "uint32",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _boolean(Class2, params) {
    return new Class2({
      type: "boolean",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _coercedBoolean(Class2, params) {
    return new Class2({
      type: "boolean",
      coerce: true,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _bigint(Class2, params) {
    return new Class2({
      type: "bigint",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _coercedBigint(Class2, params) {
    return new Class2({
      type: "bigint",
      coerce: true,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _int64(Class2, params) {
    return new Class2({
      type: "bigint",
      check: "bigint_format",
      abort: false,
      format: "int64",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _uint64(Class2, params) {
    return new Class2({
      type: "bigint",
      check: "bigint_format",
      abort: false,
      format: "uint64",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _symbol(Class2, params) {
    return new Class2({
      type: "symbol",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _undefined2(Class2, params) {
    return new Class2({
      type: "undefined",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _null2(Class2, params) {
    return new Class2({
      type: "null",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _any(Class2) {
    return new Class2({
      type: "any"
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _unknown(Class2) {
    return new Class2({
      type: "unknown"
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _never(Class2, params) {
    return new Class2({
      type: "never",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _void(Class2, params) {
    return new Class2({
      type: "void",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _date(Class2, params) {
    return new Class2({
      type: "date",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _coercedDate(Class2, params) {
    return new Class2({
      type: "date",
      coerce: true,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _nan(Class2, params) {
    return new Class2({
      type: "nan",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _lt(value, params) {
    return new $ZodCheckLessThan({
      check: "less_than",
      ...normalizeParams(params),
      value,
      inclusive: false
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _lte(value, params) {
    return new $ZodCheckLessThan({
      check: "less_than",
      ...normalizeParams(params),
      value,
      inclusive: true
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _gt(value, params) {
    return new $ZodCheckGreaterThan({
      check: "greater_than",
      ...normalizeParams(params),
      value,
      inclusive: false
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _gte(value, params) {
    return new $ZodCheckGreaterThan({
      check: "greater_than",
      ...normalizeParams(params),
      value,
      inclusive: true
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _positive(params) {
    return /* @__PURE__ */ _gt(0, params);
  }
  // @__NO_SIDE_EFFECTS__
  function _negative(params) {
    return /* @__PURE__ */ _lt(0, params);
  }
  // @__NO_SIDE_EFFECTS__
  function _nonpositive(params) {
    return /* @__PURE__ */ _lte(0, params);
  }
  // @__NO_SIDE_EFFECTS__
  function _nonnegative(params) {
    return /* @__PURE__ */ _gte(0, params);
  }
  // @__NO_SIDE_EFFECTS__
  function _multipleOf(value, params) {
    return new $ZodCheckMultipleOf({
      check: "multiple_of",
      ...normalizeParams(params),
      value
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _maxSize(maximum, params) {
    return new $ZodCheckMaxSize({
      check: "max_size",
      ...normalizeParams(params),
      maximum
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _minSize(minimum, params) {
    return new $ZodCheckMinSize({
      check: "min_size",
      ...normalizeParams(params),
      minimum
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _size(size, params) {
    return new $ZodCheckSizeEquals({
      check: "size_equals",
      ...normalizeParams(params),
      size
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _maxLength(maximum, params) {
    const ch = new $ZodCheckMaxLength({
      check: "max_length",
      ...normalizeParams(params),
      maximum
    });
    return ch;
  }
  // @__NO_SIDE_EFFECTS__
  function _minLength(minimum, params) {
    return new $ZodCheckMinLength({
      check: "min_length",
      ...normalizeParams(params),
      minimum
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _length(length, params) {
    return new $ZodCheckLengthEquals({
      check: "length_equals",
      ...normalizeParams(params),
      length
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _regex(pattern, params) {
    return new $ZodCheckRegex({
      check: "string_format",
      format: "regex",
      ...normalizeParams(params),
      pattern
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _lowercase(params) {
    return new $ZodCheckLowerCase({
      check: "string_format",
      format: "lowercase",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _uppercase(params) {
    return new $ZodCheckUpperCase({
      check: "string_format",
      format: "uppercase",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _includes(includes, params) {
    return new $ZodCheckIncludes({
      check: "string_format",
      format: "includes",
      ...normalizeParams(params),
      includes
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _startsWith(prefix, params) {
    return new $ZodCheckStartsWith({
      check: "string_format",
      format: "starts_with",
      ...normalizeParams(params),
      prefix
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _endsWith(suffix, params) {
    return new $ZodCheckEndsWith({
      check: "string_format",
      format: "ends_with",
      ...normalizeParams(params),
      suffix
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _property(property, schema, params) {
    return new $ZodCheckProperty({
      check: "property",
      property,
      schema,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _mime(types, params) {
    return new $ZodCheckMimeType({
      check: "mime_type",
      mime: types,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _overwrite(tx) {
    return new $ZodCheckOverwrite({
      check: "overwrite",
      tx
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _normalize(form) {
    return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
  }
  // @__NO_SIDE_EFFECTS__
  function _trim() {
    return /* @__PURE__ */ _overwrite((input) => input.trim());
  }
  // @__NO_SIDE_EFFECTS__
  function _toLowerCase() {
    return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
  }
  // @__NO_SIDE_EFFECTS__
  function _toUpperCase() {
    return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
  }
  // @__NO_SIDE_EFFECTS__
  function _slugify() {
    return /* @__PURE__ */ _overwrite((input) => slugify(input));
  }
  // @__NO_SIDE_EFFECTS__
  function _array(Class2, element, params) {
    return new Class2({
      type: "array",
      element,
      // get element() {
      //   return element;
      // },
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _union(Class2, options, params) {
    return new Class2({
      type: "union",
      options,
      ...normalizeParams(params)
    });
  }
  function _xor(Class2, options, params) {
    return new Class2({
      type: "union",
      options,
      inclusive: false,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _discriminatedUnion(Class2, discriminator, options, params) {
    return new Class2({
      type: "union",
      options,
      discriminator,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _intersection(Class2, left, right) {
    return new Class2({
      type: "intersection",
      left,
      right
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _tuple(Class2, items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof $ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new Class2({
      type: "tuple",
      items,
      rest,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _record(Class2, keyType, valueType, params) {
    return new Class2({
      type: "record",
      keyType,
      valueType,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _map(Class2, keyType, valueType, params) {
    return new Class2({
      type: "map",
      keyType,
      valueType,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _set(Class2, valueType, params) {
    return new Class2({
      type: "set",
      valueType,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _enum(Class2, values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v2) => [v2, v2])) : values;
    return new Class2({
      type: "enum",
      entries,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _nativeEnum(Class2, entries, params) {
    return new Class2({
      type: "enum",
      entries,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _literal(Class2, value, params) {
    return new Class2({
      type: "literal",
      values: Array.isArray(value) ? value : [value],
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _file(Class2, params) {
    return new Class2({
      type: "file",
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _transform(Class2, fn) {
    return new Class2({
      type: "transform",
      transform: fn
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _optional(Class2, innerType) {
    return new Class2({
      type: "optional",
      innerType
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _nullable(Class2, innerType) {
    return new Class2({
      type: "nullable",
      innerType
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _default(Class2, innerType, defaultValue) {
    return new Class2({
      type: "default",
      innerType,
      get defaultValue() {
        return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
      }
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _nonoptional(Class2, innerType, params) {
    return new Class2({
      type: "nonoptional",
      innerType,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _success(Class2, innerType) {
    return new Class2({
      type: "success",
      innerType
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _catch(Class2, innerType, catchValue) {
    return new Class2({
      type: "catch",
      innerType,
      catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _pipe(Class2, in_, out) {
    return new Class2({
      type: "pipe",
      in: in_,
      out
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _readonly(Class2, innerType) {
    return new Class2({
      type: "readonly",
      innerType
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _templateLiteral(Class2, parts, params) {
    return new Class2({
      type: "template_literal",
      parts,
      ...normalizeParams(params)
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _lazy(Class2, getter) {
    return new Class2({
      type: "lazy",
      getter
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _promise(Class2, innerType) {
    return new Class2({
      type: "promise",
      innerType
    });
  }
  // @__NO_SIDE_EFFECTS__
  function _custom(Class2, fn, _params) {
    const norm = normalizeParams(_params);
    norm.abort ?? (norm.abort = true);
    const schema = new Class2({
      type: "custom",
      check: "custom",
      fn,
      ...norm
    });
    return schema;
  }
  // @__NO_SIDE_EFFECTS__
  function _refine(Class2, fn, _params) {
    const schema = new Class2({
      type: "custom",
      check: "custom",
      fn,
      ...normalizeParams(_params)
    });
    return schema;
  }
  // @__NO_SIDE_EFFECTS__
  function _superRefine(fn, params) {
    const ch = /* @__PURE__ */ _check((payload) => {
      payload.addIssue = (issue2) => {
        if (typeof issue2 === "string") {
          payload.issues.push(issue(issue2, payload.value, ch._zod.def));
        } else {
          const _issue = issue2;
          if (_issue.fatal)
            _issue.continue = false;
          _issue.code ?? (_issue.code = "custom");
          _issue.input ?? (_issue.input = payload.value);
          _issue.inst ?? (_issue.inst = ch);
          _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
          payload.issues.push(issue(_issue));
        }
      };
      return fn(payload.value, payload);
    }, params);
    return ch;
  }
  // @__NO_SIDE_EFFECTS__
  function _check(fn, params) {
    const ch = new $ZodCheck({
      check: "custom",
      ...normalizeParams(params)
    });
    ch._zod.check = fn;
    return ch;
  }
  // @__NO_SIDE_EFFECTS__
  function describe(description) {
    const ch = new $ZodCheck({ check: "describe" });
    ch._zod.onattach = [
      (inst) => {
        const existing = globalRegistry.get(inst) ?? {};
        globalRegistry.add(inst, { ...existing, description });
      }
    ];
    ch._zod.check = () => {
    };
    return ch;
  }
  // @__NO_SIDE_EFFECTS__
  function meta(metadata) {
    const ch = new $ZodCheck({ check: "meta" });
    ch._zod.onattach = [
      (inst) => {
        const existing = globalRegistry.get(inst) ?? {};
        globalRegistry.add(inst, { ...existing, ...metadata });
      }
    ];
    ch._zod.check = () => {
    };
    return ch;
  }
  // @__NO_SIDE_EFFECTS__
  function _stringbool(Classes, _params) {
    const params = normalizeParams(_params);
    let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
    let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
    if (params.case !== "sensitive") {
      truthyArray = truthyArray.map((v2) => typeof v2 === "string" ? v2.toLowerCase() : v2);
      falsyArray = falsyArray.map((v2) => typeof v2 === "string" ? v2.toLowerCase() : v2);
    }
    const truthySet = new Set(truthyArray);
    const falsySet = new Set(falsyArray);
    const _Codec = Classes.Codec ?? $ZodCodec;
    const _Boolean = Classes.Boolean ?? $ZodBoolean;
    const _String = Classes.String ?? $ZodString;
    const stringSchema = new _String({ type: "string", error: params.error });
    const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
    const codec2 = new _Codec({
      type: "pipe",
      in: stringSchema,
      out: booleanSchema,
      transform: ((input, payload) => {
        let data = input;
        if (params.case !== "sensitive")
          data = data.toLowerCase();
        if (truthySet.has(data)) {
          return true;
        } else if (falsySet.has(data)) {
          return false;
        } else {
          payload.issues.push({
            code: "invalid_value",
            expected: "stringbool",
            values: [...truthySet, ...falsySet],
            input: payload.value,
            inst: codec2,
            continue: false
          });
          return {};
        }
      }),
      reverseTransform: ((input, _payload) => {
        if (input === true) {
          return truthyArray[0] || "true";
        } else {
          return falsyArray[0] || "false";
        }
      }),
      error: params.error
    });
    return codec2;
  }
  // @__NO_SIDE_EFFECTS__
  function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
    const params = normalizeParams(_params);
    const def = {
      ...normalizeParams(_params),
      check: "string_format",
      type: "string",
      format,
      fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
      ...params
    };
    if (fnOrRegex instanceof RegExp) {
      def.pattern = fnOrRegex;
    }
    const inst = new Class2(def);
    return inst;
  }
  var TimePrecision;
  var init_api = __esm({
    "node_modules/zod/v4/core/api.js"() {
      init_checks();
      init_registries();
      init_schemas();
      init_util();
      TimePrecision = {
        Any: null,
        Minute: -1,
        Second: 0,
        Millisecond: 3,
        Microsecond: 6
      };
    }
  });

  // node_modules/zod/v4/core/to-json-schema.js
  function initializeContext(params) {
    let target = params?.target ?? "draft-2020-12";
    if (target === "draft-4")
      target = "draft-04";
    if (target === "draft-7")
      target = "draft-07";
    return {
      processors: params.processors ?? {},
      metadataRegistry: params?.metadata ?? globalRegistry,
      target,
      unrepresentable: params?.unrepresentable ?? "throw",
      override: params?.override ?? (() => {
      }),
      io: params?.io ?? "output",
      counter: 0,
      seen: /* @__PURE__ */ new Map(),
      cycles: params?.cycles ?? "ref",
      reused: params?.reused ?? "inline",
      external: params?.external ?? void 0
    };
  }
  function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
    var _a3;
    const def = schema._zod.def;
    const seen = ctx.seen.get(schema);
    if (seen) {
      seen.count++;
      const isCycle = _params.schemaPath.includes(schema);
      if (isCycle) {
        seen.cycle = _params.path;
      }
      return seen.schema;
    }
    const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
    ctx.seen.set(schema, result);
    const overrideSchema = schema._zod.toJSONSchema?.();
    if (overrideSchema) {
      result.schema = overrideSchema;
    } else {
      const params = {
        ..._params,
        schemaPath: [..._params.schemaPath, schema],
        path: _params.path
      };
      if (schema._zod.processJSONSchema) {
        schema._zod.processJSONSchema(ctx, result.schema, params);
      } else {
        const _json = result.schema;
        const processor = ctx.processors[def.type];
        if (!processor) {
          throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
        }
        processor(schema, ctx, _json, params);
      }
      const parent = schema._zod.parent;
      if (parent) {
        if (!result.ref)
          result.ref = parent;
        process(parent, ctx, params);
        ctx.seen.get(parent).isParent = true;
      }
    }
    const meta3 = ctx.metadataRegistry.get(schema);
    if (meta3)
      Object.assign(result.schema, meta3);
    if (ctx.io === "input" && isTransforming(schema)) {
      delete result.schema.examples;
      delete result.schema.default;
    }
    if (ctx.io === "input" && "_prefault" in result.schema)
      (_a3 = result.schema).default ?? (_a3.default = result.schema._prefault);
    delete result.schema._prefault;
    const _result = ctx.seen.get(schema);
    return _result.schema;
  }
  function extractDefs(ctx, schema) {
    const root = ctx.seen.get(schema);
    if (!root)
      throw new Error("Unprocessed schema. This is a bug in Zod.");
    const idToSchema = /* @__PURE__ */ new Map();
    for (const entry of ctx.seen.entries()) {
      const id = ctx.metadataRegistry.get(entry[0])?.id;
      if (id) {
        const existing = idToSchema.get(id);
        if (existing && existing !== entry[0]) {
          throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
        }
        idToSchema.set(id, entry[0]);
      }
    }
    const makeURI = (entry) => {
      const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
      if (ctx.external) {
        const externalId = ctx.external.registry.get(entry[0])?.id;
        const uriGenerator = ctx.external.uri ?? ((id2) => id2);
        if (externalId) {
          return { ref: uriGenerator(externalId) };
        }
        const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
        entry[1].defId = id;
        return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
      }
      if (entry[1] === root) {
        return { ref: "#" };
      }
      const uriPrefix = `#`;
      const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
      const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
      return { defId, ref: defUriPrefix + defId };
    };
    const extractToDef = (entry) => {
      if (entry[1].schema.$ref) {
        return;
      }
      const seen = entry[1];
      const { ref, defId } = makeURI(entry);
      seen.def = { ...seen.schema };
      if (defId)
        seen.defId = defId;
      const schema2 = seen.schema;
      for (const key in schema2) {
        delete schema2[key];
      }
      schema2.$ref = ref;
    };
    if (ctx.cycles === "throw") {
      for (const entry of ctx.seen.entries()) {
        const seen = entry[1];
        if (seen.cycle) {
          throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
        }
      }
    }
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (schema === entry[0]) {
        extractToDef(entry);
        continue;
      }
      if (ctx.external) {
        const ext = ctx.external.registry.get(entry[0])?.id;
        if (schema !== entry[0] && ext) {
          extractToDef(entry);
          continue;
        }
      }
      const id = ctx.metadataRegistry.get(entry[0])?.id;
      if (id) {
        extractToDef(entry);
        continue;
      }
      if (seen.cycle) {
        extractToDef(entry);
        continue;
      }
      if (seen.count > 1) {
        if (ctx.reused === "ref") {
          extractToDef(entry);
          continue;
        }
      }
    }
  }
  function finalize(ctx, schema) {
    const root = ctx.seen.get(schema);
    if (!root)
      throw new Error("Unprocessed schema. This is a bug in Zod.");
    const flattenRef = (zodSchema) => {
      const seen = ctx.seen.get(zodSchema);
      if (seen.ref === null)
        return;
      const schema2 = seen.def ?? seen.schema;
      const _cached = { ...schema2 };
      const ref = seen.ref;
      seen.ref = null;
      if (ref) {
        flattenRef(ref);
        const refSeen = ctx.seen.get(ref);
        const refSchema = refSeen.schema;
        if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
          schema2.allOf = schema2.allOf ?? [];
          schema2.allOf.push(refSchema);
        } else {
          Object.assign(schema2, refSchema);
        }
        Object.assign(schema2, _cached);
        const isParentRef = zodSchema._zod.parent === ref;
        if (isParentRef) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (!(key in _cached)) {
              delete schema2[key];
            }
          }
        }
        if (refSchema.$ref && refSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
      const parent = zodSchema._zod.parent;
      if (parent && parent !== ref) {
        flattenRef(parent);
        const parentSeen = ctx.seen.get(parent);
        if (parentSeen?.schema.$ref) {
          schema2.$ref = parentSeen.schema.$ref;
          if (parentSeen.def) {
            for (const key in schema2) {
              if (key === "$ref" || key === "allOf")
                continue;
              if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
                delete schema2[key];
              }
            }
          }
        }
      }
      ctx.override({
        zodSchema,
        jsonSchema: schema2,
        path: seen.path ?? []
      });
    };
    for (const entry of [...ctx.seen.entries()].reverse()) {
      flattenRef(entry[0]);
    }
    const result = {};
    if (ctx.target === "draft-2020-12") {
      result.$schema = "https://json-schema.org/draft/2020-12/schema";
    } else if (ctx.target === "draft-07") {
      result.$schema = "http://json-schema.org/draft-07/schema#";
    } else if (ctx.target === "draft-04") {
      result.$schema = "http://json-schema.org/draft-04/schema#";
    } else if (ctx.target === "openapi-3.0") {
    } else {
    }
    if (ctx.external?.uri) {
      const id = ctx.external.registry.get(schema)?.id;
      if (!id)
        throw new Error("Schema is missing an `id` property");
      result.$id = ctx.external.uri(id);
    }
    Object.assign(result, root.def ?? root.schema);
    const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
    if (rootMetaId !== void 0 && result.id === rootMetaId)
      delete result.id;
    const defs = ctx.external?.defs ?? {};
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.def && seen.defId) {
        if (seen.def.id === seen.defId)
          delete seen.def.id;
        defs[seen.defId] = seen.def;
      }
    }
    if (ctx.external) {
    } else {
      if (Object.keys(defs).length > 0) {
        if (ctx.target === "draft-2020-12") {
          result.$defs = defs;
        } else {
          result.definitions = defs;
        }
      }
    }
    try {
      const finalized = JSON.parse(JSON.stringify(result));
      Object.defineProperty(finalized, "~standard", {
        value: {
          ...schema["~standard"],
          jsonSchema: {
            input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
            output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
          }
        },
        enumerable: false,
        writable: false
      });
      return finalized;
    } catch (_err) {
      throw new Error("Error converting schema to JSON.");
    }
  }
  function isTransforming(_schema, _ctx) {
    const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
    if (ctx.seen.has(_schema))
      return false;
    ctx.seen.add(_schema);
    const def = _schema._zod.def;
    if (def.type === "transform")
      return true;
    if (def.type === "array")
      return isTransforming(def.element, ctx);
    if (def.type === "set")
      return isTransforming(def.valueType, ctx);
    if (def.type === "lazy")
      return isTransforming(def.getter(), ctx);
    if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
      return isTransforming(def.innerType, ctx);
    }
    if (def.type === "intersection") {
      return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    }
    if (def.type === "record" || def.type === "map") {
      return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    if (def.type === "pipe") {
      if (_schema._zod.traits.has("$ZodCodec"))
        return true;
      return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    }
    if (def.type === "object") {
      for (const key in def.shape) {
        if (isTransforming(def.shape[key], ctx))
          return true;
      }
      return false;
    }
    if (def.type === "union") {
      for (const option of def.options) {
        if (isTransforming(option, ctx))
          return true;
      }
      return false;
    }
    if (def.type === "tuple") {
      for (const item of def.items) {
        if (isTransforming(item, ctx))
          return true;
      }
      if (def.rest && isTransforming(def.rest, ctx))
        return true;
      return false;
    }
    return false;
  }
  var createToJSONSchemaMethod, createStandardJSONSchemaMethod;
  var init_to_json_schema = __esm({
    "node_modules/zod/v4/core/to-json-schema.js"() {
      init_registries();
      createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
        const ctx = initializeContext({ ...params, processors });
        process(schema, ctx);
        extractDefs(ctx, schema);
        return finalize(ctx, schema);
      };
      createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
        const { libraryOptions, target } = params ?? {};
        const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
        process(schema, ctx);
        extractDefs(ctx, schema);
        return finalize(ctx, schema);
      };
    }
  });

  // node_modules/zod/v4/core/json-schema-processors.js
  function toJSONSchema(input, params) {
    if ("_idmap" in input) {
      const registry2 = input;
      const ctx2 = initializeContext({ ...params, processors: allProcessors });
      const defs = {};
      for (const entry of registry2._idmap.entries()) {
        const [_2, schema] = entry;
        process(schema, ctx2);
      }
      const schemas = {};
      const external = {
        registry: registry2,
        uri: params?.uri,
        defs
      };
      ctx2.external = external;
      for (const entry of registry2._idmap.entries()) {
        const [key, schema] = entry;
        extractDefs(ctx2, schema);
        schemas[key] = finalize(ctx2, schema);
      }
      if (Object.keys(defs).length > 0) {
        const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
        schemas.__shared = {
          [defsSegment]: defs
        };
      }
      return { schemas };
    }
    const ctx = initializeContext({ ...params, processors: allProcessors });
    process(input, ctx);
    extractDefs(ctx, input);
    return finalize(ctx, input);
  }
  var formatMap, stringProcessor, numberProcessor, booleanProcessor, bigintProcessor, symbolProcessor, nullProcessor, undefinedProcessor, voidProcessor, neverProcessor, anyProcessor, unknownProcessor, dateProcessor, enumProcessor, literalProcessor, nanProcessor, templateLiteralProcessor, fileProcessor, successProcessor, customProcessor, functionProcessor, transformProcessor, mapProcessor, setProcessor, arrayProcessor, objectProcessor, unionProcessor, intersectionProcessor, tupleProcessor, recordProcessor, nullableProcessor, nonoptionalProcessor, defaultProcessor, prefaultProcessor, catchProcessor, pipeProcessor, readonlyProcessor, promiseProcessor, optionalProcessor, lazyProcessor, allProcessors;
  var init_json_schema_processors = __esm({
    "node_modules/zod/v4/core/json-schema-processors.js"() {
      init_to_json_schema();
      init_util();
      formatMap = {
        guid: "uuid",
        url: "uri",
        datetime: "date-time",
        json_string: "json-string",
        regex: ""
        // do not set
      };
      stringProcessor = (schema, ctx, _json, _params) => {
        const json2 = _json;
        json2.type = "string";
        const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
        if (typeof minimum === "number")
          json2.minLength = minimum;
        if (typeof maximum === "number")
          json2.maxLength = maximum;
        if (format) {
          json2.format = formatMap[format] ?? format;
          if (json2.format === "")
            delete json2.format;
          if (format === "time") {
            delete json2.format;
          }
        }
        if (contentEncoding)
          json2.contentEncoding = contentEncoding;
        if (patterns && patterns.size > 0) {
          const regexes = [...patterns];
          if (regexes.length === 1)
            json2.pattern = regexes[0].source;
          else if (regexes.length > 1) {
            json2.allOf = [
              ...regexes.map((regex) => ({
                ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
                pattern: regex.source
              }))
            ];
          }
        }
      };
      numberProcessor = (schema, ctx, _json, _params) => {
        const json2 = _json;
        const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
        if (typeof format === "string" && format.includes("int"))
          json2.type = "integer";
        else
          json2.type = "number";
        const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
        const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
        const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
        if (exMin) {
          if (legacy) {
            json2.minimum = exclusiveMinimum;
            json2.exclusiveMinimum = true;
          } else {
            json2.exclusiveMinimum = exclusiveMinimum;
          }
        } else if (typeof minimum === "number") {
          json2.minimum = minimum;
        }
        if (exMax) {
          if (legacy) {
            json2.maximum = exclusiveMaximum;
            json2.exclusiveMaximum = true;
          } else {
            json2.exclusiveMaximum = exclusiveMaximum;
          }
        } else if (typeof maximum === "number") {
          json2.maximum = maximum;
        }
        if (typeof multipleOf === "number")
          json2.multipleOf = multipleOf;
      };
      booleanProcessor = (_schema, _ctx, json2, _params) => {
        json2.type = "boolean";
      };
      bigintProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("BigInt cannot be represented in JSON Schema");
        }
      };
      symbolProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Symbols cannot be represented in JSON Schema");
        }
      };
      nullProcessor = (_schema, ctx, json2, _params) => {
        if (ctx.target === "openapi-3.0") {
          json2.type = "string";
          json2.nullable = true;
          json2.enum = [null];
        } else {
          json2.type = "null";
        }
      };
      undefinedProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Undefined cannot be represented in JSON Schema");
        }
      };
      voidProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Void cannot be represented in JSON Schema");
        }
      };
      neverProcessor = (_schema, _ctx, json2, _params) => {
        json2.not = {};
      };
      anyProcessor = (_schema, _ctx, _json, _params) => {
      };
      unknownProcessor = (_schema, _ctx, _json, _params) => {
      };
      dateProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Date cannot be represented in JSON Schema");
        }
      };
      enumProcessor = (schema, _ctx, json2, _params) => {
        const def = schema._zod.def;
        const values = getEnumValues(def.entries);
        if (values.every((v2) => typeof v2 === "number"))
          json2.type = "number";
        if (values.every((v2) => typeof v2 === "string"))
          json2.type = "string";
        json2.enum = values;
      };
      literalProcessor = (schema, ctx, json2, _params) => {
        const def = schema._zod.def;
        const vals = [];
        for (const val of def.values) {
          if (val === void 0) {
            if (ctx.unrepresentable === "throw") {
              throw new Error("Literal `undefined` cannot be represented in JSON Schema");
            } else {
            }
          } else if (typeof val === "bigint") {
            if (ctx.unrepresentable === "throw") {
              throw new Error("BigInt literals cannot be represented in JSON Schema");
            } else {
              vals.push(Number(val));
            }
          } else {
            vals.push(val);
          }
        }
        if (vals.length === 0) {
        } else if (vals.length === 1) {
          const val = vals[0];
          json2.type = val === null ? "null" : typeof val;
          if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
            json2.enum = [val];
          } else {
            json2.const = val;
          }
        } else {
          if (vals.every((v2) => typeof v2 === "number"))
            json2.type = "number";
          if (vals.every((v2) => typeof v2 === "string"))
            json2.type = "string";
          if (vals.every((v2) => typeof v2 === "boolean"))
            json2.type = "boolean";
          if (vals.every((v2) => v2 === null))
            json2.type = "null";
          json2.enum = vals;
        }
      };
      nanProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("NaN cannot be represented in JSON Schema");
        }
      };
      templateLiteralProcessor = (schema, _ctx, json2, _params) => {
        const _json = json2;
        const pattern = schema._zod.pattern;
        if (!pattern)
          throw new Error("Pattern not found in template literal");
        _json.type = "string";
        _json.pattern = pattern.source;
      };
      fileProcessor = (schema, _ctx, json2, _params) => {
        const _json = json2;
        const file2 = {
          type: "string",
          format: "binary",
          contentEncoding: "binary"
        };
        const { minimum, maximum, mime } = schema._zod.bag;
        if (minimum !== void 0)
          file2.minLength = minimum;
        if (maximum !== void 0)
          file2.maxLength = maximum;
        if (mime) {
          if (mime.length === 1) {
            file2.contentMediaType = mime[0];
            Object.assign(_json, file2);
          } else {
            Object.assign(_json, file2);
            _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
          }
        } else {
          Object.assign(_json, file2);
        }
      };
      successProcessor = (_schema, _ctx, json2, _params) => {
        json2.type = "boolean";
      };
      customProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Custom types cannot be represented in JSON Schema");
        }
      };
      functionProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Function types cannot be represented in JSON Schema");
        }
      };
      transformProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Transforms cannot be represented in JSON Schema");
        }
      };
      mapProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Map cannot be represented in JSON Schema");
        }
      };
      setProcessor = (_schema, ctx, _json, _params) => {
        if (ctx.unrepresentable === "throw") {
          throw new Error("Set cannot be represented in JSON Schema");
        }
      };
      arrayProcessor = (schema, ctx, _json, params) => {
        const json2 = _json;
        const def = schema._zod.def;
        const { minimum, maximum } = schema._zod.bag;
        if (typeof minimum === "number")
          json2.minItems = minimum;
        if (typeof maximum === "number")
          json2.maxItems = maximum;
        json2.type = "array";
        json2.items = process(def.element, ctx, {
          ...params,
          path: [...params.path, "items"]
        });
      };
      objectProcessor = (schema, ctx, _json, params) => {
        const json2 = _json;
        const def = schema._zod.def;
        json2.type = "object";
        json2.properties = {};
        const shape = def.shape;
        for (const key in shape) {
          json2.properties[key] = process(shape[key], ctx, {
            ...params,
            path: [...params.path, "properties", key]
          });
        }
        const allKeys = new Set(Object.keys(shape));
        const requiredKeys = new Set([...allKeys].filter((key) => {
          const v2 = def.shape[key]._zod;
          if (ctx.io === "input") {
            return v2.optin === void 0;
          } else {
            return v2.optout === void 0;
          }
        }));
        if (requiredKeys.size > 0) {
          json2.required = Array.from(requiredKeys);
        }
        if (def.catchall?._zod.def.type === "never") {
          json2.additionalProperties = false;
        } else if (!def.catchall) {
          if (ctx.io === "output")
            json2.additionalProperties = false;
        } else if (def.catchall) {
          json2.additionalProperties = process(def.catchall, ctx, {
            ...params,
            path: [...params.path, "additionalProperties"]
          });
        }
      };
      unionProcessor = (schema, ctx, json2, params) => {
        const def = schema._zod.def;
        const isExclusive = def.inclusive === false;
        const options = def.options.map((x2, i) => process(x2, ctx, {
          ...params,
          path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
        }));
        if (isExclusive) {
          json2.oneOf = options;
        } else {
          json2.anyOf = options;
        }
      };
      intersectionProcessor = (schema, ctx, json2, params) => {
        const def = schema._zod.def;
        const a2 = process(def.left, ctx, {
          ...params,
          path: [...params.path, "allOf", 0]
        });
        const b2 = process(def.right, ctx, {
          ...params,
          path: [...params.path, "allOf", 1]
        });
        const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
        const allOf = [
          ...isSimpleIntersection(a2) ? a2.allOf : [a2],
          ...isSimpleIntersection(b2) ? b2.allOf : [b2]
        ];
        json2.allOf = allOf;
      };
      tupleProcessor = (schema, ctx, _json, params) => {
        const json2 = _json;
        const def = schema._zod.def;
        json2.type = "array";
        const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
        const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
        const prefixItems = def.items.map((x2, i) => process(x2, ctx, {
          ...params,
          path: [...params.path, prefixPath, i]
        }));
        const rest = def.rest ? process(def.rest, ctx, {
          ...params,
          path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
        }) : null;
        if (ctx.target === "draft-2020-12") {
          json2.prefixItems = prefixItems;
          if (rest) {
            json2.items = rest;
          }
        } else if (ctx.target === "openapi-3.0") {
          json2.items = {
            anyOf: prefixItems
          };
          if (rest) {
            json2.items.anyOf.push(rest);
          }
          json2.minItems = prefixItems.length;
          if (!rest) {
            json2.maxItems = prefixItems.length;
          }
        } else {
          json2.items = prefixItems;
          if (rest) {
            json2.additionalItems = rest;
          }
        }
        const { minimum, maximum } = schema._zod.bag;
        if (typeof minimum === "number")
          json2.minItems = minimum;
        if (typeof maximum === "number")
          json2.maxItems = maximum;
      };
      recordProcessor = (schema, ctx, _json, params) => {
        const json2 = _json;
        const def = schema._zod.def;
        json2.type = "object";
        const keyType = def.keyType;
        const keyBag = keyType._zod.bag;
        const patterns = keyBag?.patterns;
        if (def.mode === "loose" && patterns && patterns.size > 0) {
          const valueSchema = process(def.valueType, ctx, {
            ...params,
            path: [...params.path, "patternProperties", "*"]
          });
          json2.patternProperties = {};
          for (const pattern of patterns) {
            json2.patternProperties[pattern.source] = valueSchema;
          }
        } else {
          if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
            json2.propertyNames = process(def.keyType, ctx, {
              ...params,
              path: [...params.path, "propertyNames"]
            });
          }
          json2.additionalProperties = process(def.valueType, ctx, {
            ...params,
            path: [...params.path, "additionalProperties"]
          });
        }
        const keyValues = keyType._zod.values;
        if (keyValues) {
          const validKeyValues = [...keyValues].filter((v2) => typeof v2 === "string" || typeof v2 === "number");
          if (validKeyValues.length > 0) {
            json2.required = validKeyValues;
          }
        }
      };
      nullableProcessor = (schema, ctx, json2, params) => {
        const def = schema._zod.def;
        const inner = process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        if (ctx.target === "openapi-3.0") {
          seen.ref = def.innerType;
          json2.nullable = true;
        } else {
          json2.anyOf = [inner, { type: "null" }];
        }
      };
      nonoptionalProcessor = (schema, ctx, _json, params) => {
        const def = schema._zod.def;
        process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = def.innerType;
      };
      defaultProcessor = (schema, ctx, json2, params) => {
        const def = schema._zod.def;
        process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = def.innerType;
        json2.default = JSON.parse(JSON.stringify(def.defaultValue));
      };
      prefaultProcessor = (schema, ctx, json2, params) => {
        const def = schema._zod.def;
        process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = def.innerType;
        if (ctx.io === "input")
          json2._prefault = JSON.parse(JSON.stringify(def.defaultValue));
      };
      catchProcessor = (schema, ctx, json2, params) => {
        const def = schema._zod.def;
        process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = def.innerType;
        let catchValue;
        try {
          catchValue = def.catchValue(void 0);
        } catch {
          throw new Error("Dynamic catch values are not supported in JSON Schema");
        }
        json2.default = catchValue;
      };
      pipeProcessor = (schema, ctx, _json, params) => {
        const def = schema._zod.def;
        const inIsTransform = def.in._zod.traits.has("$ZodTransform");
        const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
        process(innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = innerType;
      };
      readonlyProcessor = (schema, ctx, json2, params) => {
        const def = schema._zod.def;
        process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = def.innerType;
        json2.readOnly = true;
      };
      promiseProcessor = (schema, ctx, _json, params) => {
        const def = schema._zod.def;
        process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = def.innerType;
      };
      optionalProcessor = (schema, ctx, _json, params) => {
        const def = schema._zod.def;
        process(def.innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = def.innerType;
      };
      lazyProcessor = (schema, ctx, _json, params) => {
        const innerType = schema._zod.innerType;
        process(innerType, ctx, params);
        const seen = ctx.seen.get(schema);
        seen.ref = innerType;
      };
      allProcessors = {
        string: stringProcessor,
        number: numberProcessor,
        boolean: booleanProcessor,
        bigint: bigintProcessor,
        symbol: symbolProcessor,
        null: nullProcessor,
        undefined: undefinedProcessor,
        void: voidProcessor,
        never: neverProcessor,
        any: anyProcessor,
        unknown: unknownProcessor,
        date: dateProcessor,
        enum: enumProcessor,
        literal: literalProcessor,
        nan: nanProcessor,
        template_literal: templateLiteralProcessor,
        file: fileProcessor,
        success: successProcessor,
        custom: customProcessor,
        function: functionProcessor,
        transform: transformProcessor,
        map: mapProcessor,
        set: setProcessor,
        array: arrayProcessor,
        object: objectProcessor,
        union: unionProcessor,
        intersection: intersectionProcessor,
        tuple: tupleProcessor,
        record: recordProcessor,
        nullable: nullableProcessor,
        nonoptional: nonoptionalProcessor,
        default: defaultProcessor,
        prefault: prefaultProcessor,
        catch: catchProcessor,
        pipe: pipeProcessor,
        readonly: readonlyProcessor,
        promise: promiseProcessor,
        optional: optionalProcessor,
        lazy: lazyProcessor
      };
    }
  });

  // node_modules/zod/v4/core/json-schema-generator.js
  var JSONSchemaGenerator;
  var init_json_schema_generator = __esm({
    "node_modules/zod/v4/core/json-schema-generator.js"() {
      init_json_schema_processors();
      init_to_json_schema();
      JSONSchemaGenerator = class {
        /** @deprecated Access via ctx instead */
        get metadataRegistry() {
          return this.ctx.metadataRegistry;
        }
        /** @deprecated Access via ctx instead */
        get target() {
          return this.ctx.target;
        }
        /** @deprecated Access via ctx instead */
        get unrepresentable() {
          return this.ctx.unrepresentable;
        }
        /** @deprecated Access via ctx instead */
        get override() {
          return this.ctx.override;
        }
        /** @deprecated Access via ctx instead */
        get io() {
          return this.ctx.io;
        }
        /** @deprecated Access via ctx instead */
        get counter() {
          return this.ctx.counter;
        }
        set counter(value) {
          this.ctx.counter = value;
        }
        /** @deprecated Access via ctx instead */
        get seen() {
          return this.ctx.seen;
        }
        constructor(params) {
          let normalizedTarget = params?.target ?? "draft-2020-12";
          if (normalizedTarget === "draft-4")
            normalizedTarget = "draft-04";
          if (normalizedTarget === "draft-7")
            normalizedTarget = "draft-07";
          this.ctx = initializeContext({
            processors: allProcessors,
            target: normalizedTarget,
            ...params?.metadata && { metadata: params.metadata },
            ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
            ...params?.override && { override: params.override },
            ...params?.io && { io: params.io }
          });
        }
        /**
         * Process a schema to prepare it for JSON Schema generation.
         * This must be called before emit().
         */
        process(schema, _params = { path: [], schemaPath: [] }) {
          return process(schema, this.ctx, _params);
        }
        /**
         * Emit the final JSON Schema after processing.
         * Must call process() first.
         */
        emit(schema, _params) {
          if (_params) {
            if (_params.cycles)
              this.ctx.cycles = _params.cycles;
            if (_params.reused)
              this.ctx.reused = _params.reused;
            if (_params.external)
              this.ctx.external = _params.external;
          }
          extractDefs(this.ctx, schema);
          const result = finalize(this.ctx, schema);
          const { "~standard": _2, ...plainResult } = result;
          return plainResult;
        }
      };
    }
  });

  // node_modules/zod/v4/core/json-schema.js
  var json_schema_exports = {};
  var init_json_schema = __esm({
    "node_modules/zod/v4/core/json-schema.js"() {
    }
  });

  // node_modules/zod/v4/core/index.js
  var core_exports2 = {};
  __export(core_exports2, {
    $ZodAny: () => $ZodAny,
    $ZodArray: () => $ZodArray,
    $ZodAsyncError: () => $ZodAsyncError,
    $ZodBase64: () => $ZodBase64,
    $ZodBase64URL: () => $ZodBase64URL,
    $ZodBigInt: () => $ZodBigInt,
    $ZodBigIntFormat: () => $ZodBigIntFormat,
    $ZodBoolean: () => $ZodBoolean,
    $ZodCIDRv4: () => $ZodCIDRv4,
    $ZodCIDRv6: () => $ZodCIDRv6,
    $ZodCUID: () => $ZodCUID,
    $ZodCUID2: () => $ZodCUID2,
    $ZodCatch: () => $ZodCatch,
    $ZodCheck: () => $ZodCheck,
    $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
    $ZodCheckEndsWith: () => $ZodCheckEndsWith,
    $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
    $ZodCheckIncludes: () => $ZodCheckIncludes,
    $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
    $ZodCheckLessThan: () => $ZodCheckLessThan,
    $ZodCheckLowerCase: () => $ZodCheckLowerCase,
    $ZodCheckMaxLength: () => $ZodCheckMaxLength,
    $ZodCheckMaxSize: () => $ZodCheckMaxSize,
    $ZodCheckMimeType: () => $ZodCheckMimeType,
    $ZodCheckMinLength: () => $ZodCheckMinLength,
    $ZodCheckMinSize: () => $ZodCheckMinSize,
    $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
    $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
    $ZodCheckOverwrite: () => $ZodCheckOverwrite,
    $ZodCheckProperty: () => $ZodCheckProperty,
    $ZodCheckRegex: () => $ZodCheckRegex,
    $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
    $ZodCheckStartsWith: () => $ZodCheckStartsWith,
    $ZodCheckStringFormat: () => $ZodCheckStringFormat,
    $ZodCheckUpperCase: () => $ZodCheckUpperCase,
    $ZodCodec: () => $ZodCodec,
    $ZodCustom: () => $ZodCustom,
    $ZodCustomStringFormat: () => $ZodCustomStringFormat,
    $ZodDate: () => $ZodDate,
    $ZodDefault: () => $ZodDefault,
    $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
    $ZodE164: () => $ZodE164,
    $ZodEmail: () => $ZodEmail,
    $ZodEmoji: () => $ZodEmoji,
    $ZodEncodeError: () => $ZodEncodeError,
    $ZodEnum: () => $ZodEnum,
    $ZodError: () => $ZodError,
    $ZodExactOptional: () => $ZodExactOptional,
    $ZodFile: () => $ZodFile,
    $ZodFunction: () => $ZodFunction,
    $ZodGUID: () => $ZodGUID,
    $ZodIPv4: () => $ZodIPv4,
    $ZodIPv6: () => $ZodIPv6,
    $ZodISODate: () => $ZodISODate,
    $ZodISODateTime: () => $ZodISODateTime,
    $ZodISODuration: () => $ZodISODuration,
    $ZodISOTime: () => $ZodISOTime,
    $ZodIntersection: () => $ZodIntersection,
    $ZodJWT: () => $ZodJWT,
    $ZodKSUID: () => $ZodKSUID,
    $ZodLazy: () => $ZodLazy,
    $ZodLiteral: () => $ZodLiteral,
    $ZodMAC: () => $ZodMAC,
    $ZodMap: () => $ZodMap,
    $ZodNaN: () => $ZodNaN,
    $ZodNanoID: () => $ZodNanoID,
    $ZodNever: () => $ZodNever,
    $ZodNonOptional: () => $ZodNonOptional,
    $ZodNull: () => $ZodNull,
    $ZodNullable: () => $ZodNullable,
    $ZodNumber: () => $ZodNumber,
    $ZodNumberFormat: () => $ZodNumberFormat,
    $ZodObject: () => $ZodObject,
    $ZodObjectJIT: () => $ZodObjectJIT,
    $ZodOptional: () => $ZodOptional,
    $ZodPipe: () => $ZodPipe,
    $ZodPrefault: () => $ZodPrefault,
    $ZodPreprocess: () => $ZodPreprocess,
    $ZodPromise: () => $ZodPromise,
    $ZodReadonly: () => $ZodReadonly,
    $ZodRealError: () => $ZodRealError,
    $ZodRecord: () => $ZodRecord,
    $ZodRegistry: () => $ZodRegistry,
    $ZodSet: () => $ZodSet,
    $ZodString: () => $ZodString,
    $ZodStringFormat: () => $ZodStringFormat,
    $ZodSuccess: () => $ZodSuccess,
    $ZodSymbol: () => $ZodSymbol,
    $ZodTemplateLiteral: () => $ZodTemplateLiteral,
    $ZodTransform: () => $ZodTransform,
    $ZodTuple: () => $ZodTuple,
    $ZodType: () => $ZodType,
    $ZodULID: () => $ZodULID,
    $ZodURL: () => $ZodURL,
    $ZodUUID: () => $ZodUUID,
    $ZodUndefined: () => $ZodUndefined,
    $ZodUnion: () => $ZodUnion,
    $ZodUnknown: () => $ZodUnknown,
    $ZodVoid: () => $ZodVoid,
    $ZodXID: () => $ZodXID,
    $ZodXor: () => $ZodXor,
    $brand: () => $brand,
    $constructor: () => $constructor,
    $input: () => $input,
    $output: () => $output,
    Doc: () => Doc,
    JSONSchema: () => json_schema_exports,
    JSONSchemaGenerator: () => JSONSchemaGenerator,
    NEVER: () => NEVER,
    TimePrecision: () => TimePrecision,
    _any: () => _any,
    _array: () => _array,
    _base64: () => _base64,
    _base64url: () => _base64url,
    _bigint: () => _bigint,
    _boolean: () => _boolean,
    _catch: () => _catch,
    _check: () => _check,
    _cidrv4: () => _cidrv4,
    _cidrv6: () => _cidrv6,
    _coercedBigint: () => _coercedBigint,
    _coercedBoolean: () => _coercedBoolean,
    _coercedDate: () => _coercedDate,
    _coercedNumber: () => _coercedNumber,
    _coercedString: () => _coercedString,
    _cuid: () => _cuid,
    _cuid2: () => _cuid2,
    _custom: () => _custom,
    _date: () => _date,
    _decode: () => _decode,
    _decodeAsync: () => _decodeAsync,
    _default: () => _default,
    _discriminatedUnion: () => _discriminatedUnion,
    _e164: () => _e164,
    _email: () => _email,
    _emoji: () => _emoji2,
    _encode: () => _encode,
    _encodeAsync: () => _encodeAsync,
    _endsWith: () => _endsWith,
    _enum: () => _enum,
    _file: () => _file,
    _float32: () => _float32,
    _float64: () => _float64,
    _gt: () => _gt,
    _gte: () => _gte,
    _guid: () => _guid,
    _includes: () => _includes,
    _int: () => _int,
    _int32: () => _int32,
    _int64: () => _int64,
    _intersection: () => _intersection,
    _ipv4: () => _ipv4,
    _ipv6: () => _ipv6,
    _isoDate: () => _isoDate,
    _isoDateTime: () => _isoDateTime,
    _isoDuration: () => _isoDuration,
    _isoTime: () => _isoTime,
    _jwt: () => _jwt,
    _ksuid: () => _ksuid,
    _lazy: () => _lazy,
    _length: () => _length,
    _literal: () => _literal,
    _lowercase: () => _lowercase,
    _lt: () => _lt,
    _lte: () => _lte,
    _mac: () => _mac,
    _map: () => _map,
    _max: () => _lte,
    _maxLength: () => _maxLength,
    _maxSize: () => _maxSize,
    _mime: () => _mime,
    _min: () => _gte,
    _minLength: () => _minLength,
    _minSize: () => _minSize,
    _multipleOf: () => _multipleOf,
    _nan: () => _nan,
    _nanoid: () => _nanoid,
    _nativeEnum: () => _nativeEnum,
    _negative: () => _negative,
    _never: () => _never,
    _nonnegative: () => _nonnegative,
    _nonoptional: () => _nonoptional,
    _nonpositive: () => _nonpositive,
    _normalize: () => _normalize,
    _null: () => _null2,
    _nullable: () => _nullable,
    _number: () => _number,
    _optional: () => _optional,
    _overwrite: () => _overwrite,
    _parse: () => _parse,
    _parseAsync: () => _parseAsync,
    _pipe: () => _pipe,
    _positive: () => _positive,
    _promise: () => _promise,
    _property: () => _property,
    _readonly: () => _readonly,
    _record: () => _record,
    _refine: () => _refine,
    _regex: () => _regex,
    _safeDecode: () => _safeDecode,
    _safeDecodeAsync: () => _safeDecodeAsync,
    _safeEncode: () => _safeEncode,
    _safeEncodeAsync: () => _safeEncodeAsync,
    _safeParse: () => _safeParse,
    _safeParseAsync: () => _safeParseAsync,
    _set: () => _set,
    _size: () => _size,
    _slugify: () => _slugify,
    _startsWith: () => _startsWith,
    _string: () => _string,
    _stringFormat: () => _stringFormat,
    _stringbool: () => _stringbool,
    _success: () => _success,
    _superRefine: () => _superRefine,
    _symbol: () => _symbol,
    _templateLiteral: () => _templateLiteral,
    _toLowerCase: () => _toLowerCase,
    _toUpperCase: () => _toUpperCase,
    _transform: () => _transform,
    _trim: () => _trim,
    _tuple: () => _tuple,
    _uint32: () => _uint32,
    _uint64: () => _uint64,
    _ulid: () => _ulid,
    _undefined: () => _undefined2,
    _union: () => _union,
    _unknown: () => _unknown,
    _uppercase: () => _uppercase,
    _url: () => _url,
    _uuid: () => _uuid,
    _uuidv4: () => _uuidv4,
    _uuidv6: () => _uuidv6,
    _uuidv7: () => _uuidv7,
    _void: () => _void,
    _xid: () => _xid,
    _xor: () => _xor,
    clone: () => clone,
    config: () => config,
    createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
    createToJSONSchemaMethod: () => createToJSONSchemaMethod,
    decode: () => decode,
    decodeAsync: () => decodeAsync,
    describe: () => describe,
    encode: () => encode,
    encodeAsync: () => encodeAsync,
    extractDefs: () => extractDefs,
    finalize: () => finalize,
    flattenError: () => flattenError,
    formatError: () => formatError,
    globalConfig: () => globalConfig,
    globalRegistry: () => globalRegistry,
    initializeContext: () => initializeContext,
    isValidBase64: () => isValidBase64,
    isValidBase64URL: () => isValidBase64URL,
    isValidJWT: () => isValidJWT,
    locales: () => locales_exports,
    meta: () => meta,
    parse: () => parse,
    parseAsync: () => parseAsync,
    prettifyError: () => prettifyError,
    process: () => process,
    regexes: () => regexes_exports,
    registry: () => registry,
    safeDecode: () => safeDecode,
    safeDecodeAsync: () => safeDecodeAsync,
    safeEncode: () => safeEncode,
    safeEncodeAsync: () => safeEncodeAsync,
    safeParse: () => safeParse,
    safeParseAsync: () => safeParseAsync,
    toDotPath: () => toDotPath,
    toJSONSchema: () => toJSONSchema,
    treeifyError: () => treeifyError,
    util: () => util_exports,
    version: () => version
  });
  var init_core2 = __esm({
    "node_modules/zod/v4/core/index.js"() {
      init_core();
      init_parse();
      init_errors();
      init_schemas();
      init_checks();
      init_versions();
      init_util();
      init_regexes();
      init_locales();
      init_registries();
      init_doc();
      init_api();
      init_to_json_schema();
      init_json_schema_processors();
      init_json_schema_generator();
      init_json_schema();
    }
  });

  // node_modules/zod/v4/classic/checks.js
  var checks_exports2 = {};
  __export(checks_exports2, {
    endsWith: () => _endsWith,
    gt: () => _gt,
    gte: () => _gte,
    includes: () => _includes,
    length: () => _length,
    lowercase: () => _lowercase,
    lt: () => _lt,
    lte: () => _lte,
    maxLength: () => _maxLength,
    maxSize: () => _maxSize,
    mime: () => _mime,
    minLength: () => _minLength,
    minSize: () => _minSize,
    multipleOf: () => _multipleOf,
    negative: () => _negative,
    nonnegative: () => _nonnegative,
    nonpositive: () => _nonpositive,
    normalize: () => _normalize,
    overwrite: () => _overwrite,
    positive: () => _positive,
    property: () => _property,
    regex: () => _regex,
    size: () => _size,
    slugify: () => _slugify,
    startsWith: () => _startsWith,
    toLowerCase: () => _toLowerCase,
    toUpperCase: () => _toUpperCase,
    trim: () => _trim,
    uppercase: () => _uppercase
  });
  var init_checks2 = __esm({
    "node_modules/zod/v4/classic/checks.js"() {
      init_core2();
    }
  });

  // node_modules/zod/v4/classic/iso.js
  var iso_exports = {};
  __export(iso_exports, {
    ZodISODate: () => ZodISODate,
    ZodISODateTime: () => ZodISODateTime,
    ZodISODuration: () => ZodISODuration,
    ZodISOTime: () => ZodISOTime,
    date: () => date2,
    datetime: () => datetime2,
    duration: () => duration2,
    time: () => time2
  });
  function datetime2(params) {
    return _isoDateTime(ZodISODateTime, params);
  }
  function date2(params) {
    return _isoDate(ZodISODate, params);
  }
  function time2(params) {
    return _isoTime(ZodISOTime, params);
  }
  function duration2(params) {
    return _isoDuration(ZodISODuration, params);
  }
  var ZodISODateTime, ZodISODate, ZodISOTime, ZodISODuration;
  var init_iso = __esm({
    "node_modules/zod/v4/classic/iso.js"() {
      init_core2();
      init_schemas2();
      ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
        $ZodISODateTime.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
        $ZodISODate.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
        $ZodISOTime.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
        $ZodISODuration.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
    }
  });

  // node_modules/zod/v4/classic/errors.js
  var initializer2, ZodError, ZodRealError;
  var init_errors2 = __esm({
    "node_modules/zod/v4/classic/errors.js"() {
      init_core2();
      init_core2();
      init_util();
      initializer2 = (inst, issues) => {
        $ZodError.init(inst, issues);
        inst.name = "ZodError";
        Object.defineProperties(inst, {
          format: {
            value: (mapper) => formatError(inst, mapper)
            // enumerable: false,
          },
          flatten: {
            value: (mapper) => flattenError(inst, mapper)
            // enumerable: false,
          },
          addIssue: {
            value: (issue2) => {
              inst.issues.push(issue2);
              inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
            }
            // enumerable: false,
          },
          addIssues: {
            value: (issues2) => {
              inst.issues.push(...issues2);
              inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
            }
            // enumerable: false,
          },
          isEmpty: {
            get() {
              return inst.issues.length === 0;
            }
            // enumerable: false,
          }
        });
      };
      ZodError = /* @__PURE__ */ $constructor("ZodError", initializer2);
      ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, {
        Parent: Error
      });
    }
  });

  // node_modules/zod/v4/classic/parse.js
  var parse2, parseAsync2, safeParse2, safeParseAsync2, encode2, decode2, encodeAsync2, decodeAsync2, safeEncode2, safeDecode2, safeEncodeAsync2, safeDecodeAsync2;
  var init_parse2 = __esm({
    "node_modules/zod/v4/classic/parse.js"() {
      init_core2();
      init_errors2();
      parse2 = /* @__PURE__ */ _parse(ZodRealError);
      parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
      safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
      safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
      encode2 = /* @__PURE__ */ _encode(ZodRealError);
      decode2 = /* @__PURE__ */ _decode(ZodRealError);
      encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
      decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
      safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
      safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
      safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
      safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
    }
  });

  // node_modules/zod/v4/classic/schemas.js
  var schemas_exports2 = {};
  __export(schemas_exports2, {
    ZodAny: () => ZodAny,
    ZodArray: () => ZodArray,
    ZodBase64: () => ZodBase64,
    ZodBase64URL: () => ZodBase64URL,
    ZodBigInt: () => ZodBigInt,
    ZodBigIntFormat: () => ZodBigIntFormat,
    ZodBoolean: () => ZodBoolean,
    ZodCIDRv4: () => ZodCIDRv4,
    ZodCIDRv6: () => ZodCIDRv6,
    ZodCUID: () => ZodCUID,
    ZodCUID2: () => ZodCUID2,
    ZodCatch: () => ZodCatch,
    ZodCodec: () => ZodCodec,
    ZodCustom: () => ZodCustom,
    ZodCustomStringFormat: () => ZodCustomStringFormat,
    ZodDate: () => ZodDate,
    ZodDefault: () => ZodDefault,
    ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
    ZodE164: () => ZodE164,
    ZodEmail: () => ZodEmail,
    ZodEmoji: () => ZodEmoji,
    ZodEnum: () => ZodEnum,
    ZodExactOptional: () => ZodExactOptional,
    ZodFile: () => ZodFile,
    ZodFunction: () => ZodFunction,
    ZodGUID: () => ZodGUID,
    ZodIPv4: () => ZodIPv4,
    ZodIPv6: () => ZodIPv6,
    ZodIntersection: () => ZodIntersection,
    ZodJWT: () => ZodJWT,
    ZodKSUID: () => ZodKSUID,
    ZodLazy: () => ZodLazy,
    ZodLiteral: () => ZodLiteral,
    ZodMAC: () => ZodMAC,
    ZodMap: () => ZodMap,
    ZodNaN: () => ZodNaN,
    ZodNanoID: () => ZodNanoID,
    ZodNever: () => ZodNever,
    ZodNonOptional: () => ZodNonOptional,
    ZodNull: () => ZodNull,
    ZodNullable: () => ZodNullable,
    ZodNumber: () => ZodNumber,
    ZodNumberFormat: () => ZodNumberFormat,
    ZodObject: () => ZodObject,
    ZodOptional: () => ZodOptional,
    ZodPipe: () => ZodPipe,
    ZodPrefault: () => ZodPrefault,
    ZodPreprocess: () => ZodPreprocess,
    ZodPromise: () => ZodPromise,
    ZodReadonly: () => ZodReadonly,
    ZodRecord: () => ZodRecord,
    ZodSet: () => ZodSet,
    ZodString: () => ZodString,
    ZodStringFormat: () => ZodStringFormat,
    ZodSuccess: () => ZodSuccess,
    ZodSymbol: () => ZodSymbol,
    ZodTemplateLiteral: () => ZodTemplateLiteral,
    ZodTransform: () => ZodTransform,
    ZodTuple: () => ZodTuple,
    ZodType: () => ZodType,
    ZodULID: () => ZodULID,
    ZodURL: () => ZodURL,
    ZodUUID: () => ZodUUID,
    ZodUndefined: () => ZodUndefined,
    ZodUnion: () => ZodUnion,
    ZodUnknown: () => ZodUnknown,
    ZodVoid: () => ZodVoid,
    ZodXID: () => ZodXID,
    ZodXor: () => ZodXor,
    _ZodString: () => _ZodString,
    _default: () => _default2,
    _function: () => _function,
    any: () => any,
    array: () => array,
    base64: () => base642,
    base64url: () => base64url2,
    bigint: () => bigint2,
    boolean: () => boolean2,
    catch: () => _catch2,
    check: () => check,
    cidrv4: () => cidrv42,
    cidrv6: () => cidrv62,
    codec: () => codec,
    cuid: () => cuid3,
    cuid2: () => cuid22,
    custom: () => custom,
    date: () => date3,
    describe: () => describe2,
    discriminatedUnion: () => discriminatedUnion,
    e164: () => e1642,
    email: () => email2,
    emoji: () => emoji2,
    enum: () => _enum2,
    exactOptional: () => exactOptional,
    file: () => file,
    float32: () => float32,
    float64: () => float64,
    function: () => _function,
    guid: () => guid2,
    hash: () => hash,
    hex: () => hex2,
    hostname: () => hostname2,
    httpUrl: () => httpUrl,
    instanceof: () => _instanceof,
    int: () => int,
    int32: () => int32,
    int64: () => int64,
    intersection: () => intersection,
    invertCodec: () => invertCodec,
    ipv4: () => ipv42,
    ipv6: () => ipv62,
    json: () => json,
    jwt: () => jwt,
    keyof: () => keyof,
    ksuid: () => ksuid2,
    lazy: () => lazy,
    literal: () => literal,
    looseObject: () => looseObject,
    looseRecord: () => looseRecord,
    mac: () => mac2,
    map: () => map,
    meta: () => meta2,
    nan: () => nan,
    nanoid: () => nanoid2,
    nativeEnum: () => nativeEnum,
    never: () => never,
    nonoptional: () => nonoptional,
    null: () => _null3,
    nullable: () => nullable,
    nullish: () => nullish2,
    number: () => number2,
    object: () => object,
    optional: () => optional,
    partialRecord: () => partialRecord,
    pipe: () => pipe,
    prefault: () => prefault,
    preprocess: () => preprocess,
    promise: () => promise,
    readonly: () => readonly,
    record: () => record,
    refine: () => refine,
    set: () => set,
    strictObject: () => strictObject,
    string: () => string2,
    stringFormat: () => stringFormat,
    stringbool: () => stringbool,
    success: () => success,
    superRefine: () => superRefine,
    symbol: () => symbol,
    templateLiteral: () => templateLiteral,
    transform: () => transform,
    tuple: () => tuple,
    uint32: () => uint32,
    uint64: () => uint64,
    ulid: () => ulid2,
    undefined: () => _undefined3,
    union: () => union,
    unknown: () => unknown,
    url: () => url,
    uuid: () => uuid2,
    uuidv4: () => uuidv4,
    uuidv6: () => uuidv6,
    uuidv7: () => uuidv7,
    void: () => _void2,
    xid: () => xid2,
    xor: () => xor
  });
  function _installLazyMethods(inst, group, methods) {
    const proto = Object.getPrototypeOf(inst);
    let installed = _installedGroups.get(proto);
    if (!installed) {
      installed = /* @__PURE__ */ new Set();
      _installedGroups.set(proto, installed);
    }
    if (installed.has(group))
      return;
    installed.add(group);
    for (const key in methods) {
      const fn = methods[key];
      Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: false,
        get() {
          const bound = fn.bind(this);
          Object.defineProperty(this, key, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: bound
          });
          return bound;
        },
        set(v2) {
          Object.defineProperty(this, key, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: v2
          });
        }
      });
    }
  }
  function string2(params) {
    return _string(ZodString, params);
  }
  function email2(params) {
    return _email(ZodEmail, params);
  }
  function guid2(params) {
    return _guid(ZodGUID, params);
  }
  function uuid2(params) {
    return _uuid(ZodUUID, params);
  }
  function uuidv4(params) {
    return _uuidv4(ZodUUID, params);
  }
  function uuidv6(params) {
    return _uuidv6(ZodUUID, params);
  }
  function uuidv7(params) {
    return _uuidv7(ZodUUID, params);
  }
  function url(params) {
    return _url(ZodURL, params);
  }
  function httpUrl(params) {
    return _url(ZodURL, {
      protocol: regexes_exports.httpProtocol,
      hostname: regexes_exports.domain,
      ...util_exports.normalizeParams(params)
    });
  }
  function emoji2(params) {
    return _emoji2(ZodEmoji, params);
  }
  function nanoid2(params) {
    return _nanoid(ZodNanoID, params);
  }
  function cuid3(params) {
    return _cuid(ZodCUID, params);
  }
  function cuid22(params) {
    return _cuid2(ZodCUID2, params);
  }
  function ulid2(params) {
    return _ulid(ZodULID, params);
  }
  function xid2(params) {
    return _xid(ZodXID, params);
  }
  function ksuid2(params) {
    return _ksuid(ZodKSUID, params);
  }
  function ipv42(params) {
    return _ipv4(ZodIPv4, params);
  }
  function mac2(params) {
    return _mac(ZodMAC, params);
  }
  function ipv62(params) {
    return _ipv6(ZodIPv6, params);
  }
  function cidrv42(params) {
    return _cidrv4(ZodCIDRv4, params);
  }
  function cidrv62(params) {
    return _cidrv6(ZodCIDRv6, params);
  }
  function base642(params) {
    return _base64(ZodBase64, params);
  }
  function base64url2(params) {
    return _base64url(ZodBase64URL, params);
  }
  function e1642(params) {
    return _e164(ZodE164, params);
  }
  function jwt(params) {
    return _jwt(ZodJWT, params);
  }
  function stringFormat(format, fnOrRegex, _params = {}) {
    return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
  }
  function hostname2(_params) {
    return _stringFormat(ZodCustomStringFormat, "hostname", regexes_exports.hostname, _params);
  }
  function hex2(_params) {
    return _stringFormat(ZodCustomStringFormat, "hex", regexes_exports.hex, _params);
  }
  function hash(alg, params) {
    const enc = params?.enc ?? "hex";
    const format = `${alg}_${enc}`;
    const regex = regexes_exports[format];
    if (!regex)
      throw new Error(`Unrecognized hash format: ${format}`);
    return _stringFormat(ZodCustomStringFormat, format, regex, params);
  }
  function number2(params) {
    return _number(ZodNumber, params);
  }
  function int(params) {
    return _int(ZodNumberFormat, params);
  }
  function float32(params) {
    return _float32(ZodNumberFormat, params);
  }
  function float64(params) {
    return _float64(ZodNumberFormat, params);
  }
  function int32(params) {
    return _int32(ZodNumberFormat, params);
  }
  function uint32(params) {
    return _uint32(ZodNumberFormat, params);
  }
  function boolean2(params) {
    return _boolean(ZodBoolean, params);
  }
  function bigint2(params) {
    return _bigint(ZodBigInt, params);
  }
  function int64(params) {
    return _int64(ZodBigIntFormat, params);
  }
  function uint64(params) {
    return _uint64(ZodBigIntFormat, params);
  }
  function symbol(params) {
    return _symbol(ZodSymbol, params);
  }
  function _undefined3(params) {
    return _undefined2(ZodUndefined, params);
  }
  function _null3(params) {
    return _null2(ZodNull, params);
  }
  function any() {
    return _any(ZodAny);
  }
  function unknown() {
    return _unknown(ZodUnknown);
  }
  function never(params) {
    return _never(ZodNever, params);
  }
  function _void2(params) {
    return _void(ZodVoid, params);
  }
  function date3(params) {
    return _date(ZodDate, params);
  }
  function array(element, params) {
    return _array(ZodArray, element, params);
  }
  function keyof(schema) {
    const shape = schema._zod.def.shape;
    return _enum2(Object.keys(shape));
  }
  function object(shape, params) {
    const def = {
      type: "object",
      shape: shape ?? {},
      ...util_exports.normalizeParams(params)
    };
    return new ZodObject(def);
  }
  function strictObject(shape, params) {
    return new ZodObject({
      type: "object",
      shape,
      catchall: never(),
      ...util_exports.normalizeParams(params)
    });
  }
  function looseObject(shape, params) {
    return new ZodObject({
      type: "object",
      shape,
      catchall: unknown(),
      ...util_exports.normalizeParams(params)
    });
  }
  function union(options, params) {
    return new ZodUnion({
      type: "union",
      options,
      ...util_exports.normalizeParams(params)
    });
  }
  function xor(options, params) {
    return new ZodXor({
      type: "union",
      options,
      inclusive: false,
      ...util_exports.normalizeParams(params)
    });
  }
  function discriminatedUnion(discriminator, options, params) {
    return new ZodDiscriminatedUnion({
      type: "union",
      options,
      discriminator,
      ...util_exports.normalizeParams(params)
    });
  }
  function intersection(left, right) {
    return new ZodIntersection({
      type: "intersection",
      left,
      right
    });
  }
  function tuple(items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof $ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new ZodTuple({
      type: "tuple",
      items,
      rest,
      ...util_exports.normalizeParams(params)
    });
  }
  function record(keyType, valueType, params) {
    if (!valueType || !valueType._zod) {
      return new ZodRecord({
        type: "record",
        keyType: string2(),
        valueType: keyType,
        ...util_exports.normalizeParams(valueType)
      });
    }
    return new ZodRecord({
      type: "record",
      keyType,
      valueType,
      ...util_exports.normalizeParams(params)
    });
  }
  function partialRecord(keyType, valueType, params) {
    const k2 = clone(keyType);
    k2._zod.values = void 0;
    return new ZodRecord({
      type: "record",
      keyType: k2,
      valueType,
      ...util_exports.normalizeParams(params)
    });
  }
  function looseRecord(keyType, valueType, params) {
    return new ZodRecord({
      type: "record",
      keyType,
      valueType,
      mode: "loose",
      ...util_exports.normalizeParams(params)
    });
  }
  function map(keyType, valueType, params) {
    return new ZodMap({
      type: "map",
      keyType,
      valueType,
      ...util_exports.normalizeParams(params)
    });
  }
  function set(valueType, params) {
    return new ZodSet({
      type: "set",
      valueType,
      ...util_exports.normalizeParams(params)
    });
  }
  function _enum2(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v2) => [v2, v2])) : values;
    return new ZodEnum({
      type: "enum",
      entries,
      ...util_exports.normalizeParams(params)
    });
  }
  function nativeEnum(entries, params) {
    return new ZodEnum({
      type: "enum",
      entries,
      ...util_exports.normalizeParams(params)
    });
  }
  function literal(value, params) {
    return new ZodLiteral({
      type: "literal",
      values: Array.isArray(value) ? value : [value],
      ...util_exports.normalizeParams(params)
    });
  }
  function file(params) {
    return _file(ZodFile, params);
  }
  function transform(fn) {
    return new ZodTransform({
      type: "transform",
      transform: fn
    });
  }
  function optional(innerType) {
    return new ZodOptional({
      type: "optional",
      innerType
    });
  }
  function exactOptional(innerType) {
    return new ZodExactOptional({
      type: "optional",
      innerType
    });
  }
  function nullable(innerType) {
    return new ZodNullable({
      type: "nullable",
      innerType
    });
  }
  function nullish2(innerType) {
    return optional(nullable(innerType));
  }
  function _default2(innerType, defaultValue) {
    return new ZodDefault({
      type: "default",
      innerType,
      get defaultValue() {
        return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
      }
    });
  }
  function prefault(innerType, defaultValue) {
    return new ZodPrefault({
      type: "prefault",
      innerType,
      get defaultValue() {
        return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
      }
    });
  }
  function nonoptional(innerType, params) {
    return new ZodNonOptional({
      type: "nonoptional",
      innerType,
      ...util_exports.normalizeParams(params)
    });
  }
  function success(innerType) {
    return new ZodSuccess({
      type: "success",
      innerType
    });
  }
  function _catch2(innerType, catchValue) {
    return new ZodCatch({
      type: "catch",
      innerType,
      catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
    });
  }
  function nan(params) {
    return _nan(ZodNaN, params);
  }
  function pipe(in_, out) {
    return new ZodPipe({
      type: "pipe",
      in: in_,
      out
      // ...util.normalizeParams(params),
    });
  }
  function codec(in_, out, params) {
    return new ZodCodec({
      type: "pipe",
      in: in_,
      out,
      transform: params.decode,
      reverseTransform: params.encode
    });
  }
  function invertCodec(codec2) {
    const def = codec2._zod.def;
    return new ZodCodec({
      type: "pipe",
      in: def.out,
      out: def.in,
      transform: def.reverseTransform,
      reverseTransform: def.transform
    });
  }
  function readonly(innerType) {
    return new ZodReadonly({
      type: "readonly",
      innerType
    });
  }
  function templateLiteral(parts, params) {
    return new ZodTemplateLiteral({
      type: "template_literal",
      parts,
      ...util_exports.normalizeParams(params)
    });
  }
  function lazy(getter) {
    return new ZodLazy({
      type: "lazy",
      getter
    });
  }
  function promise(innerType) {
    return new ZodPromise({
      type: "promise",
      innerType
    });
  }
  function _function(params) {
    return new ZodFunction({
      type: "function",
      input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
      output: params?.output ?? unknown()
    });
  }
  function check(fn) {
    const ch = new $ZodCheck({
      check: "custom"
      // ...util.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
  }
  function custom(fn, _params) {
    return _custom(ZodCustom, fn ?? (() => true), _params);
  }
  function refine(fn, _params = {}) {
    return _refine(ZodCustom, fn, _params);
  }
  function superRefine(fn, params) {
    return _superRefine(fn, params);
  }
  function _instanceof(cls, params = {}) {
    const inst = new ZodCustom({
      type: "custom",
      check: "custom",
      fn: (data) => data instanceof cls,
      abort: true,
      ...util_exports.normalizeParams(params)
    });
    inst._zod.bag.Class = cls;
    inst._zod.check = (payload) => {
      if (!(payload.value instanceof cls)) {
        payload.issues.push({
          code: "invalid_type",
          expected: cls.name,
          input: payload.value,
          inst,
          path: [...inst._zod.def.path ?? []]
        });
      }
    };
    return inst;
  }
  function json(params) {
    const jsonSchema = lazy(() => {
      return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
    });
    return jsonSchema;
  }
  function preprocess(fn, schema) {
    return new ZodPreprocess({
      type: "pipe",
      in: transform(fn),
      out: schema
    });
  }
  var _installedGroups, ZodType, _ZodString, ZodString, ZodStringFormat, ZodEmail, ZodGUID, ZodUUID, ZodURL, ZodEmoji, ZodNanoID, ZodCUID, ZodCUID2, ZodULID, ZodXID, ZodKSUID, ZodIPv4, ZodMAC, ZodIPv6, ZodCIDRv4, ZodCIDRv6, ZodBase64, ZodBase64URL, ZodE164, ZodJWT, ZodCustomStringFormat, ZodNumber, ZodNumberFormat, ZodBoolean, ZodBigInt, ZodBigIntFormat, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodDate, ZodArray, ZodObject, ZodUnion, ZodXor, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodEnum, ZodLiteral, ZodFile, ZodTransform, ZodOptional, ZodExactOptional, ZodNullable, ZodDefault, ZodPrefault, ZodNonOptional, ZodSuccess, ZodCatch, ZodNaN, ZodPipe, ZodCodec, ZodPreprocess, ZodReadonly, ZodTemplateLiteral, ZodLazy, ZodPromise, ZodFunction, ZodCustom, describe2, meta2, stringbool;
  var init_schemas2 = __esm({
    "node_modules/zod/v4/classic/schemas.js"() {
      init_core2();
      init_core2();
      init_json_schema_processors();
      init_to_json_schema();
      init_checks2();
      init_iso();
      init_parse2();
      _installedGroups = /* @__PURE__ */ new WeakMap();
      ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
        $ZodType.init(inst, def);
        Object.assign(inst["~standard"], {
          jsonSchema: {
            input: createStandardJSONSchemaMethod(inst, "input"),
            output: createStandardJSONSchemaMethod(inst, "output")
          }
        });
        inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
        inst.def = def;
        inst.type = def.type;
        Object.defineProperty(inst, "_def", { value: def });
        inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
        inst.safeParse = (data, params) => safeParse2(inst, data, params);
        inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
        inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
        inst.spa = inst.safeParseAsync;
        inst.encode = (data, params) => encode2(inst, data, params);
        inst.decode = (data, params) => decode2(inst, data, params);
        inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
        inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
        inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
        inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
        inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
        inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
        _installLazyMethods(inst, "ZodType", {
          check(...chks) {
            const def2 = this.def;
            return this.clone(util_exports.mergeDefs(def2, {
              checks: [
                ...def2.checks ?? [],
                ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
              ]
            }), { parent: true });
          },
          with(...chks) {
            return this.check(...chks);
          },
          clone(def2, params) {
            return clone(this, def2, params);
          },
          brand() {
            return this;
          },
          register(reg, meta3) {
            reg.add(this, meta3);
            return this;
          },
          refine(check2, params) {
            return this.check(refine(check2, params));
          },
          superRefine(refinement, params) {
            return this.check(superRefine(refinement, params));
          },
          overwrite(fn) {
            return this.check(_overwrite(fn));
          },
          optional() {
            return optional(this);
          },
          exactOptional() {
            return exactOptional(this);
          },
          nullable() {
            return nullable(this);
          },
          nullish() {
            return optional(nullable(this));
          },
          nonoptional(params) {
            return nonoptional(this, params);
          },
          array() {
            return array(this);
          },
          or(arg) {
            return union([this, arg]);
          },
          and(arg) {
            return intersection(this, arg);
          },
          transform(tx) {
            return pipe(this, transform(tx));
          },
          default(d2) {
            return _default2(this, d2);
          },
          prefault(d2) {
            return prefault(this, d2);
          },
          catch(params) {
            return _catch2(this, params);
          },
          pipe(target) {
            return pipe(this, target);
          },
          readonly() {
            return readonly(this);
          },
          describe(description) {
            const cl = this.clone();
            globalRegistry.add(cl, { description });
            return cl;
          },
          meta(...args) {
            if (args.length === 0)
              return globalRegistry.get(this);
            const cl = this.clone();
            globalRegistry.add(cl, args[0]);
            return cl;
          },
          isOptional() {
            return this.safeParse(void 0).success;
          },
          isNullable() {
            return this.safeParse(null).success;
          },
          apply(fn) {
            return fn(this);
          }
        });
        Object.defineProperty(inst, "description", {
          get() {
            return globalRegistry.get(inst)?.description;
          },
          configurable: true
        });
        return inst;
      });
      _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
        $ZodString.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => stringProcessor(inst, ctx, json2, params);
        const bag = inst._zod.bag;
        inst.format = bag.format ?? null;
        inst.minLength = bag.minimum ?? null;
        inst.maxLength = bag.maximum ?? null;
        _installLazyMethods(inst, "_ZodString", {
          regex(...args) {
            return this.check(_regex(...args));
          },
          includes(...args) {
            return this.check(_includes(...args));
          },
          startsWith(...args) {
            return this.check(_startsWith(...args));
          },
          endsWith(...args) {
            return this.check(_endsWith(...args));
          },
          min(...args) {
            return this.check(_minLength(...args));
          },
          max(...args) {
            return this.check(_maxLength(...args));
          },
          length(...args) {
            return this.check(_length(...args));
          },
          nonempty(...args) {
            return this.check(_minLength(1, ...args));
          },
          lowercase(params) {
            return this.check(_lowercase(params));
          },
          uppercase(params) {
            return this.check(_uppercase(params));
          },
          trim() {
            return this.check(_trim());
          },
          normalize(...args) {
            return this.check(_normalize(...args));
          },
          toLowerCase() {
            return this.check(_toLowerCase());
          },
          toUpperCase() {
            return this.check(_toUpperCase());
          },
          slugify() {
            return this.check(_slugify());
          }
        });
      });
      ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
        $ZodString.init(inst, def);
        _ZodString.init(inst, def);
        inst.email = (params) => inst.check(_email(ZodEmail, params));
        inst.url = (params) => inst.check(_url(ZodURL, params));
        inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
        inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
        inst.guid = (params) => inst.check(_guid(ZodGUID, params));
        inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
        inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
        inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
        inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
        inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
        inst.guid = (params) => inst.check(_guid(ZodGUID, params));
        inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
        inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
        inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
        inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
        inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
        inst.xid = (params) => inst.check(_xid(ZodXID, params));
        inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
        inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
        inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
        inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
        inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
        inst.e164 = (params) => inst.check(_e164(ZodE164, params));
        inst.datetime = (params) => inst.check(datetime2(params));
        inst.date = (params) => inst.check(date2(params));
        inst.time = (params) => inst.check(time2(params));
        inst.duration = (params) => inst.check(duration2(params));
      });
      ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
        $ZodStringFormat.init(inst, def);
        _ZodString.init(inst, def);
      });
      ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
        $ZodEmail.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
        $ZodGUID.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
        $ZodUUID.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
        $ZodURL.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
        $ZodEmoji.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
        $ZodNanoID.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
        $ZodCUID.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
        $ZodCUID2.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
        $ZodULID.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
        $ZodXID.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
        $ZodKSUID.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
        $ZodIPv4.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
        $ZodMAC.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
        $ZodIPv6.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
        $ZodCIDRv4.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
        $ZodCIDRv6.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
        $ZodBase64.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
        $ZodBase64URL.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
        $ZodE164.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
        $ZodJWT.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
        $ZodCustomStringFormat.init(inst, def);
        ZodStringFormat.init(inst, def);
      });
      ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
        $ZodNumber.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => numberProcessor(inst, ctx, json2, params);
        _installLazyMethods(inst, "ZodNumber", {
          gt(value, params) {
            return this.check(_gt(value, params));
          },
          gte(value, params) {
            return this.check(_gte(value, params));
          },
          min(value, params) {
            return this.check(_gte(value, params));
          },
          lt(value, params) {
            return this.check(_lt(value, params));
          },
          lte(value, params) {
            return this.check(_lte(value, params));
          },
          max(value, params) {
            return this.check(_lte(value, params));
          },
          int(params) {
            return this.check(int(params));
          },
          safe(params) {
            return this.check(int(params));
          },
          positive(params) {
            return this.check(_gt(0, params));
          },
          nonnegative(params) {
            return this.check(_gte(0, params));
          },
          negative(params) {
            return this.check(_lt(0, params));
          },
          nonpositive(params) {
            return this.check(_lte(0, params));
          },
          multipleOf(value, params) {
            return this.check(_multipleOf(value, params));
          },
          step(value, params) {
            return this.check(_multipleOf(value, params));
          },
          finite() {
            return this;
          }
        });
        const bag = inst._zod.bag;
        inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
        inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
        inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
        inst.isFinite = true;
        inst.format = bag.format ?? null;
      });
      ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
        $ZodNumberFormat.init(inst, def);
        ZodNumber.init(inst, def);
      });
      ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
        $ZodBoolean.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => booleanProcessor(inst, ctx, json2, params);
      });
      ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
        $ZodBigInt.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => bigintProcessor(inst, ctx, json2, params);
        inst.gte = (value, params) => inst.check(_gte(value, params));
        inst.min = (value, params) => inst.check(_gte(value, params));
        inst.gt = (value, params) => inst.check(_gt(value, params));
        inst.gte = (value, params) => inst.check(_gte(value, params));
        inst.min = (value, params) => inst.check(_gte(value, params));
        inst.lt = (value, params) => inst.check(_lt(value, params));
        inst.lte = (value, params) => inst.check(_lte(value, params));
        inst.max = (value, params) => inst.check(_lte(value, params));
        inst.positive = (params) => inst.check(_gt(BigInt(0), params));
        inst.negative = (params) => inst.check(_lt(BigInt(0), params));
        inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
        inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
        inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
        const bag = inst._zod.bag;
        inst.minValue = bag.minimum ?? null;
        inst.maxValue = bag.maximum ?? null;
        inst.format = bag.format ?? null;
      });
      ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
        $ZodBigIntFormat.init(inst, def);
        ZodBigInt.init(inst, def);
      });
      ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
        $ZodSymbol.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => symbolProcessor(inst, ctx, json2, params);
      });
      ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
        $ZodUndefined.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => undefinedProcessor(inst, ctx, json2, params);
      });
      ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
        $ZodNull.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => nullProcessor(inst, ctx, json2, params);
      });
      ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
        $ZodAny.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => anyProcessor(inst, ctx, json2, params);
      });
      ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
        $ZodUnknown.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => unknownProcessor(inst, ctx, json2, params);
      });
      ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
        $ZodNever.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => neverProcessor(inst, ctx, json2, params);
      });
      ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
        $ZodVoid.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => voidProcessor(inst, ctx, json2, params);
      });
      ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
        $ZodDate.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => dateProcessor(inst, ctx, json2, params);
        inst.min = (value, params) => inst.check(_gte(value, params));
        inst.max = (value, params) => inst.check(_lte(value, params));
        const c = inst._zod.bag;
        inst.minDate = c.minimum ? new Date(c.minimum) : null;
        inst.maxDate = c.maximum ? new Date(c.maximum) : null;
      });
      ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
        $ZodArray.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => arrayProcessor(inst, ctx, json2, params);
        inst.element = def.element;
        _installLazyMethods(inst, "ZodArray", {
          min(n, params) {
            return this.check(_minLength(n, params));
          },
          nonempty(params) {
            return this.check(_minLength(1, params));
          },
          max(n, params) {
            return this.check(_maxLength(n, params));
          },
          length(n, params) {
            return this.check(_length(n, params));
          },
          unwrap() {
            return this.element;
          }
        });
      });
      ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
        $ZodObjectJIT.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => objectProcessor(inst, ctx, json2, params);
        util_exports.defineLazy(inst, "shape", () => {
          return def.shape;
        });
        _installLazyMethods(inst, "ZodObject", {
          keyof() {
            return _enum2(Object.keys(this._zod.def.shape));
          },
          catchall(catchall) {
            return this.clone({ ...this._zod.def, catchall });
          },
          passthrough() {
            return this.clone({ ...this._zod.def, catchall: unknown() });
          },
          loose() {
            return this.clone({ ...this._zod.def, catchall: unknown() });
          },
          strict() {
            return this.clone({ ...this._zod.def, catchall: never() });
          },
          strip() {
            return this.clone({ ...this._zod.def, catchall: void 0 });
          },
          extend(incoming) {
            return util_exports.extend(this, incoming);
          },
          safeExtend(incoming) {
            return util_exports.safeExtend(this, incoming);
          },
          merge(other) {
            return util_exports.merge(this, other);
          },
          pick(mask) {
            return util_exports.pick(this, mask);
          },
          omit(mask) {
            return util_exports.omit(this, mask);
          },
          partial(...args) {
            return util_exports.partial(ZodOptional, this, args[0]);
          },
          required(...args) {
            return util_exports.required(ZodNonOptional, this, args[0]);
          }
        });
      });
      ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
        $ZodUnion.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
        inst.options = def.options;
      });
      ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
        ZodUnion.init(inst, def);
        $ZodXor.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
        inst.options = def.options;
      });
      ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
        ZodUnion.init(inst, def);
        $ZodDiscriminatedUnion.init(inst, def);
      });
      ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
        $ZodIntersection.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => intersectionProcessor(inst, ctx, json2, params);
      });
      ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
        $ZodTuple.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => tupleProcessor(inst, ctx, json2, params);
        inst.rest = (rest) => inst.clone({
          ...inst._zod.def,
          rest
        });
      });
      ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
        $ZodRecord.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => recordProcessor(inst, ctx, json2, params);
        inst.keyType = def.keyType;
        inst.valueType = def.valueType;
      });
      ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
        $ZodMap.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => mapProcessor(inst, ctx, json2, params);
        inst.keyType = def.keyType;
        inst.valueType = def.valueType;
        inst.min = (...args) => inst.check(_minSize(...args));
        inst.nonempty = (params) => inst.check(_minSize(1, params));
        inst.max = (...args) => inst.check(_maxSize(...args));
        inst.size = (...args) => inst.check(_size(...args));
      });
      ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
        $ZodSet.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => setProcessor(inst, ctx, json2, params);
        inst.min = (...args) => inst.check(_minSize(...args));
        inst.nonempty = (params) => inst.check(_minSize(1, params));
        inst.max = (...args) => inst.check(_maxSize(...args));
        inst.size = (...args) => inst.check(_size(...args));
      });
      ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
        $ZodEnum.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => enumProcessor(inst, ctx, json2, params);
        inst.enum = def.entries;
        inst.options = Object.values(def.entries);
        const keys = new Set(Object.keys(def.entries));
        inst.extract = (values, params) => {
          const newEntries = {};
          for (const value of values) {
            if (keys.has(value)) {
              newEntries[value] = def.entries[value];
            } else
              throw new Error(`Key ${value} not found in enum`);
          }
          return new ZodEnum({
            ...def,
            checks: [],
            ...util_exports.normalizeParams(params),
            entries: newEntries
          });
        };
        inst.exclude = (values, params) => {
          const newEntries = { ...def.entries };
          for (const value of values) {
            if (keys.has(value)) {
              delete newEntries[value];
            } else
              throw new Error(`Key ${value} not found in enum`);
          }
          return new ZodEnum({
            ...def,
            checks: [],
            ...util_exports.normalizeParams(params),
            entries: newEntries
          });
        };
      });
      ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
        $ZodLiteral.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => literalProcessor(inst, ctx, json2, params);
        inst.values = new Set(def.values);
        Object.defineProperty(inst, "value", {
          get() {
            if (def.values.length > 1) {
              throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return def.values[0];
          }
        });
      });
      ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
        $ZodFile.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => fileProcessor(inst, ctx, json2, params);
        inst.min = (size, params) => inst.check(_minSize(size, params));
        inst.max = (size, params) => inst.check(_maxSize(size, params));
        inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
      });
      ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
        $ZodTransform.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => transformProcessor(inst, ctx, json2, params);
        inst._zod.parse = (payload, _ctx) => {
          if (_ctx.direction === "backward") {
            throw new $ZodEncodeError(inst.constructor.name);
          }
          payload.addIssue = (issue2) => {
            if (typeof issue2 === "string") {
              payload.issues.push(util_exports.issue(issue2, payload.value, def));
            } else {
              const _issue = issue2;
              if (_issue.fatal)
                _issue.continue = false;
              _issue.code ?? (_issue.code = "custom");
              _issue.input ?? (_issue.input = payload.value);
              _issue.inst ?? (_issue.inst = inst);
              payload.issues.push(util_exports.issue(_issue));
            }
          };
          const output = def.transform(payload.value, payload);
          if (output instanceof Promise) {
            return output.then((output2) => {
              payload.value = output2;
              payload.fallback = true;
              return payload;
            });
          }
          payload.value = output;
          payload.fallback = true;
          return payload;
        };
      });
      ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
        $ZodOptional.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
        $ZodExactOptional.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
        $ZodNullable.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => nullableProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
        $ZodDefault.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => defaultProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
        inst.removeDefault = inst.unwrap;
      });
      ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
        $ZodPrefault.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => prefaultProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
        $ZodNonOptional.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => nonoptionalProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
        $ZodSuccess.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => successProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
        $ZodCatch.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => catchProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
        inst.removeCatch = inst.unwrap;
      });
      ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
        $ZodNaN.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => nanProcessor(inst, ctx, json2, params);
      });
      ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
        $ZodPipe.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => pipeProcessor(inst, ctx, json2, params);
        inst.in = def.in;
        inst.out = def.out;
      });
      ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
        ZodPipe.init(inst, def);
        $ZodCodec.init(inst, def);
      });
      ZodPreprocess = /* @__PURE__ */ $constructor("ZodPreprocess", (inst, def) => {
        ZodPipe.init(inst, def);
        $ZodPreprocess.init(inst, def);
      });
      ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
        $ZodReadonly.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => readonlyProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
        $ZodTemplateLiteral.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => templateLiteralProcessor(inst, ctx, json2, params);
      });
      ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
        $ZodLazy.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => lazyProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.getter();
      });
      ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
        $ZodPromise.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => promiseProcessor(inst, ctx, json2, params);
        inst.unwrap = () => inst._zod.def.innerType;
      });
      ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
        $ZodFunction.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => functionProcessor(inst, ctx, json2, params);
      });
      ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
        $ZodCustom.init(inst, def);
        ZodType.init(inst, def);
        inst._zod.processJSONSchema = (ctx, json2, params) => customProcessor(inst, ctx, json2, params);
      });
      describe2 = describe;
      meta2 = meta;
      stringbool = (...args) => _stringbool({
        Codec: ZodCodec,
        Boolean: ZodBoolean,
        String: ZodString
      }, ...args);
    }
  });

  // node_modules/zod/v4/classic/compat.js
  function setErrorMap(map2) {
    config({
      customError: map2
    });
  }
  function getErrorMap() {
    return config().customError;
  }
  var ZodIssueCode, ZodFirstPartyTypeKind;
  var init_compat = __esm({
    "node_modules/zod/v4/classic/compat.js"() {
      init_core2();
      ZodIssueCode = {
        invalid_type: "invalid_type",
        too_big: "too_big",
        too_small: "too_small",
        invalid_format: "invalid_format",
        not_multiple_of: "not_multiple_of",
        unrecognized_keys: "unrecognized_keys",
        invalid_union: "invalid_union",
        invalid_key: "invalid_key",
        invalid_element: "invalid_element",
        invalid_value: "invalid_value",
        custom: "custom"
      };
      /* @__PURE__ */ (function(ZodFirstPartyTypeKind2) {
      })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    }
  });

  // node_modules/zod/v4/classic/from-json-schema.js
  function detectVersion(schema, defaultTarget) {
    const $schema = schema.$schema;
    if ($schema === "https://json-schema.org/draft/2020-12/schema") {
      return "draft-2020-12";
    }
    if ($schema === "http://json-schema.org/draft-07/schema#") {
      return "draft-7";
    }
    if ($schema === "http://json-schema.org/draft-04/schema#") {
      return "draft-4";
    }
    return defaultTarget ?? "draft-2020-12";
  }
  function resolveRef(ref, ctx) {
    if (!ref.startsWith("#")) {
      throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
    }
    const path = ref.slice(1).split("/").filter(Boolean);
    if (path.length === 0) {
      return ctx.rootSchema;
    }
    const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
    if (path[0] === defsKey) {
      const key = path[1];
      if (!key || !ctx.defs[key]) {
        throw new Error(`Reference not found: ${ref}`);
      }
      return ctx.defs[key];
    }
    throw new Error(`Reference not found: ${ref}`);
  }
  function convertBaseSchema(schema, ctx) {
    if (schema.not !== void 0) {
      if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
        return z.never();
      }
      throw new Error("not is not supported in Zod (except { not: {} } for never)");
    }
    if (schema.unevaluatedItems !== void 0) {
      throw new Error("unevaluatedItems is not supported");
    }
    if (schema.unevaluatedProperties !== void 0) {
      throw new Error("unevaluatedProperties is not supported");
    }
    if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) {
      throw new Error("Conditional schemas (if/then/else) are not supported");
    }
    if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) {
      throw new Error("dependentSchemas and dependentRequired are not supported");
    }
    if (schema.$ref) {
      const refPath = schema.$ref;
      if (ctx.refs.has(refPath)) {
        return ctx.refs.get(refPath);
      }
      if (ctx.processing.has(refPath)) {
        return z.lazy(() => {
          if (!ctx.refs.has(refPath)) {
            throw new Error(`Circular reference not resolved: ${refPath}`);
          }
          return ctx.refs.get(refPath);
        });
      }
      ctx.processing.add(refPath);
      const resolved = resolveRef(refPath, ctx);
      const zodSchema2 = convertSchema(resolved, ctx);
      ctx.refs.set(refPath, zodSchema2);
      ctx.processing.delete(refPath);
      return zodSchema2;
    }
    if (schema.enum !== void 0) {
      const enumValues = schema.enum;
      if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
        return z.null();
      }
      if (enumValues.length === 0) {
        return z.never();
      }
      if (enumValues.length === 1) {
        return z.literal(enumValues[0]);
      }
      if (enumValues.every((v2) => typeof v2 === "string")) {
        return z.enum(enumValues);
      }
      const literalSchemas = enumValues.map((v2) => z.literal(v2));
      if (literalSchemas.length < 2) {
        return literalSchemas[0];
      }
      return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
    }
    if (schema.const !== void 0) {
      return z.literal(schema.const);
    }
    const type = schema.type;
    if (Array.isArray(type)) {
      const typeSchemas = type.map((t2) => {
        const typeSchema = { ...schema, type: t2 };
        return convertBaseSchema(typeSchema, ctx);
      });
      if (typeSchemas.length === 0) {
        return z.never();
      }
      if (typeSchemas.length === 1) {
        return typeSchemas[0];
      }
      return z.union(typeSchemas);
    }
    if (!type) {
      return z.any();
    }
    let zodSchema;
    switch (type) {
      case "string": {
        let stringSchema = z.string();
        if (schema.format) {
          const format = schema.format;
          if (format === "email") {
            stringSchema = stringSchema.check(z.email());
          } else if (format === "uri" || format === "uri-reference") {
            stringSchema = stringSchema.check(z.url());
          } else if (format === "uuid" || format === "guid") {
            stringSchema = stringSchema.check(z.uuid());
          } else if (format === "date-time") {
            stringSchema = stringSchema.check(z.iso.datetime());
          } else if (format === "date") {
            stringSchema = stringSchema.check(z.iso.date());
          } else if (format === "time") {
            stringSchema = stringSchema.check(z.iso.time());
          } else if (format === "duration") {
            stringSchema = stringSchema.check(z.iso.duration());
          } else if (format === "ipv4") {
            stringSchema = stringSchema.check(z.ipv4());
          } else if (format === "ipv6") {
            stringSchema = stringSchema.check(z.ipv6());
          } else if (format === "mac") {
            stringSchema = stringSchema.check(z.mac());
          } else if (format === "cidr") {
            stringSchema = stringSchema.check(z.cidrv4());
          } else if (format === "cidr-v6") {
            stringSchema = stringSchema.check(z.cidrv6());
          } else if (format === "base64") {
            stringSchema = stringSchema.check(z.base64());
          } else if (format === "base64url") {
            stringSchema = stringSchema.check(z.base64url());
          } else if (format === "e164") {
            stringSchema = stringSchema.check(z.e164());
          } else if (format === "jwt") {
            stringSchema = stringSchema.check(z.jwt());
          } else if (format === "emoji") {
            stringSchema = stringSchema.check(z.emoji());
          } else if (format === "nanoid") {
            stringSchema = stringSchema.check(z.nanoid());
          } else if (format === "cuid") {
            stringSchema = stringSchema.check(z.cuid());
          } else if (format === "cuid2") {
            stringSchema = stringSchema.check(z.cuid2());
          } else if (format === "ulid") {
            stringSchema = stringSchema.check(z.ulid());
          } else if (format === "xid") {
            stringSchema = stringSchema.check(z.xid());
          } else if (format === "ksuid") {
            stringSchema = stringSchema.check(z.ksuid());
          }
        }
        if (typeof schema.minLength === "number") {
          stringSchema = stringSchema.min(schema.minLength);
        }
        if (typeof schema.maxLength === "number") {
          stringSchema = stringSchema.max(schema.maxLength);
        }
        if (schema.pattern) {
          stringSchema = stringSchema.regex(new RegExp(schema.pattern));
        }
        zodSchema = stringSchema;
        break;
      }
      case "number":
      case "integer": {
        let numberSchema = type === "integer" ? z.number().int() : z.number();
        if (typeof schema.minimum === "number") {
          numberSchema = numberSchema.min(schema.minimum);
        }
        if (typeof schema.maximum === "number") {
          numberSchema = numberSchema.max(schema.maximum);
        }
        if (typeof schema.exclusiveMinimum === "number") {
          numberSchema = numberSchema.gt(schema.exclusiveMinimum);
        } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
          numberSchema = numberSchema.gt(schema.minimum);
        }
        if (typeof schema.exclusiveMaximum === "number") {
          numberSchema = numberSchema.lt(schema.exclusiveMaximum);
        } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
          numberSchema = numberSchema.lt(schema.maximum);
        }
        if (typeof schema.multipleOf === "number") {
          numberSchema = numberSchema.multipleOf(schema.multipleOf);
        }
        zodSchema = numberSchema;
        break;
      }
      case "boolean": {
        zodSchema = z.boolean();
        break;
      }
      case "null": {
        zodSchema = z.null();
        break;
      }
      case "object": {
        const shape = {};
        const properties = schema.properties || {};
        const requiredSet = new Set(schema.required || []);
        for (const [key, propSchema] of Object.entries(properties)) {
          const propZodSchema = convertSchema(propSchema, ctx);
          shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
        }
        if (schema.propertyNames) {
          const keySchema = convertSchema(schema.propertyNames, ctx);
          const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
          if (Object.keys(shape).length === 0) {
            zodSchema = z.record(keySchema, valueSchema);
            break;
          }
          const objectSchema2 = z.object(shape).passthrough();
          const recordSchema = z.looseRecord(keySchema, valueSchema);
          zodSchema = z.intersection(objectSchema2, recordSchema);
          break;
        }
        if (schema.patternProperties) {
          const patternProps = schema.patternProperties;
          const patternKeys = Object.keys(patternProps);
          const looseRecords = [];
          for (const pattern of patternKeys) {
            const patternValue = convertSchema(patternProps[pattern], ctx);
            const keySchema = z.string().regex(new RegExp(pattern));
            looseRecords.push(z.looseRecord(keySchema, patternValue));
          }
          const schemasToIntersect = [];
          if (Object.keys(shape).length > 0) {
            schemasToIntersect.push(z.object(shape).passthrough());
          }
          schemasToIntersect.push(...looseRecords);
          if (schemasToIntersect.length === 0) {
            zodSchema = z.object({}).passthrough();
          } else if (schemasToIntersect.length === 1) {
            zodSchema = schemasToIntersect[0];
          } else {
            let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
            for (let i = 2; i < schemasToIntersect.length; i++) {
              result = z.intersection(result, schemasToIntersect[i]);
            }
            zodSchema = result;
          }
          break;
        }
        const objectSchema = z.object(shape);
        if (schema.additionalProperties === false) {
          zodSchema = objectSchema.strict();
        } else if (typeof schema.additionalProperties === "object") {
          zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
        } else {
          zodSchema = objectSchema.passthrough();
        }
        break;
      }
      case "array": {
        const prefixItems = schema.prefixItems;
        const items = schema.items;
        if (prefixItems && Array.isArray(prefixItems)) {
          const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
          const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
          if (rest) {
            zodSchema = z.tuple(tupleItems).rest(rest);
          } else {
            zodSchema = z.tuple(tupleItems);
          }
          if (typeof schema.minItems === "number") {
            zodSchema = zodSchema.check(z.minLength(schema.minItems));
          }
          if (typeof schema.maxItems === "number") {
            zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
          }
        } else if (Array.isArray(items)) {
          const tupleItems = items.map((item) => convertSchema(item, ctx));
          const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
          if (rest) {
            zodSchema = z.tuple(tupleItems).rest(rest);
          } else {
            zodSchema = z.tuple(tupleItems);
          }
          if (typeof schema.minItems === "number") {
            zodSchema = zodSchema.check(z.minLength(schema.minItems));
          }
          if (typeof schema.maxItems === "number") {
            zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
          }
        } else if (items !== void 0) {
          const element = convertSchema(items, ctx);
          let arraySchema = z.array(element);
          if (typeof schema.minItems === "number") {
            arraySchema = arraySchema.min(schema.minItems);
          }
          if (typeof schema.maxItems === "number") {
            arraySchema = arraySchema.max(schema.maxItems);
          }
          zodSchema = arraySchema;
        } else {
          zodSchema = z.array(z.any());
        }
        break;
      }
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
    return zodSchema;
  }
  function convertSchema(schema, ctx) {
    if (typeof schema === "boolean") {
      return schema ? z.any() : z.never();
    }
    let baseSchema = convertBaseSchema(schema, ctx);
    const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
    if (schema.anyOf && Array.isArray(schema.anyOf)) {
      const options = schema.anyOf.map((s2) => convertSchema(s2, ctx));
      const anyOfUnion = z.union(options);
      baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
    }
    if (schema.oneOf && Array.isArray(schema.oneOf)) {
      const options = schema.oneOf.map((s2) => convertSchema(s2, ctx));
      const oneOfUnion = z.xor(options);
      baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
    }
    if (schema.allOf && Array.isArray(schema.allOf)) {
      if (schema.allOf.length === 0) {
        baseSchema = hasExplicitType ? baseSchema : z.any();
      } else {
        let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
        const startIdx = hasExplicitType ? 0 : 1;
        for (let i = startIdx; i < schema.allOf.length; i++) {
          result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
        }
        baseSchema = result;
      }
    }
    if (schema.nullable === true && ctx.version === "openapi-3.0") {
      baseSchema = z.nullable(baseSchema);
    }
    if (schema.readOnly === true) {
      baseSchema = z.readonly(baseSchema);
    }
    if (schema.default !== void 0) {
      baseSchema = baseSchema.default(schema.default);
    }
    const extraMeta = {};
    const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
    for (const key of coreMetadataKeys) {
      if (key in schema) {
        extraMeta[key] = schema[key];
      }
    }
    const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
    for (const key of contentMetadataKeys) {
      if (key in schema) {
        extraMeta[key] = schema[key];
      }
    }
    for (const key of Object.keys(schema)) {
      if (!RECOGNIZED_KEYS.has(key)) {
        extraMeta[key] = schema[key];
      }
    }
    if (Object.keys(extraMeta).length > 0) {
      ctx.registry.add(baseSchema, extraMeta);
    }
    if (schema.description) {
      baseSchema = baseSchema.describe(schema.description);
    }
    return baseSchema;
  }
  function fromJSONSchema(schema, params) {
    if (typeof schema === "boolean") {
      return schema ? z.any() : z.never();
    }
    let normalized;
    try {
      normalized = JSON.parse(JSON.stringify(schema));
    } catch {
      throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
    }
    const version2 = detectVersion(normalized, params?.defaultTarget);
    const defs = normalized.$defs || normalized.definitions || {};
    const ctx = {
      version: version2,
      defs,
      refs: /* @__PURE__ */ new Map(),
      processing: /* @__PURE__ */ new Set(),
      rootSchema: normalized,
      registry: params?.registry ?? globalRegistry
    };
    return convertSchema(normalized, ctx);
  }
  var z, RECOGNIZED_KEYS;
  var init_from_json_schema = __esm({
    "node_modules/zod/v4/classic/from-json-schema.js"() {
      init_registries();
      init_checks2();
      init_iso();
      init_schemas2();
      z = {
        ...schemas_exports2,
        ...checks_exports2,
        iso: iso_exports
      };
      RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
        // Schema identification
        "$schema",
        "$ref",
        "$defs",
        "definitions",
        // Core schema keywords
        "$id",
        "id",
        "$comment",
        "$anchor",
        "$vocabulary",
        "$dynamicRef",
        "$dynamicAnchor",
        // Type
        "type",
        "enum",
        "const",
        // Composition
        "anyOf",
        "oneOf",
        "allOf",
        "not",
        // Object
        "properties",
        "required",
        "additionalProperties",
        "patternProperties",
        "propertyNames",
        "minProperties",
        "maxProperties",
        // Array
        "items",
        "prefixItems",
        "additionalItems",
        "minItems",
        "maxItems",
        "uniqueItems",
        "contains",
        "minContains",
        "maxContains",
        // String
        "minLength",
        "maxLength",
        "pattern",
        "format",
        // Number
        "minimum",
        "maximum",
        "exclusiveMinimum",
        "exclusiveMaximum",
        "multipleOf",
        // Already handled metadata
        "description",
        "default",
        // Content
        "contentEncoding",
        "contentMediaType",
        "contentSchema",
        // Unsupported (error-throwing)
        "unevaluatedItems",
        "unevaluatedProperties",
        "if",
        "then",
        "else",
        "dependentSchemas",
        "dependentRequired",
        // OpenAPI
        "nullable",
        "readOnly"
      ]);
    }
  });

  // node_modules/zod/v4/classic/coerce.js
  var coerce_exports = {};
  __export(coerce_exports, {
    bigint: () => bigint3,
    boolean: () => boolean3,
    date: () => date4,
    number: () => number3,
    string: () => string3
  });
  function string3(params) {
    return _coercedString(ZodString, params);
  }
  function number3(params) {
    return _coercedNumber(ZodNumber, params);
  }
  function boolean3(params) {
    return _coercedBoolean(ZodBoolean, params);
  }
  function bigint3(params) {
    return _coercedBigint(ZodBigInt, params);
  }
  function date4(params) {
    return _coercedDate(ZodDate, params);
  }
  var init_coerce = __esm({
    "node_modules/zod/v4/classic/coerce.js"() {
      init_core2();
      init_schemas2();
    }
  });

  // node_modules/zod/v4/classic/external.js
  var external_exports = {};
  __export(external_exports, {
    $brand: () => $brand,
    $input: () => $input,
    $output: () => $output,
    NEVER: () => NEVER,
    TimePrecision: () => TimePrecision,
    ZodAny: () => ZodAny,
    ZodArray: () => ZodArray,
    ZodBase64: () => ZodBase64,
    ZodBase64URL: () => ZodBase64URL,
    ZodBigInt: () => ZodBigInt,
    ZodBigIntFormat: () => ZodBigIntFormat,
    ZodBoolean: () => ZodBoolean,
    ZodCIDRv4: () => ZodCIDRv4,
    ZodCIDRv6: () => ZodCIDRv6,
    ZodCUID: () => ZodCUID,
    ZodCUID2: () => ZodCUID2,
    ZodCatch: () => ZodCatch,
    ZodCodec: () => ZodCodec,
    ZodCustom: () => ZodCustom,
    ZodCustomStringFormat: () => ZodCustomStringFormat,
    ZodDate: () => ZodDate,
    ZodDefault: () => ZodDefault,
    ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
    ZodE164: () => ZodE164,
    ZodEmail: () => ZodEmail,
    ZodEmoji: () => ZodEmoji,
    ZodEnum: () => ZodEnum,
    ZodError: () => ZodError,
    ZodExactOptional: () => ZodExactOptional,
    ZodFile: () => ZodFile,
    ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
    ZodFunction: () => ZodFunction,
    ZodGUID: () => ZodGUID,
    ZodIPv4: () => ZodIPv4,
    ZodIPv6: () => ZodIPv6,
    ZodISODate: () => ZodISODate,
    ZodISODateTime: () => ZodISODateTime,
    ZodISODuration: () => ZodISODuration,
    ZodISOTime: () => ZodISOTime,
    ZodIntersection: () => ZodIntersection,
    ZodIssueCode: () => ZodIssueCode,
    ZodJWT: () => ZodJWT,
    ZodKSUID: () => ZodKSUID,
    ZodLazy: () => ZodLazy,
    ZodLiteral: () => ZodLiteral,
    ZodMAC: () => ZodMAC,
    ZodMap: () => ZodMap,
    ZodNaN: () => ZodNaN,
    ZodNanoID: () => ZodNanoID,
    ZodNever: () => ZodNever,
    ZodNonOptional: () => ZodNonOptional,
    ZodNull: () => ZodNull,
    ZodNullable: () => ZodNullable,
    ZodNumber: () => ZodNumber,
    ZodNumberFormat: () => ZodNumberFormat,
    ZodObject: () => ZodObject,
    ZodOptional: () => ZodOptional,
    ZodPipe: () => ZodPipe,
    ZodPrefault: () => ZodPrefault,
    ZodPreprocess: () => ZodPreprocess,
    ZodPromise: () => ZodPromise,
    ZodReadonly: () => ZodReadonly,
    ZodRealError: () => ZodRealError,
    ZodRecord: () => ZodRecord,
    ZodSet: () => ZodSet,
    ZodString: () => ZodString,
    ZodStringFormat: () => ZodStringFormat,
    ZodSuccess: () => ZodSuccess,
    ZodSymbol: () => ZodSymbol,
    ZodTemplateLiteral: () => ZodTemplateLiteral,
    ZodTransform: () => ZodTransform,
    ZodTuple: () => ZodTuple,
    ZodType: () => ZodType,
    ZodULID: () => ZodULID,
    ZodURL: () => ZodURL,
    ZodUUID: () => ZodUUID,
    ZodUndefined: () => ZodUndefined,
    ZodUnion: () => ZodUnion,
    ZodUnknown: () => ZodUnknown,
    ZodVoid: () => ZodVoid,
    ZodXID: () => ZodXID,
    ZodXor: () => ZodXor,
    _ZodString: () => _ZodString,
    _default: () => _default2,
    _function: () => _function,
    any: () => any,
    array: () => array,
    base64: () => base642,
    base64url: () => base64url2,
    bigint: () => bigint2,
    boolean: () => boolean2,
    catch: () => _catch2,
    check: () => check,
    cidrv4: () => cidrv42,
    cidrv6: () => cidrv62,
    clone: () => clone,
    codec: () => codec,
    coerce: () => coerce_exports,
    config: () => config,
    core: () => core_exports2,
    cuid: () => cuid3,
    cuid2: () => cuid22,
    custom: () => custom,
    date: () => date3,
    decode: () => decode2,
    decodeAsync: () => decodeAsync2,
    describe: () => describe2,
    discriminatedUnion: () => discriminatedUnion,
    e164: () => e1642,
    email: () => email2,
    emoji: () => emoji2,
    encode: () => encode2,
    encodeAsync: () => encodeAsync2,
    endsWith: () => _endsWith,
    enum: () => _enum2,
    exactOptional: () => exactOptional,
    file: () => file,
    flattenError: () => flattenError,
    float32: () => float32,
    float64: () => float64,
    formatError: () => formatError,
    fromJSONSchema: () => fromJSONSchema,
    function: () => _function,
    getErrorMap: () => getErrorMap,
    globalRegistry: () => globalRegistry,
    gt: () => _gt,
    gte: () => _gte,
    guid: () => guid2,
    hash: () => hash,
    hex: () => hex2,
    hostname: () => hostname2,
    httpUrl: () => httpUrl,
    includes: () => _includes,
    instanceof: () => _instanceof,
    int: () => int,
    int32: () => int32,
    int64: () => int64,
    intersection: () => intersection,
    invertCodec: () => invertCodec,
    ipv4: () => ipv42,
    ipv6: () => ipv62,
    iso: () => iso_exports,
    json: () => json,
    jwt: () => jwt,
    keyof: () => keyof,
    ksuid: () => ksuid2,
    lazy: () => lazy,
    length: () => _length,
    literal: () => literal,
    locales: () => locales_exports,
    looseObject: () => looseObject,
    looseRecord: () => looseRecord,
    lowercase: () => _lowercase,
    lt: () => _lt,
    lte: () => _lte,
    mac: () => mac2,
    map: () => map,
    maxLength: () => _maxLength,
    maxSize: () => _maxSize,
    meta: () => meta2,
    mime: () => _mime,
    minLength: () => _minLength,
    minSize: () => _minSize,
    multipleOf: () => _multipleOf,
    nan: () => nan,
    nanoid: () => nanoid2,
    nativeEnum: () => nativeEnum,
    negative: () => _negative,
    never: () => never,
    nonnegative: () => _nonnegative,
    nonoptional: () => nonoptional,
    nonpositive: () => _nonpositive,
    normalize: () => _normalize,
    null: () => _null3,
    nullable: () => nullable,
    nullish: () => nullish2,
    number: () => number2,
    object: () => object,
    optional: () => optional,
    overwrite: () => _overwrite,
    parse: () => parse2,
    parseAsync: () => parseAsync2,
    partialRecord: () => partialRecord,
    pipe: () => pipe,
    positive: () => _positive,
    prefault: () => prefault,
    preprocess: () => preprocess,
    prettifyError: () => prettifyError,
    promise: () => promise,
    property: () => _property,
    readonly: () => readonly,
    record: () => record,
    refine: () => refine,
    regex: () => _regex,
    regexes: () => regexes_exports,
    registry: () => registry,
    safeDecode: () => safeDecode2,
    safeDecodeAsync: () => safeDecodeAsync2,
    safeEncode: () => safeEncode2,
    safeEncodeAsync: () => safeEncodeAsync2,
    safeParse: () => safeParse2,
    safeParseAsync: () => safeParseAsync2,
    set: () => set,
    setErrorMap: () => setErrorMap,
    size: () => _size,
    slugify: () => _slugify,
    startsWith: () => _startsWith,
    strictObject: () => strictObject,
    string: () => string2,
    stringFormat: () => stringFormat,
    stringbool: () => stringbool,
    success: () => success,
    superRefine: () => superRefine,
    symbol: () => symbol,
    templateLiteral: () => templateLiteral,
    toJSONSchema: () => toJSONSchema,
    toLowerCase: () => _toLowerCase,
    toUpperCase: () => _toUpperCase,
    transform: () => transform,
    treeifyError: () => treeifyError,
    trim: () => _trim,
    tuple: () => tuple,
    uint32: () => uint32,
    uint64: () => uint64,
    ulid: () => ulid2,
    undefined: () => _undefined3,
    union: () => union,
    unknown: () => unknown,
    uppercase: () => _uppercase,
    url: () => url,
    util: () => util_exports,
    uuid: () => uuid2,
    uuidv4: () => uuidv4,
    uuidv6: () => uuidv6,
    uuidv7: () => uuidv7,
    void: () => _void2,
    xid: () => xid2,
    xor: () => xor
  });
  var init_external = __esm({
    "node_modules/zod/v4/classic/external.js"() {
      init_core2();
      init_schemas2();
      init_checks2();
      init_errors2();
      init_parse2();
      init_compat();
      init_core2();
      init_en();
      init_core2();
      init_json_schema_processors();
      init_from_json_schema();
      init_locales();
      init_iso();
      init_iso();
      init_coerce();
      config(en_default());
    }
  });

  // node_modules/zod/v4/classic/index.js
  var init_classic = __esm({
    "node_modules/zod/v4/classic/index.js"() {
      init_external();
      init_external();
    }
  });

  // node_modules/zod/v4/index.js
  var init_v4 = __esm({
    "node_modules/zod/v4/index.js"() {
      init_classic();
    }
  });

  // node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
  init_v4();
  var RELATED_TASK_META_KEY = "io.modelcontextprotocol/related-task";
  var JSONRPC_VERSION = "2.0";
  var AssertObjectSchema = custom((v2) => v2 !== null && (typeof v2 === "object" || typeof v2 === "function"));
  var ProgressTokenSchema = union([string2(), number2().int()]);
  var CursorSchema = string2();
  var TaskCreationParamsSchema = looseObject({
    /**
     * Requested duration in milliseconds to retain task from creation.
     */
    ttl: number2().optional(),
    /**
     * Time in milliseconds to wait between task status requests.
     */
    pollInterval: number2().optional()
  });
  var TaskMetadataSchema = object({
    ttl: number2().optional()
  });
  var RelatedTaskMetadataSchema = object({
    taskId: string2()
  });
  var RequestMetaSchema = looseObject({
    /**
     * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
     */
    progressToken: ProgressTokenSchema.optional(),
    /**
     * If specified, this request is related to the provided task.
     */
    [RELATED_TASK_META_KEY]: RelatedTaskMetadataSchema.optional()
  });
  var BaseRequestParamsSchema = object({
    /**
     * See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
     */
    _meta: RequestMetaSchema.optional()
  });
  var TaskAugmentedRequestParamsSchema = BaseRequestParamsSchema.extend({
    /**
     * If specified, the caller is requesting task-augmented execution for this request.
     * The request will return a CreateTaskResult immediately, and the actual result can be
     * retrieved later via tasks/result.
     *
     * Task augmentation is subject to capability negotiation - receivers MUST declare support
     * for task augmentation of specific request types in their capabilities.
     */
    task: TaskMetadataSchema.optional()
  });
  var isTaskAugmentedRequestParams = (value) => TaskAugmentedRequestParamsSchema.safeParse(value).success;
  var RequestSchema = object({
    method: string2(),
    params: BaseRequestParamsSchema.loose().optional()
  });
  var NotificationsParamsSchema = object({
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: RequestMetaSchema.optional()
  });
  var NotificationSchema = object({
    method: string2(),
    params: NotificationsParamsSchema.loose().optional()
  });
  var ResultSchema = looseObject({
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: RequestMetaSchema.optional()
  });
  var RequestIdSchema = union([string2(), number2().int()]);
  var JSONRPCRequestSchema = object({
    jsonrpc: literal(JSONRPC_VERSION),
    id: RequestIdSchema,
    ...RequestSchema.shape
  }).strict();
  var isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success;
  var JSONRPCNotificationSchema = object({
    jsonrpc: literal(JSONRPC_VERSION),
    ...NotificationSchema.shape
  }).strict();
  var isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success;
  var JSONRPCResultResponseSchema = object({
    jsonrpc: literal(JSONRPC_VERSION),
    id: RequestIdSchema,
    result: ResultSchema
  }).strict();
  var isJSONRPCResultResponse = (value) => JSONRPCResultResponseSchema.safeParse(value).success;
  var ErrorCode;
  (function(ErrorCode2) {
    ErrorCode2[ErrorCode2["ConnectionClosed"] = -32e3] = "ConnectionClosed";
    ErrorCode2[ErrorCode2["RequestTimeout"] = -32001] = "RequestTimeout";
    ErrorCode2[ErrorCode2["ParseError"] = -32700] = "ParseError";
    ErrorCode2[ErrorCode2["InvalidRequest"] = -32600] = "InvalidRequest";
    ErrorCode2[ErrorCode2["MethodNotFound"] = -32601] = "MethodNotFound";
    ErrorCode2[ErrorCode2["InvalidParams"] = -32602] = "InvalidParams";
    ErrorCode2[ErrorCode2["InternalError"] = -32603] = "InternalError";
    ErrorCode2[ErrorCode2["UrlElicitationRequired"] = -32042] = "UrlElicitationRequired";
  })(ErrorCode || (ErrorCode = {}));
  var JSONRPCErrorResponseSchema = object({
    jsonrpc: literal(JSONRPC_VERSION),
    id: RequestIdSchema.optional(),
    error: object({
      /**
       * The error type that occurred.
       */
      code: number2().int(),
      /**
       * A short description of the error. The message SHOULD be limited to a concise single sentence.
       */
      message: string2(),
      /**
       * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
       */
      data: unknown().optional()
    })
  }).strict();
  var isJSONRPCErrorResponse = (value) => JSONRPCErrorResponseSchema.safeParse(value).success;
  var JSONRPCMessageSchema = union([
    JSONRPCRequestSchema,
    JSONRPCNotificationSchema,
    JSONRPCResultResponseSchema,
    JSONRPCErrorResponseSchema
  ]);
  var JSONRPCResponseSchema = union([JSONRPCResultResponseSchema, JSONRPCErrorResponseSchema]);
  var EmptyResultSchema = ResultSchema.strict();
  var CancelledNotificationParamsSchema = NotificationsParamsSchema.extend({
    /**
     * The ID of the request to cancel.
     *
     * This MUST correspond to the ID of a request previously issued in the same direction.
     */
    requestId: RequestIdSchema.optional(),
    /**
     * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
     */
    reason: string2().optional()
  });
  var CancelledNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/cancelled"),
    params: CancelledNotificationParamsSchema
  });
  var IconSchema = object({
    /**
     * URL or data URI for the icon.
     */
    src: string2(),
    /**
     * Optional MIME type for the icon.
     */
    mimeType: string2().optional(),
    /**
     * Optional array of strings that specify sizes at which the icon can be used.
     * Each string should be in WxH format (e.g., `"48x48"`, `"96x96"`) or `"any"` for scalable formats like SVG.
     *
     * If not provided, the client should assume that the icon can be used at any size.
     */
    sizes: array(string2()).optional(),
    /**
     * Optional specifier for the theme this icon is designed for. `light` indicates
     * the icon is designed to be used with a light background, and `dark` indicates
     * the icon is designed to be used with a dark background.
     *
     * If not provided, the client should assume the icon can be used with any theme.
     */
    theme: _enum2(["light", "dark"]).optional()
  });
  var IconsSchema = object({
    /**
     * Optional set of sized icons that the client can display in a user interface.
     *
     * Clients that support rendering icons MUST support at least the following MIME types:
     * - `image/png` - PNG images (safe, universal compatibility)
     * - `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
     *
     * Clients that support rendering icons SHOULD also support:
     * - `image/svg+xml` - SVG images (scalable but requires security precautions)
     * - `image/webp` - WebP images (modern, efficient format)
     */
    icons: array(IconSchema).optional()
  });
  var BaseMetadataSchema = object({
    /** Intended for programmatic or logical use, but used as a display name in past specs or fallback */
    name: string2(),
    /**
     * Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
     * even by those unfamiliar with domain-specific terminology.
     *
     * If not provided, the name should be used for display (except for Tool,
     * where `annotations.title` should be given precedence over using `name`,
     * if present).
     */
    title: string2().optional()
  });
  var ImplementationSchema = BaseMetadataSchema.extend({
    ...BaseMetadataSchema.shape,
    ...IconsSchema.shape,
    version: string2(),
    /**
     * An optional URL of the website for this implementation.
     */
    websiteUrl: string2().optional(),
    /**
     * An optional human-readable description of what this implementation does.
     *
     * This can be used by clients or servers to provide context about their purpose
     * and capabilities. For example, a server might describe the types of resources
     * or tools it provides, while a client might describe its intended use case.
     */
    description: string2().optional()
  });
  var FormElicitationCapabilitySchema = intersection(object({
    applyDefaults: boolean2().optional()
  }), record(string2(), unknown()));
  var ElicitationCapabilitySchema = preprocess((value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (Object.keys(value).length === 0) {
        return { form: {} };
      }
    }
    return value;
  }, intersection(object({
    form: FormElicitationCapabilitySchema.optional(),
    url: AssertObjectSchema.optional()
  }), record(string2(), unknown()).optional()));
  var ClientTasksCapabilitySchema = looseObject({
    /**
     * Present if the client supports listing tasks.
     */
    list: AssertObjectSchema.optional(),
    /**
     * Present if the client supports cancelling tasks.
     */
    cancel: AssertObjectSchema.optional(),
    /**
     * Capabilities for task creation on specific request types.
     */
    requests: looseObject({
      /**
       * Task support for sampling requests.
       */
      sampling: looseObject({
        createMessage: AssertObjectSchema.optional()
      }).optional(),
      /**
       * Task support for elicitation requests.
       */
      elicitation: looseObject({
        create: AssertObjectSchema.optional()
      }).optional()
    }).optional()
  });
  var ServerTasksCapabilitySchema = looseObject({
    /**
     * Present if the server supports listing tasks.
     */
    list: AssertObjectSchema.optional(),
    /**
     * Present if the server supports cancelling tasks.
     */
    cancel: AssertObjectSchema.optional(),
    /**
     * Capabilities for task creation on specific request types.
     */
    requests: looseObject({
      /**
       * Task support for tool requests.
       */
      tools: looseObject({
        call: AssertObjectSchema.optional()
      }).optional()
    }).optional()
  });
  var ClientCapabilitiesSchema = object({
    /**
     * Experimental, non-standard capabilities that the client supports.
     */
    experimental: record(string2(), AssertObjectSchema).optional(),
    /**
     * Present if the client supports sampling from an LLM.
     */
    sampling: object({
      /**
       * Present if the client supports context inclusion via includeContext parameter.
       * If not declared, servers SHOULD only use `includeContext: "none"` (or omit it).
       */
      context: AssertObjectSchema.optional(),
      /**
       * Present if the client supports tool use via tools and toolChoice parameters.
       */
      tools: AssertObjectSchema.optional()
    }).optional(),
    /**
     * Present if the client supports eliciting user input.
     */
    elicitation: ElicitationCapabilitySchema.optional(),
    /**
     * Present if the client supports listing roots.
     */
    roots: object({
      /**
       * Whether the client supports issuing notifications for changes to the roots list.
       */
      listChanged: boolean2().optional()
    }).optional(),
    /**
     * Present if the client supports task creation.
     */
    tasks: ClientTasksCapabilitySchema.optional(),
    /**
     * Extensions that the client supports. Keys are extension identifiers (vendor-prefix/extension-name).
     */
    extensions: record(string2(), AssertObjectSchema).optional()
  });
  var InitializeRequestParamsSchema = BaseRequestParamsSchema.extend({
    /**
     * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
     */
    protocolVersion: string2(),
    capabilities: ClientCapabilitiesSchema,
    clientInfo: ImplementationSchema
  });
  var InitializeRequestSchema = RequestSchema.extend({
    method: literal("initialize"),
    params: InitializeRequestParamsSchema
  });
  var ServerCapabilitiesSchema = object({
    /**
     * Experimental, non-standard capabilities that the server supports.
     */
    experimental: record(string2(), AssertObjectSchema).optional(),
    /**
     * Present if the server supports sending log messages to the client.
     */
    logging: AssertObjectSchema.optional(),
    /**
     * Present if the server supports sending completions to the client.
     */
    completions: AssertObjectSchema.optional(),
    /**
     * Present if the server offers any prompt templates.
     */
    prompts: object({
      /**
       * Whether this server supports issuing notifications for changes to the prompt list.
       */
      listChanged: boolean2().optional()
    }).optional(),
    /**
     * Present if the server offers any resources to read.
     */
    resources: object({
      /**
       * Whether this server supports clients subscribing to resource updates.
       */
      subscribe: boolean2().optional(),
      /**
       * Whether this server supports issuing notifications for changes to the resource list.
       */
      listChanged: boolean2().optional()
    }).optional(),
    /**
     * Present if the server offers any tools to call.
     */
    tools: object({
      /**
       * Whether this server supports issuing notifications for changes to the tool list.
       */
      listChanged: boolean2().optional()
    }).optional(),
    /**
     * Present if the server supports task creation.
     */
    tasks: ServerTasksCapabilitySchema.optional(),
    /**
     * Extensions that the server supports. Keys are extension identifiers (vendor-prefix/extension-name).
     */
    extensions: record(string2(), AssertObjectSchema).optional()
  });
  var InitializeResultSchema = ResultSchema.extend({
    /**
     * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
     */
    protocolVersion: string2(),
    capabilities: ServerCapabilitiesSchema,
    serverInfo: ImplementationSchema,
    /**
     * Instructions describing how to use the server and its features.
     *
     * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
     */
    instructions: string2().optional()
  });
  var InitializedNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/initialized"),
    params: NotificationsParamsSchema.optional()
  });
  var PingRequestSchema = RequestSchema.extend({
    method: literal("ping"),
    params: BaseRequestParamsSchema.optional()
  });
  var ProgressSchema = object({
    /**
     * The progress thus far. This should increase every time progress is made, even if the total is unknown.
     */
    progress: number2(),
    /**
     * Total number of items to process (or total progress required), if known.
     */
    total: optional(number2()),
    /**
     * An optional message describing the current progress.
     */
    message: optional(string2())
  });
  var ProgressNotificationParamsSchema = object({
    ...NotificationsParamsSchema.shape,
    ...ProgressSchema.shape,
    /**
     * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
     */
    progressToken: ProgressTokenSchema
  });
  var ProgressNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/progress"),
    params: ProgressNotificationParamsSchema
  });
  var PaginatedRequestParamsSchema = BaseRequestParamsSchema.extend({
    /**
     * An opaque token representing the current pagination position.
     * If provided, the server should return results starting after this cursor.
     */
    cursor: CursorSchema.optional()
  });
  var PaginatedRequestSchema = RequestSchema.extend({
    params: PaginatedRequestParamsSchema.optional()
  });
  var PaginatedResultSchema = ResultSchema.extend({
    /**
     * An opaque token representing the pagination position after the last returned result.
     * If present, there may be more results available.
     */
    nextCursor: CursorSchema.optional()
  });
  var TaskStatusSchema = _enum2(["working", "input_required", "completed", "failed", "cancelled"]);
  var TaskSchema = object({
    taskId: string2(),
    status: TaskStatusSchema,
    /**
     * Time in milliseconds to keep task results available after completion.
     * If null, the task has unlimited lifetime until manually cleaned up.
     */
    ttl: union([number2(), _null3()]),
    /**
     * ISO 8601 timestamp when the task was created.
     */
    createdAt: string2(),
    /**
     * ISO 8601 timestamp when the task was last updated.
     */
    lastUpdatedAt: string2(),
    pollInterval: optional(number2()),
    /**
     * Optional diagnostic message for failed tasks or other status information.
     */
    statusMessage: optional(string2())
  });
  var CreateTaskResultSchema = ResultSchema.extend({
    task: TaskSchema
  });
  var TaskStatusNotificationParamsSchema = NotificationsParamsSchema.merge(TaskSchema);
  var TaskStatusNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/tasks/status"),
    params: TaskStatusNotificationParamsSchema
  });
  var GetTaskRequestSchema = RequestSchema.extend({
    method: literal("tasks/get"),
    params: BaseRequestParamsSchema.extend({
      taskId: string2()
    })
  });
  var GetTaskResultSchema = ResultSchema.merge(TaskSchema);
  var GetTaskPayloadRequestSchema = RequestSchema.extend({
    method: literal("tasks/result"),
    params: BaseRequestParamsSchema.extend({
      taskId: string2()
    })
  });
  var GetTaskPayloadResultSchema = ResultSchema.loose();
  var ListTasksRequestSchema = PaginatedRequestSchema.extend({
    method: literal("tasks/list")
  });
  var ListTasksResultSchema = PaginatedResultSchema.extend({
    tasks: array(TaskSchema)
  });
  var CancelTaskRequestSchema = RequestSchema.extend({
    method: literal("tasks/cancel"),
    params: BaseRequestParamsSchema.extend({
      taskId: string2()
    })
  });
  var CancelTaskResultSchema = ResultSchema.merge(TaskSchema);
  var ResourceContentsSchema = object({
    /**
     * The URI of this resource.
     */
    uri: string2(),
    /**
     * The MIME type of this resource, if known.
     */
    mimeType: optional(string2()),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var TextResourceContentsSchema = ResourceContentsSchema.extend({
    /**
     * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
     */
    text: string2()
  });
  var Base64Schema = string2().refine((val) => {
    try {
      atob(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Invalid Base64 string" });
  var BlobResourceContentsSchema = ResourceContentsSchema.extend({
    /**
     * A base64-encoded string representing the binary data of the item.
     */
    blob: Base64Schema
  });
  var RoleSchema = _enum2(["user", "assistant"]);
  var AnnotationsSchema = object({
    /**
     * Intended audience(s) for the resource.
     */
    audience: array(RoleSchema).optional(),
    /**
     * Importance hint for the resource, from 0 (least) to 1 (most).
     */
    priority: number2().min(0).max(1).optional(),
    /**
     * ISO 8601 timestamp for the most recent modification.
     */
    lastModified: iso_exports.datetime({ offset: true }).optional()
  });
  var ResourceSchema = object({
    ...BaseMetadataSchema.shape,
    ...IconsSchema.shape,
    /**
     * The URI of this resource.
     */
    uri: string2(),
    /**
     * A description of what this resource represents.
     *
     * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
     */
    description: optional(string2()),
    /**
     * The MIME type of this resource, if known.
     */
    mimeType: optional(string2()),
    /**
     * The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.
     *
     * This can be used by Hosts to display file sizes and estimate context window usage.
     */
    size: optional(number2()),
    /**
     * Optional annotations for the client.
     */
    annotations: AnnotationsSchema.optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: optional(looseObject({}))
  });
  var ResourceTemplateSchema = object({
    ...BaseMetadataSchema.shape,
    ...IconsSchema.shape,
    /**
     * A URI template (according to RFC 6570) that can be used to construct resource URIs.
     */
    uriTemplate: string2(),
    /**
     * A description of what this template is for.
     *
     * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
     */
    description: optional(string2()),
    /**
     * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
     */
    mimeType: optional(string2()),
    /**
     * Optional annotations for the client.
     */
    annotations: AnnotationsSchema.optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: optional(looseObject({}))
  });
  var ListResourcesRequestSchema = PaginatedRequestSchema.extend({
    method: literal("resources/list")
  });
  var ListResourcesResultSchema = PaginatedResultSchema.extend({
    resources: array(ResourceSchema)
  });
  var ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({
    method: literal("resources/templates/list")
  });
  var ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
    resourceTemplates: array(ResourceTemplateSchema)
  });
  var ResourceRequestParamsSchema = BaseRequestParamsSchema.extend({
    /**
     * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
     *
     * @format uri
     */
    uri: string2()
  });
  var ReadResourceRequestParamsSchema = ResourceRequestParamsSchema;
  var ReadResourceRequestSchema = RequestSchema.extend({
    method: literal("resources/read"),
    params: ReadResourceRequestParamsSchema
  });
  var ReadResourceResultSchema = ResultSchema.extend({
    contents: array(union([TextResourceContentsSchema, BlobResourceContentsSchema]))
  });
  var ResourceListChangedNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/resources/list_changed"),
    params: NotificationsParamsSchema.optional()
  });
  var SubscribeRequestParamsSchema = ResourceRequestParamsSchema;
  var SubscribeRequestSchema = RequestSchema.extend({
    method: literal("resources/subscribe"),
    params: SubscribeRequestParamsSchema
  });
  var UnsubscribeRequestParamsSchema = ResourceRequestParamsSchema;
  var UnsubscribeRequestSchema = RequestSchema.extend({
    method: literal("resources/unsubscribe"),
    params: UnsubscribeRequestParamsSchema
  });
  var ResourceUpdatedNotificationParamsSchema = NotificationsParamsSchema.extend({
    /**
     * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
     */
    uri: string2()
  });
  var ResourceUpdatedNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/resources/updated"),
    params: ResourceUpdatedNotificationParamsSchema
  });
  var PromptArgumentSchema = object({
    /**
     * The name of the argument.
     */
    name: string2(),
    /**
     * A human-readable description of the argument.
     */
    description: optional(string2()),
    /**
     * Whether this argument must be provided.
     */
    required: optional(boolean2())
  });
  var PromptSchema = object({
    ...BaseMetadataSchema.shape,
    ...IconsSchema.shape,
    /**
     * An optional description of what this prompt provides
     */
    description: optional(string2()),
    /**
     * A list of arguments to use for templating the prompt.
     */
    arguments: optional(array(PromptArgumentSchema)),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: optional(looseObject({}))
  });
  var ListPromptsRequestSchema = PaginatedRequestSchema.extend({
    method: literal("prompts/list")
  });
  var ListPromptsResultSchema = PaginatedResultSchema.extend({
    prompts: array(PromptSchema)
  });
  var GetPromptRequestParamsSchema = BaseRequestParamsSchema.extend({
    /**
     * The name of the prompt or prompt template.
     */
    name: string2(),
    /**
     * Arguments to use for templating the prompt.
     */
    arguments: record(string2(), string2()).optional()
  });
  var GetPromptRequestSchema = RequestSchema.extend({
    method: literal("prompts/get"),
    params: GetPromptRequestParamsSchema
  });
  var TextContentSchema = object({
    type: literal("text"),
    /**
     * The text content of the message.
     */
    text: string2(),
    /**
     * Optional annotations for the client.
     */
    annotations: AnnotationsSchema.optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var ImageContentSchema = object({
    type: literal("image"),
    /**
     * The base64-encoded image data.
     */
    data: Base64Schema,
    /**
     * The MIME type of the image. Different providers may support different image types.
     */
    mimeType: string2(),
    /**
     * Optional annotations for the client.
     */
    annotations: AnnotationsSchema.optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var AudioContentSchema = object({
    type: literal("audio"),
    /**
     * The base64-encoded audio data.
     */
    data: Base64Schema,
    /**
     * The MIME type of the audio. Different providers may support different audio types.
     */
    mimeType: string2(),
    /**
     * Optional annotations for the client.
     */
    annotations: AnnotationsSchema.optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var ToolUseContentSchema = object({
    type: literal("tool_use"),
    /**
     * The name of the tool to invoke.
     * Must match a tool name from the request's tools array.
     */
    name: string2(),
    /**
     * Unique identifier for this tool call.
     * Used to correlate with ToolResultContent in subsequent messages.
     */
    id: string2(),
    /**
     * Arguments to pass to the tool.
     * Must conform to the tool's inputSchema.
     */
    input: record(string2(), unknown()),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var EmbeddedResourceSchema = object({
    type: literal("resource"),
    resource: union([TextResourceContentsSchema, BlobResourceContentsSchema]),
    /**
     * Optional annotations for the client.
     */
    annotations: AnnotationsSchema.optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var ResourceLinkSchema = ResourceSchema.extend({
    type: literal("resource_link")
  });
  var ContentBlockSchema = union([
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema,
    ResourceLinkSchema,
    EmbeddedResourceSchema
  ]);
  var PromptMessageSchema = object({
    role: RoleSchema,
    content: ContentBlockSchema
  });
  var GetPromptResultSchema = ResultSchema.extend({
    /**
     * An optional description for the prompt.
     */
    description: string2().optional(),
    messages: array(PromptMessageSchema)
  });
  var PromptListChangedNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/prompts/list_changed"),
    params: NotificationsParamsSchema.optional()
  });
  var ToolAnnotationsSchema = object({
    /**
     * A human-readable title for the tool.
     */
    title: string2().optional(),
    /**
     * If true, the tool does not modify its environment.
     *
     * Default: false
     */
    readOnlyHint: boolean2().optional(),
    /**
     * If true, the tool may perform destructive updates to its environment.
     * If false, the tool performs only additive updates.
     *
     * (This property is meaningful only when `readOnlyHint == false`)
     *
     * Default: true
     */
    destructiveHint: boolean2().optional(),
    /**
     * If true, calling the tool repeatedly with the same arguments
     * will have no additional effect on the its environment.
     *
     * (This property is meaningful only when `readOnlyHint == false`)
     *
     * Default: false
     */
    idempotentHint: boolean2().optional(),
    /**
     * If true, this tool may interact with an "open world" of external
     * entities. If false, the tool's domain of interaction is closed.
     * For example, the world of a web search tool is open, whereas that
     * of a memory tool is not.
     *
     * Default: true
     */
    openWorldHint: boolean2().optional()
  });
  var ToolExecutionSchema = object({
    /**
     * Indicates the tool's preference for task-augmented execution.
     * - "required": Clients MUST invoke the tool as a task
     * - "optional": Clients MAY invoke the tool as a task or normal request
     * - "forbidden": Clients MUST NOT attempt to invoke the tool as a task
     *
     * If not present, defaults to "forbidden".
     */
    taskSupport: _enum2(["required", "optional", "forbidden"]).optional()
  });
  var ToolSchema = object({
    ...BaseMetadataSchema.shape,
    ...IconsSchema.shape,
    /**
     * A human-readable description of the tool.
     */
    description: string2().optional(),
    /**
     * A JSON Schema 2020-12 object defining the expected parameters for the tool.
     * Must have type: 'object' at the root level per MCP spec.
     */
    inputSchema: object({
      type: literal("object"),
      properties: record(string2(), AssertObjectSchema).optional(),
      required: array(string2()).optional()
    }).catchall(unknown()),
    /**
     * An optional JSON Schema 2020-12 object defining the structure of the tool's output
     * returned in the structuredContent field of a CallToolResult.
     * Must have type: 'object' at the root level per MCP spec.
     */
    outputSchema: object({
      type: literal("object"),
      properties: record(string2(), AssertObjectSchema).optional(),
      required: array(string2()).optional()
    }).catchall(unknown()).optional(),
    /**
     * Optional additional tool information.
     */
    annotations: ToolAnnotationsSchema.optional(),
    /**
     * Execution-related properties for this tool.
     */
    execution: ToolExecutionSchema.optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var ListToolsRequestSchema = PaginatedRequestSchema.extend({
    method: literal("tools/list")
  });
  var ListToolsResultSchema = PaginatedResultSchema.extend({
    tools: array(ToolSchema)
  });
  var CallToolResultSchema = ResultSchema.extend({
    /**
     * A list of content objects that represent the result of the tool call.
     *
     * If the Tool does not define an outputSchema, this field MUST be present in the result.
     * For backwards compatibility, this field is always present, but it may be empty.
     */
    content: array(ContentBlockSchema).default([]),
    /**
     * An object containing structured tool output.
     *
     * If the Tool defines an outputSchema, this field MUST be present in the result, and contain a JSON object that matches the schema.
     */
    structuredContent: record(string2(), unknown()).optional(),
    /**
     * Whether the tool call ended in an error.
     *
     * If not set, this is assumed to be false (the call was successful).
     *
     * Any errors that originate from the tool SHOULD be reported inside the result
     * object, with `isError` set to true, _not_ as an MCP protocol-level error
     * response. Otherwise, the LLM would not be able to see that an error occurred
     * and self-correct.
     *
     * However, any errors in _finding_ the tool, an error indicating that the
     * server does not support tool calls, or any other exceptional conditions,
     * should be reported as an MCP error response.
     */
    isError: boolean2().optional()
  });
  var CompatibilityCallToolResultSchema = CallToolResultSchema.or(ResultSchema.extend({
    toolResult: unknown()
  }));
  var CallToolRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
    /**
     * The name of the tool to call.
     */
    name: string2(),
    /**
     * Arguments to pass to the tool.
     */
    arguments: record(string2(), unknown()).optional()
  });
  var CallToolRequestSchema = RequestSchema.extend({
    method: literal("tools/call"),
    params: CallToolRequestParamsSchema
  });
  var ToolListChangedNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/tools/list_changed"),
    params: NotificationsParamsSchema.optional()
  });
  var ListChangedOptionsBaseSchema = object({
    /**
     * If true, the list will be refreshed automatically when a list changed notification is received.
     * The callback will be called with the updated list.
     *
     * If false, the callback will be called with null items, allowing manual refresh.
     *
     * @default true
     */
    autoRefresh: boolean2().default(true),
    /**
     * Debounce time in milliseconds for list changed notification processing.
     *
     * Multiple notifications received within this timeframe will only trigger one refresh.
     * Set to 0 to disable debouncing.
     *
     * @default 300
     */
    debounceMs: number2().int().nonnegative().default(300)
  });
  var LoggingLevelSchema = _enum2(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]);
  var SetLevelRequestParamsSchema = BaseRequestParamsSchema.extend({
    /**
     * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
     */
    level: LoggingLevelSchema
  });
  var SetLevelRequestSchema = RequestSchema.extend({
    method: literal("logging/setLevel"),
    params: SetLevelRequestParamsSchema
  });
  var LoggingMessageNotificationParamsSchema = NotificationsParamsSchema.extend({
    /**
     * The severity of this log message.
     */
    level: LoggingLevelSchema,
    /**
     * An optional name of the logger issuing this message.
     */
    logger: string2().optional(),
    /**
     * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
     */
    data: unknown()
  });
  var LoggingMessageNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/message"),
    params: LoggingMessageNotificationParamsSchema
  });
  var ModelHintSchema = object({
    /**
     * A hint for a model name.
     */
    name: string2().optional()
  });
  var ModelPreferencesSchema = object({
    /**
     * Optional hints to use for model selection.
     */
    hints: array(ModelHintSchema).optional(),
    /**
     * How much to prioritize cost when selecting a model.
     */
    costPriority: number2().min(0).max(1).optional(),
    /**
     * How much to prioritize sampling speed (latency) when selecting a model.
     */
    speedPriority: number2().min(0).max(1).optional(),
    /**
     * How much to prioritize intelligence and capabilities when selecting a model.
     */
    intelligencePriority: number2().min(0).max(1).optional()
  });
  var ToolChoiceSchema = object({
    /**
     * Controls when tools are used:
     * - "auto": Model decides whether to use tools (default)
     * - "required": Model MUST use at least one tool before completing
     * - "none": Model MUST NOT use any tools
     */
    mode: _enum2(["auto", "required", "none"]).optional()
  });
  var ToolResultContentSchema = object({
    type: literal("tool_result"),
    toolUseId: string2().describe("The unique identifier for the corresponding tool call."),
    content: array(ContentBlockSchema).default([]),
    structuredContent: object({}).loose().optional(),
    isError: boolean2().optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var SamplingContentSchema = discriminatedUnion("type", [TextContentSchema, ImageContentSchema, AudioContentSchema]);
  var SamplingMessageContentBlockSchema = discriminatedUnion("type", [
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema,
    ToolUseContentSchema,
    ToolResultContentSchema
  ]);
  var SamplingMessageSchema = object({
    role: RoleSchema,
    content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)]),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var CreateMessageRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
    messages: array(SamplingMessageSchema),
    /**
     * The server's preferences for which model to select. The client MAY modify or omit this request.
     */
    modelPreferences: ModelPreferencesSchema.optional(),
    /**
     * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
     */
    systemPrompt: string2().optional(),
    /**
     * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt.
     * The client MAY ignore this request.
     *
     * Default is "none". Values "thisServer" and "allServers" are soft-deprecated. Servers SHOULD only use these values if the client
     * declares ClientCapabilities.sampling.context. These values may be removed in future spec releases.
     */
    includeContext: _enum2(["none", "thisServer", "allServers"]).optional(),
    temperature: number2().optional(),
    /**
     * The requested maximum number of tokens to sample (to prevent runaway completions).
     *
     * The client MAY choose to sample fewer tokens than the requested maximum.
     */
    maxTokens: number2().int(),
    stopSequences: array(string2()).optional(),
    /**
     * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
     */
    metadata: AssertObjectSchema.optional(),
    /**
     * Tools that the model may use during generation.
     * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
     */
    tools: array(ToolSchema).optional(),
    /**
     * Controls how the model uses tools.
     * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
     * Default is `{ mode: "auto" }`.
     */
    toolChoice: ToolChoiceSchema.optional()
  });
  var CreateMessageRequestSchema = RequestSchema.extend({
    method: literal("sampling/createMessage"),
    params: CreateMessageRequestParamsSchema
  });
  var CreateMessageResultSchema = ResultSchema.extend({
    /**
     * The name of the model that generated the message.
     */
    model: string2(),
    /**
     * The reason why sampling stopped, if known.
     *
     * Standard values:
     * - "endTurn": Natural end of the assistant's turn
     * - "stopSequence": A stop sequence was encountered
     * - "maxTokens": Maximum token limit was reached
     *
     * This field is an open string to allow for provider-specific stop reasons.
     */
    stopReason: optional(_enum2(["endTurn", "stopSequence", "maxTokens"]).or(string2())),
    role: RoleSchema,
    /**
     * Response content. Single content block (text, image, or audio).
     */
    content: SamplingContentSchema
  });
  var CreateMessageResultWithToolsSchema = ResultSchema.extend({
    /**
     * The name of the model that generated the message.
     */
    model: string2(),
    /**
     * The reason why sampling stopped, if known.
     *
     * Standard values:
     * - "endTurn": Natural end of the assistant's turn
     * - "stopSequence": A stop sequence was encountered
     * - "maxTokens": Maximum token limit was reached
     * - "toolUse": The model wants to use one or more tools
     *
     * This field is an open string to allow for provider-specific stop reasons.
     */
    stopReason: optional(_enum2(["endTurn", "stopSequence", "maxTokens", "toolUse"]).or(string2())),
    role: RoleSchema,
    /**
     * Response content. May be a single block or array. May include ToolUseContent if stopReason is "toolUse".
     */
    content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)])
  });
  var BooleanSchemaSchema = object({
    type: literal("boolean"),
    title: string2().optional(),
    description: string2().optional(),
    default: boolean2().optional()
  });
  var StringSchemaSchema = object({
    type: literal("string"),
    title: string2().optional(),
    description: string2().optional(),
    minLength: number2().optional(),
    maxLength: number2().optional(),
    format: _enum2(["email", "uri", "date", "date-time"]).optional(),
    default: string2().optional()
  });
  var NumberSchemaSchema = object({
    type: _enum2(["number", "integer"]),
    title: string2().optional(),
    description: string2().optional(),
    minimum: number2().optional(),
    maximum: number2().optional(),
    default: number2().optional()
  });
  var UntitledSingleSelectEnumSchemaSchema = object({
    type: literal("string"),
    title: string2().optional(),
    description: string2().optional(),
    enum: array(string2()),
    default: string2().optional()
  });
  var TitledSingleSelectEnumSchemaSchema = object({
    type: literal("string"),
    title: string2().optional(),
    description: string2().optional(),
    oneOf: array(object({
      const: string2(),
      title: string2()
    })),
    default: string2().optional()
  });
  var LegacyTitledEnumSchemaSchema = object({
    type: literal("string"),
    title: string2().optional(),
    description: string2().optional(),
    enum: array(string2()),
    enumNames: array(string2()).optional(),
    default: string2().optional()
  });
  var SingleSelectEnumSchemaSchema = union([UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema]);
  var UntitledMultiSelectEnumSchemaSchema = object({
    type: literal("array"),
    title: string2().optional(),
    description: string2().optional(),
    minItems: number2().optional(),
    maxItems: number2().optional(),
    items: object({
      type: literal("string"),
      enum: array(string2())
    }),
    default: array(string2()).optional()
  });
  var TitledMultiSelectEnumSchemaSchema = object({
    type: literal("array"),
    title: string2().optional(),
    description: string2().optional(),
    minItems: number2().optional(),
    maxItems: number2().optional(),
    items: object({
      anyOf: array(object({
        const: string2(),
        title: string2()
      }))
    }),
    default: array(string2()).optional()
  });
  var MultiSelectEnumSchemaSchema = union([UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema]);
  var EnumSchemaSchema = union([LegacyTitledEnumSchemaSchema, SingleSelectEnumSchemaSchema, MultiSelectEnumSchemaSchema]);
  var PrimitiveSchemaDefinitionSchema = union([EnumSchemaSchema, BooleanSchemaSchema, StringSchemaSchema, NumberSchemaSchema]);
  var ElicitRequestFormParamsSchema = TaskAugmentedRequestParamsSchema.extend({
    /**
     * The elicitation mode.
     *
     * Optional for backward compatibility. Clients MUST treat missing mode as "form".
     */
    mode: literal("form").optional(),
    /**
     * The message to present to the user describing what information is being requested.
     */
    message: string2(),
    /**
     * A restricted subset of JSON Schema.
     * Only top-level properties are allowed, without nesting.
     */
    requestedSchema: object({
      type: literal("object"),
      properties: record(string2(), PrimitiveSchemaDefinitionSchema),
      required: array(string2()).optional()
    })
  });
  var ElicitRequestURLParamsSchema = TaskAugmentedRequestParamsSchema.extend({
    /**
     * The elicitation mode.
     */
    mode: literal("url"),
    /**
     * The message to present to the user explaining why the interaction is needed.
     */
    message: string2(),
    /**
     * The ID of the elicitation, which must be unique within the context of the server.
     * The client MUST treat this ID as an opaque value.
     */
    elicitationId: string2(),
    /**
     * The URL that the user should navigate to.
     */
    url: string2().url()
  });
  var ElicitRequestParamsSchema = union([ElicitRequestFormParamsSchema, ElicitRequestURLParamsSchema]);
  var ElicitRequestSchema = RequestSchema.extend({
    method: literal("elicitation/create"),
    params: ElicitRequestParamsSchema
  });
  var ElicitationCompleteNotificationParamsSchema = NotificationsParamsSchema.extend({
    /**
     * The ID of the elicitation that completed.
     */
    elicitationId: string2()
  });
  var ElicitationCompleteNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/elicitation/complete"),
    params: ElicitationCompleteNotificationParamsSchema
  });
  var ElicitResultSchema = ResultSchema.extend({
    /**
     * The user action in response to the elicitation.
     * - "accept": User submitted the form/confirmed the action
     * - "decline": User explicitly decline the action
     * - "cancel": User dismissed without making an explicit choice
     */
    action: _enum2(["accept", "decline", "cancel"]),
    /**
     * The submitted form data, only present when action is "accept".
     * Contains values matching the requested schema.
     * Per MCP spec, content is "typically omitted" for decline/cancel actions.
     * We normalize null to undefined for leniency while maintaining type compatibility.
     */
    content: preprocess((val) => val === null ? void 0 : val, record(string2(), union([string2(), number2(), boolean2(), array(string2())])).optional())
  });
  var ResourceTemplateReferenceSchema = object({
    type: literal("ref/resource"),
    /**
     * The URI or URI template of the resource.
     */
    uri: string2()
  });
  var PromptReferenceSchema = object({
    type: literal("ref/prompt"),
    /**
     * The name of the prompt or prompt template
     */
    name: string2()
  });
  var CompleteRequestParamsSchema = BaseRequestParamsSchema.extend({
    ref: union([PromptReferenceSchema, ResourceTemplateReferenceSchema]),
    /**
     * The argument's information
     */
    argument: object({
      /**
       * The name of the argument
       */
      name: string2(),
      /**
       * The value of the argument to use for completion matching.
       */
      value: string2()
    }),
    context: object({
      /**
       * Previously-resolved variables in a URI template or prompt.
       */
      arguments: record(string2(), string2()).optional()
    }).optional()
  });
  var CompleteRequestSchema = RequestSchema.extend({
    method: literal("completion/complete"),
    params: CompleteRequestParamsSchema
  });
  var CompleteResultSchema = ResultSchema.extend({
    completion: looseObject({
      /**
       * An array of completion values. Must not exceed 100 items.
       */
      values: array(string2()).max(100),
      /**
       * The total number of completion options available. This can exceed the number of values actually sent in the response.
       */
      total: optional(number2().int()),
      /**
       * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
       */
      hasMore: optional(boolean2())
    })
  });
  var RootSchema = object({
    /**
     * The URI identifying the root. This *must* start with file:// for now.
     */
    uri: string2().startsWith("file://"),
    /**
     * An optional name for the root.
     */
    name: string2().optional(),
    /**
     * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
     * for notes on _meta usage.
     */
    _meta: record(string2(), unknown()).optional()
  });
  var ListRootsRequestSchema = RequestSchema.extend({
    method: literal("roots/list"),
    params: BaseRequestParamsSchema.optional()
  });
  var ListRootsResultSchema = ResultSchema.extend({
    roots: array(RootSchema)
  });
  var RootsListChangedNotificationSchema = NotificationSchema.extend({
    method: literal("notifications/roots/list_changed"),
    params: NotificationsParamsSchema.optional()
  });
  var ClientRequestSchema = union([
    PingRequestSchema,
    InitializeRequestSchema,
    CompleteRequestSchema,
    SetLevelRequestSchema,
    GetPromptRequestSchema,
    ListPromptsRequestSchema,
    ListResourcesRequestSchema,
    ListResourceTemplatesRequestSchema,
    ReadResourceRequestSchema,
    SubscribeRequestSchema,
    UnsubscribeRequestSchema,
    CallToolRequestSchema,
    ListToolsRequestSchema,
    GetTaskRequestSchema,
    GetTaskPayloadRequestSchema,
    ListTasksRequestSchema,
    CancelTaskRequestSchema
  ]);
  var ClientNotificationSchema = union([
    CancelledNotificationSchema,
    ProgressNotificationSchema,
    InitializedNotificationSchema,
    RootsListChangedNotificationSchema,
    TaskStatusNotificationSchema
  ]);
  var ClientResultSchema = union([
    EmptyResultSchema,
    CreateMessageResultSchema,
    CreateMessageResultWithToolsSchema,
    ElicitResultSchema,
    ListRootsResultSchema,
    GetTaskResultSchema,
    ListTasksResultSchema,
    CreateTaskResultSchema
  ]);
  var ServerRequestSchema = union([
    PingRequestSchema,
    CreateMessageRequestSchema,
    ElicitRequestSchema,
    ListRootsRequestSchema,
    GetTaskRequestSchema,
    GetTaskPayloadRequestSchema,
    ListTasksRequestSchema,
    CancelTaskRequestSchema
  ]);
  var ServerNotificationSchema = union([
    CancelledNotificationSchema,
    ProgressNotificationSchema,
    LoggingMessageNotificationSchema,
    ResourceUpdatedNotificationSchema,
    ResourceListChangedNotificationSchema,
    ToolListChangedNotificationSchema,
    PromptListChangedNotificationSchema,
    TaskStatusNotificationSchema,
    ElicitationCompleteNotificationSchema
  ]);
  var ServerResultSchema = union([
    EmptyResultSchema,
    InitializeResultSchema,
    CompleteResultSchema,
    GetPromptResultSchema,
    ListPromptsResultSchema,
    ListResourcesResultSchema,
    ListResourceTemplatesResultSchema,
    ReadResourceResultSchema,
    CallToolResultSchema,
    ListToolsResultSchema,
    GetTaskResultSchema,
    ListTasksResultSchema,
    CreateTaskResultSchema
  ]);
  var McpError = class _McpError extends Error {
    constructor(code, message, data) {
      super(`MCP error ${code}: ${message}`);
      this.code = code;
      this.data = data;
      this.name = "McpError";
    }
    /**
     * Factory method to create the appropriate error type based on the error code and data
     */
    static fromError(code, message, data) {
      if (code === ErrorCode.UrlElicitationRequired && data) {
        const errorData = data;
        if (errorData.elicitations) {
          return new UrlElicitationRequiredError(errorData.elicitations, message);
        }
      }
      return new _McpError(code, message, data);
    }
  };
  var UrlElicitationRequiredError = class extends McpError {
    constructor(elicitations, message = `URL elicitation${elicitations.length > 1 ? "s" : ""} required`) {
      super(ErrorCode.UrlElicitationRequired, message, {
        elicitations
      });
    }
    get elicitations() {
      return this.data?.elicitations ?? [];
    }
  };

  // node_modules/zod/v4/mini/parse.js
  init_core2();

  // node_modules/@modelcontextprotocol/sdk/dist/esm/server/zod-compat.js
  function isZ4Schema(s2) {
    const schema = s2;
    return !!schema._zod;
  }
  function safeParse3(schema, data) {
    if (isZ4Schema(schema)) {
      const result2 = safeParse(schema, data);
      return result2;
    }
    const v3Schema = schema;
    const result = v3Schema.safeParse(data);
    return result;
  }
  function getObjectShape(schema) {
    if (!schema)
      return void 0;
    let rawShape;
    if (isZ4Schema(schema)) {
      const v4Schema = schema;
      rawShape = v4Schema._zod?.def?.shape;
    } else {
      const v3Schema = schema;
      rawShape = v3Schema.shape;
    }
    if (!rawShape)
      return void 0;
    if (typeof rawShape === "function") {
      try {
        return rawShape();
      } catch {
        return void 0;
      }
    }
    return rawShape;
  }
  function getLiteralValue(schema) {
    if (isZ4Schema(schema)) {
      const v4Schema = schema;
      const def2 = v4Schema._zod?.def;
      if (def2) {
        if (def2.value !== void 0)
          return def2.value;
        if (Array.isArray(def2.values) && def2.values.length > 0) {
          return def2.values[0];
        }
      }
    }
    const v3Schema = schema;
    const def = v3Schema._def;
    if (def) {
      if (def.value !== void 0)
        return def.value;
      if (Array.isArray(def.values) && def.values.length > 0) {
        return def.values[0];
      }
    }
    const directValue = schema.value;
    if (directValue !== void 0)
      return directValue;
    return void 0;
  }

  // node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/interfaces.js
  function isTerminal(status) {
    return status === "completed" || status === "failed" || status === "cancelled";
  }

  // node_modules/zod-to-json-schema/dist/esm/parsers/string.js
  var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");

  // node_modules/@modelcontextprotocol/sdk/dist/esm/server/zod-json-schema-compat.js
  function getMethodLiteral(schema) {
    const shape = getObjectShape(schema);
    const methodSchema = shape?.method;
    if (!methodSchema) {
      throw new Error("Schema is missing a method literal");
    }
    const value = getLiteralValue(methodSchema);
    if (typeof value !== "string") {
      throw new Error("Schema method literal must be a string");
    }
    return value;
  }
  function parseWithCompat(schema, data) {
    const result = safeParse3(schema, data);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  // node_modules/@modelcontextprotocol/sdk/dist/esm/shared/protocol.js
  var DEFAULT_REQUEST_TIMEOUT_MSEC = 6e4;
  var Protocol = class {
    constructor(_options) {
      this._options = _options;
      this._requestMessageId = 0;
      this._requestHandlers = /* @__PURE__ */ new Map();
      this._requestHandlerAbortControllers = /* @__PURE__ */ new Map();
      this._notificationHandlers = /* @__PURE__ */ new Map();
      this._responseHandlers = /* @__PURE__ */ new Map();
      this._progressHandlers = /* @__PURE__ */ new Map();
      this._timeoutInfo = /* @__PURE__ */ new Map();
      this._pendingDebouncedNotifications = /* @__PURE__ */ new Set();
      this._taskProgressTokens = /* @__PURE__ */ new Map();
      this._requestResolvers = /* @__PURE__ */ new Map();
      this.setNotificationHandler(CancelledNotificationSchema, (notification) => {
        this._oncancel(notification);
      });
      this.setNotificationHandler(ProgressNotificationSchema, (notification) => {
        this._onprogress(notification);
      });
      this.setRequestHandler(
        PingRequestSchema,
        // Automatic pong by default.
        (_request) => ({})
      );
      this._taskStore = _options?.taskStore;
      this._taskMessageQueue = _options?.taskMessageQueue;
      if (this._taskStore) {
        this.setRequestHandler(GetTaskRequestSchema, async (request, extra) => {
          const task = await this._taskStore.getTask(request.params.taskId, extra.sessionId);
          if (!task) {
            throw new McpError(ErrorCode.InvalidParams, "Failed to retrieve task: Task not found");
          }
          return {
            ...task
          };
        });
        this.setRequestHandler(GetTaskPayloadRequestSchema, async (request, extra) => {
          const handleTaskResult = async () => {
            const taskId = request.params.taskId;
            if (this._taskMessageQueue) {
              let queuedMessage;
              while (queuedMessage = await this._taskMessageQueue.dequeue(taskId, extra.sessionId)) {
                if (queuedMessage.type === "response" || queuedMessage.type === "error") {
                  const message = queuedMessage.message;
                  const requestId = message.id;
                  const resolver = this._requestResolvers.get(requestId);
                  if (resolver) {
                    this._requestResolvers.delete(requestId);
                    if (queuedMessage.type === "response") {
                      resolver(message);
                    } else {
                      const errorMessage = message;
                      const error51 = new McpError(errorMessage.error.code, errorMessage.error.message, errorMessage.error.data);
                      resolver(error51);
                    }
                  } else {
                    const messageType = queuedMessage.type === "response" ? "Response" : "Error";
                    this._onerror(new Error(`${messageType} handler missing for request ${requestId}`));
                  }
                  continue;
                }
                await this._transport?.send(queuedMessage.message, { relatedRequestId: extra.requestId });
              }
            }
            const task = await this._taskStore.getTask(taskId, extra.sessionId);
            if (!task) {
              throw new McpError(ErrorCode.InvalidParams, `Task not found: ${taskId}`);
            }
            if (!isTerminal(task.status)) {
              await this._waitForTaskUpdate(taskId, extra.signal);
              return await handleTaskResult();
            }
            if (isTerminal(task.status)) {
              const result = await this._taskStore.getTaskResult(taskId, extra.sessionId);
              this._clearTaskQueue(taskId);
              return {
                ...result,
                _meta: {
                  ...result._meta,
                  [RELATED_TASK_META_KEY]: {
                    taskId
                  }
                }
              };
            }
            return await handleTaskResult();
          };
          return await handleTaskResult();
        });
        this.setRequestHandler(ListTasksRequestSchema, async (request, extra) => {
          try {
            const { tasks, nextCursor } = await this._taskStore.listTasks(request.params?.cursor, extra.sessionId);
            return {
              tasks,
              nextCursor,
              _meta: {}
            };
          } catch (error51) {
            throw new McpError(ErrorCode.InvalidParams, `Failed to list tasks: ${error51 instanceof Error ? error51.message : String(error51)}`);
          }
        });
        this.setRequestHandler(CancelTaskRequestSchema, async (request, extra) => {
          try {
            const task = await this._taskStore.getTask(request.params.taskId, extra.sessionId);
            if (!task) {
              throw new McpError(ErrorCode.InvalidParams, `Task not found: ${request.params.taskId}`);
            }
            if (isTerminal(task.status)) {
              throw new McpError(ErrorCode.InvalidParams, `Cannot cancel task in terminal status: ${task.status}`);
            }
            await this._taskStore.updateTaskStatus(request.params.taskId, "cancelled", "Client cancelled task execution.", extra.sessionId);
            this._clearTaskQueue(request.params.taskId);
            const cancelledTask = await this._taskStore.getTask(request.params.taskId, extra.sessionId);
            if (!cancelledTask) {
              throw new McpError(ErrorCode.InvalidParams, `Task not found after cancellation: ${request.params.taskId}`);
            }
            return {
              _meta: {},
              ...cancelledTask
            };
          } catch (error51) {
            if (error51 instanceof McpError) {
              throw error51;
            }
            throw new McpError(ErrorCode.InvalidRequest, `Failed to cancel task: ${error51 instanceof Error ? error51.message : String(error51)}`);
          }
        });
      }
    }
    async _oncancel(notification) {
      if (!notification.params.requestId) {
        return;
      }
      const controller = this._requestHandlerAbortControllers.get(notification.params.requestId);
      controller?.abort(notification.params.reason);
    }
    _setupTimeout(messageId, timeout, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = false) {
      this._timeoutInfo.set(messageId, {
        timeoutId: setTimeout(onTimeout, timeout),
        startTime: Date.now(),
        timeout,
        maxTotalTimeout,
        resetTimeoutOnProgress,
        onTimeout
      });
    }
    _resetTimeout(messageId) {
      const info = this._timeoutInfo.get(messageId);
      if (!info)
        return false;
      const totalElapsed = Date.now() - info.startTime;
      if (info.maxTotalTimeout && totalElapsed >= info.maxTotalTimeout) {
        this._timeoutInfo.delete(messageId);
        throw McpError.fromError(ErrorCode.RequestTimeout, "Maximum total timeout exceeded", {
          maxTotalTimeout: info.maxTotalTimeout,
          totalElapsed
        });
      }
      clearTimeout(info.timeoutId);
      info.timeoutId = setTimeout(info.onTimeout, info.timeout);
      return true;
    }
    _cleanupTimeout(messageId) {
      const info = this._timeoutInfo.get(messageId);
      if (info) {
        clearTimeout(info.timeoutId);
        this._timeoutInfo.delete(messageId);
      }
    }
    /**
     * Attaches to the given transport, starts it, and starts listening for messages.
     *
     * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
     */
    async connect(transport) {
      if (this._transport) {
        throw new Error("Already connected to a transport. Call close() before connecting to a new transport, or use a separate Protocol instance per connection.");
      }
      this._transport = transport;
      const _onclose = this.transport?.onclose;
      this._transport.onclose = () => {
        _onclose?.();
        this._onclose();
      };
      const _onerror = this.transport?.onerror;
      this._transport.onerror = (error51) => {
        _onerror?.(error51);
        this._onerror(error51);
      };
      const _onmessage = this._transport?.onmessage;
      this._transport.onmessage = (message, extra) => {
        _onmessage?.(message, extra);
        if (isJSONRPCResultResponse(message) || isJSONRPCErrorResponse(message)) {
          this._onresponse(message);
        } else if (isJSONRPCRequest(message)) {
          this._onrequest(message, extra);
        } else if (isJSONRPCNotification(message)) {
          this._onnotification(message);
        } else {
          this._onerror(new Error(`Unknown message type: ${JSON.stringify(message)}`));
        }
      };
      await this._transport.start();
    }
    _onclose() {
      const responseHandlers = this._responseHandlers;
      this._responseHandlers = /* @__PURE__ */ new Map();
      this._progressHandlers.clear();
      this._taskProgressTokens.clear();
      this._pendingDebouncedNotifications.clear();
      for (const info of this._timeoutInfo.values()) {
        clearTimeout(info.timeoutId);
      }
      this._timeoutInfo.clear();
      for (const controller of this._requestHandlerAbortControllers.values()) {
        controller.abort();
      }
      this._requestHandlerAbortControllers.clear();
      const error51 = McpError.fromError(ErrorCode.ConnectionClosed, "Connection closed");
      this._transport = void 0;
      this.onclose?.();
      for (const handler of responseHandlers.values()) {
        handler(error51);
      }
    }
    _onerror(error51) {
      this.onerror?.(error51);
    }
    _onnotification(notification) {
      const handler = this._notificationHandlers.get(notification.method) ?? this.fallbackNotificationHandler;
      if (handler === void 0) {
        return;
      }
      Promise.resolve().then(() => handler(notification)).catch((error51) => this._onerror(new Error(`Uncaught error in notification handler: ${error51}`)));
    }
    _onrequest(request, extra) {
      const handler = this._requestHandlers.get(request.method) ?? this.fallbackRequestHandler;
      const capturedTransport = this._transport;
      const relatedTaskId = request.params?._meta?.[RELATED_TASK_META_KEY]?.taskId;
      if (handler === void 0) {
        const errorResponse = {
          jsonrpc: "2.0",
          id: request.id,
          error: {
            code: ErrorCode.MethodNotFound,
            message: "Method not found"
          }
        };
        if (relatedTaskId && this._taskMessageQueue) {
          this._enqueueTaskMessage(relatedTaskId, {
            type: "error",
            message: errorResponse,
            timestamp: Date.now()
          }, capturedTransport?.sessionId).catch((error51) => this._onerror(new Error(`Failed to enqueue error response: ${error51}`)));
        } else {
          capturedTransport?.send(errorResponse).catch((error51) => this._onerror(new Error(`Failed to send an error response: ${error51}`)));
        }
        return;
      }
      const abortController = new AbortController();
      this._requestHandlerAbortControllers.set(request.id, abortController);
      const taskCreationParams = isTaskAugmentedRequestParams(request.params) ? request.params.task : void 0;
      const taskStore = this._taskStore ? this.requestTaskStore(request, capturedTransport?.sessionId) : void 0;
      const fullExtra = {
        signal: abortController.signal,
        sessionId: capturedTransport?.sessionId,
        _meta: request.params?._meta,
        sendNotification: async (notification) => {
          if (abortController.signal.aborted)
            return;
          const notificationOptions = { relatedRequestId: request.id };
          if (relatedTaskId) {
            notificationOptions.relatedTask = { taskId: relatedTaskId };
          }
          await this.notification(notification, notificationOptions);
        },
        sendRequest: async (r2, resultSchema, options) => {
          if (abortController.signal.aborted) {
            throw new McpError(ErrorCode.ConnectionClosed, "Request was cancelled");
          }
          const requestOptions = { ...options, relatedRequestId: request.id };
          if (relatedTaskId && !requestOptions.relatedTask) {
            requestOptions.relatedTask = { taskId: relatedTaskId };
          }
          const effectiveTaskId = requestOptions.relatedTask?.taskId ?? relatedTaskId;
          if (effectiveTaskId && taskStore) {
            await taskStore.updateTaskStatus(effectiveTaskId, "input_required");
          }
          return await this.request(r2, resultSchema, requestOptions);
        },
        authInfo: extra?.authInfo,
        requestId: request.id,
        requestInfo: extra?.requestInfo,
        taskId: relatedTaskId,
        taskStore,
        taskRequestedTtl: taskCreationParams?.ttl,
        closeSSEStream: extra?.closeSSEStream,
        closeStandaloneSSEStream: extra?.closeStandaloneSSEStream
      };
      Promise.resolve().then(() => {
        if (taskCreationParams) {
          this.assertTaskHandlerCapability(request.method);
        }
      }).then(() => handler(request, fullExtra)).then(async (result) => {
        if (abortController.signal.aborted) {
          return;
        }
        const response = {
          result,
          jsonrpc: "2.0",
          id: request.id
        };
        if (relatedTaskId && this._taskMessageQueue) {
          await this._enqueueTaskMessage(relatedTaskId, {
            type: "response",
            message: response,
            timestamp: Date.now()
          }, capturedTransport?.sessionId);
        } else {
          await capturedTransport?.send(response);
        }
      }, async (error51) => {
        if (abortController.signal.aborted) {
          return;
        }
        const errorResponse = {
          jsonrpc: "2.0",
          id: request.id,
          error: {
            code: Number.isSafeInteger(error51["code"]) ? error51["code"] : ErrorCode.InternalError,
            message: error51.message ?? "Internal error",
            ...error51["data"] !== void 0 && { data: error51["data"] }
          }
        };
        if (relatedTaskId && this._taskMessageQueue) {
          await this._enqueueTaskMessage(relatedTaskId, {
            type: "error",
            message: errorResponse,
            timestamp: Date.now()
          }, capturedTransport?.sessionId);
        } else {
          await capturedTransport?.send(errorResponse);
        }
      }).catch((error51) => this._onerror(new Error(`Failed to send response: ${error51}`))).finally(() => {
        if (this._requestHandlerAbortControllers.get(request.id) === abortController) {
          this._requestHandlerAbortControllers.delete(request.id);
        }
      });
    }
    _onprogress(notification) {
      const { progressToken, ...params } = notification.params;
      const messageId = Number(progressToken);
      const handler = this._progressHandlers.get(messageId);
      if (!handler) {
        this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`));
        return;
      }
      const responseHandler = this._responseHandlers.get(messageId);
      const timeoutInfo = this._timeoutInfo.get(messageId);
      if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress) {
        try {
          this._resetTimeout(messageId);
        } catch (error51) {
          this._responseHandlers.delete(messageId);
          this._progressHandlers.delete(messageId);
          this._cleanupTimeout(messageId);
          responseHandler(error51);
          return;
        }
      }
      handler(params);
    }
    _onresponse(response) {
      const messageId = Number(response.id);
      const resolver = this._requestResolvers.get(messageId);
      if (resolver) {
        this._requestResolvers.delete(messageId);
        if (isJSONRPCResultResponse(response)) {
          resolver(response);
        } else {
          const error51 = new McpError(response.error.code, response.error.message, response.error.data);
          resolver(error51);
        }
        return;
      }
      const handler = this._responseHandlers.get(messageId);
      if (handler === void 0) {
        this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(response)}`));
        return;
      }
      this._responseHandlers.delete(messageId);
      this._cleanupTimeout(messageId);
      let isTaskResponse = false;
      if (isJSONRPCResultResponse(response) && response.result && typeof response.result === "object") {
        const result = response.result;
        if (result.task && typeof result.task === "object") {
          const task = result.task;
          if (typeof task.taskId === "string") {
            isTaskResponse = true;
            this._taskProgressTokens.set(task.taskId, messageId);
          }
        }
      }
      if (!isTaskResponse) {
        this._progressHandlers.delete(messageId);
      }
      if (isJSONRPCResultResponse(response)) {
        handler(response);
      } else {
        const error51 = McpError.fromError(response.error.code, response.error.message, response.error.data);
        handler(error51);
      }
    }
    get transport() {
      return this._transport;
    }
    /**
     * Closes the connection.
     */
    async close() {
      await this._transport?.close();
    }
    /**
     * Sends a request and returns an AsyncGenerator that yields response messages.
     * The generator is guaranteed to end with either a 'result' or 'error' message.
     *
     * @example
     * ```typescript
     * const stream = protocol.requestStream(request, resultSchema, options);
     * for await (const message of stream) {
     *   switch (message.type) {
     *     case 'taskCreated':
     *       console.log('Task created:', message.task.taskId);
     *       break;
     *     case 'taskStatus':
     *       console.log('Task status:', message.task.status);
     *       break;
     *     case 'result':
     *       console.log('Final result:', message.result);
     *       break;
     *     case 'error':
     *       console.error('Error:', message.error);
     *       break;
     *   }
     * }
     * ```
     *
     * @experimental Use `client.experimental.tasks.requestStream()` to access this method.
     */
    async *requestStream(request, resultSchema, options) {
      const { task } = options ?? {};
      if (!task) {
        try {
          const result = await this.request(request, resultSchema, options);
          yield { type: "result", result };
        } catch (error51) {
          yield {
            type: "error",
            error: error51 instanceof McpError ? error51 : new McpError(ErrorCode.InternalError, String(error51))
          };
        }
        return;
      }
      let taskId;
      try {
        const createResult = await this.request(request, CreateTaskResultSchema, options);
        if (createResult.task) {
          taskId = createResult.task.taskId;
          yield { type: "taskCreated", task: createResult.task };
        } else {
          throw new McpError(ErrorCode.InternalError, "Task creation did not return a task");
        }
        while (true) {
          const task2 = await this.getTask({ taskId }, options);
          yield { type: "taskStatus", task: task2 };
          if (isTerminal(task2.status)) {
            if (task2.status === "completed") {
              const result = await this.getTaskResult({ taskId }, resultSchema, options);
              yield { type: "result", result };
            } else if (task2.status === "failed") {
              yield {
                type: "error",
                error: new McpError(ErrorCode.InternalError, `Task ${taskId} failed`)
              };
            } else if (task2.status === "cancelled") {
              yield {
                type: "error",
                error: new McpError(ErrorCode.InternalError, `Task ${taskId} was cancelled`)
              };
            }
            return;
          }
          if (task2.status === "input_required") {
            const result = await this.getTaskResult({ taskId }, resultSchema, options);
            yield { type: "result", result };
            return;
          }
          const pollInterval = task2.pollInterval ?? this._options?.defaultTaskPollInterval ?? 1e3;
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
          options?.signal?.throwIfAborted();
        }
      } catch (error51) {
        yield {
          type: "error",
          error: error51 instanceof McpError ? error51 : new McpError(ErrorCode.InternalError, String(error51))
        };
      }
    }
    /**
     * Sends a request and waits for a response.
     *
     * Do not use this method to emit notifications! Use notification() instead.
     */
    request(request, resultSchema, options) {
      const { relatedRequestId, resumptionToken, onresumptiontoken, task, relatedTask } = options ?? {};
      return new Promise((resolve, reject) => {
        const earlyReject = (error51) => {
          reject(error51);
        };
        if (!this._transport) {
          earlyReject(new Error("Not connected"));
          return;
        }
        if (this._options?.enforceStrictCapabilities === true) {
          try {
            this.assertCapabilityForMethod(request.method);
            if (task) {
              this.assertTaskCapability(request.method);
            }
          } catch (e2) {
            earlyReject(e2);
            return;
          }
        }
        options?.signal?.throwIfAborted();
        const messageId = this._requestMessageId++;
        const jsonrpcRequest = {
          ...request,
          jsonrpc: "2.0",
          id: messageId
        };
        if (options?.onprogress) {
          this._progressHandlers.set(messageId, options.onprogress);
          jsonrpcRequest.params = {
            ...request.params,
            _meta: {
              ...request.params?._meta || {},
              progressToken: messageId
            }
          };
        }
        if (task) {
          jsonrpcRequest.params = {
            ...jsonrpcRequest.params,
            task
          };
        }
        if (relatedTask) {
          jsonrpcRequest.params = {
            ...jsonrpcRequest.params,
            _meta: {
              ...jsonrpcRequest.params?._meta || {},
              [RELATED_TASK_META_KEY]: relatedTask
            }
          };
        }
        const cancel = (reason) => {
          this._responseHandlers.delete(messageId);
          this._progressHandlers.delete(messageId);
          this._cleanupTimeout(messageId);
          this._transport?.send({
            jsonrpc: "2.0",
            method: "notifications/cancelled",
            params: {
              requestId: messageId,
              reason: String(reason)
            }
          }, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error52) => this._onerror(new Error(`Failed to send cancellation: ${error52}`)));
          const error51 = reason instanceof McpError ? reason : new McpError(ErrorCode.RequestTimeout, String(reason));
          reject(error51);
        };
        this._responseHandlers.set(messageId, (response) => {
          if (options?.signal?.aborted) {
            return;
          }
          if (response instanceof Error) {
            return reject(response);
          }
          try {
            const parseResult = safeParse3(resultSchema, response.result);
            if (!parseResult.success) {
              reject(parseResult.error);
            } else {
              resolve(parseResult.data);
            }
          } catch (error51) {
            reject(error51);
          }
        });
        options?.signal?.addEventListener("abort", () => {
          cancel(options?.signal?.reason);
        });
        const timeout = options?.timeout ?? DEFAULT_REQUEST_TIMEOUT_MSEC;
        const timeoutHandler = () => cancel(McpError.fromError(ErrorCode.RequestTimeout, "Request timed out", { timeout }));
        this._setupTimeout(messageId, timeout, options?.maxTotalTimeout, timeoutHandler, options?.resetTimeoutOnProgress ?? false);
        const relatedTaskId = relatedTask?.taskId;
        if (relatedTaskId) {
          const responseResolver = (response) => {
            const handler = this._responseHandlers.get(messageId);
            if (handler) {
              handler(response);
            } else {
              this._onerror(new Error(`Response handler missing for side-channeled request ${messageId}`));
            }
          };
          this._requestResolvers.set(messageId, responseResolver);
          this._enqueueTaskMessage(relatedTaskId, {
            type: "request",
            message: jsonrpcRequest,
            timestamp: Date.now()
          }).catch((error51) => {
            this._cleanupTimeout(messageId);
            reject(error51);
          });
        } else {
          this._transport.send(jsonrpcRequest, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error51) => {
            this._cleanupTimeout(messageId);
            reject(error51);
          });
        }
      });
    }
    /**
     * Gets the current status of a task.
     *
     * @experimental Use `client.experimental.tasks.getTask()` to access this method.
     */
    async getTask(params, options) {
      return this.request({ method: "tasks/get", params }, GetTaskResultSchema, options);
    }
    /**
     * Retrieves the result of a completed task.
     *
     * @experimental Use `client.experimental.tasks.getTaskResult()` to access this method.
     */
    async getTaskResult(params, resultSchema, options) {
      return this.request({ method: "tasks/result", params }, resultSchema, options);
    }
    /**
     * Lists tasks, optionally starting from a pagination cursor.
     *
     * @experimental Use `client.experimental.tasks.listTasks()` to access this method.
     */
    async listTasks(params, options) {
      return this.request({ method: "tasks/list", params }, ListTasksResultSchema, options);
    }
    /**
     * Cancels a specific task.
     *
     * @experimental Use `client.experimental.tasks.cancelTask()` to access this method.
     */
    async cancelTask(params, options) {
      return this.request({ method: "tasks/cancel", params }, CancelTaskResultSchema, options);
    }
    /**
     * Emits a notification, which is a one-way message that does not expect a response.
     */
    async notification(notification, options) {
      if (!this._transport) {
        throw new Error("Not connected");
      }
      this.assertNotificationCapability(notification.method);
      const relatedTaskId = options?.relatedTask?.taskId;
      if (relatedTaskId) {
        const jsonrpcNotification2 = {
          ...notification,
          jsonrpc: "2.0",
          params: {
            ...notification.params,
            _meta: {
              ...notification.params?._meta || {},
              [RELATED_TASK_META_KEY]: options.relatedTask
            }
          }
        };
        await this._enqueueTaskMessage(relatedTaskId, {
          type: "notification",
          message: jsonrpcNotification2,
          timestamp: Date.now()
        });
        return;
      }
      const debouncedMethods = this._options?.debouncedNotificationMethods ?? [];
      const canDebounce = debouncedMethods.includes(notification.method) && !notification.params && !options?.relatedRequestId && !options?.relatedTask;
      if (canDebounce) {
        if (this._pendingDebouncedNotifications.has(notification.method)) {
          return;
        }
        this._pendingDebouncedNotifications.add(notification.method);
        Promise.resolve().then(() => {
          this._pendingDebouncedNotifications.delete(notification.method);
          if (!this._transport) {
            return;
          }
          let jsonrpcNotification2 = {
            ...notification,
            jsonrpc: "2.0"
          };
          if (options?.relatedTask) {
            jsonrpcNotification2 = {
              ...jsonrpcNotification2,
              params: {
                ...jsonrpcNotification2.params,
                _meta: {
                  ...jsonrpcNotification2.params?._meta || {},
                  [RELATED_TASK_META_KEY]: options.relatedTask
                }
              }
            };
          }
          this._transport?.send(jsonrpcNotification2, options).catch((error51) => this._onerror(error51));
        });
        return;
      }
      let jsonrpcNotification = {
        ...notification,
        jsonrpc: "2.0"
      };
      if (options?.relatedTask) {
        jsonrpcNotification = {
          ...jsonrpcNotification,
          params: {
            ...jsonrpcNotification.params,
            _meta: {
              ...jsonrpcNotification.params?._meta || {},
              [RELATED_TASK_META_KEY]: options.relatedTask
            }
          }
        };
      }
      await this._transport.send(jsonrpcNotification, options);
    }
    /**
     * Registers a handler to invoke when this protocol object receives a request with the given method.
     *
     * Note that this will replace any previous request handler for the same method.
     */
    setRequestHandler(requestSchema, handler) {
      const method = getMethodLiteral(requestSchema);
      this.assertRequestHandlerCapability(method);
      this._requestHandlers.set(method, (request, extra) => {
        const parsed = parseWithCompat(requestSchema, request);
        return Promise.resolve(handler(parsed, extra));
      });
    }
    /**
     * Removes the request handler for the given method.
     */
    removeRequestHandler(method) {
      this._requestHandlers.delete(method);
    }
    /**
     * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
     */
    assertCanSetRequestHandler(method) {
      if (this._requestHandlers.has(method)) {
        throw new Error(`A request handler for ${method} already exists, which would be overridden`);
      }
    }
    /**
     * Registers a handler to invoke when this protocol object receives a notification with the given method.
     *
     * Note that this will replace any previous notification handler for the same method.
     */
    setNotificationHandler(notificationSchema, handler) {
      const method = getMethodLiteral(notificationSchema);
      this._notificationHandlers.set(method, (notification) => {
        const parsed = parseWithCompat(notificationSchema, notification);
        return Promise.resolve(handler(parsed));
      });
    }
    /**
     * Removes the notification handler for the given method.
     */
    removeNotificationHandler(method) {
      this._notificationHandlers.delete(method);
    }
    /**
     * Cleans up the progress handler associated with a task.
     * This should be called when a task reaches a terminal status.
     */
    _cleanupTaskProgressHandler(taskId) {
      const progressToken = this._taskProgressTokens.get(taskId);
      if (progressToken !== void 0) {
        this._progressHandlers.delete(progressToken);
        this._taskProgressTokens.delete(taskId);
      }
    }
    /**
     * Enqueues a task-related message for side-channel delivery via tasks/result.
     * @param taskId The task ID to associate the message with
     * @param message The message to enqueue
     * @param sessionId Optional session ID for binding the operation to a specific session
     * @throws Error if taskStore is not configured or if enqueue fails (e.g., queue overflow)
     *
     * Note: If enqueue fails, it's the TaskMessageQueue implementation's responsibility to handle
     * the error appropriately (e.g., by failing the task, logging, etc.). The Protocol layer
     * simply propagates the error.
     */
    async _enqueueTaskMessage(taskId, message, sessionId) {
      if (!this._taskStore || !this._taskMessageQueue) {
        throw new Error("Cannot enqueue task message: taskStore and taskMessageQueue are not configured");
      }
      const maxQueueSize = this._options?.maxTaskQueueSize;
      await this._taskMessageQueue.enqueue(taskId, message, sessionId, maxQueueSize);
    }
    /**
     * Clears the message queue for a task and rejects any pending request resolvers.
     * @param taskId The task ID whose queue should be cleared
     * @param sessionId Optional session ID for binding the operation to a specific session
     */
    async _clearTaskQueue(taskId, sessionId) {
      if (this._taskMessageQueue) {
        const messages = await this._taskMessageQueue.dequeueAll(taskId, sessionId);
        for (const message of messages) {
          if (message.type === "request" && isJSONRPCRequest(message.message)) {
            const requestId = message.message.id;
            const resolver = this._requestResolvers.get(requestId);
            if (resolver) {
              resolver(new McpError(ErrorCode.InternalError, "Task cancelled or completed"));
              this._requestResolvers.delete(requestId);
            } else {
              this._onerror(new Error(`Resolver missing for request ${requestId} during task ${taskId} cleanup`));
            }
          }
        }
      }
    }
    /**
     * Waits for a task update (new messages or status change) with abort signal support.
     * Uses polling to check for updates at the task's configured poll interval.
     * @param taskId The task ID to wait for
     * @param signal Abort signal to cancel the wait
     * @returns Promise that resolves when an update occurs or rejects if aborted
     */
    async _waitForTaskUpdate(taskId, signal) {
      let interval = this._options?.defaultTaskPollInterval ?? 1e3;
      try {
        const task = await this._taskStore?.getTask(taskId);
        if (task?.pollInterval) {
          interval = task.pollInterval;
        }
      } catch {
      }
      return new Promise((resolve, reject) => {
        if (signal.aborted) {
          reject(new McpError(ErrorCode.InvalidRequest, "Request cancelled"));
          return;
        }
        const timeoutId = setTimeout(resolve, interval);
        signal.addEventListener("abort", () => {
          clearTimeout(timeoutId);
          reject(new McpError(ErrorCode.InvalidRequest, "Request cancelled"));
        }, { once: true });
      });
    }
    requestTaskStore(request, sessionId) {
      const taskStore = this._taskStore;
      if (!taskStore) {
        throw new Error("No task store configured");
      }
      return {
        createTask: async (taskParams) => {
          if (!request) {
            throw new Error("No request provided");
          }
          return await taskStore.createTask(taskParams, request.id, {
            method: request.method,
            params: request.params
          }, sessionId);
        },
        getTask: async (taskId) => {
          const task = await taskStore.getTask(taskId, sessionId);
          if (!task) {
            throw new McpError(ErrorCode.InvalidParams, "Failed to retrieve task: Task not found");
          }
          return task;
        },
        storeTaskResult: async (taskId, status, result) => {
          await taskStore.storeTaskResult(taskId, status, result, sessionId);
          const task = await taskStore.getTask(taskId, sessionId);
          if (task) {
            const notification = TaskStatusNotificationSchema.parse({
              method: "notifications/tasks/status",
              params: task
            });
            await this.notification(notification);
            if (isTerminal(task.status)) {
              this._cleanupTaskProgressHandler(taskId);
            }
          }
        },
        getTaskResult: (taskId) => {
          return taskStore.getTaskResult(taskId, sessionId);
        },
        updateTaskStatus: async (taskId, status, statusMessage) => {
          const task = await taskStore.getTask(taskId, sessionId);
          if (!task) {
            throw new McpError(ErrorCode.InvalidParams, `Task "${taskId}" not found - it may have been cleaned up`);
          }
          if (isTerminal(task.status)) {
            throw new McpError(ErrorCode.InvalidParams, `Cannot update task "${taskId}" from terminal status "${task.status}" to "${status}". Terminal states (completed, failed, cancelled) cannot transition to other states.`);
          }
          await taskStore.updateTaskStatus(taskId, status, statusMessage, sessionId);
          const updatedTask = await taskStore.getTask(taskId, sessionId);
          if (updatedTask) {
            const notification = TaskStatusNotificationSchema.parse({
              method: "notifications/tasks/status",
              params: updatedTask
            });
            await this.notification(notification);
            if (isTerminal(updatedTask.status)) {
              this._cleanupTaskProgressHandler(taskId);
            }
          }
        },
        listTasks: (cursor) => {
          return taskStore.listTasks(cursor, sessionId);
        }
      };
    }
  };

  // node_modules/@modelcontextprotocol/ext-apps/dist/src/app-bridge.js
  init_v4();
  var ZQ = ((X) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(X, { get: (Y, Z) => (typeof __require < "u" ? __require : Y)[Z] }) : X)(function(X) {
    if (typeof __require < "u") return __require.apply(this, arguments);
    throw Error('Dynamic require of "' + X + '" is not supported');
  });
  var _ = class extends Protocol {
    constructor() {
      super(...arguments);
      __publicField(this, "_registeredMethods", /* @__PURE__ */ new Set());
      __publicField(this, "_eventSlots", /* @__PURE__ */ new Map());
      __publicField(this, "setRequestHandler", (X, Y) => {
        this._assertMethodNotRegistered(X, "setRequestHandler"), super.setRequestHandler(X, Y);
      });
      __publicField(this, "setNotificationHandler", (X, Y) => {
        this._assertMethodNotRegistered(X, "setNotificationHandler"), super.setNotificationHandler(X, Y);
      });
      __publicField(this, "replaceRequestHandler", (X, Y) => {
        let Z = X.shape.method.value;
        this._registeredMethods.add(Z), super.setRequestHandler(X, Y);
      });
    }
    onEventDispatch(X, Y) {
    }
    _ensureEventSlot(X) {
      let Y = this._eventSlots.get(X);
      if (!Y) {
        let Z = this.eventSchemas[X];
        if (!Z) throw Error(`Unknown event: ${String(X)}`);
        Y = { listeners: [] }, this._eventSlots.set(X, Y);
        let $ = Z.shape.method.value;
        this._registeredMethods.add($);
        let J = Y;
        super.setNotificationHandler(Z, (K) => {
          let D = K.params;
          this.onEventDispatch(X, D), J.onHandler?.(D);
          for (let G of [...J.listeners]) G(D);
        });
      }
      return Y;
    }
    setEventHandler(X, Y) {
      let Z = this._ensureEventSlot(X);
      if (Z.onHandler && Y) console.warn(`[MCP Apps] on${String(X)} handler replaced. Use addEventListener("${String(X)}", …) to add multiple listeners without replacing.`);
      Z.onHandler = Y;
    }
    getEventHandler(X) {
      return this._eventSlots.get(X)?.onHandler;
    }
    addEventListener(X, Y) {
      this._ensureEventSlot(X).listeners.push(Y);
    }
    removeEventListener(X, Y) {
      let Z = this._eventSlots.get(X);
      if (!Z) return;
      let $ = Z.listeners.indexOf(Y);
      if ($ !== -1) Z.listeners.splice($, 1);
    }
    warnIfRequestHandlerReplaced(X, Y, Z) {
      if (Y && Z) console.warn(`[MCP Apps] ${X} handler replaced. Previous handler will no longer be called.`);
    }
    _assertMethodNotRegistered(X, Y) {
      let Z = X.shape.method.value;
      if (this._registeredMethods.has(Z)) throw Error(`Handler for "${Z}" already registered (via ${Y}). Use addEventListener() to attach multiple listeners, or the on* setter for replace semantics.`);
      this._registeredMethods.add(Z);
    }
  };
  var j = "2026-01-26";
  var V = "ui/notifications/tool-input-partial";
  var r = external_exports.union([external_exports.literal("light"), external_exports.literal("dark")]).describe("Color theme preference for the host environment.");
  var B = external_exports.union([external_exports.literal("inline"), external_exports.literal("fullscreen"), external_exports.literal("pip")]).describe("Display mode for UI presentation.");
  var HQ = external_exports.union([external_exports.literal("--color-background-primary"), external_exports.literal("--color-background-secondary"), external_exports.literal("--color-background-tertiary"), external_exports.literal("--color-background-inverse"), external_exports.literal("--color-background-ghost"), external_exports.literal("--color-background-info"), external_exports.literal("--color-background-danger"), external_exports.literal("--color-background-success"), external_exports.literal("--color-background-warning"), external_exports.literal("--color-background-disabled"), external_exports.literal("--color-text-primary"), external_exports.literal("--color-text-secondary"), external_exports.literal("--color-text-tertiary"), external_exports.literal("--color-text-inverse"), external_exports.literal("--color-text-ghost"), external_exports.literal("--color-text-info"), external_exports.literal("--color-text-danger"), external_exports.literal("--color-text-success"), external_exports.literal("--color-text-warning"), external_exports.literal("--color-text-disabled"), external_exports.literal("--color-border-primary"), external_exports.literal("--color-border-secondary"), external_exports.literal("--color-border-tertiary"), external_exports.literal("--color-border-inverse"), external_exports.literal("--color-border-ghost"), external_exports.literal("--color-border-info"), external_exports.literal("--color-border-danger"), external_exports.literal("--color-border-success"), external_exports.literal("--color-border-warning"), external_exports.literal("--color-border-disabled"), external_exports.literal("--color-ring-primary"), external_exports.literal("--color-ring-secondary"), external_exports.literal("--color-ring-inverse"), external_exports.literal("--color-ring-info"), external_exports.literal("--color-ring-danger"), external_exports.literal("--color-ring-success"), external_exports.literal("--color-ring-warning"), external_exports.literal("--font-sans"), external_exports.literal("--font-mono"), external_exports.literal("--font-weight-normal"), external_exports.literal("--font-weight-medium"), external_exports.literal("--font-weight-semibold"), external_exports.literal("--font-weight-bold"), external_exports.literal("--font-text-xs-size"), external_exports.literal("--font-text-sm-size"), external_exports.literal("--font-text-md-size"), external_exports.literal("--font-text-lg-size"), external_exports.literal("--font-heading-xs-size"), external_exports.literal("--font-heading-sm-size"), external_exports.literal("--font-heading-md-size"), external_exports.literal("--font-heading-lg-size"), external_exports.literal("--font-heading-xl-size"), external_exports.literal("--font-heading-2xl-size"), external_exports.literal("--font-heading-3xl-size"), external_exports.literal("--font-text-xs-line-height"), external_exports.literal("--font-text-sm-line-height"), external_exports.literal("--font-text-md-line-height"), external_exports.literal("--font-text-lg-line-height"), external_exports.literal("--font-heading-xs-line-height"), external_exports.literal("--font-heading-sm-line-height"), external_exports.literal("--font-heading-md-line-height"), external_exports.literal("--font-heading-lg-line-height"), external_exports.literal("--font-heading-xl-line-height"), external_exports.literal("--font-heading-2xl-line-height"), external_exports.literal("--font-heading-3xl-line-height"), external_exports.literal("--border-radius-xs"), external_exports.literal("--border-radius-sm"), external_exports.literal("--border-radius-md"), external_exports.literal("--border-radius-lg"), external_exports.literal("--border-radius-xl"), external_exports.literal("--border-radius-full"), external_exports.literal("--border-width-regular"), external_exports.literal("--shadow-hairline"), external_exports.literal("--shadow-sm"), external_exports.literal("--shadow-md"), external_exports.literal("--shadow-lg")]).describe("CSS variable keys available to MCP apps for theming.");
  var RQ = external_exports.record(HQ.describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`), external_exports.union([external_exports.string(), external_exports.undefined()]).describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`)).describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`);
  var L = external_exports.object({ method: external_exports.literal("ui/open-link"), params: external_exports.object({ url: external_exports.string().describe("URL to open in the host's browser") }) });
  var P = external_exports.object({ isError: external_exports.boolean().optional().describe("True if the host failed to open the URL (e.g., due to security policy).") }).passthrough();
  var A = external_exports.object({ isError: external_exports.boolean().optional().describe("True if the download failed (e.g., user cancelled or host denied).") }).passthrough();
  var U = external_exports.object({ isError: external_exports.boolean().optional().describe("True if the host rejected or failed to deliver the message.") }).passthrough();
  var w = external_exports.object({ method: external_exports.literal("ui/notifications/sandbox-proxy-ready"), params: external_exports.object({}) });
  var O = external_exports.object({ connectDomains: external_exports.array(external_exports.string()).optional().describe(`Origins for network requests (fetch/XHR/WebSocket).

- Maps to CSP \`connect-src\` directive
- Empty or omitted → no network connections (secure default)`), resourceDomains: external_exports.array(external_exports.string()).optional().describe("Origins for static resources (images, scripts, stylesheets, fonts, media).\n\n- Maps to CSP `img-src`, `script-src`, `style-src`, `font-src`, `media-src` directives\n- Wildcard subdomains supported: `https://*.example.com`\n- Empty or omitted → no network resources (secure default)"), frameDomains: external_exports.array(external_exports.string()).optional().describe("Origins for nested iframes.\n\n- Maps to CSP `frame-src` directive\n- Empty or omitted → no nested iframes allowed (`frame-src 'none'`)"), baseUriDomains: external_exports.array(external_exports.string()).optional().describe("Allowed base URIs for the document.\n\n- Maps to CSP `base-uri` directive\n- Empty or omitted → only same origin allowed (`base-uri 'self'`)") });
  var z2 = external_exports.object({ camera: external_exports.object({}).optional().describe("Request camera access.\n\nMaps to Permission Policy `camera` feature."), microphone: external_exports.object({}).optional().describe("Request microphone access.\n\nMaps to Permission Policy `microphone` feature."), geolocation: external_exports.object({}).optional().describe("Request geolocation access.\n\nMaps to Permission Policy `geolocation` feature."), clipboardWrite: external_exports.object({}).optional().describe("Request clipboard write access.\n\nMaps to Permission Policy `clipboard-write` feature.") });
  var H = external_exports.object({ method: external_exports.literal("ui/notifications/size-changed"), params: external_exports.object({ width: external_exports.number().optional().describe("New width in pixels."), height: external_exports.number().optional().describe("New height in pixels.") }) });
  var R = external_exports.object({ method: external_exports.literal("ui/notifications/tool-input"), params: external_exports.object({ arguments: external_exports.record(external_exports.string(), external_exports.unknown().describe("Complete tool call arguments as key-value pairs.")).optional().describe("Complete tool call arguments as key-value pairs.") }) });
  var T = external_exports.object({ method: external_exports.literal("ui/notifications/tool-input-partial"), params: external_exports.object({ arguments: external_exports.record(external_exports.string(), external_exports.unknown().describe("Partial tool call arguments (incomplete, may change).")).optional().describe("Partial tool call arguments (incomplete, may change).") }) });
  var M = external_exports.object({ method: external_exports.literal("ui/notifications/tool-cancelled"), params: external_exports.object({ reason: external_exports.string().optional().describe('Optional reason for the cancellation (e.g., "user action", "timeout").') }) });
  var o = external_exports.object({ fonts: external_exports.string().optional() });
  var s = external_exports.object({ variables: RQ.optional().describe("CSS variables for theming the app."), css: o.optional().describe("CSS blocks that apps can inject.") });
  var C = external_exports.object({ method: external_exports.literal("ui/resource-teardown"), params: external_exports.object({}) });
  var S = external_exports.record(external_exports.string(), external_exports.unknown());
  var F = external_exports.object({ text: external_exports.object({}).optional().describe("Host supports text content blocks."), image: external_exports.object({}).optional().describe("Host supports image content blocks."), audio: external_exports.object({}).optional().describe("Host supports audio content blocks."), resource: external_exports.object({}).optional().describe("Host supports resource content blocks."), resourceLink: external_exports.object({}).optional().describe("Host supports resource link content blocks."), structuredContent: external_exports.object({}).optional().describe("Host supports structured content.") });
  var q = external_exports.object({ method: external_exports.literal("ui/notifications/request-teardown"), params: external_exports.object({}).optional() });
  var t = external_exports.object({ experimental: external_exports.object({}).optional().describe("Experimental features (structure TBD)."), openLinks: external_exports.object({}).optional().describe("Host supports opening external URLs."), downloadFile: external_exports.object({}).optional().describe("Host supports file downloads via ui/download-file."), serverTools: external_exports.object({ listChanged: external_exports.boolean().optional().describe("Host supports tools/list_changed notifications.") }).optional().describe("Host can proxy tool calls to the MCP server."), serverResources: external_exports.object({ listChanged: external_exports.boolean().optional().describe("Host supports resources/list_changed notifications.") }).optional().describe("Host can proxy resource reads to the MCP server."), logging: external_exports.object({}).optional().describe("Host accepts log messages."), sandbox: external_exports.object({ permissions: z2.optional().describe("Permissions granted by the host (camera, microphone, geolocation)."), csp: O.optional().describe("CSP domains approved by the host.") }).optional().describe("Sandbox configuration applied by the host."), updateModelContext: F.optional().describe("Host accepts context updates (ui/update-model-context) to be included in the model's context for future turns."), message: F.optional().describe("Host supports receiving content messages (ui/message) from the view."), sampling: external_exports.object({ tools: external_exports.object({}).optional().describe("Host supports tool use via `tools` and `toolChoice` parameters.") }).optional().describe("Host supports LLM sampling (sampling/createMessage) from the view.\nMirrors the MCP `ClientCapabilities.sampling` shape so hosts can pass it through.") });
  var a = external_exports.object({ experimental: external_exports.object({}).optional().describe("Experimental features (structure TBD)."), tools: external_exports.object({ listChanged: external_exports.boolean().optional().describe("App supports tools/list_changed notifications.") }).optional().describe("App exposes MCP-style tools that the host can call."), availableDisplayModes: external_exports.array(B).optional().describe("Display modes the app supports.") });
  var y = external_exports.object({ method: external_exports.literal("ui/notifications/initialized"), params: external_exports.object({}).optional() });
  var TQ = external_exports.object({ csp: O.optional().describe("Content Security Policy configuration for UI resources."), permissions: z2.optional().describe("Sandbox permissions requested by the UI resource."), domain: external_exports.string().optional().describe(`Dedicated origin for view sandbox.

Useful when views need stable, dedicated origins for OAuth callbacks, CORS policies, or API key allowlists.

**Host-dependent:** The format and validation rules for this field are determined by each host. Servers MUST consult host-specific documentation for the expected domain format. Common patterns include:
- Hash-based subdomains (e.g., \`{hash}.claudemcpcontent.com\`)
- URL-derived subdomains (e.g., \`www-example-com.oaiusercontent.com\`)

If omitted, host uses default sandbox origin (typically per-conversation).`), prefersBorder: external_exports.boolean().optional().describe(`Visual boundary preference - true if view prefers a visible border.

Boolean requesting whether a visible border and background is provided by the host. Specifying an explicit value for this is recommended because hosts' defaults may vary.

- \`true\`: request visible border + background
- \`false\`: request no visible border + background
- omitted: host decides border`) });
  var I = external_exports.object({ method: external_exports.literal("ui/request-display-mode"), params: external_exports.object({ mode: B.describe("The display mode being requested.") }) });
  var g = external_exports.object({ mode: B.describe("The display mode that was actually set. May differ from requested if not supported.") }).passthrough();
  var e = external_exports.union([external_exports.literal("model"), external_exports.literal("app")]).describe("Tool visibility scope - who can access the tool.");
  var MQ = external_exports.object({ resourceUri: external_exports.string().optional(), visibility: external_exports.array(e).optional().describe(`Who can access this tool. Default: ["model", "app"]
- "model": Tool visible to and callable by the agent
- "app": Tool callable by the app from this server only`), csp: external_exports.never().optional(), permissions: external_exports.never().optional() });
  var OX = external_exports.object({ mimeTypes: external_exports.array(external_exports.string()).optional().describe('Array of supported MIME types for UI resources.\nMust include `"text/html;profile=mcp-app"` for MCP Apps support.') });
  var f = external_exports.object({ method: external_exports.literal("ui/download-file"), params: external_exports.object({ contents: external_exports.array(external_exports.union([EmbeddedResourceSchema, ResourceLinkSchema])).describe("Resource contents to download — embedded (inline data) or linked (host fetches). Uses standard MCP resource types.") }) });
  var k = external_exports.object({ method: external_exports.literal("ui/message"), params: external_exports.object({ role: external_exports.literal("user").describe('Message role, currently only "user" is supported.'), content: external_exports.array(ContentBlockSchema).describe("Message content blocks (text, image, etc.).") }) });
  var CQ = external_exports.object({ method: external_exports.literal("ui/notifications/sandbox-resource-ready"), params: external_exports.object({ html: external_exports.string().describe("HTML content to load into the inner iframe."), sandbox: external_exports.string().optional().describe("Optional override for the inner iframe's sandbox attribute."), csp: O.optional().describe("CSP configuration from resource metadata."), permissions: z2.optional().describe("Sandbox permissions from resource metadata.") }) });
  var v = external_exports.object({ method: external_exports.literal("ui/notifications/tool-result"), params: CallToolResultSchema.describe("Standard MCP tool execution result.") });
  var x = external_exports.object({ toolInfo: external_exports.object({ id: RequestIdSchema.optional().describe("JSON-RPC id of the tools/call request."), tool: ToolSchema.describe("Tool definition including name, inputSchema, etc.") }).optional().describe("Metadata of the tool call that instantiated this App."), theme: r.optional().describe("Current color theme preference."), styles: s.optional().describe("Style configuration for theming the app."), displayMode: B.optional().describe("How the UI is currently displayed."), availableDisplayModes: external_exports.array(B).optional().describe("Display modes the host supports."), containerDimensions: external_exports.union([external_exports.object({ height: external_exports.number().describe("Fixed container height in pixels.") }), external_exports.object({ maxHeight: external_exports.union([external_exports.number(), external_exports.undefined()]).optional().describe("Maximum container height in pixels.") })]).and(external_exports.union([external_exports.object({ width: external_exports.number().describe("Fixed container width in pixels.") }), external_exports.object({ maxWidth: external_exports.union([external_exports.number(), external_exports.undefined()]).optional().describe("Maximum container width in pixels.") })])).optional().describe(`Container dimensions. Represents the dimensions of the iframe or other
container holding the app. Specify either width or maxWidth, and either height or maxHeight.`), locale: external_exports.string().optional().describe("User's language and region preference in BCP 47 format."), timeZone: external_exports.string().optional().describe("User's timezone in IANA format."), userAgent: external_exports.string().optional().describe("Host application identifier."), platform: external_exports.union([external_exports.literal("web"), external_exports.literal("desktop"), external_exports.literal("mobile")]).optional().describe("Platform type for responsive design decisions."), deviceCapabilities: external_exports.object({ touch: external_exports.boolean().optional().describe("Whether the device supports touch input."), hover: external_exports.boolean().optional().describe("Whether the device supports hover interactions.") }).optional().describe("Device input capabilities."), safeAreaInsets: external_exports.object({ top: external_exports.number().describe("Top safe area inset in pixels."), right: external_exports.number().describe("Right safe area inset in pixels."), bottom: external_exports.number().describe("Bottom safe area inset in pixels."), left: external_exports.number().describe("Left safe area inset in pixels.") }).optional().describe("Mobile safe area boundaries in pixels.") }).passthrough();
  var b = external_exports.object({ method: external_exports.literal("ui/notifications/host-context-changed"), params: x.describe("Partial context update containing only changed fields.") });
  var d = external_exports.object({ method: external_exports.literal("ui/update-model-context"), params: external_exports.object({ content: external_exports.array(ContentBlockSchema).optional().describe("Context content blocks (text, image, etc.)."), structuredContent: external_exports.record(external_exports.string(), external_exports.unknown().describe("Structured content for machine-readable context data.")).optional().describe("Structured content for machine-readable context data.") }) });
  var u = external_exports.object({ method: external_exports.literal("ui/initialize"), params: external_exports.object({ appInfo: ImplementationSchema.describe("App identification (name and version)."), appCapabilities: a.describe("Features and capabilities this app provides."), protocolVersion: external_exports.string().describe("Protocol version this app supports.") }) });
  var h = external_exports.object({ protocolVersion: external_exports.string().describe('Negotiated protocol version string (e.g., "2025-11-21").'), hostInfo: ImplementationSchema.describe("Host application identification and version."), hostCapabilities: t.describe("Features and capabilities provided by the host."), hostContext: x.describe("Rich context about the host environment.") }).passthrough();
  var E = class {
    constructor(X = window.parent, Y) {
      __publicField(this, "eventTarget");
      __publicField(this, "eventSource");
      __publicField(this, "messageListener");
      __publicField(this, "onclose");
      __publicField(this, "onerror");
      __publicField(this, "onmessage");
      __publicField(this, "sessionId");
      __publicField(this, "setProtocolVersion");
      this.eventTarget = X;
      this.eventSource = Y;
      this.messageListener = (Z) => {
        if (Y && Z.source !== this.eventSource) {
          console.debug("Ignoring message from unknown source", Z);
          return;
        }
        let $ = JSONRPCMessageSchema.safeParse(Z.data);
        if ($.success) console.debug("Parsed message", $.data), this.onmessage?.($.data);
        else if (Z.data?.jsonrpc !== "2.0") console.debug("Ignoring non-JSON-RPC message", $.error.message, Z);
        else console.error("Failed to parse message", $.error.message, Z), this.onerror?.(Error("Invalid JSON-RPC message received: " + $.error.message));
      };
    }
    async start() {
      window.addEventListener("message", this.messageListener);
    }
    async send(X, Y) {
      if (X.method !== V) console.debug("Sending message", X);
      this.eventTarget.postMessage(X, "*");
    }
    async close() {
      window.removeEventListener("message", this.messageListener), this.onclose?.();
    }
  };
  var KX = [j];
  var DX = class extends _ {
    constructor(X, Y, Z, $) {
      super($);
      __publicField(this, "_client");
      __publicField(this, "_hostInfo");
      __publicField(this, "_capabilities");
      __publicField(this, "_appCapabilities");
      __publicField(this, "_hostContext", {});
      __publicField(this, "_appInfo");
      __publicField(this, "_initializedReceived", false);
      __publicField(this, "_baseReplaceRequestHandler", this.replaceRequestHandler);
      __publicField(this, "replaceRequestHandler", (X, Y) => {
        this._baseReplaceRequestHandler(X, (Z, $) => {
          if (!this._initializedReceived) console.warn(`[ext-apps] AppBridge received '${Z.method}' before ui/notifications/initialized. The View is calling host methods before completing the handshake; it should await app.connect() first.`);
          return Y(Z, $);
        });
      });
      __publicField(this, "eventSchemas", { sizechange: H, sandboxready: w, initialized: y, requestteardown: q, loggingmessage: LoggingMessageNotificationSchema });
      __publicField(this, "onping");
      __publicField(this, "_onmessage");
      __publicField(this, "_onopenlink");
      __publicField(this, "_ondownloadfile");
      __publicField(this, "_onrequestdisplaymode");
      __publicField(this, "_onupdatemodelcontext");
      __publicField(this, "_oncalltool");
      __publicField(this, "_onlistresources");
      __publicField(this, "_onlistresourcetemplates");
      __publicField(this, "_onreadresource");
      __publicField(this, "_onlistprompts");
      __publicField(this, "sendResourceTeardown", this.teardownResource);
      this._client = X;
      this._hostInfo = Y;
      this._capabilities = Z;
      this.addEventListener("initialized", () => {
        this._initializedReceived = true;
      }), this._hostContext = $?.hostContext || {}, this.setRequestHandler(u, (J) => this._oninitialize(J)), this.setRequestHandler(PingRequestSchema, (J, K) => {
        return this.onping?.(J.params, K), {};
      }), this.replaceRequestHandler(I, (J) => {
        return { mode: this._hostContext.displayMode ?? "inline" };
      });
    }
    getAppCapabilities() {
      return this._appCapabilities;
    }
    getAppVersion() {
      return this._appInfo;
    }
    get onsizechange() {
      return this.getEventHandler("sizechange");
    }
    set onsizechange(X) {
      this.setEventHandler("sizechange", X);
    }
    get onsandboxready() {
      return this.getEventHandler("sandboxready");
    }
    set onsandboxready(X) {
      this.setEventHandler("sandboxready", X);
    }
    get oninitialized() {
      return this.getEventHandler("initialized");
    }
    set oninitialized(X) {
      this.setEventHandler("initialized", X);
    }
    get onmessage() {
      return this._onmessage;
    }
    set onmessage(X) {
      this.warnIfRequestHandlerReplaced("onmessage", this._onmessage, X), this._onmessage = X, this.replaceRequestHandler(k, async (Y, Z) => {
        if (!this._onmessage) throw Error("No onmessage handler set");
        return this._onmessage(Y.params, Z);
      });
    }
    get onopenlink() {
      return this._onopenlink;
    }
    set onopenlink(X) {
      this.warnIfRequestHandlerReplaced("onopenlink", this._onopenlink, X), this._onopenlink = X, this.replaceRequestHandler(L, async (Y, Z) => {
        if (!this._onopenlink) throw Error("No onopenlink handler set");
        return this._onopenlink(Y.params, Z);
      });
    }
    get ondownloadfile() {
      return this._ondownloadfile;
    }
    set ondownloadfile(X) {
      this.warnIfRequestHandlerReplaced("ondownloadfile", this._ondownloadfile, X), this._ondownloadfile = X, this.replaceRequestHandler(f, async (Y, Z) => {
        if (!this._ondownloadfile) throw Error("No ondownloadfile handler set");
        return this._ondownloadfile(Y.params, Z);
      });
    }
    get onrequestteardown() {
      return this.getEventHandler("requestteardown");
    }
    set onrequestteardown(X) {
      this.setEventHandler("requestteardown", X);
    }
    get onrequestdisplaymode() {
      return this._onrequestdisplaymode;
    }
    set onrequestdisplaymode(X) {
      this.warnIfRequestHandlerReplaced("onrequestdisplaymode", this._onrequestdisplaymode, X), this._onrequestdisplaymode = X, this.replaceRequestHandler(I, async (Y, Z) => {
        if (!this._onrequestdisplaymode) throw Error("No onrequestdisplaymode handler set");
        return this._onrequestdisplaymode(Y.params, Z);
      });
    }
    get onloggingmessage() {
      return this.getEventHandler("loggingmessage");
    }
    set onloggingmessage(X) {
      this.setEventHandler("loggingmessage", X);
    }
    get onupdatemodelcontext() {
      return this._onupdatemodelcontext;
    }
    set onupdatemodelcontext(X) {
      this.warnIfRequestHandlerReplaced("onupdatemodelcontext", this._onupdatemodelcontext, X), this._onupdatemodelcontext = X, this.replaceRequestHandler(d, async (Y, Z) => {
        if (!this._onupdatemodelcontext) throw Error("No onupdatemodelcontext handler set");
        return this._onupdatemodelcontext(Y.params, Z);
      });
    }
    get oncalltool() {
      return this._oncalltool;
    }
    set oncalltool(X) {
      this.warnIfRequestHandlerReplaced("oncalltool", this._oncalltool, X), this._oncalltool = X, this.replaceRequestHandler(CallToolRequestSchema, async (Y, Z) => {
        if (!this._oncalltool) throw Error("No oncalltool handler set");
        return this._oncalltool(Y.params, Z);
      });
    }
    set oncreatesamplingmessage(X) {
      this.setRequestHandler(CreateMessageRequestSchema, async (Y, Z) => {
        return X(Y.params, Z);
      });
    }
    sendToolListChanged(X = {}) {
      return this.notification({ method: "notifications/tools/list_changed", params: X });
    }
    get onlistresources() {
      return this._onlistresources;
    }
    set onlistresources(X) {
      this.warnIfRequestHandlerReplaced("onlistresources", this._onlistresources, X), this._onlistresources = X, this.replaceRequestHandler(ListResourcesRequestSchema, async (Y, Z) => {
        if (!this._onlistresources) throw Error("No onlistresources handler set");
        return this._onlistresources(Y.params, Z);
      });
    }
    get onlistresourcetemplates() {
      return this._onlistresourcetemplates;
    }
    set onlistresourcetemplates(X) {
      this.warnIfRequestHandlerReplaced("onlistresourcetemplates", this._onlistresourcetemplates, X), this._onlistresourcetemplates = X, this.replaceRequestHandler(ListResourceTemplatesRequestSchema, async (Y, Z) => {
        if (!this._onlistresourcetemplates) throw Error("No onlistresourcetemplates handler set");
        return this._onlistresourcetemplates(Y.params, Z);
      });
    }
    get onreadresource() {
      return this._onreadresource;
    }
    set onreadresource(X) {
      this.warnIfRequestHandlerReplaced("onreadresource", this._onreadresource, X), this._onreadresource = X, this.replaceRequestHandler(ReadResourceRequestSchema, async (Y, Z) => {
        if (!this._onreadresource) throw Error("No onreadresource handler set");
        return this._onreadresource(Y.params, Z);
      });
    }
    sendResourceListChanged(X = {}) {
      return this.notification({ method: "notifications/resources/list_changed", params: X });
    }
    get onlistprompts() {
      return this._onlistprompts;
    }
    set onlistprompts(X) {
      this.warnIfRequestHandlerReplaced("onlistprompts", this._onlistprompts, X), this._onlistprompts = X, this.replaceRequestHandler(ListPromptsRequestSchema, async (Y, Z) => {
        if (!this._onlistprompts) throw Error("No onlistprompts handler set");
        return this._onlistprompts(Y.params, Z);
      });
    }
    sendPromptListChanged(X = {}) {
      return this.notification({ method: "notifications/prompts/list_changed", params: X });
    }
    assertCapabilityForMethod(X) {
    }
    assertRequestHandlerCapability(X) {
    }
    assertNotificationCapability(X) {
    }
    assertTaskCapability(X) {
      throw Error("Tasks are not supported in MCP Apps");
    }
    assertTaskHandlerCapability(X) {
      throw Error("Task handlers are not supported in MCP Apps");
    }
    getCapabilities() {
      return this._capabilities;
    }
    async _oninitialize(X) {
      let Y = X.params.protocolVersion;
      if (this._appInfo !== void 0) console.warn("[ext-apps] AppBridge received a second ui/initialize. The View may be double-mounting (e.g. React StrictMode in dev) without closing the previous App instance. Responding normally; the latest appInfo/appCapabilities replace the previous values.");
      return this._appCapabilities = X.params.appCapabilities, this._appInfo = X.params.appInfo, { protocolVersion: KX.includes(Y) ? Y : j, hostCapabilities: this.getCapabilities(), hostInfo: this._hostInfo, hostContext: this._hostContext };
    }
    setHostContext(X) {
      let Y = {}, Z = false;
      for (let $ of Object.keys(X)) {
        let J = this._hostContext[$], K = X[$];
        if (GX(J, K)) continue;
        Y[$] = K, Z = true;
      }
      if (Z) this._hostContext = X, this.sendHostContextChange(Y);
    }
    sendHostContextChange(X) {
      return this.notification({ method: "ui/notifications/host-context-changed", params: X });
    }
    sendToolInput(X) {
      return this.notification({ method: "ui/notifications/tool-input", params: X });
    }
    sendToolInputPartial(X) {
      return this.notification({ method: "ui/notifications/tool-input-partial", params: X });
    }
    sendToolResult(X) {
      return this.notification({ method: "ui/notifications/tool-result", params: X });
    }
    sendToolCancelled(X) {
      return this.notification({ method: "ui/notifications/tool-cancelled", params: X });
    }
    sendSandboxResourceReady(X) {
      return this.notification({ method: "ui/notifications/sandbox-resource-ready", params: X });
    }
    teardownResource(X, Y) {
      return this.request({ method: "ui/resource-teardown", params: X }, S, Y);
    }
    callTool(X, Y) {
      return this.request({ method: "tools/call", params: X }, CallToolResultSchema, Y);
    }
    listTools(X, Y) {
      return this.request({ method: "tools/list", params: X }, ListToolsResultSchema, Y);
    }
    async connect(X) {
      if (this.transport) throw Error("AppBridge is already connected. Call close() before connecting again.");
      if (this._initializedReceived = false, this._client) {
        let Y = this._client.getServerCapabilities();
        if (!Y) throw Error("Client server capabilities not available");
        if (Y.tools) {
          if (this.oncalltool = async (Z, $) => {
            return this._client.request({ method: "tools/call", params: Z }, CallToolResultSchema, { signal: $.signal });
          }, Y.tools.listChanged) this._client.setNotificationHandler(ToolListChangedNotificationSchema, (Z) => this.sendToolListChanged(Z.params));
        }
        if (Y.resources) {
          if (this.onlistresources = async (Z, $) => {
            return this._client.request({ method: "resources/list", params: Z }, ListResourcesResultSchema, { signal: $.signal });
          }, this.onlistresourcetemplates = async (Z, $) => {
            return this._client.request({ method: "resources/templates/list", params: Z }, ListResourceTemplatesResultSchema, { signal: $.signal });
          }, this.onreadresource = async (Z, $) => {
            return this._client.request({ method: "resources/read", params: Z }, ReadResourceResultSchema, { signal: $.signal });
          }, Y.resources.listChanged) this._client.setNotificationHandler(ResourceListChangedNotificationSchema, (Z) => this.sendResourceListChanged(Z.params));
        }
        if (Y.prompts) {
          if (this.onlistprompts = async (Z, $) => {
            return this._client.request({ method: "prompts/list", params: Z }, ListPromptsResultSchema, { signal: $.signal });
          }, Y.prompts.listChanged) this._client.setNotificationHandler(PromptListChangedNotificationSchema, (Z) => this.sendPromptListChanged(Z.params));
        }
      }
      return super.connect(X);
    }
  };
  function GX(X, Y) {
    return JSON.stringify(X) === JSON.stringify(Y);
  }

  // bridge/app-bridge-entry.js
  globalThis.McpAppsBridge = { AppBridge: DX, PostMessageTransport: E };
})();
