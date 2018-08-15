const OrganizacionController = require('../controllers/organizacion');
const EmpresaController = require('../controllers/empresa');

export const typeDef = `
    extend type Query {
        organizaciones: [Organizacion]
        organizacion(_id: ID!): Organizacion
    }

    extend type Mutation{        
        createOrganizacion(input: CreateOrganizacionInput): Organizacion
        updateOrganizacion(input: UpdateOrganizacionInput): Organizacion
    }

    type Organizacion {
        _id: ID!
        nombre: String
        empresas: [Empresa]
        debaja: Boolean
    }

    input CreateOrganizacionInput{
        nombre: String!
    }

    input UpdateOrganizacionInput{
        id: String!
        nombre: String
        debaja: Boolean
    }
`;

const OrganizacionCtrl = new OrganizacionController();
const EmpresaCtrl = new EmpresaController();
export const resolvers = {
    Query: {
        organizaciones: () => {
            return OrganizacionCtrl.list();
        },
    
        organizacion: (root, { _id }) => {
            return OrganizacionCtrl.read(_id);
        }
    },
    Mutation:{
        createOrganizacion: (root, { input }) => {
            return OrganizacionCtrl.create(input);
        },
        updateOrganizacion: (root, { input }) => {
            return OrganizacionCtrl.update(input.id, input);
        }
    },
    Organizacion: {
        empresas: (organizacion) => {            
            return EmpresaCtrl.filter({
                idorganizacion: organizacion._id
            });
        }
    }
};