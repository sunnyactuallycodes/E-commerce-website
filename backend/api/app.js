import express, { request, response } from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from '../config/connectDB.js';
import passport from 'passport';

// import for my routes only
import googleRouter from '../routes/google.routes.js';
import userRouter from '../routes/user.routes.js';
import productRouter from '../routes/product.route.js';
import cartRouter from '../routes/cart.routes.js';
import orderRouter from '../routes/order.route.js';
import paymentRouter from '../routes/payment.routes.js';



const app = express();

configDotenv();


const PORT = process.env.PORT || 4000;


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());


app.use(session(
    {
        secret:"Rakshita",
        saveUninitialized:false,
        resave:false,
        cookie:{
            name:"user",
            // value:"hey-Rakshita",
            maxAge:1000*60*60*24*14,
            sameSite:'lax'
        },
        store:MongoStore.create({
            mongoUrl:process.env.MONGO_URI,
            collectionName:"sessions",
            stringify:false
        })
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(googleRouter);// google authetication strategy for me
app.use('/api/v1',userRouter);// local strategy to login user to the application
app.use('/api/v1',productRouter);// routes for the products only
app.use('/api/v1',cartRouter);// routes for the cart
app.use('/api/v1',orderRouter);// routes for the orders only
app.use('/api/v1',paymentRouter);// routes for payment handling only through razorpay gateway.





let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect("mongodb+srv://brajalbelaadmin_db_user:braj@clusterbrajalbela.chtnrfj.mongodb.net/?appName=clusterBrajAlbela");
    isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});


app.set('trust proxy', 1);


app.get('/confirmation', (request, response)=>{
    if(request.session.user){
        console.log(request.session.user);
        return response.json({
            message:"hello you are logged in"
        })
    }
    return response.json(
        {
            message:"You are not logged in successfully"
        }
    )
});


app.listen(PORT,()=>{
    console.log(`your server is connected on port: ${PORT}`);
});


