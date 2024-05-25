require('../../db_functions');
let Customer = require('../../model/Customer')
let moment = require('moment')
const jwt = require('jsonwebtoken')
let nodemailer = require('nodemailer')

const customerUtils ={
    
    

    
    // register: async (data) => {
    //     try {
    //         console.log("data", data);
    //         let { email } = data;
            
    //         // Check if the email already exists
    //         let emailCheck = await Customer.findOne({ email, status: { $ne: 2 } });
    //         if (emailCheck) {
    //             return { status: false, message: "EMAIL_ALREADY" };
    //         } else {
    //             let newObj = {
    //                 email,
    //                 created_at: moment().unix()
    //             };
    //             let CustomerRef = new Customer(newObj);
                
    //             // Save the customer data
    //             let savedData = await CustomerRef.save();
    //             console.log("savedData", savedData);


    //             if (savedData) {
    //                 console.log("done")
    //                 let queryObject = { email: { $eq: email } };
    //                 let result = await Customer.findOne(queryObject);
                    
    //                 if (result) {
    //                     console.log(result._id)
    //                     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //                     let otp = '';
    //                     const otpLength = 6;
    //                     for (let i = 0; i < otpLength; i++) {
    //                       otp += characters.charAt(
    //                         Math.floor(Math.random() * characters.length)
    //                       );
    //                     }
    //                     console.log("otp", otp)
    //                     let _id = result._id
    //                     console.log(_id)
    //                     let CustomerData = {
    //                         otp,
    //                         updated_at: moment().unix()
    //                     }
    //                     let response = await Customer.findByIdAndUpdate(_id, { $set: CustomerData }, { new: true });
    //                     if (response) {
    //                         const transporter = nodemailer.createTransport({
    //                             host: 'smtp.googlemail.com',
    //                             secure: false,
    //                             port: 587,
    //                             auth: {
    //                               user: "welcomeit321@gmail.com" ,                                 
    //                               pass: "aitmvtzirppyfsgq",
    //                             },
    //                           });
    //                           const mailOptions = {
    //                             from: "welcomeit321@gmail.com",
    //                             to: email,
    //                             subject: "Your OTP for registration",
    //                             text: `Your OTP is: ${otp}`,
    //                           };
                            
    //                           transporter.sendMail(mailOptions, function (error, info) {
    //                             if (error) {
    //                               console.error("Error sending email:", error);
    //                             } else {
    //                                 // console.log("Email sent: ");
    //                                 return {status: true, message: 'Email sent', data: email };
    //                             }
    //                         });
    //                     }
    //                     // if (response) {
    //                     //     const msg = {
    //                     //         to: email,
    //                     //         from: 'welcomeit321@gmail.com',
    //                     //         subject: 'Your OTP for registration',
    //                     //         text: `Your OTP is: ${otp}`,
    //                     //     };
                            
    //                     //     try {
    //                     //         await sgMail.send(msg);
    //                     //         console.log('Email sent');
    //                     //         return { status: true, message: 'Email sent', data: email };
    //                     //     } catch (error) {
    //                     //         console.error('Error sending email:', error);
    //                     //         return { status: false, message: 'Failed to send email', error };
    //                     //     }
    //                     // }



    //                      return { status: true, message: 'Email sent', data: data }  
    //                 }
    //             }
    
    //             return { status: true, message: 'Admin Register Success', data: savedData };
    //         }
    //     } catch (error) {
    //         console.error("Error registering admin:", error);
    //         // Handle errors
    //         return { status: false, message: 'Failed to register admin', error };
    //     }
    // },

    register: async (data) => {
        try {
            console.log("data", data);
            let { email } = data;

            // Check if the email already exists
            let emailCheck = await Customer.findOne({ email, status: { $ne: 2 } });
            if (emailCheck) {
                return { status: false, message: "EMAIL_ALREADY" };
            } else {
                let newObj = {
                    email,
                    created_at: moment().unix()
                };
                let CustomerRef = new Customer(newObj);

                // Save the customer data
                let savedData = await CustomerRef.save();
                console.log("savedData", savedData);

                if (savedData) {
                    console.log("done");
                    let queryObject = { email: { $eq: email } };
                    let result = await Customer.findOne(queryObject);

                    if (result) {
                        console.log(result._id);
                        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        let otp = '';
                        const otpLength = 6;
                        for (let i = 0; i < otpLength; i++) {
                            otp += characters.charAt(
                                Math.floor(Math.random() * characters.length)
                            );
                        }
                        console.log("otp", otp);
                        let _id = result._id;
                        console.log(_id);
                        let CustomerData = {
                            otp,
                            updated_at: moment().unix()
                        };
                        let response = await Customer.findByIdAndUpdate(_id, { $set: CustomerData }, { new: true });

                        if (response) {
                            const transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 587,
                                secure: false, // true for 465, false for other ports
                                auth: {
                                    user: "capkaweb@gmail.com",
                                    pass: "oypfczrrjlknvtzh",
                                },
                                tls: {
                                    rejectUnauthorized: false // ignore unauthorized certificates (for testing)
                                }
                            });

                            const mailOptions = {
                                from: "capkaweb@gmail.com",
                                to: email,
                                subject: "Your OTP for registration",
                                text: `Your OTP is: ${otp}`,
                            };

                            try {
                                let info = await transporter.sendMail(mailOptions);
                                console.log('Email sent:', info.response);
                                return { status: true, message: `Email sent ${email}`, data: savedData };
                            } catch (error) {
                                console.error('Error sending email:', error);
                                return { status: false, message: 'Failed to send email', error };
                            }
                        }

                        return { status: true, message: `Email sent ${email}`, data: savedData };
                    }
                }

                return { status: true, message: 'Admin Register Success', data: savedData };
            }
        } catch (error) {
            console.error("Error registering admin:", error);
            // Handle errors
            return { status: false, message: 'Failed to register admin', error };
        }
    },

    
    
    
    
    
    verifyOTp : async(data)=>{
        let { name,phone,text,city,otp,email,_id } = data;
        console.log(data)
        let queryObject = { email: { $eq: email },otp:{$eq:otp} };
        console.log("queryObject",queryObject)
        let result = await Customer.findOne(queryObject);
        // console.log("result-",result)

        if (!result) {
            return {status: false, message:"INVALID_OTP"};
        }

        let saveDataObj ={
            name:name,
            email:email,
            phone:phone,
            message:text,
            city:city
        }
        let response = await Customer.findByIdAndUpdate(_id, { $set: saveDataObj }, { new: true });
        console.log("response",response)
        if(response){

            return { status: true, message: 'Send Your Enquiry', data: data }
        }
        else{
            return { status: false, message: 'Not Send Your Enquiry', data: data }
        }

    }
}
    

module.exports = {...customerUtils}