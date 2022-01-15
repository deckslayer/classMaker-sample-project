const sha256 = require('sha256');

const models=require('../models/defaults/defaultModels.js');
const User = models.DefaultUser;

const Mongo = require('../service/mongo.js');

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const successResponse=(message, data)=>{
    let response= {
        success: true,
        data: data,
        message: message
    }
    return response;
}


const errorResponse=(message)=>{
    return response= {
        success: false,
        message: message
    }
}

let HandlerTiglass ={
    login (req, res) {
        
        //could be the username or the email
        let username = req.body.username;
        
        let password = sha256(req.body.password);
        
        console.log(username);
        
        // For the given username fetch user from DB
        User.find('username=="'+username+'"|| email == "'+username+'"').then((array)=>{
            let user=array[0];
            if(user==null)
            res.send(errorResponse('Incorrect username'));
            
            else if (!username || (username!=user.username && username!=user.email))
            res.send(errorResponse('Incorrect username or email'));
            
            else if (!password || password!=user.password)
            res.send(errorResponse('Incorrect password'));
            
            else {
                let token = jwt.sign({_id: user._id//, permissionslevel: utente.livelloPermessi/
                },
                config.secret,
                { expiresIn: '2400h'} // expires in 24 hours
                );
                // return the JWT token for the future API calls
                res.send(successResponse("Successful authentication!", token)); 
            }
            
        })
        
    },
    
    example(req,res){
        res.send(successResponse("Successful authentication via JWT token!",{_id: req.decoded._id}));
    },
    
    
    index (req, res) {
        res.send(successResponse("Controlla gli utenti in ClassMaker/importExport/prova.csv la password è 1234"));
    }
}


module.exports=HandlerTiglass;