// Things here will be exucted once loaded once so the location of objects is
// here
mainCube.rotation.x += -0.05;
mainCube.rotation.y += 0.05;
mainCube.position.x += 0;
mainCube.position.y += 70;
mainCube.position.z += 10;

// logos, models, etc...
logoCube.position.x += -500;
logoCube.position.y += 100;
logoCube.position.z += 0;
logoCube.rotation.y += (-90 * Math.PI / 180);

secCube.position.x += 500;
secCube.position.y += 130;
secCube.position.z += 100;
secCube.rotation.y += (90 * Math.PI / 180);

sCube1.position.x += 100;
sCube1.position.y += 100;

sCube2.position.x += 100;
sCube2.position.y += 70;

sCube3.position.x += 100;
sCube3.position.y += 40;

sCube4.position.x += -100;
sCube4.position.y += 100;

sCube5.position.x += -100;
sCube5.position.y += 70;

sCube6.position.x += -100;
sCube6.position.y += 40;

// Give sCube2 a little off-set to start with to make things more interesting
sCube2.rotation.y += 2;
sCube3.rotation.y += 4;
sCube4.rotation.y += 2;
sCube5.rotation.y += 4;
sCube6.rotation.y += 6;


function Animations() {
  this.animateRandomRotation = function (obj){
    obj.rotation.x += -0.01;
    obj.rotation.y += 0.01;
    obj.position.z += 0.01;
  };

  this.animateXRotation = function (obj,speed){
    obj.rotation.x += speed;
  };

  this.animateYRotation = function (obj,speed){
    obj.rotation.y += speed;
  };

  this.animateZRotation = function (obj,speed){
    obj.rotation.z += speed;
  };

  this.animateZPosition = function (obj,speed){
    obj.position.z += speed;
  };

}
//function animateRandomRotation
