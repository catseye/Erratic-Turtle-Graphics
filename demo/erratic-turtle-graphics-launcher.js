/*
 * dam-plus-widgets-web.js, erratic-turtle.js, and erratic-logo.js should be loaded before this.
 * After this is loaded, call launch() to start the gewgaw.
 */

function launch(config) {
  var div=DAM.maker('div'), button=DAM.maker('button'), canvas=DAM.maker('canvas');

  var can = canvas({ width: 1000, height: 400 });
  config.container.appendChild(can);

  var turtle = (new ErraticTurtle()).init({ canvas: can });
  var program = "seterr 0 0 setxyp 0.125 0.5 lt 90 repeat 7 [ repeat 50 [ fd 150 lt 180 ] shiftxyp 0.125 0.0 shifterr 0.01 2.0 ]";

  function run() {
    turtle.reset();
    var p = (new Parser()).init(program);
    var i = p.parseInstrs();
    console.log(uneval(i));
    interpretInstrs(i, turtle);
  }

  run();

  var controlPanel = div(
    div(
      DAM.makeSelect({
        title: "Form",
        options: [
          {
            text: 'Lines',
            value: "seterr 0 0 setxyp 0.125 0.5 lt 90 repeat 7 [ repeat 50 [ fd 150 lt 180 ] shiftxyp 0.125 0.0 shifterr 0.01 2.0 ]"
          },
          {
            text: 'Boxes',
            value: "seterr 0 0 setxyp 0.125 0.666 lt 90 repeat 7 [ repeat 400 [ fd 50 lt 90 ] shiftxyp 0.125 0.0 shifterr 0.01 2.0 ]"
          },
          {
            text: 'Circles',
            value: "seterr 0 0 setxyp 0.125 0.666 lt 90 repeat 7 [ repeat 4500 [ fd 1.0 lt 4 ] shiftxyp 0.125 0.0 shifterr 0.025 0.333 ]"
          },
          {
            text: 'Circle Chain',
            value: "seterr 0 0 setxyp 1.0 0.5 lt 90 repeat 7 [ repeat 1845 [ fd 2.0 lt 4 ] lt 180 shifterr 0.025 1.5 ] repeat 7 [ repeat 1845 [ fd 2.0 lt 4 ] lt 180 shifterr -0.025 -1.5 ]"
          }
        ],
        onchange: function(option) {
          program = option.value;
          run();
        }
      })
    ),
    div(
      button("Re-roll", { onclick: function() { run(); }})
    )
  );
  config.container.appendChild(controlPanel);
}
