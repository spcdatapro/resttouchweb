const SedeController = require('../controllers/sede');
const AreaController = require('../controllers/area');
const MesaController = require('../controllers/mesa');

export const typeDef = `
    extend type Query {
        areas: [Area]
        area(_id: ID!): Area
    }

    extend type Mutation {
        createArea(input: CreateAreaInput): Area
        updateArea(input: UpdateAreaInput): Area        
    }

    type Area {
        _id: ID!
        sede: Sede
        nombre: String
        mesas: [Mesa]        
        debaja: Boolean
    }

    input CreateAreaInput {
        idsede:String!
        nombre: String!        
    }

    input UpdateAreaInput {
        id: String!
        nombre: String        
        debaja: Boolean
    }
`;

const SedeCtrl = new SedeController();
const AreaCtrl = new AreaController();
const MesaCtrl = new MesaController();

export const resolvers = {
    Query: {
        areas: () => {
            return AreaCtrl.list();
        },
    
        area: (root, { _id }) => {
            return AreaCtrl.read(_id);
        }        
    },
    Mutation: {
        createArea: (root, { input }) => {
            return AreaCtrl.create(input);
        },
        updateArea: (root, { input }) => {
            return AreaCtrl.update(input.id, input);
        }
    },
    Area: {    
        sede: (area) => {
            return SedeCtrl.read(area.idsede);
        },
        mesas: (area) => {
            return MesaCtrl.filter({ idarea: area._id });
        }
    }
};