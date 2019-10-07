/*
 * dam-plus-widgets-web.js and erratic-turtle.js should be loaded before this.
 * After this is loaded, call launch() to start the gewgaw.
 */

function launch(config) {
  var div=DAM.maker('div'), button=DAM.maker('button'), canvas=DAM.maker('canvas');

  var can = canvas({ width: 1000, height: 400 });
  config.container.appendChild(can);

  var gewgaw = (new ErraticTurtle()).init({ canvas: can });
  gewgaw.reset();
  var method = 'drawLines';
  gewgaw[method]();

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
          }
        ],
        onchange: function(option) {
          method = option.value;
          gewgaw.reset();
          gewgaw[method]();
        }
      })
    ),
    div(
      button("Re-roll", { onclick: function() { gewgaw.reset(); gewgaw[method](); }})
    )
  );
  config.container.appendChild(controlPanel);
}
