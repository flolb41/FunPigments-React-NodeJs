/* Import du model de Defi */
import { Request, Response, NextFunction } from "express";

const Defi = require("../../models/defis/defi");

/* Controller servant à récupérer tous les Defis sur la base de donnée */
const getAllDefis = (req: Request, res: Response, next: NextFunction) => {
    Defi.find()
        .then((Defi: any) => {
            res.status(200).json({ Defi });
        })
        .catch((error: any) => {
            res.status(500).json({ error });
        });
};

/* Controller servant à récupérer un Defi grâce à son id */
const getOneDefi = (req: Request, res: Response, next: NextFunction) => {
    Defi.findOne({ _id: req.params.id })
        .then((Defi: any) => {
            res.status(200).json(Defi);
        })
        .catch((error: any) => {
            res.status(404).json({ error });
        });
};

/* Controller servant à supprimer un Defi grâce à son id */
const deleteDefi = (req: Request, res: Response, next: NextFunction) => {
    Defi.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(201).json({ message: "Le Defi a bien été supprimé!" });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        });
};

/* Controller servant à modifier un Defi existant grâce à son id */
const updateDefi = (req: Request, res: Response, next: NextFunction) => {
    const DefiObject = JSON.parse(req.body.Defi);
    Defi
        .updateOne({ _id: req.params.id }, DefiObject)
        .then(() => {
            res.status(201).json({ message: "Le Defi a bien été modifié!" });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        });
};

const createDefi = (req: Request, res: Response, next: NextFunction) => {
    const DefiObject = JSON.parse(req.body.Defi);
    Defi
        .create(DefiObject)
        .then((Defi: any) => {
            res.status(201).json({ message: "Le Defi a bien été créé!", Defi });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        }); 
};



export default { getAllDefis, getOneDefi, deleteDefi, updateDefi, createDefi };