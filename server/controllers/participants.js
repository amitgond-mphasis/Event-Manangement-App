const mongoose = require('mongoose');
const Competition = require("../models/Competition");

exports.addParticipants = async (req, res, next) => {
  
  const { comp_name,comp_participants} = req.body;

    if(!comp_name || !comp_participants ){
      return res.status(400).send("Please fill in all the required fields!")
    }
  try {
    const found_comp = await Competition.findOne({comp_name:comp_name});
    // console.log("rerturn obj",found_comp);
    if(!found_comp){
      return res.status(400).json({msg:"No such Competition."});
    }

    let x= comp_participants.split(",").length;
    let str="";
    for(let i=0;i<x;i++){
      str+="0";
    }
    found_comp.comp_participants= comp_participants;
    found_comp.rating= str;

    // console.log("dddddd:::",found_comp);
    const comp = await Competition.updateOne({comp_name:comp_name},found_comp)
    // console.log("out",benefit);
   
    return res
      .status(200)
      .json({comp});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};



exports.getAllParticipants = async (req, res, next) => {
 
  // console.log("req",req);
  try {
    const comps = await Competition.find({});
    // console.log("comps",comps);
    if(comps.length===0){
      return res.status(404).json({msg:"No Competitions"})
    }
    
    return res
      .status(200)
      .json({comps});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};






exports.updateParticipantById = async (req, res, next) => { 


  const { comp_participants} = req.body;

  
  if(!comp_participants ){
    return res.status(400).send("Please fill in all the required fields!")
  }
  try {

    const found_comp = await Competition.findOne({comp_id:Number(req.params.id)});
    if(!found_comp){
      return res.status(404).json({msg:"No Competition with this Id."});
    }
    // const partObj = {  comp_name, comp_type };
    found_comp.comp_participants=comp_participants
    const comp = await Competition.updateOne({comp_id:Number(req.params.id)},found_comp)
    // console.log("out",benefit);
    return res
      .status(200)
      .json({comp});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


exports.deleteParticipantById = async (req, res, next) => {
 
  // const {comp_participants}=req.body;

  // console.log("del new",comp_participants);
  try {
    const found_comp = await Competition.findOne({comp_id:Number(req.params.id)});
    if(!found_comp){
      return res.status(404).json({msg:"No Competition with this Id."});
    }
    // found_comp.comp_participants=comp_participants
    found_comp.comp_participants=null;
    const comps = await Competition.updateOne({comp_id:Number(req.params.id)},found_comp)
    return res
      .status(200)
      .json({comps});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

