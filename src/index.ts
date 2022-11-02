/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reflect-metadata';
import { parse } from 'csv-parse';
import expres from 'express';
import fs from 'fs';
import multer from 'multer';
import * as uid from 'uuidv4';

const app = expres();

app.use(expres.json());

const dt: any[] = [];
const up = multer({
   dest: './tmp',
});

app.post('/', up.single('csv'), (req, res) => {
   const { file } = req;
   return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file!.path);
      const parseFile = parse({ delimiter: ';' });

      stream.pipe(parseFile);

      parseFile
         .on('data', line => {
            const [matricula, nome, demon, cargo, equipe] = line;
            dt.push({
               matricula,
               nome,
               demon,
               cargo,
               equipe,
               mobilidade: false,
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

app.listen(3333, () => console.log('server ok'));
