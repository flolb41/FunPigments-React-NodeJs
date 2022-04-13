/* Import du model de User */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const User = require("../../models/users/userModel");
const bcrypt = require("bcrypt");
const SECRET_KEY = "../../envSample.ts";

/* Controller servant à récupérer tous les Users sur la base de donnée */
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .then((User: any) => {
            res.status(200).json({ User });
        })
        .catch((error: any) => {
            res.status(500).json({ error });
        });
};

/* Controller servant à récupérer un User grâce à son id */
const getOneUser = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({ _id: req.params.id })
        .then((User: any) => {
            res.status(200).json(User);
        })
        .catch((error: any) => {
            res.status(404).json({ error });
        });
};

/* Controller servant à supprimer un User grâce à son id */
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(201).json({ message: "Le User a bien été supprimé!" });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        });
};

/* Controller servant à modifier un User existant grâce à son id */
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const UserObject = JSON.parse(req.body.User);
    User
        .updateOne({ _id: req.params.id }, UserObject)
        .then(() => {
            res.status(201).json({ message: "Le User a bien été modifié!" });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        });
};

/*OK Controller servant à créer un nouvel utilisateur sur la base de données */
const registerUser = (req: Request, res: Response, next: NextFunction) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash: string) => {
            const UserObject = { ...req.body, password: hash};
            const NewUser = new User({
                ...UserObject,
                thumbnail: `${req.protocol}://${req.get('host')}/images/users/${req.body.thumbnail}`,
            });
            console.log(NewUser);
            NewUser
                .save()
                .then((User: any) => {
                    res.status(201).send({
                        user: {
                            id: User._id,
                            username: User.username,
                            email: User.email,
                            city: User.city,
                            thumbnail: User.thumbnail,
                            token: jwt.sign({ _id: User._id }, SECRET_KEY, { expiresIn: "24h" }),
                            isAuth: true,
                        },
                        message: "Compte créé avec succès!",
                    })
                })
                .catch((err: any) => {
                    res.status(400).json({ err, message: "Votre E-mail est déjà utilisé !" });
                });
        })
        .catch((error: any) => {
            res.status(500).json({ error, message: "Oups! une erreur serveur est survenue !!" });
        });
};
/* OK Controller servant à connecter un utilisateur */
const loginUser = (req: Request, res: Response, next: NextFunction) => {
    User
        .findOne({ username: req.body.username })
        .then((User: any) => {
            if (!User) {
                res.status(401).send({ message: "Utilisateur inconnu!" });
            } else {
                bcrypt.compare(req.body.password, User.password)
                    .then((valid: boolean) => {
                        if (!valid) {
                            res.status(401).send({ message: "Mot de passe incorrect!" });
                        } else {
                            res.status(200).send({
                                user: {
                                    id: User._id,
                                    username: User.username,
                                    email: User.email,
                                    city: User.city,
                                    thumbnail: User.thumbnail,
                                    token: jwt.sign({ _id: User._id }, SECRET_KEY, { expiresIn: "24h" }),
                                    isAdmin: User.isAdmin,
                                    isAuth: true,
                                },   
                            });
                        }
                    })
                    .catch((error: any) => {
                        res.status(500).send({ error, message: "Oups! Nous avons un problème serveur !!" });
                    });
            }
        })
        .catch((error: any) => {
            res.status(500).json({ error });
        });
};


export default { getAllUsers, getOneUser, deleteUser, updateUser, registerUser, loginUser };