/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reflect-metadata';
import cors from 'cors';
import { parse } from 'csv-parse';
import expres from 'express';
import fs from 'fs';
import multer from 'multer';
import * as uid from 'uuidv4';

const app = expres();

app.use(expres.json());
app.use(cors());

const up = multer({
   dest: './tmp',
});

app.post('/', up.single('csv'), (req, res) => {
   const { file } = req;
   return new Promise((resolve, reject) => {
      const dt: any[] = [];
      const stream = fs.createReadStream(file!.path);
      const parseFile = parse({ delimiter: ';' });

      stream.pipe(parseFile);

      parseFile
         .on('data', line => {
            const [Nota, Dt_programação, MO, cidade, TLE] = line;
            dt.push({
               Nota,
               Dt_programação,
               MO,
               cidade,
               TLE,
            });
         })
         .on('end', () => {
            resolve(res.json(dt));
         })
         .on('error', err => {
            reject(err);
         });
   });
});

app.listen(3332, () => console.log('server ok'));
