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
        record("h", {tagname: "style"})
          .add("text", `
            .eventer {background-color: #75507b;  width: 100px; height: 100px; margin: 25px; }
            .log {
              height: calc(100% - 200px); overflow: scroll; width: 500px;
              border: 1px solid #aaa; margin: 25px;
            }
            .input { width: 500px; margin: 0 25px 0 25px; }
          `),
        record("h", {tagname: "div", sort: 0, class: "eventer", on: [
          "mouseenter",
          "mouseleave",
          "dblclick",
          "click",
        ]}),
        record("h", {tagname: "input", sort: 1, class: "input", on: [
          "input",
          "focus",
          "blur",
        ]}),
        record("h", "log", {tagname: "div", sort: 2, class: "log"}),
      ])
    ];
  });

prog
  .commit("event handler", ({find, record}) => {
    let log = find("log");
    let event = find("dom/event");
    return [
      log.add("children", [
        record("h", {tagname: "div", event})
          .add("text", `${event.event} on <${event.element.tagname}>`),
      ])
    ];
  });

prog
  .block("Translate elements into html", ({find, record}) => {
    let elem = find("h");
    return [elem.add("tag", "html/element")];
  })

prog.inputEavs([ [1, "tag", "main"] ]);
