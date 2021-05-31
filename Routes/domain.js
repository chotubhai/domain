const express = require("express");
const router = express.Router();
const domainModel = require("../Model/domainModel");
const { Controller } = require("../controllers/genericController");

/**
  // @swagger
 * /domain:
 *   post:
 *     summary: Create a Domain.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/

router.post("/", new Controller(domainModel).Create);

router.delete("/:id", new Controller(domainModel).Delete);
router.put("/:id", new Controller(domainModel).Update);

router.get("/:id", new Controller(domainModel).GetElementById);

router.get("/", new Controller(domainModel).GetELement);

module.exports = router;
