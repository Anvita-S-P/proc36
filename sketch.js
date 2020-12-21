//Create variables here


var dog ,happyDog ,database , food,foodStock;
var dogImage,happyDogImage;
var feedPet,addFood,lastFed,feedTime,foodObj;







function preload()
{
  //load images here
  
 dogImage = loadImage("images/dogImg.png");
 happyDogImage = loadImage("images/dogImg1.png");





}

function setup() {
  createCanvas(1000,400);
  
   dog=createSprite(700,250,20,20);
   dog.addImage(dogImage);
   dog.scale=0.2;
   database=firebase.database();
   foodStock=database.ref("food");
   foodStock.on("value",readStock);


foodObj=new Food();

feed=createButton("feed the dog");
feed.position(380,60);
feed.mousePressed(feedDog);

add=createButton("add Food")
add.position(800,60);
add.mousePressed(addFood);


feedTime=database.ref("feedTime");
feedTime.on("value",function(data){
  lastFed=data.val();
})


  
}


function draw() {  

  background(46,139,87);
  //add styles here

  
  drawSprites();
    
   

  
  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last fed : " +lastFed%12 + "PM" ,250,30);

  }
  else if(lastFed===0){
    text("last fed : 12AM",250,30);

  }
  else{
    text ("last fed : " + lastFed+"AM",250,30);

  }
 
  
}


function readStock(data){
  food=data.val();
  foodObj.foodStock = food;
}


 


function addFood(){
  
    food++
    database.ref('/').update({
        food:food
    })
     
  
}

function feedDog(){
  dog.addImage(dogImage);
  foodObj.foodStock = foodObj.foodStock - 1;
  database.ref('/').update({
    food:foodObj.foodStock,
    feedTime:hour()
  })
}















