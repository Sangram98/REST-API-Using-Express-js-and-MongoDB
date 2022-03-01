const route = require("express").Router();
const productCtrl = require("../controller/productCtrl");
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

route.get(`/product`, productCtrl.getAll);
route.get(`/product/:id`, productCtrl.getSingle);
route.post(`/product`, auth, authAdmin, productCtrl.create);
route.put(`/product/:id`, auth, authAdmin, productCtrl.update);
route.delete(`/product/:id`, auth, authAdmin, productCtrl.delete);

module.exports = route;
