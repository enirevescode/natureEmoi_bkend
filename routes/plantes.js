// import des modules necessaires (express, le modèle, bcrypt)

const Produit = require('../models/plante')
//const { RequestError, ProduitError } = require('../error/customError')

//Routage de la ressource Produit

exports.getAllProduits = (req, res, next) =>{
    Produit.findAll()
        .then( produits => res.json({ data: produits}))
        .catch(err => next(err))
}

exports.getProduit = async (req, res, next) =>{
    try {
        let produitId = parseInt(req.params.id)

        // Vérif si le champs id est présent et cohérent
        if(!produitId){
            //return res.json(400).json({ message: 'Missing Parameter'})
            throw new RequestError('Missing parameter')
        }

        //Récupération du produit
        let produit = await Produit.findOne({ where: {id: produitId}, raw: true})
    
        //test si résultat
        if(produit === null){
            throw new ProduitError(`This product doesn't exist !`, 0)
            }
        
        //Renvoi du Produit trouvé
        return res.json({data: produit})
    } catch (err){
        next(err)
    }
}

// Ajouter 1 produit
exports.addProduit = async (req, res, next) => {
      try{
        const {nom, description, prix} = req.body

        //validation des données reçues
        if(!nom || !description || !prix){
            throw new RequestError(`Missing parameter`)
        }
        // Vérif si le produit existe
        let produit = await Produit.findOne({ where: {nom: nom}, raw: true})
        if( produit !== null){
            throw new ProduitError( `This product ${nom} already exists !`)//TODO internationalizer +vite
    }

        // Création du produit
        produit = await Produit.create(req.body)

        // Réponse du produit créé
        return res.json({ message: 'product created', data:produit})
    } catch(err){
        next(err)
    }
}

exports.updateProduit = async (req, res, next) =>{
    try{
        let produitId = parseInt(req.params.id)

        //Vérification si le champs id est présent et cohérent
        if (!produitId) {
            throw new RequestError(`Missing parameter`)
        }
            //Recherche du produit
            let produit = await Produit.findOne({ where: {id: produitId}, raw: true})
            
            //Vérifier si le produit existe
            if(produit === null){
                throw new ProduitError( 'This product doesnot exist !', 0)
            }

            //Mise à jour du produit
            await Produit.update(req.body, { where: {id: produitId}})

            // Réponse de la mise à jour
            return res.json({ message: 'product updated'})
        }catch(err){
            next(err)
            }
} //on modifie / on update

exports.untrashProduit = async(req, res, next) =>{
    try {
        let produitId = parseInt(req.params.id)

        //Vérification si le champs id est présent et cohérent
        if(!produitId){
            throw new RequestError('Missing parameter')
        }

        await Produit.restore({ where: {id: produitId}})

        // Réponse de sortie de poubelle
            return res.status(204).json({})
        }catch(err) {
            next(err)
        }
}//pr le untrash car put et patch pas le meilleur choix

exports.trashProduit = async(req, res, next) => {
    
    try{
        let produitId = parseInt(req.params.id)
        //Vérification si le champs id est présent et cohérent
        if(!produitId){
            throw new RequestError('Missing parameter')
        }

        //Suppression de l'utilisateur (soft delete - ya pas force:true)
        await Produit.destroy({ where: {id:produitId}})

        // Réponse de la mise en poubelle
        return res.status(204).json({})
    } catch (err) {
        next(err)
        }
}
exports.deleteProduit = async(req, res, next) => {

    try{
    let produitId = parseInt(req.params.id)

    //Vérification si le champs id est présent et cohérent
    if(!produitId) {
        throw new RequestError('Missing parameter')
    }

    //Suppression de l'utilisateur (hard delete)
    await Produit.destroy({ where: {id:produitId}, force: true})

    // Réponse de la suppression
    return res.status(204).json({})
    }catch(err) {
        next(err)
    }
}