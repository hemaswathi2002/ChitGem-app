const Jewels = require('../models/jewel-model')

const jewelsCltr = {}



jewelsCltr.create = async (req, res) => {
    try {
      const images = req.files.map(file => file.path);
      console.log(images)
      const {shopId,price,caption} = req.body
      const jewel = new Jewels({
        shopId : shopId,
        images: images,
        price : price,
        caption : caption
      })
      console.log(jewel)
      const savedJewel = await jewel.save();
  
      res.status(200).json({ message: 'Files uploaded successfully!', jewel: savedJewel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// jewelsCltr.create = async(req,res)=>{
//     try{
//         const {body} = req
//         const jewel = new Jewels(body)
//         const response = await jewel.save()
//         res.status(201).json(response)
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({errors:'Internal Server Error'})
//     }
// }

jewelsCltr.get = async(req,res) =>{
    try{
        const jewel = await Jewels.find()
        res.json(jewel)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

jewelsCltr.update = async(req,res)=>{
    try{
        const id = req.params.id
        const {body} = req
        const jewel = await Jewels.findOneAndUpdate({_id:id},body,{new:true})
        res.json(jewel)
    }
    catch(err){
        console.log(err)
        res.statu(500).json({errors:'Internal Server Error'})
    }
}

jewelsCltr.delete = async(req,res) => {
    try{
        const id = req.params.id
        const jewel = await Jewel.findOneAndDelete({_id:id})
        res.json(jewel)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

module.exports = jewelsCltr



