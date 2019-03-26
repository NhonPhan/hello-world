class StaffAddCommand {
    constructor(roleId, username, password, email, firstname, lastname, dob, address, phone) {
        this.role_id = roleId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.address = address;
        this.phone = phone;
    }
}
module.exports = StaffAddCommand;