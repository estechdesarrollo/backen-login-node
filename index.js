import express  from 'express';
import morgan   from 'morgan';
import cors     from 'cors';
import path     from 'path';
import mongoose from 'mongoose';
import router   from './routes/';

//conexion a base de datos

mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dblogin';
mongoose.connect(dbUrl)
    .then(mongoose => console.log('Conectado en DB'))
    .catch(err => console.log(err))


const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join (__dirname,'public')));

app.use('/api', router);

app.set('port', process.env.PORT || 3000); //obtener puerto asignado por el servidor
app.listen(app.get('port'),()=>{
    console.log('server execute port: ' + app.get('port'));
    console.log();
});