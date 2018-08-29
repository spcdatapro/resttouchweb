const MenuController = require('../controllers/menu');

export const typeDef = `
    extend type Query {
        menus: [Menu]
        menu(_id: ID!): Menu
        arbolMenu: [Arbol]
    }

    extend type Mutation{        
        createMenu(input: CreateMenuInput): Menu
        updateMenu(input: UpdateMenuInput): Menu
    }

    type Menu {
        _id: ID!
        padre: Menu
        ruta: String
        descripcion: String
        nivel: Int
        url: String
        icono: String
        hijos: [Menu]
        debaja: Boolean
    }

    type Arbol {
        _id: ID        
        ruta: String
        descripcion: String
        nivel: Int
        url: String
        icono: String
        children: [Arbol]
    }

    input CreateMenuInput{
        idpadre: String
        descripcion: String!
        nivel: Int!
        url: String!
        icono: String            
    }

    input UpdateMenuInput{
        id: String!
        idpadre: String
        descripcion: String
        nivel: Int
        url: String
        icono: String
        debaja: Boolean
    }
`;

const MenuCtrl = new MenuController();
export const resolvers = {
    Query: {
        menus: () => {
            return MenuCtrl.list();
        },
    
        menu: (root, { _id }) => {
            return MenuCtrl.read(_id);
        },
        arbolMenu: async () => {
            return await MenuCtrl.getTreeMenu();
        }
    },
    Mutation:{
        createMenu: async (root, { input }) => {
            input.ruta = '';
            if(input.idpadre){
                input.ruta = await MenuCtrl.getRuta(input.idpadre, []);                
            }
            // console.log('Input: ', input); return { _id: '02365fadf48q' };            
            return MenuCtrl.create(input);
        },
        updateMenu: async (root, { input }) => {
            input.ruta = '';
            if(input.idpadre){                
                input.ruta = await MenuCtrl.getRuta(input.idpadre, []);                
            }
            return MenuCtrl.update(input.id, input);
        }
    },
    Menu: {
        padre: (menu) => {
            if(menu.idpadre){
                return MenuCtrl.read(menu.idpadre);
            }
            return {};
        },
        hijos: (menu) => {
            return MenuCtrl.filter({ idpadre: menu._id });
        }
    }
};