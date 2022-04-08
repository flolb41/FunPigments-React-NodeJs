/**
 * Importation de multer
 * Cette config sert à normaliser les fichier image
 * Leur type ainsi que leur nom sont traités pour avoir 
 * une homogénéité des nom de fichier
 */
import multer from 'multer';

const MIME_TYPE_MAP: any = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error: any = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

export default multer({ storage: storage }).single("image");