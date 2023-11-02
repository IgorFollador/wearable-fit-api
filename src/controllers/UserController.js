const database = require('../models');
const bcrypt = require('bcrypt');
const userSchema = require('../services/validations/userSchema');

class UserController {

    static async create(req, res) {
        try {
            const userForm = req.body;

            const { error } = userSchema.validate(userForm);
            if (error) {
                return res.status(422).json({ message: error.details[0].message });
            }

            const selectUser = await database.User.findOne({where: { email: userForm.email }});
            if (selectUser) return res.status(409).json({ message: 'Email has been registered' });

            userForm.password = bcrypt.hashSync(userForm.password, 10);

            const user = await database.User.create(userForm);

            const userDTO = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }

            return res.status(201).json(userDTO);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async read(req, res) {
        try {
            // userId by auth
            const userId = req.userId;
            if (!userId) return res.sendStatus(401);

            const user = await database.User.findByPk(userId, {exclude: ['password']});
            if(user == null) return res.status(404).json({ message: 'User not found' });

            const responseData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }

            return res.status(200).json(responseData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            delete req.body.password;

            const userId = req.userId; 
            const userForm = req.body;

            if (userForm == null) return res.status(422).json({ message: 'Data not found' });
            
            const user = await database.User.findByPk(userId);
            if(user == null) return res.status(404).json({ message: 'User not found' });

            await database.User.update(userForm, {
                where: {
                    id: Number(userId)
                }
            })
            
            return res.status(200).json({ message: `User with ID ${userId} has been updated` });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await database.User.findByPk(id);
            if(user === null) return res.status(404).json({ message: 'User not found'})

            await database.User.destroy({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json({ message: `User with ID ${id} has been deleted` });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async recover(req, res) {
        try {
            const { id } = req.params;

            const user = await database.User.findByPk(id, { paranoid: false });
            if(user === null) return res.status(404).json({ message: 'User not found'})

            await database.User.restore({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json({ message: `User with ID ${id} has been recovered` });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = UserController;