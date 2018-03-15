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

SpaceObjectModel.find({object: "star"}).then(res => {
  
    var count = 0;
    res.forEach(resp => {
        
        if(resp.price === 0.015 || resp.name === "Sun" || !isNaN(number(resp.name))){
            return
        } else {
            SpaceObjectModel.findOneAndUpdate({hd: resp.hd}, {price:10}, {new: true}, function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
                    count++
                    console.log("asved", count)
                    
                
                
            })
        }
        
         
    })
})



// var todo = (name) => {
 
//     var result = request('GET', 'https://en.wikipedia.org/w/api.php?action=query&origin=*&titles='+ name +'&prop=pageimages&format=json&pithumbsize=400');
    
//     result.done(function (res) {
       
//             if(res.query.pages[Object.keys(res.query.pages)].hasOwnProperty("thumbnail")){
//                update(res.query.pages[Object.keys(res.query.pages)].thumbnail.source, name)
//             } else{
//                 return
//             }
    
        
//     });
// }


// var update = (img, name) => { SpaceObjectModel.findOneAndUpdate({name: name}, {img:img}, {new: true}, function(err, doc){
//         if(err){
//             console.log("Something wrong when updating data!");
//         }
        
//             console.log("asved")
            
        
        
//     })
// }

