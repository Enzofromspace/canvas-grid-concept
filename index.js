const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math')
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};
//adding code for tweakpane util
const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
// these declarations set the size and dimensions within the grid
    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const marginx = (width - gridw) * 0.5;
    const marginy = (height - gridh) * 0.5; //set margins around grid

    for (let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;
      // add noise
      //const n = random.noise2D(x + frame * 10,y, params.freq);
      const n = random.noise3D(x, y, frame * 10, params.freq);

      const angle = n * Math.PI * params.amp;
      //const scale = (n + 1) / 2 * 30; option to scale without math util
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
      //set position in cell
      context.save();
      context.translate(x,y);
      context.translate(marginx, marginy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth =  scale;
      //start the line drawing
      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: 'grid'});
  folder.addInput(params, 'cols', {min: 2, max: 50, step: 1});
  folder.addInput(params, 'rows', {min: 2, max: 50, step: 1});
  folder.addInput(params, 'scaleMin', {min: 1, max: 100});
  folder.addInput(params, 'scaleMax', {min: 1, max: 100});

  folder = pane.addFolder({title: 'Noise'});
  folder.addInput(params, 'freq', {min: -0.01, max: 0.01});
  folder.addInput(params, 'amp', {min: 0, max: 1});
};

createPane();
canvasSketch(sketch, settings);
