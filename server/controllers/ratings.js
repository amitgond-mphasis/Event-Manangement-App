const mongoose = require('mongoose');
const Competition = require("../models/Competition");



// exports.getResult = async (req, res, next) => {
// //  console.log("req rs".req.body);
//   try {
//     const comps = await Competition.find({});
//     console.log("comps",comps);
//     if(comps.length===0){
//       return res.status(404).json({msg:"No Competitions"})
//     }
//     let top3= comps.sort((a,b)=>b.rating-a.rating).slice(0,3)
//     console.log("top3",top3);
//     return res
//       .status(200)
//       .json({top3});
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };



exports.getResult = async (req, res, next) => {

 
  //  console.log("req rs".req.body);
    try {
      const comps = await Competition.find({});
      console.log("comps",comps);
      if(comps.length===0){
        return res.status(404).json({msg:"No Competitions"})
      }

      let winners=[];
      function top3(comp){
        let top3=[];
        let nameList=comp.comp_participants.split(",")
        console.log("names",nameList);
        let rateList=comp.rating.toString().split("")
        console.log("rate",rateList);
        let first ={}
        first.comp_name=comp.comp_name;
        first.comp_type=comp.comp_type;
        let temp= [...rateList].sort((a,b)=>b-a);
        let firstIdx=rateList.indexOf(temp[0])
        let firstPart=nameList[firstIdx];
        first.name=firstPart;
        first.rate=temp[0]
        first.pos=1;
        // first[firstPart]=temp[0]

        let second ={}
        second.comp_name=comp.comp_name;
        second.comp_type=comp.comp_type;
        let temp2= [...rateList].sort((a,b)=>b-a);
        let secondIdx=rateList.indexOf(temp2[1])
        let secondPart=nameList[secondIdx];
        second.name=secondPart;
        second.rate=temp2[1]
        second.pos=2;
        // second[secondPart]=temp2[1]

        let third ={}
        third.comp_name=comp.comp_name;
        third.comp_type=comp.comp_type;
        let temp3= [...rateList].sort((a,b)=>b-a);
        let thirdIdx=rateList.indexOf(temp3[2])
        let thirdPart=nameList[thirdIdx];
        third.name=thirdPart;
        third.rate=temp3[2]
        third.pos=3;
        // third[thirdPart]=temp3[2]
        console.log(first,second,third);


        top3.push(first,second,third);

        return top3;

    
  
      }


      for(let comp of comps){
        let t3=top3(comp);
        winners.push(...t3)
      }

      
      






      return res
        .status(200)
        .json({winners});
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };




exports.getAllRatings = async (req, res, next) => {
 
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






// exports.updateRatingsById = async (req, res, next) => { 
  

//   const { rating,comp_id} = req.body;
  

//   if(!rating || !comp_id){
//     return res.status(400).send("Please fill in all the required fields!")
//   }
//   try {

//     const found_comp = await Competition.findOne({comp_id:comp_id});
//     if(!found_comp){
//       return res.status(404).json({msg:"No Competition with this Id."});
//     }
//     console.log("found ",found_comp);
//    console.log("comp", rating);
//     found_comp.rating=Number(rating)
    
//     const comp = await Competition.updateOne({comp_id:comp_id},found_comp)
//     // console.log("out",benefit);
//     return res
//       .status(200)
//       .json({comp});
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };



exports.updateRatingsById = async (req, res, next) => { 
  

  const { rating} = req.body;
  

  if(!rating){
    return res.status(400).send("Please fill in all the required fields!")
  }
  try {

    const found_comp = await Competition.findOne({comp_id:Number(req.params.id)});
    if(!found_comp){
      return res.status(404).json({msg:"No Competition with this Id."});
    }
    console.log("found ",found_comp);
   console.log("comp", rating);
    found_comp.rating=Number(rating)
    
    const comp = await Competition.updateOne({comp_id:Number(req.params.id)},found_comp)
    // console.log("out",benefit);
    return res
      .status(200)
      .json({comp});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// exports.deleteCompetitionById = async (req, res, next) => {
 
//   try {
//     const found_comp = await Competition.findOne({comp_id:Number(req.params.id)});
//     if(!found_comp){
//       return res.status(404).json({msg:"No Competition with this Id."});
//     }
//     const comps = await Competition.deleteOne({comp_id:Number(req.params.id)})
    
//     return res
//       .status(200)
//       .json({comps});
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

