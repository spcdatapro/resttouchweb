'use strict'
import { merge } from 'lodash';
import GraphQLJSON from 'graphql-type-json';
import { typeDef as Organizacion, resolvers as organizacionResolvers } from './graphql/organizacion';
import { typeDef as Empresa, resolvers as empresaResolvers } from './graphql/empresa';
import { typeDef as Sede, resolvers as sedeResolvers } from './graphql/sede';
import { typeDef as Area, resolvers as areaResolvers } from './graphql/area';
import { typeDef as Mesa, resolvers as mesaResolvers } from './graphql/mesa';
import { typeDef as TipoTurno, resolvers as tipoTurnoResolvers } from './graphql/tipoturno';
import { typeDef as Turno, resolvers as turnoResolvers } from './graphql/turno';
import { typeDef as Caja, resolvers as cajaResolvers } from './graphql/caja';
import { typeDef as Puesto, resolvers as puestoResolvers } from './graphql/puesto';
import { typeDef as Empleado, resolvers as empleadoResolvers } from './graphql/empleado';
import { typeDef as Menu, resolvers as menuResolvers } from './graphql/menu';
import { typeDef as Usuario, resolvers as usuarioResolvers } from './graphql/usuario';

const 
express = require('express'), 
bodyParser = require('body-parser'), 
path = require('path'),
{ ApolloServer, gql } = require('apollo-server-express'),
{ makeExecutableSchema } = require('graphql-tools'),
{ GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date'),
cors = require('cors');

const 
Query = `scalar DateTime scalar JSON type Query {_empty: String}`, 
Mutation = `type Mutation { _ : Boolean }`;

const app = express();

//Middlewares de body-parser
app.use(cors(), bodyParser.json());

//const org_routes = require('./routes/organizacion'), empresa_routes = require('./routes/empresa');

//Rutas base
//app.use('/', express.static('rtclient', { redirect: false })); //Esta linea se descomenta solo para servidor de producción
// const apiUrlPre = '/api';

//GraphQL
const typeDefs = [
    Query, Mutation, Organizacion, Empresa, Sede, Area, Mesa, TipoTurno, Turno, Caja,
    Puesto, Empleado, Menu, Usuario
];

const resolvers = merge(
    { JSON: GraphQLJSON }, organizacionResolvers, empresaResolvers, sedeResolvers, areaResolvers, mesaResolvers, tipoTurnoResolvers, turnoResolvers, cajaResolvers,
    puestoResolvers, empleadoResolvers, menuResolvers, usuarioResolvers
);

const graphqlServer = new ApolloServer({typeDefs , resolvers});

graphqlServer.applyMiddleware({ app });

//app.use('/graphql', graphqlExpress({ schema }));
//app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//app.use(apiUrlPre, org_routes);
//app.use(apiUrlPre, empresa_routes);

module.exports = app;
