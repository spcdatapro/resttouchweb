const AreaController = require('../controllers/area');
const CajaController = require('../controllers/caja');

export const typeDef = `
    extend type Query {
        cajas: [Caja]
        caja(_id: ID!): Caja
    }

    extend type Mutation{        
        createCaja(input: CreateCajaInput): Caja
        updateCaja(input: UpdateCajaInput): Caja
    }

    type Caja {
        _id: ID!
        numero: Int
        areas: [Area]
        debaja: Boolean        
    }

    input AreaInput{
        idarea: String
    }

    input CreateCajaInput{        
        numero: Int!
        areas: [AreaInput]
    }

    input UpdateCajaInput{
        id: String!
        numero: Int
        areas: [AreaInput]
        debaja: Boolean
    }
`;

const AreaCtrl = new AreaController();
const CajaCtrl = new CajaController();
export const resolvers = {
    Query: {
        cajas: () => {
            return CajaCtrl.list();
        },
    
        caja: (root, { _id }) => {
            return CajaCtrl.read(_id);
        }
    },
    Mutation:{
        createCaja: (root, { input }) => {
            return CajaCtrl.create(input);
        },
        updateTurno: (root, { input }) => {                        
            return CajaCtrl.update(input.id, input);
        }
    },
    Caja: {
        areas: (caja) => {
            const ids = caja.areas.map((c) => { return c.idarea; });            
            return AreaCtrl.filter({ _id: { $in: ids } });
        }
    }    
};