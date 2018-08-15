const OrganizacionController = require('../controllers/organizacion');
const EmpresaController = require('../controllers/empresa');
const SedeController = require('../controllers/sede');

export const typeDef = `
    extend type Query {
        empresas: [Empresa]
        empresa(_id: ID!): Empresa
    }

    extend type Mutation {
        createEmpresa(input: CreateEmpresaInput): Empresa
        updateEmpresa(input: UpdateEmpresaInput): Empresa        
    }

    type Empresa {
        _id: ID!
        organizacion: Organizacion
        nombre: String
        razonsocial: String
        abreviatura: String
        nit: String
        direccion: String
        sedes: [Sede]
        debaja: Boolean
    }

    input CreateEmpresaInput {
        idorganizacion:String!
        nombre: String!
        razonsocial: String
        abreviatura: String
        nit: String
        direccion: String        
    }

    input UpdateEmpresaInput {
        id: String!
        nombre: String
        razonsocial: String
        abreviatura: String
        nit: String
        direccion: String
        debaja: Boolean
    }
`;

const OrganizacionCtrl = new OrganizacionController();
const EmpresaCtrl = new EmpresaController();
const SedeCtrl = new SedeController();
export const resolvers = {
    Query: {
        empresas: () => {
            return EmpresaCtrl.list();
        },
    
        empresa: (root, { _id }) => {
            return EmpresaCtrl.read(_id);
        }        
    },
    Mutation: {
        createEmpresa: (root, { input }) => {
            return EmpresaCtrl.create(input);
        },
        updateEmpresa: (root, { input }) => {
            return EmpresaCtrl.update(input.id, input);
        }
    },
    Empresa: {    
        organizacion: (empresa) => {
            return OrganizacionCtrl.read(empresa.idorganizacion);
        },
        sedes: (empresa) => {
            return SedeCtrl.filter({
                idempresa: empresa._id
            });
        }
    }
};