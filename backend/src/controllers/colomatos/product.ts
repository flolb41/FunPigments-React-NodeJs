import { NextFunction, Request, Response } from 'express';
/* Import du model de Product */
const Product = require('../../models/colomatos/product');


/* Controller servant à récupérer tous les Products sur la base de donnée */
const getAllProducts = (req: Request , res: Response, next: NextFunction) => {
  Product.find()
    .then((Product: any) => {
      res.status(200).json({ Product });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};

/* Controller servant à récupérer un Product grâce à son id */
const getOneProduct = (req: Request, res: Response, next: NextFunction) => {
  Product.findOne({ _id: req.params.id })
    .then((Product: any) => {
      res.status(200).json(Product);
    })
    .catch((error: any) => {
      res.status(404).json({ error });
    });
};

/* Controller servant à supprimer un Product grâce à son id */
const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({ message: "Le Product a bien été supprimé!" });
    })
    .catch((error: any) => {
      res.status(400).json({ error });
    });
};

/* Controller servant à modifier un Product existant grâce à son id */
const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  const ProductObject = JSON.parse(req.body.Product);
  Product
    .updateOne({ _id: req.params.id }, ProductObject)
    .then(() => {
      res.status(201).json({ message: "Le Product a bien été modifié!" });
    })
    .catch((error: any) => {
      res.status(400).json({ error });
    });
};

/* Controller servant à créer un nouveau Product sur la base de données */
const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const ProductObject = JSON.parse(req.body.Product);
  const NewProduct = new Product({ ...ProductObject });
  NewProduct
    .save()
    .then(() => {
      res.status(201).json({ message: "Le Product a bien été créé!" });
    })
    .catch((error: any) => {
      res.status(400).json({ error });
    });
};

export default { getAllProducts, getOneProduct, deleteProduct, updateProduct, createProduct };