class StaffDto {
  constructor(
    id,
    roleid,
    username = "",
    email = "",
    password = "",
    firstname = "",
    lastname = "",
    dob = null,
    address = "",
    phone = ""
  ) {
    this.id = id;
    this.roleid = roleid;
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dob = dob;
    this.address = address;
    this.phone = phone;
  }
}

module.exports = StaffDto;
