"use strict";

require("reflect-metadata");

var _cors = _interopRequireDefault(require("cors"));

var _csvParse = require("csv-parse");

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
const up = (0, _multer.default)({
  dest: './tmp'
});
app.post('/', up.single('csv'), (req, res) => {
  const {
    file
  } = req;
  return new Promise((resolve, reject) => {
    const dt = [];

    const stream = _fs.default.createReadStream(file.path);

    const parseFile = (0, _csvParse.parse)({
      delimiter: ';'
    });
    stream.pipe(parseFile);
    parseFile.on('data', line => {
      const [Nota, Dt_programação, MO, cidade, TLE] = line;
      dt.push({
        Nota,
        Dt_programação,
        MO,
        cidade,
        TLE
      });
    }).on('end', () => {
      resolve(res.json(dt));
    }).on('error', err => {
      reject(err);
    });
  });
});
app.listen(3332, () => console.log('server ok'));