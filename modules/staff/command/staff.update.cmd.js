class StaffUpdateCommand {
  constructor(
    id,
    roleId,
    username,
    password,
    email,
    firstname,
    lastname,
    dob,
    address,
    phone
  ) {
    this.id = id;
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
module.exports = StaffUpdateCommand;
