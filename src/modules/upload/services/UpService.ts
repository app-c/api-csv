// import { parse } from 'csv-parse';
// import { IDados } from 'dtos';
// import fs from 'fs';

// import { DadosRepository } from '../repositories';

// export class UpCsvService {
//    private dados: IDados[];

//    constructor() {
//       this.dados = [];
//    }

//    async load(file: Express.Multer.File): Promise<IDados[]> {
//       return new Promise((resolve, reject) => {
//          const stream = fs.createReadStream(file.path);
//          const parseFile = parse({});

//          stream.pipe(parseFile);

//          parseFile
//             .on('data', line => {
//                const [código, descricao, classificacao, valor, ged, ft, item] =
//                   line;
//                this.dados.push({
//                   código,
//                   descricao,
//                   classificacao,
//                   valor,
//                   ged,
//                   ft,
//                   item,
//                });
//             })
//             .on('end', () => {
//                resolve(this.dados);
//             })
//             .on('error', err => {
//                reject(err);
//             });
//       });
//    }

//    async execute(file: Express.Multer.File): Promise<IDados[]> {
//       const cat = await this.load(file);
//       console.log(cat);

//       return cat;
//    }
// }
