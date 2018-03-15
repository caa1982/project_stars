const mongoose         = require('mongoose');
const SpaceObjectModel = require("../models/spaceObject");

mongoose.Promise = global.Promise;

var request = require('then-jsonp');

mongoose.connect("mongodb://localhost:27017/headInTheStars")


    var query = {object: "star"}

// setInterval(() => {
//     SpaceObjectModel.find({object: "star"}).then(res => {
     
        
       
//         res.forEach(el => {
            
//             if(el.hd != "undefined" || el.info != "" || el.wikipedia === "true"){
//                 return
//             } else {
               
                   
//                     console.log('el: ', el.hd);
//                     todo(el.hd) 
                
//             }
           
//         })
   

// })
// }, 20000);

SpaceObjectModel.find({object: "exoplanet"}).then(res => {

    res.slice(4000, 5000).forEach(resp => {
        console.log('resp: ', resp.name);
        
   if(resp.img === "" && res.wikipedia != "true"){
        todo(res.name)
   }
})


})

var todo = (name) => {
    var result = request('GET', 'https://en.wikipedia.org/w/api.php?action=query&origin=*&titles='+ name +'&prop=pageimages&format=json&pithumbsize=400');

    result.done(function (res) {
       
            if(res.query.pages[Object.keys(res.query.pages)].hasOwnProperty("thumbnail")){
                update(res.query.pages[Object.keys(res.query.pages)].thumbnail.source, name)
            } else(
                console.log("no img")
            )
    
        
    });
}


var update = (img, name) => { SpaceObjectModel.findOneAndUpdate({name: name}, {img:img, wikipedia: "true"}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        
            console.log(name)
            console.log(text)
        
        
    })
}

