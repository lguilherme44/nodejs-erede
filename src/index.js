import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/* Rota / Recurso*/

/**
 * Metodos HTTP
 *
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar/Atualizar uma informação no back-end
 * Delete: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros
 *
 * Query Params: Parâmetros nomeados enviados na rota após o simbolo de "?" (Filtros, Paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body:
 */

/**
 *
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 *
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where('')
 */

app.listen(3333);
