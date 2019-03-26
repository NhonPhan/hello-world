const logger = require('./../utils/logger');
const httpCodes = require('http-status-codes');
const StaffQueryService = require('./../staff/query/staff.query');
const StaffDto = require('./../staff/dto/staff.dto');
const Hashing = require('./../utils/hashing');
const Authorization = require('./../authorization/authorization.controller');
let service;

class AuthenticationControler {    
    constructor(){        
        //logger.info('constructor of AuthenticationControler');
        //service = new AuthenticationQueryService();
    }

    signin(req, res) {
        logger.info('SIGN-IN', 'starting');
        try {
            service = new StaffQueryService();
            const username = req.body.username;
            const password = req.body.password;
            logger.info('User signin with info::', username);
            // check user signin
            return service.checkStaff(username)
                .then((dto) => {
                    if (dto && dto instanceof StaffDto) {
                        //validate password
                        let hashing = new Hashing();                        
                        //return [hashing.compare(password, dto.password), dto];                        
                        return [hashing.compare(password, dto.password), dto];                        
                    } else {
                        throw new Error();
                    }                                   
                })
                .spread((isValidPw, dto) => {
                    delete dto.password;
                    if (!isValidPw) {
                        throw new Error('Invalid username or password!!');
                    }
                    
                    // create a token
                    let createdAt = new Date();
                    let payload = Object.assign({}, dto);
                    payload.createdAt = createdAt;
                    //logger.info('payload', payload);

                    //set cookie
                    let author = new Authorization();
                    author.createCredentialsToken(res, payload);

                    // return data to client
                    let dataRes = {
                        type : 'profile_data',
                        profile_data: payload
                    };
                    //logger.info('User signin', dataRes);			
                    return res.status(httpCodes.OK).json(dataRes); 
                })
                .catch(err => {
                    //console.error(err);
                    logger.error(err.message);
                    return res.status(httpCodes.BAD_REQUEST).json({error:'Invalid username or password!!'});
                });
            
            
        } catch(err) {
            logger.error(err);
            return res.status(httpCodes.BAD_REQUEST).json({error:'Error when processing!!'});
        }
    }

    signout(req, res) {
        logger.info('User signout');
        try {
            if (req.decoded) {
                //logger.info('delete decoded');
                delete req.decoded;
                //logger.info('check info after delete::', req.decoded);
            }
            res.clearCookie('token');
            
            const dataRes = {
                type : 'sign_out',
                sign_out: "OK"
            };
            return res.status(httpCodes.OK).json(dataRes);
        } catch(err) {
            console.log(err);
            logger.error(err.message);
            return res.status(httpCodes.BAD_REQUEST).json({error:'Sign-out error!!'});
        }
		
    }
}

module.exports = AuthenticationControler;