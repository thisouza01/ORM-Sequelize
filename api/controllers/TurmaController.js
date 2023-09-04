const database = require('../models')

class TurmaController {
    static async pegaTodaAsTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async pegaUmaTurma(req, res) {
        const { id } = req.params;
        try{
            const umaTurma = await database.Turmas.findOne({ where: {id: Number(id)} });
            return res.status(200).json(umaTurma);
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async criaTurma(req, res) {
        const novaTurma = req.body;
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma);
            return res.status(201).json(novaTurmaCriada);
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async atualizaTurma(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Turmas.update(novasInfos, { where: { id: Number(id) } });
            const turmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(turmaAtualizada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async deletaTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ mensagem: `id ${ id } foi deletado` })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async restauraTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.restore({ where: { id: Number(id) } })
            res.status(200).json({ mensagem: `id ${ id } restaurado` })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
};

module.exports = TurmaController;