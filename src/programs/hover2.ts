import {Program} from "../runtime/dsl2";
import "../watchers/system";

let prog = new Program("hover2");
prog.attach("system");
prog.attach("html");

prog
  .block("Top level div", ({find, record}) => {
    let main = find("main");

    return [
      main.add("children", [
        record("html/style")
          .add("text", `
            .effect, .cause { width: 100px; height: 100px; margin: 25px; }
            .effect.visible { opacity: 1; }
            .cause { background-color: #75507b; }
            .effect { background-color: #8f5902; opacity: 0; }
          `),
        record("html/div", {sort: 0})
          .add("class", "cause")
          .add("tag", "html/onmouseenter")
          .add("tag", "html/onmouseleave"),
        record("html/div", {sort: 1})
          .add("class", "effect")
          .add("tag", "effect")
          .add("tag", "html/onmouseenter")
          .add("tag", "html/onmouseleave")
      ])
    ];
  });

// prog
//   .block("debug", ({find, record}) => {
//     let main = find("main");
//     let expiration = find("expiration");
//     let timer = find("timer");
//
//     return [
//       main.add("children", [
//         record("html/div", {sort: -100})
//           .add("text", "expiration.time: " + expiration.time),
//         record("html/div", {sort: -99})
//           .add("text", "timer: " + timer.timestamp),
//       ])
//     ];
//   });

prog
  .commit("record expiration time on mouseenter", ({find, record}) => {
    let event = find("html/event/mouseenter");
    let expiration = find("expiration");
    return [
      expiration.remove("time").add("time", Infinity)
    ];
  });

prog
  .commit("record expiration time on mouseleave", ({find, record}) => {
    let event = find("html/event/mouseleave");
    let expiration = find("expiration");
    let timer = find("timer");
    return [
      expiration.remove("time").add("time", timer.timestamp + 100)
    ];
  });

prog
  .block("show #effect before time is expired", ({find, record}) => {
    let effect = find("effect");
    let timer = find("timer");
    let expiration = find("expiration");
    timer.timestamp < expiration.time;
    return [
      effect.add("class", "visible")
    ];
  });

prog
  .block("Translate elements into html", ({find, record}) => {
    let elem = find("html/div");
    return [elem.add("tag", "html/element").add("tagname", "div")];
  })
  .block("Translate elements into html", ({find, record}) => {
    let elem = find("html/style");
    return [elem.add("tag", "html/element").add("tagname", "style")];
  });

prog.inputEavs([
  [1, "tag", "system/timer"],
  [1, "tag", "timer"],
  [1, "resolution", 33.333333333333],

  [3, "tag", "main"],

  [4, "tag", "expiration"],
  [4, "time", 0],
]);
