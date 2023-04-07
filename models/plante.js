const { DataTypes} = require('sequelize')
const DB = require('../db.config')
const validTypes = [`Plante d'intérieur`, `Plante d'extérieur`, `Cactus`, `Plante grasse`, `Palmier`, `Plante à fleurs`]


/****DEFINITION DU MODELE Produit */

    const ProduitModel = DB.define('ProduitModel', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà pris.'
        },
        validate: {
          len: {
            args: [1, 25],
            msg: 'Le nom doit contenir entre 1 et 25 caractères.'
          },
          notEmpty: { msg: 'Le nom ne peut pas être vide.' },
          notNull: { msg: 'Le nom est une propriété requise.'}
        }
      },
      prix: {
        type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
        min: {
          args: [0],
          msg: 'Le prix doit être supérieur à 0€.'
        },
        max: {
          args: [999],
          msg: 'Le prix doit être inférieure ou égale à 999€.'
        },
        notNull: { msg: 'Le prix est une propriété requise.'}
      }
    },
    
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' },
        notNull: { msg: 'L\'image est une propriété requise.'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error('Un pokémon doit au moins avoir un type.')
          }
          if(value.split(',').length > 3) {
            throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })

    module.exports = ProduitModel