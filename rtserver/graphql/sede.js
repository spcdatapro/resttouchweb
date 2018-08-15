const EmpresaController = require('../controllers/empresa');
const SedeController = require('../controllers/sede');
const AreaController = require('../controllers/area');

export const typeDef = `
    extend type Query {
        sedes: [Sede]
        sede(_id: ID!): Sede
    }

    extend type Mutation {
        createSede(input: CreateSedeInput): Sede
        updateSede(input: UpdateSedeInput): Sede        
    }

    type Sede {
        _id: ID!
        empresa: Empresa
        nombre: String      
        areas: [Area]
        debaja: Boolean
    }

    input CreateSedeInput {
        idempresa:String!
        nombre: String!
    }

    input UpdateSedeInput {
        id: String!
        nombre: String        
        debaja: Boolean
    }
`;

const EmpresaCtrl = new EmpresaController();
const SedeCtrl = new SedeController();
const AreaCtrl = new AreaController();

export const resolvers = {
    Query: {
        sedes: () => {
            return SedeCtrl.list();
        },
    
        sede: (root, { _id }) => {
            return SedeCtrl.read(_id);
        }        
    },
    Mutation: {
        createSede: (root, { input }) => {
            return SedeCtrl.create(input);
        },
        updateSede: (root, { input }) => {
            return SedeCtrl.update(input.id, input);
        }
    },
    Sede: {    
        empresa: (sede) => {
            return EmpresaCtrl.read(sede.idempresa);
        },
        areas: (sede) => {
            return AreaCtrl.filter({ idsede: sede._id });
        }
    }
};