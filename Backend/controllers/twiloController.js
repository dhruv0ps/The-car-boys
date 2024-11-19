const twilioService = require("../services/twilioService");
const Lead = require("../config/models/leadModel");

const sendSMS = async(req,res) => {
    try{
     const id = req.params
     const msgdata  = req.body
     if(!id ){
        return res.status(400).json({
            success : false,
            error : "Id is required"
        })
     }

    
     const lead = await Lead.findById(id);
     if (!lead) {
        return res.status(404).json({
          success: false,
          error: 'Lead not found.',
        });
      }

      const phoneNumber = lead.phoneNumber;
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is missing for this lead.',
      });
    }

     const response = await twilioService.sendSMS(phoneNumber,msgdata)
     return res.status(201).json( {   success: true,message :"Message has been sent successfully",  response});
             
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to sent message",
            error: error.message || "Internal server error",
          });

    }
}

module.exports ={sendSMS}