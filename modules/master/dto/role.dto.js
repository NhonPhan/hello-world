const BaseDto = require('./base.dto');
class RoleDto extends BaseDto{
    constructor(id = -1, code = '', description = '') {
        super(id, code, description);
    }
}
module.exports = RoleDto;