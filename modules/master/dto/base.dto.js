class BaseDto {
    constructor(id = '', code = '', description = '') {
        this.id = id;
        this.code = code;
        this.description = description;
    }
}
module.exports = BaseDto;