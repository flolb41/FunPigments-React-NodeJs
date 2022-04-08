/* Import d'express et de son routeur, ainsi que des controllers */
import express from 'express';
import defiCtrl from '../controllers/defis/defi';
import auth from '../middleware/auth';
import multer from '../middleware/multer';
const router = express.Router();


/* routes possibles pour la gestion des produit */
router.get("/prod/", defiCtrl.getAllDefis);
router.get("/prod/:id", defiCtrl.getOneDefi);
router.delete("/prod/:id", auth, defiCtrl.deleteDefi);
router.put("/prod/:id", auth, multer, defiCtrl.updateDefi);
router.post("/prod/", auth, multer, defiCtrl.createDefi);

/* export du module */
export default router;