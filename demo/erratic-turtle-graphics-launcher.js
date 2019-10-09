/*
 * dam-plus-widgets-web.js, erratic-turtle.js, and erratic-logo.js should be loaded before this.
 * After this is loaded, call launch() to start the gewgaw.
 */

function launch(config) {
  var div=DAM.maker('div'), button=DAM.maker('button'), textarea=DAM.maker('textarea'), canvas=DAM.maker('canvas');

  var can = canvas({ width: 1000, height: 400 });
  config.container.appendChild(can);

  var turtle = (new ErraticTurtle()).init({ canvas: can });
  var options = [
    {
      text: 'Lines',
      value: "setxyp 0.125 0.666 repeat 7 [ repeat 50 [ fd 150 lt 180 ] shiftxyp 0.125 0.0 shifterr 0.00375 0.3 ]"
    },
    {
      text: 'Boxes',
      value: "setxyp 0.125 0.666 repeat 7 [ repeat 400 [ fd 50 lt 90 ] shiftxyp 0.125 0.0 shifterr 0.0015 0.3 ]"
    },
    {
      text: 'Circles',
      value: "setxyp 0.125 0.5 repeat 7 [ repeat 4500 [ fd 1.0 lt 4 ] shiftxyp 0.125 0.0 shifterr 0.00375 0.05 ]"
    },
    {
      text: 'Stars',
      value: "setxyp 0.125 0.666 lt 18 repeat 7 [ repeat 500 [ fd 150 lt 144 ] shiftxyp 0.125 0.0 shifterr 0.00375 0.3 ]"
    },
    {
      text: 'Chain',
      value: "setxyp 1.0 0.5 repeat 7 [ repeat 1845 [ fd 2.0 lt 4 ] lt 180 shifterr 0.00375 0.225 ] repeat 7 [ repeat 1845 [ fd 2.0 lt 4 ] lt 180 shifterr -0.00375 -0.225 ]"
    }
  ];
  var program = options[0].value;

  function run() {
    turtle.reset();
    var p = (new Parser()).init(program);
    var i = p.parseInstrs();
    interpretInstrs(i, turtle);
  }

  var programTextarea = textarea({ rows: 4, cols: 80 }, program);
  var controlPanel = div(
    div(
      DAM.makeSelect({
        title: "Form",
        options: options,
        onchange: function(option) {
          program = option.value;
          programTextarea.innerHTML = program;
          run();
        }
      })
    ),
    div(
      programTextarea
    ),
    div(
      button("Run", {
        onclick: function() {
          program = programTextarea.value;
          program = run();
        }
      })
    )
  );
  config.container.appendChild(controlPanel);

  run();
}
