const productsSchema= require("../models/productsSchema");

const getAllProducts= async(req, res)=> {
    const {company, feature, name, sort, select}= req.query;
    const querySearch={};

    if(company) {
        querySearch.company=company;      
    }
    if(feature) {
        querySearch.feature=feature;
    }
    if(name) {
        // this will ake sure the name is case insensitive
        querySearch.name = {$regex: name, $options: "i"};
    }

    let apipData= productsSchema.find(querySearch);
    if(sort) {
        let sortRemoveSpace= sort.spilt(",").join(" ");
        apipData=apipData.sort(sortRemoveSpace);
    }
    if(select) {
        let selectRemoveSpace= select.spilt(",").join(" ");
        apipData=apipData.select(selectRemoveSpace);    
    }
    // for pagination
    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit) || 2;
    let skip=(page-1)*limit;

    // pehle ke 3 data ko skip kro and uske baad ke 2 (limit) data dikhao
    apipData=apipData.skip(skip).limit(limit); 

    const Products= await apipData;
    res.status(200).json({Products, nbHits: Products.lenght});
}

const getAllProductsTesting= async(req, res)=> {
    const data= await productsSchema.find(req.query);
    res.status(200).json({data});
}


module.exports= {getAllProducts, getAllProductsTesting};