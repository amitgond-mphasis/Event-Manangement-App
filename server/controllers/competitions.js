const mongoose = require('mongoose');
const Competition = require("../models/Competition");

exports.addCompetition = async (req, res, next) => {
  
  const { comp_name, comp_type,comp_id} = req.body;
  console.log(typeof comp_id);
    if(!comp_name || !comp_type || !comp_id ){
      return res.status(400).send("Please fill in all the required fields!")
    }
  try {
    const found_comp = await Competition.findOne({comp_id:Number(req.body.comp_id)});
    console.log("rerturn obj",found_comp);
    if(found_comp){
      return res.status(403).json({msg:"Already Competition with this Id."});
    }
   
    const compObj = { comp_name, comp_type,comp_id };
    const comp = await new Competition(compObj).save();
   
    return res
      .status(201)
      .json({comp});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};



exports.getAllCompetitions = async (req, res, next) => {
 
  try {
    const comps = await Competition.find({});
    console.log("comps",comps);
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



exports.getCompetitionById = async (req, res, next) => {

  try {
   
    const comp = await Competition.findOne({comp_id:Number(req.params.id)});
    if(!comp){
      return res.status(404).json({msg:"No Competition with this Id."});
    }
   
    console.log("get id",comp);

    return res
      .status(200)
      .json({comp});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


exports.updateCompetitionById = async (req, res, next) => { 
  

  const { comp_name, comp_type} = req.body;

  if(!comp_name || !comp_type){
    return res.status(400).send("Please fill in all the required fields!")
  }
  try {

    const found_comp = await Competition.findOne({comp_id:Number(req.params.id)});
    if(!found_comp){
      return res.status(404).json({msg:"No Competition with this Id."});
    }
    const compObj = {  comp_name, comp_type };
    const comp = await Competition.updateOne({comp_id:Number(req.params.id)},compObj)
    // console.log("out",benefit);
    return res
      .status(200)
      .json({comp});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


exports.deleteCompetitionById = async (req, res, next) => {
 
  try {
    const found_comp = await Competition.findOne({comp_id:Number(req.params.id)});
    if(!found_comp){
      return res.status(404).json({msg:"No Competition with this Id."});
    }
    const comps = await Competition.deleteOne({comp_id:Number(req.params.id)})
    
    return res
      .status(200)
      .json({comps});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


