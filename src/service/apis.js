const BASE_URL = 'http://localhost:3000/api/v1'

export const endPoints = {
    LOGIN : BASE_URL + '/auth/login',
    SIGNUP : BASE_URL+ '/auth/signup'
};

export const tasks = {
    ADD_TODO : BASE_URL + '/task/create-new-task',
    SHOW_TODO : BASE_URL + '/task/get-all-tasks',
    CHANGE_STATUS : BASE_URL + '/task/change-status',
    UPDATE_TASK : BASE_URL + '/task/update-task',
    DELETE_TODO : BASE_URL + '/task/delete-task',
}