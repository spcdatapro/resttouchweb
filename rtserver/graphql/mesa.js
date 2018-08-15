const AreaController = require('../controllers/area');
const MesaController = require('../controllers/mesa');

export const typeDef = `
    extend type Query {
        mesas: [Mesa]
        mesa(_id: ID!): Mesa
    }

    extend type Mutation {
        createMesa(input: CreateMesaInput): Mesa
        updateMesa(input: UpdateMesaInput): Mesa        
    }
    
    type PosicionXY {
        x: Float
        y: Float
    }

    type Mesa {
        _id: ID!
        area: Area
        numero: Int        
        sillas: Int
        posicion: PosicionXY
        debaja: Boolean
    }        

    input PosicionXYInput {
        x: Float
        y: Float
    }

    input CreateMesaInput {
        idarea: String!
        numero: Int!
        sillas: Int
        posicion: PosicionXYInput
    }

    input UpdateMesaInput {
        id: String!
        numero: Int
        sillas: Int       
        posicion: PosicionXYInput 
        debaja: Boolean
    }    
`;

const AreaCtrl = new AreaController();
const MesaCtrl = new MesaController();

export const resolvers = {
    Query: {
        mesas: () => {
            return MesaCtrl.list();
        },
    
        mesa: (root, { _id }) => {
            return MesaCtrl.read(_id);
        }        
    },
    Mutation: {
        createMesa: (root, { input }) => {
            return MesaCtrl.create(input);
        },
        updateMesa: (root, { input }) => {
            return MesaCtrl.update(input.id, input);
        }
    },
    Mesa: {    
        area: (mesa) => {
            return AreaCtrl.read(mesa.idarea);
        }
    }
};