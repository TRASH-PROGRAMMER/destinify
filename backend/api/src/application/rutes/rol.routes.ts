import { Router } from "express";
import { RolController } from "../controllers/rol.controller";

// creacion del router
const router = Router();
// instanciacion de las dependencias
const rolRepository = new RolRepositoryImpl();
const rolService = new RolServiceImpl(rolRepository);
const rolController = new RolController(rolService);
// definicion de las rutas
router.get("/", rolController.getAll);
router.get("/:id", rolController.getById);
router.post("/", rolController.create);
router.put("/:id", rolController.update);
router.delete("/:id", rolController.delete);
// exportacion del router
export default router;
