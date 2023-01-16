const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
// these declarations set the size and dimensions within the grid
    const cols = 4;
    const rows = 3;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const marginx = (width - gridw) * 0.5;
    const marginy = (height - gridh) * 0.5; //set margins around grid

  };
};

canvasSketch(sketch, settings);
