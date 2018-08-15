const TipoTurnoController = require('../controllers/tipoturno');
const TurnoController = require('../controllers/turno');
const SedeController = require('../controllers/sede');
const moment = require('moment');

export const typeDef = `
    extend type Query {
        turnos: [Turno]
        turno(_id: ID!): Turno
    }

    extend type Mutation{        
        createTurno(input: CreateTurnoInput): Turno
        updateTurno(input: UpdateTurnoInput): Turno
    }

    type Turno {
        _id: ID!
        tipoturno: TipoTurno
        sede: Sede
        inicia: DateTime
        finaliza: DateTime
        abierto: Boolean
        debaja: Boolean        
    }

    input CreateTurnoInput{
        idtipoturno: String!
        idsede: String!
        inicia: DateTime
    }

    input UpdateTurnoInput{
        id: String!
        idtipoturno: String
        idsede: String
        finaliza: DateTime
        abierto: Boolean
        debaja: Boolean
    }
`;

const TipoTurnoCtrl = new TipoTurnoController();
const TurnoCtrl = new TurnoController();
const SedeCtrl = new SedeController();
export const resolvers = {
    Query: {
        turnos: () => {
            return TurnoCtrl.list();
        },
    
        turno: (root, { _id }) => {
            return TurnoCtrl.read(_id);
        }
    },
    Mutation:{
        createTurno: (root, { input }) => {
            if(!input.inicia){ input.inicia = moment().toDate(); }
            return TurnoCtrl.create(input);
        },
        updateTurno: (root, { input }) => {
            if(!input.abierto) {
                input.finaliza = moment().toDate();
            }

            if(input.debaja && input.abierto){
                input.finaliza = moment().toDate();
            }            
            return TurnoCtrl.update(input.id, input);
        }
    },
    Turno: {
        tipoturno: (turno) => {            
            return TipoTurnoCtrl.read(turno.idtipoturno);
        },
        sede: (turno) => {
            return SedeCtrl.read(turno.idsede);
        }
    }    
};