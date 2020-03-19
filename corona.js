
window.addEventListener('DOMContentLoaded', (event) =>{


    let squidwidth = 3
    
    let clickedf = 0

    let squiddirection  = 1

    let tension = 75000

    let tensionx = 750

    let ballfric = 0.99

    let clickspot = {}

    let clickednew = 0

    let hatched = 0

    let deathballs = []
    let squiddeathballs = []
    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


    let tutorial_canvas = document.getElementById("tutorial");



    let offscreen = {}
    offscreen.x = -(Math.random()*tutorial_canvas.width)
    offscreen.y = -(Math.random()*tutorial_canvas.height)
    
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

//    tutorial_canvas_context.scale(.5, .5);  // this scales the canvas
    tutorial_canvas.style.background = "#FFFFFF"


    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        draw(){



            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width

            tutorial_canvas.style.s
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x1, this.y1); 
            
            tutorial_canvas_context.lineTo(this.x2, this.y2); 
            tutorial_canvas_context.stroke();  


            tutorial_canvas_context.lineWidth = 1
        }
    }


    class Nibblet{
        constructor(center){
            this.center = center
            this.edges = []
            this.fooddeath()

        }
        move(){

            this.center.x += this.center.xmom
            this.center.y += this.center.ymom
            for(let e = 0; e<this.edges.length; e++){
                this.edges[e].x += this.center.xmom
                this.edges[e].y += this.center.ymom


            }


        }
        draw(){
            this.center.draw()
            for(let e = 0; e<this.edges.length; e++){
                this.edges[e].draw()


            }
        }
        fooddeath(){
            let rotx = 0
            let roty = 0
            let deathrays = 8
            for(let g = 0; g < deathrays; g++){
                let dot1 = new Circle(this.center.x, this.center.y, this.center.radius/3, this.center.color, Math.cos(rotx), Math.sin(roty) )
                dot1.move()
                dot1.move()
                dot1.move()
                dot1.move()
                dot1.move()
                // dot1.move()
                this.edges.push(dot1)
                rotx += 2*Math.PI/deathrays
                roty += 2*Math.PI/deathrays
            }
        }

    }

    class Scuttlefish{
        constructor(center){
            this.center = center
            this.edges = []
            this.runner = Math.random()*Math.PI*2

        }
        eye(){

            tutorial_canvas_context.strokeStyle = "#FFFFFF"
            tutorial_canvas_context.lineWidth = .33
            
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.center.x, this.center.y, this.center.radius/1.41, 0, (Math.PI*2), true)
           tutorial_canvas_context.fill()
           tutorial_canvas_context.stroke(); 

            tutorial_canvas_context.stroke(); 
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.center.x, this.center.y, this.center.radius/2, 0, (Math.PI*2), true)
           tutorial_canvas_context.fill()
           tutorial_canvas_context.stroke(); 

            tutorial_canvas_context.stroke(); 
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.center.x, this.center.y, this.center.radius/4, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = "red"
           tutorial_canvas_context.fill()
           tutorial_canvas_context.stroke(); 

        }
        move(){


            if(eggs.length === 0){

            this.center.ymom = (circ.y-this.center.y)/75
            this.center.xmom = (circ.x-this.center.x)/75

            }else{

                this.center.ymom = (offscreen.y-this.center.y)/750
                this.center.xmom = (offscreen.x-this.center.x)/750

            }

            // console.log(this)


            this.center.x += this.center.xmom
            this.center.y += this.center.ymom
            
            // this.center.simplemove()
            // this.center.simplemove()
            // this.center.simplemove()
            // this.center.simplemove()
            for(let e = 0; e<this.edges.length; e++){
                this.edges[e].simplemove()
                this.edges[e].x += this.center.xmom
                this.edges[e].y += this.center.ymom

                if(intersects(circ, this.edges[e])){

                    // deathballs = []

                    if(istoward(this.center, this.edges[e])){

                        circ.xmom = -this.edges[e].xmom/3
                        circ.ymom = -this.edges[e].ymom/3

                    }
                }

                for(let h = 0; h<boxes.length; h++){

                    if(squarecircle(boxes[h],this.edges[e])){
                        boxes[h].xmom = (this.edges[e].xmom+this.center.xmom)/2
                        boxes[h].ymom = (this.edges[e].ymom+this.center.ymom)/2

                    }
                }

                if(intersects(circ, this.center)){

            //    circ.radius = 0
               circ.color = "transparent"
               circ.truecolor = "transparent"
                }



            }
            // this.center.simplemove()
            for(let e = 0; e<this.edges.length; e++){

                this.edges[e].radius *= .94

                if(this.edges[e].radius < 2.9){
                    this.edges.splice(e,1)

                }

            }

            this.scuttle()

        }
        draw(){
            this.center.draw()
            // this.eye()
            for(let e = 0; e<this.edges.length; e++){
                this.edges[e].draw()


            }
        }
        scuttle(){
            this.runner -= 0.03
            let rotx = this.runner
            let roty = this.runner
            let cloroholder = getRandomDarkColor()

            if(Math.random() < .8){

                cloroholder = 'black'
            }
            let deathrays = 14// Math.PI*5
            for(let g = 0; g < deathrays; g++){
                let dot1 = new Circle(this.center.x, this.center.y, this.center.radius/1, cloroholder, 2.74*Math.cos(rotx), 2.74*Math.sin(roty) )
                // dot1.move()
                this.edges.push(dot1)
                rotx += 4*Math.PI/deathrays
                roty += 2*Math.PI/deathrays
            }
        }

    }


    class Squiddledoot{
        constructor(head){
            this.head = head
            this.target = eggs[Math.floor(Math.random()*eggs.length)]

        }
        live(){

            if(eggs.length == 0){
                for(let s = 0; s<squids.length; s++){
        
                    squids[s].target = offscreen
        
                }
    
                
            }else{
                for(let s = 0; s<squids.length; s++){
        
                    if(squids[s].target == offscreen){
                    squids[s].target = eggs[Math.floor(Math.random()*eggs.length)]
                    }
        
                }

            }
            this.head.draw()
            squiddeath(this.head)

            for(let d = 0; d < deathballs.length; d++){
                if(intersects(deathballs[d],this.head)){
                    this.head.xmom = (deathballs[0].xmom+deathballs[d].xmom)
                    this.head.ymom = (deathballs[0].ymom+deathballs[d].ymom)
                    squiddirection = 1

                    if(eggs.length !== 0){

                        this.target = eggs[Math.floor(Math.random()*eggs.length)]

                    }else{

                    for(let s = 0; s<squids.length; s++){
                        squids[s].target = offscreen
                    }
                    }
                }
            }

            this.head.move()
            this.head.move()
            this.head.ymom += (this.target.y-this.head.y)/tension
            this.head.xmom += (this.target.x-this.head.x)/tension
            this.head.y += (this.target.y-this.head.y)/tensionx
            this.head.x += (this.target.x-this.head.x)/tensionx


        }

    }


    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.radius = (width+height)/4
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.xmom *= .9975
            this.ymom *= .9975
            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.truecolor = color
        }       
         draw(){

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = 1


            if(this === scut.center || scut.edges.includes(this)){

                tutorial_canvas_context.strokeStyle = "#FFFFFF"
                tutorial_canvas_context.lineWidth = .5

            }
            if(this.radius === 10){

                tutorial_canvas_context.strokeStyle = "#000000"
                tutorial_canvas_context.lineWidth = 1

            }


            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 


            if(this.radius == 10){

                tutorial_canvas_context.strokeStyle = "#FFFFFF"
                tutorial_canvas_context.lineWidth = .33
                
                tutorial_canvas_context.beginPath();
                tutorial_canvas_context.arc(this.x, this.y, this.radius/1.41, 0, (Math.PI*2), true)
               tutorial_canvas_context.fill()
               tutorial_canvas_context.stroke(); 
    
                tutorial_canvas_context.stroke(); 
                tutorial_canvas_context.beginPath();
                tutorial_canvas_context.arc(this.x, this.y, this.radius/2, 0, (Math.PI*2), true)
               tutorial_canvas_context.fill()
               tutorial_canvas_context.stroke(); 
    
                tutorial_canvas_context.stroke(); 
                tutorial_canvas_context.beginPath();
                tutorial_canvas_context.arc(this.x, this.y, this.radius/4, 0, (Math.PI*2), true)
                tutorial_canvas_context.fillStyle = "red"
               tutorial_canvas_context.fill()
               tutorial_canvas_context.stroke(); 

            }

        

        }
        unmove(){

            this.x -= this.xmom
            this.y -= this.ymom

        }
        simplemove(){


            this.x += this.xmom
            this.y += this.ymom
        }
        move(){

            if(deathballs.includes(this) ){

                this.xmom*= ballfric
                this.ymom*=  ballfric  //friction

            }
            if(!deathballs.includes(this) ){

                this.xmom*=.991
                this.ymom*=.991 //friction

            }

            if(clickedf == 1){
                if(deathballs.includes(this) ){
    
                    this.x += this.xmom/6
                    this.y += this.ymom/6
                }else{

                    this.x += this.xmom
                    this.y += this.ymom
                }

            }else{

                this.x += this.xmom
                this.y += this.ymom

            }

            if(this == circ){

                if(this.x+this.radius > tutorial_canvas.width){

                    if(this.xmom > 0){
                    this.xmom *= -1
                    }
    
                }
                if(this.y+this.radius > tutorial_canvas.height){
                    if(this.ymom > 0){
                    this.ymom *= -1
                    }
    
                }
                if(this.x-this.radius < 0){
                    if(this.xmom < 0){
                        this.xmom *= -1
                    }
    
                }
                if(this.y-this.radius < 0){
    
                    if(this.ymom < 0){
                        this.ymom *= -1
                    }
            
                }
    
            }
            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }

    // let x = 0
    // let y = 0

    let boxes = []
    let food = []




    let circ = new Circle(350, 350, 7, "purple", 0,0)  // starts with ramndom velocities and color


    let scuttler = new Circle(-100, -100, 10, "Black", 0*Math.random(),0)  // starts with ramndom velocities and color

    let scut = new Scuttlefish(scuttler)

     for(let h = 0 ; h<50; h++){

        let rect = new Rectangle ( Math.random()*tutorial_canvas.width, Math.random()*tutorial_canvas.height, 10, 10, "black")
        boxes.push(rect)

    }  //generates random squares

    // let spareboxes = [...boxes]

    let egg = new Circle((tutorial_canvas.width/4)+(Math.random()*tutorial_canvas.width)/2, (tutorial_canvas.height/4)+(Math.random()*tutorial_canvas.height)/2, 4, "red", 0,0)  


    let eggs = []


    eggs.push(egg)

    let otheregg2 = new Circle((tutorial_canvas.width/4)+(Math.random()*tutorial_canvas.width)/2, (tutorial_canvas.height/4)+(Math.random()*tutorial_canvas.height)/2, 4, "red", 0,0)  
    eggs.push(otheregg2)

    let otheregg = new Circle((tutorial_canvas.width/4)+(Math.random()*tutorial_canvas.width)/2, (tutorial_canvas.height/4)+(Math.random()*tutorial_canvas.height)/2, 4, "red", 0,0)  
    let squid2 = new Circle(500, 500, 2, "green", 0,0)  

    eggs.push(otheregg)

    let squider1 = new Squiddledoot(squid2)
    let squid1 = new Circle(200, 200, 2, "orange", 0,0)  


    let squider2 = new Squiddledoot(squid1)
    let squids = []

    squids.push(squider1)
    squids.push(squider2)


    deathballs.push(circ)


    for(let s = 0; s<eggs.length; s++){

        eggs[s].health = 3

    }
    let recthole = new Rectangle(5,5,tutorial_canvas.width-10, tutorial_canvas.height-10, "#FFFFFF")

// interval, fill this with game logic 
    window.setInterval(function(){ 
        // console.log(deathballs)
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height) 


        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
        // rect.draw()
        // egg.draw()
        // for(let q = 0; q< food.length; q++){

        //     food[q].draw()
        
        // }


        if(eggs.length == 0){
            for(let s = 0; s<squids.length; s++){
    
                squids[s].target = circ
    
            }

            
        }
        for(let s = 0; s<eggs.length; s++){

            eggs[s].draw()
            eggs[s].simplemove()

        }
        for(let s = 0; s<squids.length; s++){
            for(let e = 0; e<eggs.length; e++){
                if(intersects(squids[s].head, eggs[e])){
                    eggs[e].health -= 1

                    if(eggs[e].health <= 0){
                        eggs.splice(e,1)

                        for(let g = 0; g<squids.length; g++){
                            squids[g].target = eggs[Math.floor(Math.random()*eggs.length)]
                        }
                    }
                }
            }
        }
        for(let s = 0; s<squids.length; s++){
            squids[s].live()
        }
    for(let h = 0 ; h<boxes.length; h++){

        // death(boxes[h])
        boxes[h].draw()


    }
        circ.draw()
        if(wiggler%4 == 0){


        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
            death(circ)

            if(!deathballs.includes(circ)){
                deathballs.push(circ)
            }
        }
        if(circ.color != "transparent"){

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
            players(circ)

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
        }
        circ.move()
        for(let d = 0; d < deathballs.length; d++){


        if(boxes.length == 0){

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
            deathballs[d].draw()  

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
             deathballs[d].move()

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
        }else{
        
            if(d < deathballs.length-10){

            // if(typeof deathballs[d+59] != "undefined"){

            if(typeof deathballs[d-10] != "undefined"){

                if(deathballs[d] !== circ && deathballs[d-9] !== circ){

         let beam = new Line(deathballs[d].x, deathballs[d].y, deathballs[d-9].x, deathballs[d-9].y, deathballs[d].color, deathballs[d].radius*2)
         beam.draw()
                }
        
        }
    // }
            }else{

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
                deathballs[d].draw()  

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
            }
            
            // deathballs[d].draw()
            deathballs[d].move()

        }
            for(let h = 0 ; h<boxes.length; h++){
        
                if(circlesquare(deathballs[d], boxes[h])){
                    boxes[h].xmom = deathballs[d].xmom
                    boxes[h].ymom = deathballs[d].ymom
    
                }
            }
            if(deathballs[d] !== circ){

                deathballs[d].radius *= .965

            }
            // wiggle(deathballs[d])
        }
        for(let d = 0; d < deathballs.length; d++){
            if(deathballs[d].radius < .9){

        if(!deathballs.includes(circ)){
            deathballs.push(circ)
        }
                deathballs.splice(d,9)

                if(!deathballs.includes(circ)){
                deathballs.push(circ)
                }
            }
        }
        // for(let d = 0; d < deathballs.length; d++){
        //     death(deathballs[d])
        // }
for(let d = 0; d < squiddeathballs.length; d++){
    squiddeathballs[d].draw()
    squiddeathballs[d].move()
            for(let h = 0 ; h<boxes.length; h++){
        
                if(squarecircle(boxes[h],squiddeathballs[d])){
                    boxes[h].xmom = squiddeathballs[d].xmom
                    boxes[h].ymom = squiddeathballs[d].ymom
    
                }
            }
            squiddeathballs[d].radius *= 1.05
            // wiggle(deathballs[d])
        }
        for(let d = 0; d < squiddeathballs.length; d++){
            if(squiddeathballs[d].radius > squidwidth){
                squiddeathballs.splice(d,6)
            }
        }

        for(let h = 0 ; h<boxes.length; h++){

            boxes[h].move()
            boxes[h].move()
    
            boxes[h].move()
    
                if(squaresquare(recthole, boxes[h]) == false){
                    // death(boxes[h])
                    boxes.splice(h, 1)
                }
    
        }
        for(let h = 0 ; h<boxes.length; h++){
    
         if(boxes[h].width*boxes[h].height < 100){
            boxes[h].width *= 1.1
            boxes[h].height *= 1.1

         }
    
        }


for(let q = 0; q< food.length; q++){
    for(let d = 0; d < deathballs.length; d++){
        if(intersectsfood(deathballs[d],food[q].center)){
            if(istowarder(circ, deathballs[d])){
                food[q].center.xmom = -deathballs[d].xmom
                food[q].center.ymom = -deathballs[d].ymom


            }

        }
        if(intersects(circ, food[q].center)){
            food.splice(q,1)
            if(circ.radius<7){

                circ.radius += .5

            }else{
                food = []

                // boxes = [...spareboxes]


                ballfric = .99


     for(let h = 0 ; h<50; h++){

        let rect = new Rectangle ( Math.random()*tutorial_canvas.width, Math.random()*tutorial_canvas.height, .01, .01, "black")
        boxes.push(rect)

    }

                eggs = []


     egg = new Circle((tutorial_canvas.width/4)+(Math.random()*tutorial_canvas.width)/2, (tutorial_canvas.height/4)+(Math.random()*tutorial_canvas.height)/2, 4, "red", 0,0)  
     egg.truecolor = getRandomDarkColor()
     eggs.push(egg)
   
     otheregg2 = new Circle((tutorial_canvas.width/4)+(Math.random()*tutorial_canvas.width)/2, (tutorial_canvas.height/4)+(Math.random()*tutorial_canvas.height)/2, 4, "red", 0,0)  
   
     otheregg2.truecolor = getRandomDarkColor()
     eggs.push(otheregg2)
     otheregg = new Circle((tutorial_canvas.width/4)+(Math.random()*tutorial_canvas.width)/2, (tutorial_canvas.height/4)+(Math.random()*tutorial_canvas.height)/2, 4, "red", 0,0)  
     otheregg.truecolor = getRandomDarkColor()
     eggs.push(otheregg)


    for(let s = 0; s<eggs.length; s++){

        eggs[s].health = 3

    }

            }
            if(ballfric < .999){
            ballfric += .001
        }

        }
    }
    food[q].move()
    food[q].move()
    food[q].move()
    food[q].move()
    food[q].draw()
    
}


// circ.draw()


    tension *= .99999

    // wiggler++

    death(circ)
    if(boxes.length == 0){


        if(hatched !== 1){

            // deathballs = []

            for(let e = 0;  e<eggs.length; e++){
                let colorer = getRandomDarkColor()
                eggs[e].color = colorer
                eggs[e].truecolor = colorer
        
            }

        }
        hatched = 1

        if(clickednew == 0){
        tutorial_canvas.onclick = resetplayer
        tutorial_canvas_context.fillStyle = "Black";
        tutorial_canvas_context.font = "40px Arial";
        if(eggs.length !== 0){
        tutorial_canvas_context.fillText(`Congratulations! ${eggs.length} survived!`, 115, 100);
        tutorial_canvas_context.fillText(`    Click one to play again.`, 115, 150);
        }else{
            tutorial_canvas_context.fillText(`Sorry, ${eggs.length} survived`, 115, 100);
        }
        }
            


    }else{

        clickednew = 0
    }
    for(let e = 0;  e<eggs.length; e++){
        if(boxes.length == 0){


            eggs[e].color = eggs[e].truecolor
            eggdeath(eggs[e])

            if(!squarecircle(recthole, eggs[e])){
                eggs.splice(e,1)

            }

        }

    }
    // wiggle(circ)


    
    scut.move()
    scut.draw()
    }, 20) // length of refresh interval

    let wiggler = 0

    function wiggle(target){

        if(wiggler%12 < 3){

            target.xmom += 1

        }else if(wiggler%12 < 6){

            target.xmom -= 1

        }else if(wiggler%12 < 9){

            target.ymom += 1

        }else{

            target.ymom -= 1

        }

        wiggler++
    }
    let start = 0
    let squidstart = 0
    let eggstart = 0


    function istoward(goal, test){

        if(test.ymom < 0){
            if((test.y-goal.y) > 0){
                return false
            }
        }else{
            if((test.y-goal.y) < 0){
                return false
            }
        }
        if(test.xmom < 0){
            if((test.x-goal.x) > 0){
                return false
            }
        }else{
            if((test.x-goal.x) < 0){
                return false
            }

        }

        return true

    }
    function istowarder(goal, test){

        if(test.ymom < 0){
            if((test.y-goal.y) > 0){
                return false
            }
        }else{
            if((test.y-goal.y) < 0){
                return false
            }
        }
        if(test.xmom < 0){
            if((test.x-goal.x) > 0){
                return false
            }
        }else{
            if((test.x-goal.x) < 0){
                return false
            }

        }

        return true

    }

    function eggdeath(body){
        //Math.random()

        body.health = 99999
            eggstart -= .0066

        
        let rotx = start
        let roty = start
        let deathrays = Math.floor(Math.random()*25)+2
        deathrays = 9
        for(let g = 0; g < deathrays; g++){
            let dot1 = new Circle(body.x, body.y, body.radius/2, body.color, Math.cos(rotx), Math.sin(roty) )
            deathballs.push(dot1)
            rotx += 2*Math.PI/deathrays
            roty += 2*Math.PI/deathrays
        }
    }
    function death(body){
        //Math.random()
        start += .02
        let rotx = start
        let roty = start
        let deathrays = Math.floor(Math.random()*25)+2
        deathrays = 9
        for(let g = 0; g < deathrays; g++){
            let dot1 = new Circle(body.x, body.y, body.radius/2, body.color, Math.cos(rotx), Math.sin(roty) )
            deathballs.push(dot1)
            rotx += 2*Math.PI/deathrays
            roty += 2*Math.PI/deathrays
        }
    }

    function squiddeath(body){
        //Math.random()
        squidstart +=  .012
        let rotx = squidstart
        let roty = squidstart
        let deathrays = Math.floor(Math.random()*25)+2
        deathrays = 6
        for(let g = 0; g < deathrays; g++){
            let dot1 = new Circle(body.x, body.y, body.radius/2, body.color, Math.cos(rotx), Math.sin(roty) )
            squiddeathballs.push(dot1)
            rotx += 2*Math.PI/deathrays
            roty += 2*Math.PI/deathrays
        }
        if(squiddirection == 1){
            if(squidwidth > 1){

                squidwidth -= 0.1
            }
        }else{
            squidwidth += 0.1
        }
        if(squidwidth < 1.5){
            squiddirection = 0
        }else if(squidwidth > 3.5){

            squiddirection = 1

        }
    }

  function players(racer){
        if (keysPressed['w']) {
            if(racer.ymom > -2){
                if(racer.ymom > 0){
                    // racer.ymom *= .5
                }else{
                    if(racer.ymom > -2){
                    racer.ymom *= 1.05
                    }
                }
                racer.ymom -= .03
            }
        }
        if (keysPressed['a']) {
            if(racer.xmom > -2){
                if(racer.xmom > 0){
                    // racer.xmom *= .5
                }else{
                    if(racer.xmom > -2){
                    racer.xmom *= 1.05
                    }
                }
                racer.xmom -= .03
            }
        }
        if (keysPressed['s']) {
            if(racer.ymom < 2){
                if(racer.ymom < 0){
                    // racer.ymom *= .5
                }else{
                    if(racer.ymom < 2){
                    racer.ymom *= 1.05
                    }
                }
                racer.ymom += .03
            }
        }
        if (keysPressed['d']) {
            if(racer.xmom < 2){
                if(racer.xmom < 0){
                    // racer.xmom *= .5
                }else{
                    if(racer.xmom < 2){
                    racer.xmom *= 1.05
                    }
                }
                racer.xmom += .03
            }
        }
        if (keysPressed['f']) {
            racer.color = "red"
            clickedf = 1
            for(let s = 0; s<squids.length; s++){
                squids[s].target = circ
            }
        }else{
            racer.color = racer.truecolor
            if(clickedf == 1){


                if(eggs.length != 0){

                    for(let s = 0; s<squids.length; s++){
                        squids[s].target = eggs[Math.floor(Math.random()*eggs.length)]
                    }

                }else{

                    for(let s = 0; s<squids.length; s++){
                        squids[s].target = offscreen
                    }

                }
            }
            clickedf =0
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }



    // boxes = []

    let rect = tutorial_canvas.getBoundingClientRect();



    function resetplayer(e){
        rect = tutorial_canvas.getBoundingClientRect();

        clickspot.x = (e.clientX - rect.left);
        clickspot.y = (e.clientY - rect.top);


     for(let f = 0; f<eggs.length; f++){

        if(intersects(eggs[f], clickspot)){
                clickednew = 1

                for(let q = 0; q< 30; q++){

                let food1 = new Circle((Math.random()*tutorial_canvas.width), (Math.random()*tutorial_canvas.height), 2, "blue", 0,0)  
            
                let nibble = new Nibblet(food1)
            
                food.push(nibble)
            
                }

                let squix = new Circle(0, 0, 2, getRandomDarkColor(), 0,0)  

            
                let squixxer = new Squiddledoot(squix)
                squids.push(squixxer)

                tutorial_canvas.onclick = donothingdummy


                // circ = eggs[f]

                circ = new Circle(eggs[f].x, eggs[f].y, eggs[f].radius, eggs[f].color)

                deathballs = []
                deathballs.push(circ)

                eggs.splice(f,1)
                escapescreen()
        }
        
     }


    }

    function escapescreen(){
        
     for(let e = 0; e<eggs.length; e++ ){

        eggs[e].xmom = Math.random()*3
        eggs[e].ymom = Math.random()*3
        
     }
    }

    function donothingdummy(){


    }



// can check if one circle contains the cneter of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius*2;
}

function intersectsfood(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius*4;
}

// random color that will be visible on  blac backgroung
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }

  function getRandomDarkColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 13)+1)];
    }
    return color;
  }
  function getRandomDarkerColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 7)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching cnange the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}function circlesquare(a, b){

    let sqrt2 = Math.sqrt(2)
    let distr = a.radius/sqrt2

    
    a.left = a.x - a.radius
    // a.left = a.x - distr
    b.left = b.x
    a.right = a.x + a.radius  
    // a.right = a.x + distr  
    b.right = b.x + b.width
    a.top = a.y - a.radius
    // a.top = a.y - distr
    b.top = b.y
    a.bottom = a.y + a.radius
    // a.bottom = a.y + distr
    b.bottom = b.y + b.height





    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}





})