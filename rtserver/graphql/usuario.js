const UsuarioController = require('../controllers/usuario');

export const typeDef = `
    extend type Query {
        usuarios: [Usuario]
        usuario(_id: ID!): Usuario
    }

    extend type Mutation{        
        createUsuario(input: CreateUsuarioInput): Usuario
        updateUsuario(input: UpdateUsuarioInput): Usuario
    }

    type Permiso {
        idmenu: String!
        c: Boolean
        r: Boolean
        u: Boolean
        d: Boolean
    }

    type Usuario {
        _id: ID!
        empleado: Empleado
        usuario: String
        sedes: [Sede]
        permisos: [Permiso]
        debaja: Boolean
    }

    input SedeInput{
        idsede: String!
    }

    input PermisoInput {
        idmenu: String!
        c: Boolean
        r: Boolean
        u: Boolean
        d: Boolean
    }

    input CreateUsuarioInput{
        idempleado: String
        usuario: String!
        contrasenia: String!
        sedes: [SedeInput]
        permisos: [PermisoInput]
    }

    input UpdateUsuarioInput{
        id: String!
        usuario: String
        contrasenia: String
        sedes: [SedeInput]
        permisos: [PermisoInput]
        debaja: Boolean
    }
`;

const UsuarioCtrl = new UsuarioController();
export const resolvers = {
    Query: {
        usuarios: () => {
            return UsuarioCtrl.list();
        },
    
        usuario: (root, { _id }) => {
            return UsuarioCtrl.read(_id);
        }
    },
    Mutation:{
        createUsuario: (root, { input }) => {            
            return UsuarioCtrl.create(input);
        },
        updateUsuario: (root, { input }) => {            
            return UsuarioCtrl.update(input.id, input);
        }
    }
};