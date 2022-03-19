import express from 'express';
import { 
    getUser, 
    createUser, 
    authenticateUser, 
    deleteUser, 
    updateMentor,
    updateMentee, 
    updateMoodBoard,
    getMentee
} from '../controllers/user.js';

//router for creating api endpoints
const router = express.Router();

//add routes
//EXAMPLE: router.get(< path >, < callback function >);


//example for API call http://localhost:5000/users
//create endpoints
router.post('/', createUser);
router.post('/login', authenticateUser);
router.post('/getUser', getUser);
router.post('/getMentee', getMentee);

router.put('/updateMentor', updateMentor);
router.put('/updateMentee', updateMentee);
router.delete('/user/:id', deleteUser);

router.put('/updateMoodBoard', updateMoodBoard);

//export the router
export default router;