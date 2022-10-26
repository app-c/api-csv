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
            const [
               Nota,
               Tipo,
               Descricao_da_nota,
               TAM,
               Depart,
               Divisão,
               Bop,
               Cidade,
               Distribuidora,
               Fábrica,
               Status,
               Código,
               Texto_cod_medida,
               Texto_das_medidas,
               Dt_Criação,
               Dt_programação,
               Local_inst,
               Lati,
               Long,
               Alimentador,
               Conjunto_elétrico,
               Qtde_clientes,
               CHI_max,
               Obra_livre,
               Nota_pai,
               Possui_DI,
               Num_DI,
               Possui_viab,
               Data_viab,
               Dt_Empreita,
               Mês_empreita,
               Ano_empreita,
               Km,
               MO,
               CAPEX,
               equipe,
            ] = line;
            dt.push({
               Nota,
               Tipo,
               Descricao_da_nota,
               TAM,
               Depart,
               Divisão,
               Bop,
               Cidade,
               Distribuidora,
               Fábrica,
               Status,
               Código,
               Texto_cod_medida,
               Texto_das_medidas,
               Dt_Criação,
               Dt_programação,
               Local_inst,
               Lati,
               Long,
               Alimentador,
               Conjunto_elétrico,
               Qtde_clientes,
               CHI_max,
               Obra_livre,
               Nota_pai,
               Possui_DI,
               Num_DI,
               Possui_viab,
               Data_viab,
               Dt_Empreita,
               Mês_empreita,
               Ano_empreita,
               Km,
               MO,
               CAPEX,
               equipe,
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
