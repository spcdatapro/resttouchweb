const UsuarioController = require('../controllers/usuario');
const EmpleadoController = require('../controllers/empleado');
const SedeController = require('../controllers/sede');
const MenuController = require('../controllers/menu');

export const typeDef = `
    extend type Query {
        usuarios: [Usuario]
        usuario(_id: ID!): Usuario
        login(usr: String!, pwd: String!): UsuarioValido
    }

    extend type Mutation{        
        createUsuario(input: CreateUsuarioInput): Usuario
        updateUsuario(input: UpdateUsuarioInput): Usuario
    }

    type Permiso {
        menu: Menu
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

    type UsuarioValido {
        _id: ID!
        nombre: String
        apellido: String
        usuario: String!
        token: String!
        logeado: Boolean!
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
        idempleado: String
        usuario: String
        contrasenia: String
        sedes: [SedeInput]
        permisos: [PermisoInput]
        debaja: Boolean
    }
`;

const UsuarioCtrl = new UsuarioController();
const EmpleadoCtrl = new EmpleadoController();
const SedeCtrl = new SedeController();
const MenuCtrl = new MenuController();
const bcrypt = require('bcrypt-nodejs');
export const resolvers = {
    Query: {
        usuarios: () => {
            return UsuarioCtrl.list();
        },
    
        usuario: (root, { _id }) => {
            return UsuarioCtrl.read(_id);
        },
        login: (root, { usr, pwd }) => {
            return UsuarioCtrl.login(usr, pwd);
        }
    },
    Mutation:{
        createUsuario: (root, { input }) => {
            input.usuario = input.usuario.trim().toLowerCase();
            input.contrasenia = bcrypt.hashSync(input.contrasenia);
            return UsuarioCtrl.create(input);
        },
        updateUsuario: (root, { input }) => {
            if(input.usuario !== null && input.usuario !== undefined){
                if(input.usuario.trim() !== ''){
                    input.usuario = input.usuario.trim().toLowerCase();
                }else{
                    delete input.usuario;
                }
            }

            if(input.contrasenia !== null && input.contrasenia !== undefined){                
                if(input.contrasenia.trim() !== ''){                    
                    input.contrasenia = bcrypt.hashSync(input.contrasenia);
                }else{
                    delete input.contrasenia;                    
                }
            }
            return UsuarioCtrl.update(input.id, input);
        }
    },
    Usuario: {
        empleado: (usuario) => {
            return EmpleadoCtrl.read(usuario.idempleado);
        },
        sedes: (usuario) => {            
           const ids = usuario.sedes.map((u) => { return u.idsede; });
           return SedeCtrl.filter({ _id: { $in: ids } });
        }
    },
    Permiso: {
        menu: (permiso) => {
            return MenuCtrl.read(permiso.idmenu);
        }
    }
};