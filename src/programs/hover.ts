import {Program} from "../runtime/dsl2";
import "../watchers/system";

let prog = new Program("hover");
prog.attach("system");
prog.attach("html");

prog
  .block("Top level div", ({find, record}) => {
    let main = find("main");

    return [
      main.add("children", [
        record("html/style")
          .add("text", `
            div { width: 100px; height: 100px; margin: 25px; }
            .cause { background-color: #75507b; opacity: 0; }
            .effect { background-color: #8f5902; opacity: 0; }
            .visible { opacity: 1; }
          `),
        record("html/div", {sort: 0})
          .add("class", "cause")
          .add("class", "visible")
          .add("on", "dblclick")
          .add("on", "mouseenter")
          .add("on", "mouseleave")
          .add("tag", "cause"),
        record("html/div", {sort: 1})
          .add("class", "effect")
          .add("tag", "effect"),
      ])
    ];
  });

prog
  .commit("mouseenter", ({find, record}) => {
    let elem = find("effect");
    let event = find("dom/event", {event: "mouseenter"});
    return [
      elem.add("class", "visible")
    ];
  });

prog
  .commit("mouseleave", ({find, record}) => {
    let elem = find("effect");
    let event = find("dom/event", {event: "mouseleave"});
    return [
      elem.remove("class", "visible")
    ];
  });

prog
  .commit("dblclick", ({find, record}) => {
    // change the following to find("effect"), and block will start working
    let elem = find("cause");
    let event = find("dom/event", {event: "dblclick"});
    return [
      elem.remove("class", "visible")
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


prog.inputEavs([ [1, "tag", "main"] ]);
