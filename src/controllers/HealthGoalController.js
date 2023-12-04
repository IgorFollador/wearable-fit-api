const database = require('../models');

class HealthGoalController {

    static async create(req, res) {
        try {
            req.body.professionalUserId = req.userId;

            const healthGoalForm = req.body;
            
            const clientUser = await database.User.findByPk(healthGoalForm.clientUserId);
            if (!clientUser === null) return res.status(404).json({ message: 'Client not found' });

            const healthGoal = await database.HealthGoal.create(healthGoalForm);

            return res.status(201).json(healthGoal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async createOrUpdate(req, res) {
        try {
            const professionalUserId = req.userId;
            const clientUserId = req.params.id;
            req.body.professionalUserId = professionalUserId;
            req.body.clientUserId = clientUserId;

            const healthGoalForm = req.body;
            
            const clientUser = await database.User.findByPk(healthGoalForm.clientUserId);
            if (!clientUser === null) return res.status(404).json({ message: 'Client not found' });

            const healthGoalSelected = await database.HealthGoal.findOne({
                where: {
                    clientUserId: Number(clientUserId)
                }
            });

            if (healthGoalSelected) {
                await database.HealthGoal.update(healthGoalForm, {
                    where: {
                        clientUserId: Number(clientUserId)
                    }
                })

                return res.status(200).json("Health Goals updated");
            } 
                
            const healthGoal = await database.HealthGoal.create(healthGoalForm);
            
            return res.status(201).json(healthGoal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readById(req, res) {
        try {
            const { id } = req.params;

            const healthGoal = await database.HealthGoal.findByPk(id);
            if(healthGoal === null) return res.status(404).json({ message: 'Health Goal not found' });

            return res.status(200).json(healthGoal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readByUser(req, res) {
        try {
            const userId = req.params.id == null ? req.userId : req.params.id;

            const healthGoal = await database.HealthGoal.findOne({
                where: {
                    clientUserId: userId
                }
            });

            if (healthGoal === null) return res.status(404).json({ message: 'No Health Goal found' });

            return res.status(200).json(healthGoal);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readAllByClientId(req, res) {
        try {
            const { id } = req.params;

            const healthGoals = await database.HealthGoal.findAll({
                where: {
                    clientUserId: id
                }
            });
            if(healthGoals === null) return res.status(404).json({ message: 'No Health Goals were found' });

            return res.status(200).json(healthGoals);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async readAllByProfessionalId(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            if (id != userId) {
                return res.status(401).json({ messasge: 'The logged in user does not have permission to access this feature' })
            }

            const healthGoals = await database.HealthGoal.findAll({
                where: {
                    professionalUserId: id
                }
            });
            if(healthGoals === null) return res.status(404).json({ message: 'No Health Goals were found' });

            return res.status(200).json(healthGoals);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            delete req.body.professionalUserId;

            const healthGoalId = req.params.id; 
            const healthGoalForm = req.body;
            const userId = req.userId;

            if (healthGoalForm === null) return res.status(422).json({ message: 'Data not found' });
            
            if (healthGoalForm.clientUserId) {
                const clientUser = await database.User.findByPk(healthGoalForm.clientUserId);
                if(clientUser === null) return res.status(404).json({ message: 'Client not found' });
            }

            const healthGoal = await database.HealthGoal.findByPk(healthGoalId);
            if(healthGoal === null) return res.status(404).json({ message: 'Health Goal not found'})

            if (healthGoal.professionalUserId != userId)  {
                return res.status(401).json({ messasge: 'The logged in user does not have permission to access this feature' })
            }

            await database.HealthGoal.update(healthGoalForm, {
                where: {
                    id: Number(healthGoalId)
                }
            })
            
            return res.status(200).json({ message: `Health Goal with ID ${healthGoalId} has been updated` });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            const healthGoal = await database.HealthGoal.findByPk(id);
            if(healthGoal === null) return res.status(404).json({ message: 'Health Goal not found'})

            if (healthGoal.professionalUserId != userId)  {
                return res.status(401).json({ messasge: 'The logged in user does not have permission to access this feature' })
            }

            await database.HealthGoal.destroy({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json({ message: `Health Goal with ID ${id} has been deleted` });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async recover(req, res) {
        try {
            const { id } = req.params;

            const healthGoal = await database.HealthGoal.findByPk(id, { paranoid: false });
            if(healthGoal === null) return res.status(404).json({ message: 'Health Goal not found'})

            await database.HealthGoal.restore({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json({ message: `Health Goal with ID ${id} has been recovered` });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = HealthGoalController;