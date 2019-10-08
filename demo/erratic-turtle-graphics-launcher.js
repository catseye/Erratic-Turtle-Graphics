/*
 * dam-plus-widgets-web.js, erratic-turtle.js, and erratic-logo.js should be loaded before this.
 * After this is loaded, call launch() to start the gewgaw.
 */

function launch(config) {
  var div=DAM.maker('div'), button=DAM.maker('button'), canvas=DAM.maker('canvas');

  var can = canvas({ width: 1000, height: 400 });
  config.container.appendChild(can);

  var turtle = (new ErraticTurtle()).init({ canvas: can });
  turtle.reset();
  var method = 'drawLines';
  turtle[method]();

  var controlPanel = div(
    div(
      DAM.makeSelect({
        title: "Form",
        options: [
          {
            text: 'Lines',
            value: 'drawLines',
          },
          {
            text: 'Boxes',
            value: 'drawBoxes',
          },
          {
            text: 'Circles',
            value: 'drawCircles',
          },
          {
            text: 'Circle Chain',
            value: 'drawCircleChain',
          },
          {
            text: 'Logo',
            value: 'logo',
            program: "setxyp 0.125 0.5 lt 90 repeat 7 [ repeat 50 [ fd 150 lt 180 ] shiftxyp 0.125 0.0 ]"
          }
        ],
        onchange: function(option) {
          method = option.value;
          turtle.reset();
          if (method === 'logo') {
            var p = (new Parser()).init(option.program);
            var i = p.parseInstrs();
            console.log(uneval(i));
            interpretInstrs(i, turtle);
          } else {
            turtle[method]();
          }
        }
      })
    ),
    div(
      button("Re-roll", { onclick: function() { turtle.reset(); turtle[method](); }})
    )
  );
  config.container.appendChild(controlPanel);
}
