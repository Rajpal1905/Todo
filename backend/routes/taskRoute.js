const router = require('express').Router()

const {  createTask, getAllTasks, deleteTask, changeStatus, updateTask } = require('../controllers/task')
const { auth } = require('../middleware/auth')


router.post('/create-new-task',auth ,createTask)
router.get('/get-all-tasks',auth,getAllTasks)
router.delete('/delete-task',auth,deleteTask)
router.put('/change-status',auth,changeStatus)
router.put('/update-task',auth,updateTask)

module.exports = router