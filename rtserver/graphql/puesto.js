const PuestoController = require('../controllers/puesto');
const EmpleadoController = require('../controllers/empleado');

export const typeDef = `
    extend type Query {
        puestos: [Puesto]
        puesto(_id: ID!): Puesto
    }

    extend type Mutation{        
        createPuesto(input: CreatePuestoInput): Puesto
        updatePuesto(input: UpdatePuestoInput): Puesto
    }

    type Puesto {
        _id: ID!
        nombre: String     
        empleados: [Empleado]   
        debaja: Boolean
    }

    input CreatePuestoInput{
        nombre: String!
    }

    input UpdatePuestoInput{
        id: String!
        nombre: String
        debaja: Boolean
    }
`;

const PuestoCtrl = new PuestoController();
const EmpleadoCtrl = new EmpleadoController();
export const resolvers = {
    Query: {
        puestos: () => {
            return PuestoCtrl.list();
        },
    
        puesto: (root, { _id }) => {
            return PuestoCtrl.read(_id);
        }
    },
    Mutation:{
        createPuesto: (root, { input }) => {
            return PuestoCtrl.create(input);
        },
        updatePuesto: (root, { input }) => {
            return PuestoCtrl.update(input.id, input);
        }
    },
    Puesto:{
        empleados: (puesto) =>{
            return EmpleadoCtrl.filter({ idpuesto: puesto._id });
        }
    }
};