const database = require('../models');

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasAtivas)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };
    
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const umaPessoa = await database.Pessoas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(umaPessoa);
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(201).json(novaPessoaCriada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async atualizaPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(pessoaAtualizada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ mensagem: `id ${ id } deletado` })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${ id } restaurado!` })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const umaMatricula = await database.Matriculas.findOne(
                { where: 
                    {
                        id: Number(matriculaId), 
                        estudante_id: Number(estudanteId)
                    } 
                });
            return res.status(200).json(umaMatricula);
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(201).json(novaMatriculaCriada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try {
            await database.Matriculas.update(
                novasInfos,
                { where: 
                    { 
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    } 
                });
            const MatriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } });
            return res.status(200).json(MatriculaAtualizada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.destroy(
                { where: 
                    { 
                        id: Number(matriculaId) 
                    } 
                });
            return res.status(200).json({ mensagem: `id ${ matriculaId } deletado` })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.restore(
                { where: 
                    { 
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId) 
                    } 
                })
            return res.status(200).json({ mensagem: `id ${ id }, restaurado` })
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    };
};

module.exports = PessoaController;