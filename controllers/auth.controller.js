
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Admin = require('../models/Admin');
const Company = require('../models/Company');
const Student = require('../models/Student');

const {ADMIN, COMPANY, STUDENT} = require('../constants/roles');


exports.signup = async(req, res) => {

    const {role} = req.params;
    const { firstName, lastName, email, password } = req.body;

    const isEmailExistInAdmins = await Admin.findOne({ email });
    const isEmailExistInCompanies = await Company.findOne({ email });
    const isEmailExistInStudents = await Student.findOne({ email });

    if (isEmailExistInAdmins || isEmailExistInCompanies || isEmailExistInStudents)
    return res.status(400).send({
      message: 'The email address is already in use by another account.'
    });

    encryptedPassword = bcrypt.hashSync(password, 8);

    if(role === COMPANY) {

        const company = new Company({
            firstName,
            lastName,
            email,
            password: encryptedPassword
          });
        
          try {
            Company.create(company);

            res.status(201).send({
                message: "User signedup successfully"
            })
          }catch(err) {
            res.status(500).send({
                message: "Some internal error while signing up"
            })
          }

    }else if(role === STUDENT) {

        const student = new Student({
            firstName,
            lastName,
            email,
            password: encryptedPassword
          });

        try {
            Student.create(student);

            res.status(201).send({
                message: "Student signedup successfully"
            })

            }catch(err) {
            res.status(500).send({
                message: "Some internal error while signing up"
            })
        }

    }else{ 

        const admin = new Admin({
            firstName,
            lastName,
            email,
            password: encryptedPassword
            });

        try {
            Admin.create(admin);

            res.status(201).send({
                message: "Admin signedup successfully"
            })

            }catch(err) {
                res.status(500).send({
                    message: "Some internal error while signing up"
                })
        }
    }
}


//HW 

exports.signin = async(req, res) => {
    
}

