const Product=require('../model/productModel');


const productCtrl={
getAll: async (req,res)=>{
    try{
    const products=await Product.find();
        res.status(200).json({
               data:products,
               length:products.length
        });
        // res.json("get all works")
    }catch(err){
        return res.status(500),json({msg:err.message})
    }
},

getSingle : async (req,res)=>{
    try{
        const product=await Product.findById({_id:req.params.id})
            res.status(200).json({data:product})
        // res.json("get single works")
    }catch(err){
        return res.status(500),json({msg:err.message})
    }
},

create: async (req,res)=>{
    try{
    const{product_id,title,price,image,desc,content,stock,discount,category}=req.body;
        if(!image)
            return  res.status(400).json({msg:"no image found"});
        const product=await Product.findOne({product_id});
            if(product)
            return  res.status(400).json({msg:"this product already exist"});
        const newProduct=Product({
              
                product_id,
                title:title.toLowerCase(),
                price,image,desc,content,stock,discount,category
            })
            //  res.json({newProduct})
            await newProduct.save();
            res.status(200).json({msg:"product created succesfully"});
        }catch(err){
        return res.status(500).json({msg:err.message})
    }
},

update: async (req,res)=>{
    try{
       const{product_id,title,price,image,desc,content,stock,discount,category}=req.body;
        if(!image)
        return  res.status(400).json({msg:"no image found"});
        await Product.findByIdAndUpdate({_id:req.params.id},{
            product_id,
            title:title.toLowerCase(),
            price,image,desc,content,stock,discount,category
        })
        res.status(200).json({msg:"product updated succesfully"});
       // res.json("updatre works")
    }catch(err){
        return res.status(500),json({msg:err.message})
    }
},

delete: async (req,res)=>{
    try{
        // res.json("delete works")
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Deleted  succesfully"});
    }catch(err){
        return res.status(500),json({msg:err.message})
    }
}

}

module.exports=productCtrl