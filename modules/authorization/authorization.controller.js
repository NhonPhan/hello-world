const logger = require('./../utils/logger');
const httpCodes = require('http-status-codes');
const Hashing = require('./../utils/hashing');
const DecodeUtils = require('./../utils/decode_utils');
const config = require('../../config/auth/info');
const jwt = require('jsonwebtoken');

let hashing;
let decodeUtils;
class Authorization {
    constructor() {
        hashing = new Hashing();
    }

    createCredentialsToken(res, payload) {
        let signedToken = this.signToken(payload);
        res.cookie('token', signedToken, {
            secure: false,
            httpOnly: true,
            expires: 0
        });
    }

    signToken(payload) {
        
        let sPayload = JSON.stringify(payload);
        let encryptPayload = hashing.encrypt(JSON.stringify(sPayload), config.ENCRYPT_KEY);
        let payloadData = {
            data : encryptPayload
        };
    
        var token = jwt.sign(payloadData, config.JWT_SIGN_KEY, {
            //expiresIn : (config.TOKEN_EXPIRY_MINUTES * 60) // dont set expires            
        });
    
        return token;
    };

    isAuthorized(req, res, next) {
        logger.info('checking authorization!!')
        let token = req.cookies.token;
        let error;

        if (token) {       
            //logger.info('has token', token);     
            Authorization.validateToken(token)
                .then((decodedToken) => {
                    
                    let decode = JSON.parse(decodedToken);
                    req.decoded = decode;
                    decodeUtils = new DecodeUtils();
                    decodeUtils.setDecode(decode);
                    // logger.info('decoded', decodeUtils.getDecode());                    
                    logger.info('Token is valid!!');
                    next();
                })
                .catch(err => {
                    logger.info('Token is not valid');
                    console.error(err);
                    error = new Error('Token is not valid');
                    return res.status(httpCodes.UNAUTHORIZED).json({error: error.message});        
                })
            
        } else {
            logger.info('Token is not provided!');
            error = new Error('Token is not provided');
            return res.status(httpCodes.UNAUTHORIZED).json({error: error.message});
        }
    }
    
    static validateToken(token) {
        logger.info('validating token!!!');
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.JWT_SIGN_KEY, {
                ignoreExpiration : true
            }, function(err, decoded){
                if (err) {
                    reject(err);
                    return;
                }
    
                try {
                    let encryptPayload = hashing.decrypt(decoded.data, config.ENCRYPT_KEY);
                    var decryptPayload = JSON.parse(encryptPayload);
                    resolve(decryptPayload);
                } catch(err) {
                    reject(err);
                    return;
                }
            });
        });
    }
}

module.exports = Authorization;