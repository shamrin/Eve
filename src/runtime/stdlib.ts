import {makeFunction, RawValue} from "./runtime";

//--------------------------------------------------------------------
// Comparisons
//--------------------------------------------------------------------

makeFunction({
  name: "compare/>",
  args: {a: "number", b: "number"},
  returns: {},
  apply: (a:number, b:number) => {
    return (a > b) ? [] : undefined;
  }
});

makeFunction({
  name: "compare/>=",
  args: {a: "number", b: "number"},
  returns: {},
  apply: (a:number, b:number) => {
    return (a >= b) ? [] : undefined;
  }
});

makeFunction({
  name: "compare/<",
  args: {a: "number", b: "number"},
  returns: {},
  apply: (a:number, b:number) => {
    return (a < b) ? [] : undefined;
  }
});

makeFunction({
  name: "compare/<=",
  args: {a: "number", b: "number"},
  returns: {},
  apply: (a:number, b:number) => {
    return (a <= b) ? [] : undefined;
  }
});

makeFunction({
  name: "compare/!=",
  args: {a: "number", b: "number"},
  returns: {},
  apply: (a:number, b:number) => {
    return (a != b) ? [] : undefined;
  }
});

makeFunction({
  name: "compare/==",
  args: {a: "number", b: "number"},
  returns: {},
  apply: (a:number, b:number) => {
    return (a == b) ? [] : undefined;
  }
});

//--------------------------------------------------------------------
// Math
//--------------------------------------------------------------------

makeFunction({
  name: "math/+",
  args: {a: "number", b: "number"},
  returns: {result: "number"},
  apply: (a:number, b:number) => {
    return [a + b];
  }
});

makeFunction({
  name: "math/-",
  args: {a: "number", b: "number"},
  returns: {result: "number"},
  apply: (a:number, b:number) => {
    return [a - b];
  }
});

makeFunction({
  name: "math/*",
  args: {a: "number", b: "number"},
  returns: {result: "number"},
  apply: (a:number, b:number) => {
    return [a * b];
  }
});

makeFunction({
  name: "math//",
  args: {a: "number", b: "number"},
  returns: {result: "number"},
  apply: (a:number, b:number) => {
    return [a / b];
  }
});

makeFunction({
  name: "math/floor",
  args: {a: "number"},
  returns: {result: "number"},
  apply: (a:number) => {
    return [Math.floor(a)];
  }
});

makeFunction({
  name: "math/ceil",
  args: {a: "number"},
  returns: {result: "number"},
  apply: (a:number) => {
    return [Math.ceil(a)];
  }
});

makeFunction({
  name: "math/round",
  args: {a: "number"},
  returns: {result: "number"},
  apply: (a:number) => {
    return [Math.round(a)];
  }
});

makeFunction({
  name: "math/sin",
  args: {a: "number"},
  returns: {result: "number"},
  apply: (a:number) => {
    return [Math.sin(a/180 * Math.PI)];
  }
});

makeFunction({
  name: "math/cos",
  args: {a: "number"},
  returns: {result: "number"},
  apply: (a:number) => {
    return [Math.cos(a/180 * Math.PI)];
  }
});

makeFunction({
  name: "math/tan",
  args: {a: "number"},
  returns: {result: "number"},
  apply: (a:number) => {
    return [Math.tan(a/180 * Math.PI)];
  }
});

makeFunction({
  name: "math/max",
  args: {a: "number", b: "number"},
  returns: {result: "number"},
  apply: (a:number, b:number) => {
    return [Math.max(a, b)];
  }
});

makeFunction({
  name: "math/min",
  args: {a: "number", b: "number"},
  returns: {result: "number"},
  apply: (a:number, b:number) => {
    return [Math.min(a, b)];
  }
});

makeFunction({
  name: "math/mod",
  args: {a: "number", b: "number"},
  returns: {result: "number"},
  apply: (a:number, b:number) => {
    return [a % b];
  }
});

makeFunction({
  name: "math/abs",
  args: {a: "number"},
  returns: {result: "number"},
  apply: (a:number) => {
    return [Math.abs(a)];
  }
});

makeFunction({
  name: "math/toFixed",
  args: {a: "number", b: "number"},
  returns: {result: "string"},
  apply: (a:number, b:number) => {
    return [a.toFixed(b)];
  }
});

//--------------------------------------------------------------------
// Random
//--------------------------------------------------------------------

makeFunction({
  name: "random/number",
  args: {seed: "any"},
  returns: {result: "number"},
  initialState: {},
  apply: function(seed:RawValue) {
    let state = this.state;
    let result = state[seed];
    if(result === undefined) {
      result = state[seed] = Math.random();
    }
    return [result];
  }
});


//--------------------------------------------------------------------
// Random
//--------------------------------------------------------------------

makeFunction({
  name: "string/startswith",
  args: {text: "string", substring: "string"},
  returns: {},
  apply: function(text:string, substring:string) {
    return (""+text).substr(0, substring.length) === substring ? [] : undefined;
  }
});

makeFunction({
  name: "string/substring",
  args: {text: "string", start: "number"},
  returns: {result: "string"},
  apply: function(text:string, start:number) {
    return [(""+text).substring(start)];
  }
});

//--------------------------------------------------------------------
// Eve internal
//--------------------------------------------------------------------

makeFunction({
  name: "eve/internal/gen-id",
  args: {},
  variadic: true,
  returns: {result: "string"},
  apply: (values:RawValue[]) => {
    // @FIXME: This is going to be busted in subtle cases.
    //   If a record exists with a "1" and 1 value for the same
    //   attribute, they'll collapse for gen-id, but won't join
    //   elsewhere.  This means aggregate cardinality will disagree with
    //   action node cardinality.
    return [values.join("|")];
  }
});

makeFunction({
  name: "eve/internal/concat",
  args: {},
  variadic: true,
  returns: {result: "string"},
  apply: (values:RawValue[]) => {
    return [values.join("")];
  }
});
