const TipoTurnoController = require('../controllers/tipoturno');

export const typeDef = `
    extend type Query {
        tiposturno: [TipoTurno]
        tipoturno(_id: ID!): TipoTurno
    }

    extend type Mutation{        
        createTipoTurno(input: CreateTipoTurnoInput): TipoTurno
        updateTipoTurno(input: UpdateTipoTurnoInput): TipoTurno
    }

    type TipoTurno {
        _id: ID!
        nombre: String
        debaja: Boolean        
    }

    input CreateTipoTurnoInput{
        nombre: String!
    }

    input UpdateTipoTurnoInput{
        id: String!
        nombre: String
        debaja: Boolean
    }
`;

const TipoTurnoCtrl = new TipoTurnoController();
export const resolvers = {
    Query: {
        tiposturno: () => {
            return TipoTurnoCtrl.list();
        },
    
        tipoturno: (root, { _id }) => {
            return TipoTurnoCtrl.read(_id);
        }
    },
    Mutation:{
        createTipoTurno: (root, { input }) => {
            return TipoTurnoCtrl.create(input);
        },
        updateTipoTurno: (root, { input }) => {
            return TipoTurnoCtrl.update(input.id, input);
        }
    }
};