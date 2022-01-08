import jwt      from 'jsonwebtoken';
import models   from '../models';

async function checkoken(token) { //volviendo a crear token en base a token ya valido que expiro para evitar relogin del ususario
    let __id = null;
    try {
        const {_id} = await jwt.decode(token);
        __id = _id;
    } catch (error) {
        return false;
    }
    const user =  await models.Usuario.findOne({_id: __id, estado: 1});
    if(user){
        const token = jwt.sign({_id: __id}, 'clavesecretaparagenerartoken', {expiresIn: '1d'});
        return {token, rol: user.rol};
    }else{
        return false;
    }
}

export default{
    // generar token con id del usuario
    encode: async (_id) => {
        const token = jwt.sign({_id: _id}, 'passsecret2022', {expiresIn: '1d'});
        return token;
    },
    // recibir token y verificar si es correcto
    decode: async (token) =>{
        try {
            const {_id} = await jwt.verify(token, 'passsecret2022');
            const user = await models.User.findOne({_id, state: 1});
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (error) {
            const newToken = await checkoken(token);
            return newToken;            
        }
    }
}