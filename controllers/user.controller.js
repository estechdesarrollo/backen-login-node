import models from '../models';
import bcrypt from 'bcryptjs';
import token from  '../services/token';

export default {
    // registrar usuario
    register:async (req, res, next) => {
        console.log(req.body);
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);// encriptar contraseña
            
            const reg         = await models.User.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            if (error.code=='11000') {
                res.status(500).send({
                    message: 'El nombre de usuario: '+ error.keyValue.user + ' ya existe',
                });
            } else {
                res.status(500).send({
                    message: 'El usuario no ha podido ser creado, revise su conexión o intente mas tarde',
                });
            }


            next(error);
        }
    },
    // log
    log: async (req, res, next) => {
        try {

            let user = await models.User.findOne({user: req.body.user, state: 1});// guardamos email usuario

            if (user) {

                let match = await bcrypt.compare(req.body.password, user.password);// compara pass ingresado con pass bd

                if (match) {
                    
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user, tokenReturn});

                } else {
                    res.status(404).send({
                        message: 'Password Incorreco'
                    });
                }
                
            } else {
                res.status(404).send({
                    message: 'El usuario no existe o NO está activo'
                });
            }
            
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);            
        }
    },
    // activar Usuario
    activate: async (req, res, next) => {
        try {
            const reg = await models.user.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    // desactivar Usuario
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.user.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
            res.status(200).json(reg);
            
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    // consultar Usuario activo
    verify: async (req, res, next) => {
        try {
            const reg = await models.User.findOne({_id:req.query._id}, 'state');
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error',
                error: e.message
            });
            next(e);
        }
    }


}