/* Import d'express et de son routeur, ainsi que des controllers */
import express from 'express';
import prodCtrl from '../controllers/colomatos/product';
import postCtrl from '../controllers/colomatos/posts';
import auth from '../middleware/auth';
import multer from '../middleware/multer';
const router = express.Router();


/* routes possibles pour la gestion des produit */
router.get("/prod/", prodCtrl.getAllProducts);
router.get("/prod/:id", prodCtrl.getOneProduct);
router.delete("/prod/:id", auth, prodCtrl.deleteProduct);
router.put("/prod/:id", auth, multer, prodCtrl.updateProduct);
router.post("/prod/", auth, multer, prodCtrl.createProduct);

/* routes possibles pour la gestion des posts */
router.get("/post/", postCtrl.getAllPosts);
router.get("/post/:id", postCtrl.getOnePost);
router.delete("/post/:id", auth, postCtrl.deletePost);
router.put("/post/:id", auth, postCtrl.updatePost);
router.post("/post/", auth, postCtrl.createPost);

/* export du module */
export default router;