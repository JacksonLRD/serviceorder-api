import { env } from 'process';

import mongoose from 'mongoose';

import AppError from '../../errors/AppError';

const { MONGO_CONNECTION_STRING } = env;
if (!MONGO_CONNECTION_STRING) throw new AppError('missing MONGO_CONNECTION_STRING env', 400);

export const connect = async (): Promise<void> => {
  console.log('conner');
  await mongoose.connect(MONGO_CONNECTION_STRING);
};

export const close = async (): Promise<void> => {
  console.log('discconner');

  await mongoose.connection.close();
};

// class Database {
//   private connection: any;

//   constructor() {
//     this.mongo();
//   }

//   getConnection() {
//     return this.connection;
//   }

//   mongo() {
//     if (!process.env.MONGO_CONNECTION_STRING)
//       throw new Error('Necessário configurar conexão com banco de dados');

//     console.log('Conectando no Mongo:', process.env.MONGO_CONNECTION_STRING);
//     this.connection = mongoose.connect(
//       process.env.MONGO_CONNECTION_STRING,
//       {
//         useNewUrlParser: true,
//         useFindAndModify: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//       },
//       function (err: any) {
//         if (err) {
//           console.log('Erro conectando no Mongo:', err.reason);
//           throw err;
//         }
//         console.log('Conectado no Mongo!');
//       }
//     );
//   }
// }
