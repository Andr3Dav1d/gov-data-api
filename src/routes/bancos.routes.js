import { Router } from "express";
import { listBancos, getBancoByCodigo } from "../controllers/bancos.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/bancos:
 *   get:
 *     summary: Lista bancos com filtro e paginação
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Filtro por nome
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista paginada de bancos
 */

router.get("/", listBancos);

/**
 * @openapi
 * /api/v1/bancos/{codigo}:
 *   get:
 *     summary: Busca banco pelo código
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Banco encontrado
 *       404:
 *         description: Banco não encontrado
 */

router.get("/:codigo", getBancoByCodigo);

export default router;
