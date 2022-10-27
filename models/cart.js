const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Cart extends Model {}

Cart.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Product',
              key: 'id',
            },
          },

          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'id',
            },
          },


          quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            
          }


    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart',
      }
    
    



    );

    module.exports = Cart;

