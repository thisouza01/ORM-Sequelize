const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController.js');

const router = Router();

router.get('/turmas', TurmaController.pegaTodaAsTurmas)
router.get('/turmas/:id', TurmaController.pegaUmaTurma)
router.post('/turmas', TurmaController.criaTurma)
router.put('/turmas/:id', TurmaController.atualizaTurma)
router.delete('/turmas/:id', TurmaController.deletaTurma)
router.post('/turmas/:id/restaura', TurmaController.restauraTurma)

module.exports = router;