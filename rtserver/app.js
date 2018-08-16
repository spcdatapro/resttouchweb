'use strict'
import { merge } from 'lodash';
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

const 
express = require('express'), 
bodyParser = require('body-parser'), 
path = require('path'),
{ graphqlExpress, graphiqlExpress } = require('apollo-server-express'),
{ makeExecutableSchema } = require('graphql-tools'),
{ GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date');

const 
Query = `scalar DateTime type Query {_empty: String}`, 
Mutation = `type Mutation { _ : Boolean }`,
resolvers = {};
const schema = makeExecutableSchema({
    typeDefs: [
        Query, Mutation, Organizacion, Empresa, Sede, Area, Mesa, TipoTurno, Turno, Caja,
        Puesto, Empleado, Menu
    ], 
    resolvers: merge(
        resolvers, organizacionResolvers, empresaResolvers, sedeResolvers, areaResolvers, mesaResolvers, tipoTurnoResolvers, turnoResolvers, cajaResolvers,
        puestoResolvers, empleadoResolvers, menuResolvers
    )
});

const app = express();

//Middlewares de body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const org_routes = require('./routes/organizacion'), empresa_routes = require('./routes/empresa');

//Configuración de cabeceras y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas base
//app.use('/', express.static('rtclient', { redirect: false })); //Esta linea se descomenta solo para servidor de producción
const apiUrlPre = '/api';

//GraphQL
app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use(apiUrlPre, org_routes);
app.use(apiUrlPre, empresa_routes);

module.exports = app;
