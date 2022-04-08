/* Import du model de Post */
import { Request, Response, NextFunction } from "express";
const Post = require("../../models/colomatos/posts");


/* Controller servant à récupérer tous les Posts sur la base de donnée */
const getAllPosts = (req: Request, res: Response, next: NextFunction) => {
    Post.find()
        .then((Post: any) => {
            res.status(200).json({ Post });
        })
        .catch((error: any) => {
            res.status(500).json({ error });
        });
};

/* Controller servant à récupérer un Post grâce à son id */
const getOnePost = (req: Request, res: Response, next: NextFunction) => {
    Post.findOne({ _id: req.params.id })
        .then((Post: any) => {
            res.status(200).json(Post);
        })
        .catch((error: any) => {
            res.status(404).json({ error });
        });
};

/* Controller servant à supprimer un Post grâce à son id */
const deletePost = (req: Request, res: Response, next: NextFunction) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(201).json({ message: "Le Post a bien été supprimé!" });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        });
};

/* Controller servant à modifier un Post existant grâce à son id */
const updatePost = (req: Request, res: Response, next: NextFunction) => {
    const PostObject = JSON.parse(req.body.Post);
    Post
        .updateOne({ _id: req.params.id }, PostObject)
        .then(() => {
            res.status(201).json({ message: "Le Post a bien été modifié!" });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        });
};

/* Controller servant à créer un nouveau Post sur la base de données */
const createPost = (req: Request, res: Response, next: NextFunction) => {
    const PostObject = JSON.parse(req.body.Post);
    const NewPost = new Post({ ...PostObject });
    NewPost
        .save()
        .then(() => {
            res.status(201).json({ message: "Le Post a bien été créé!" });
        })
        .catch((error: any) => {
            res.status(400).json({ error });
        });
};

export default { getAllPosts, getOnePost, deletePost, updatePost, createPost };