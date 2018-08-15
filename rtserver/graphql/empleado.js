const PuestoController = require('../controllers/puesto');
const EmpleadoController = require('../controllers/empleado');

export const typeDef = `
    extend type Query {
        empleados: [Empleado]
        empleado(_id: ID!): Empleado
    }

    extend type Mutation{        
        createEmpleado(input: CreateEmpleadoInput): Empleado
        updateEmpleado(input: UpdateEmpleadoInput): Empleado
    }

    type Empleado {
        _id: ID!
        puesto: Puesto
        nombre: String        
        apellido: String
        debaja: Boolean
    }

    input CreateEmpleadoInput{
        idpuesto: String!
        nombre: String!
        apellido: String!
    }

    input UpdateEmpleadoInput{
        id: String!
        idpuesto: String        
        nombre: String
        apellido: String
        debaja: Boolean
    }
`;

const PuestoCtrl = new PuestoController();
const EmpleadoCtrl = new EmpleadoController();
export const resolvers = {
    Query: {
        empleados: () => {
            return EmpleadoCtrl.list();
        },
    
        empleado: (root, { _id }) => {
            return EmpleadoCtrl.read(_id);
        }
    },
    Mutation:{
        createEmpleado: (root, { input }) => {
            return EmpleadoCtrl.create(input);
        },
        updateEmpleado: (root, { input }) => {
            return EmpleadoCtrl.update(input.id, input);
        }
    },
    Empleado:{
        puesto: (empleado) => {
            return PuestoCtrl.read(empleado.idpuesto);
        }
    }
};