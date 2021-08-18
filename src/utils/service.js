import http from "./httpConf"

const getAll = (url) => {
    return http.get(url);
};

// const auth = (url, data) => {
//     return http.post(url,data);
// };

const getOne = (url, id) => {
    return http.get(`${url}/${id}`);
};

const create = (url, data, token) => {
    return http.post(url, data, { headers: { token } });
};

const update = (url, id, data, token) => {
    return http.put(`${url}/${id}`, data, { headers: { token } });
};

const remove = (url, id, token) => {
    return http.delete(`${url}/${id}`, { headers: { token } });
};

const removeAll = (token) => {
    return http.delete(`/about`, { headers: { token } });
};
const getToken = () => {
    return localStorage.getItem("token");
};

const crud = {
    getAll,
    getOne,
    create,
    update,
    remove,
    removeAll,
    getToken,
};

export default crud;