// Abstract Scene class, one for each scene
class Scene {
    constructor(game, character) {
        this.game = game;
        this.character = character;
        this.entities = [];
        this.inventory = new SceneInventory(this.game,this);
        this.camera = new Camera();  // Used in desert scene, TODO: use in more scenes
    };
}

class FightScene extends Scene {
    constructor(game, character, enemy) {
        super(game, character);
        this.enemy = enemy;
        // Sets up scene
        this.fightChar = new CowBoy(gameEngine,160,400,this.character);
        //this.enemy = new coyote(gameEngine,486,450);
        this.x = 0;
        this.entities.push(this.fightChar);
        this.entities.push(this.enemy);
        this.entities.push(new groundLeft(gameEngine,0,600));
        this.entities.push(new groundCen(gameEngine,84,600));
        this.entities.push(new groundCen(gameEngine,168,600));
        this.entities.push(new groundCen(gameEngine,252,600));
        this.entities.push(new groundCen(gameEngine,336,600));
        this.entities.push(new groundCen(gameEngine,420,600));
        this.entities.push(new groundCen(gameEngine,504,600));
        this.entities.push(new groundCen(gameEngine,588,600));
        this.entities.push(new groundCen(gameEngine,672,600));
        this.entities.push(new groundRig(gameEngine,756,600));
        this.entities.push(new groundLside(gameEngine,0,684));
        this.entities.push(new groundMid(gameEngine,84,684));
        this.entities.push(new groundMid(gameEngine,168,684));
        this.entities.push(new groundMid(gameEngine,252,684));
        this.entities.push(new groundMid(gameEngine,336,684));
        this.entities.push(new groundMid(gameEngine,420,684));
        this.entities.push(new groundMid(gameEngine,504,684));
        this.entities.push(new groundMid(gameEngine,588,684));
        this.entities.push(new groundMid(gameEngine,672,684));
        this.entities.push(new groundMid(gameEngine,756,684));
        //console.log(this.enemy)
        this.fightScene = new Fight(gameEngine,this.fightChar,this.enemy);
        this.entities.push(this.fightScene);
        this.entities.push(this.inventory);
         this.entities.push(new bgImageForChat(gameEngine,-40,650));
    }

}

class BankScene extends Scene {
    constructor(game, character) {
        super(game, character)

        // Sets up scene
        var TILE_WIDTH = 128;
        this.xMin = 0;
        this.xMax = 700;
        this.yMin = 0;
        this.yMax = 700;
        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            this.entities.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        
        }
    
        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.entities.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }
    
        // Make corners
        this.entities.push(new HouseTopLeftCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopRightCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.entities.push(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));
    
        this.entities.push(new HouseLeftWall(gameEngine, 3 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        // TODO: Put door here!
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 3 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomWall(gameEngine, 4 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomWall(gameEngine, 5 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        
        this.entities.push(new Money(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        this.entities.push(new Chest(gameEngine, 2.5 * TILE_WIDTH, .5 * TILE_WIDTH, false));

        this.entities.push(new Boundry(gameEngine,385,0,15,125))
        this.entities.push(new Boundry(gameEngine,385,255,15,125))
        this.entities.push(new Boundry(gameEngine,385,368,400,15))
    
        // Add beep bop boop bep cowboy
        this.entities.push(this.inventory);
        this.entities.push(new npc(gameEngine, 410, 290, "banker"));
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new OverWorldPlayer(gameEngine,384,700,this.character));
        this.entities.push(new Exit(gameEngine,350,750,false));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
    }
}

class SheriffScene extends Scene {
    constructor(game, character) {
        super(game, character)
        this.xMin = 0;
        this.xMax = 700;
        this.yMin = 0;
        this.yMax = 700;
        // Sets up scene
        var TILE_WIDTH = 128;
    
    
        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            this.entities.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        }
    
        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.entities.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            this.entities.push(new HouseBottomWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, true));
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }
    
        // Make corners
        this.entities.push(new HouseBottomRightCornerBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        this.entities.push(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.entities.push(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
    
        this.entities.push(new HouseBottomWall(gameEngine, 0 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new ClosedCage(gameEngine, 1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 2 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new ClosedCage(gameEngine, 3 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new HouseLeftWall(gameEngine, 2 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new OpenCage(gameEngine, 4.9 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new HouseLeftWall(gameEngine, 4 * TILE_WIDTH, 0 * TILE_WIDTH, false));

        this.entities.push(new Boundry(gameEngine,0,240,760,15))
        
    
        // Add beep bop boop bep cowboy
        this.entities.push(this.inventory);
        this.entities.push(new npc(gameEngine, 384, 300, "cop"));
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new OverWorldPlayer(gameEngine,384,700,this.character));
        this.entities.push(new Exit(gameEngine,350,750,false));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
        //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
    }
}

class SaloonScene extends Scene {
    constructor(game, character) {
        super(game, character)
        this.xMin = 0;
        this.xMax = 700;
        this.yMin = 0;
        this.yMax = 700;
        // Sets up scene
        var TILE_WIDTH = 128;

        // Make corners
        this.entities.push(new HouseTopLeftRoundCorner(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopRightRoundCorner(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopLeftRoundCorner(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.entities.push(new HouseTopRightRoundCorner(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        // Make and left sides of screen
        for (var i = 1; i < 5; i++) {
            this.entities.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, true));
        
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.entities.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, j === 5));
            }
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        this.entities.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 1 * TILE_WIDTH, true));
        this.entities.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 2.5 * TILE_WIDTH, true));
        this.entities.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 4 * TILE_WIDTH, true));

        this.entities.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 3 * TILE_WIDTH, false));
        
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 0.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 1.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 2.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 3.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 4.1 * TILE_WIDTH, false));
        
        for (var i = 0; i < 5; i += 0.5) {
            this.entities.push(new Barrel(gameEngine, 1.75 * TILE_WIDTH - 20, (i + 0.1) * TILE_WIDTH, false));
        }

        this.entities.push(new npc(gameEngine, 500, 400, "saloon"));
        this.entities.push(new npc(gameEngine, 80, 400, "bartender"));
        // Add beep bop boop bep cowboy
        this.entities.push(this.inventory);
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new OverWorldPlayer(gameEngine,350,700,this.character));
        this.entities.push(new Exit(gameEngine,350,750,false))
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
        //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
    }
}

    
class TownScene extends Scene {
    constructor(game, character) {
        super(game, character)
        this.xMin = 0;
        this.xMax = 1350;
        this.yMin = 0;
        this.yMax = 750;
        for(var i = 0; i < 3; i++)
        {
            this.entities.push(new DesertGround(gameEngine,256 * 0,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 1,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 2,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 3,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 4,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 5,256 * i, this.camera));
        }
        for(var i = 0; i < 44; i++ )
        {
            this.entities.push(new Road(gameEngine,32 * i,400));
            this.entities.push(new Road(gameEngine,32 * i,464));
        }
        //gameEngine.addEntity(new groundCen(gameEngine,0,366));
        //saloon
        //gameEngine.addEntity(new Floor(gameEngine, 45, 150, 975, 550));
        this.entities.push(new Saloon(gameEngine, 0, 25, true));

        //sheriff
        //gameEngine.addEntity(new Floor(gameEngine, 575, 60, 975, 550));
        this.entities.push(new Sheriff(gameEngine, 520, 25, true));

        //bank
        //gameEngine.addEntity(new Floor(gameEngine, 1100, 50, 470, 600));
        this.entities.push(new Bank(gameEngine, 1075, 20, true));


        this.entities.push(new DesertSign(this.game,1300,300));

        this.entities.push(new Heal(gameEngine, 200, 400));
        this.entities.push(new Heal(gameEngine, 800, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(this.inventory);
        this.entities.push(new npc(gameEngine, 80, 350, "guide"));
        this.entities.push(new Ring(gameEngine, 900, 700, 40, 40));
        this.entities.push(new npc(gameEngine, 350, 700, "rake"));
        this.entities.push(new npc(gameEngine, 950, 100, "shovel"));
        this.entities.push(new npc(gameEngine, 950, 550, "girl"));
        this.entities.push(new OverWorldPlayer(gameEngine,0,450,this.character));
        this.entities.push(new Building1(gameEngine, 50, 545, 63 * 3 , 64 * 3));
        this.entities.push(new Building2(gameEngine, 450, 530, 81 * 2, 110 * 2));
        this.entities.push(new Door(gameEngine, 514, 706, 17 * 2, 23 * 2));
        this.entities.push(new Building1(gameEngine, 650, 545, 63*3.5, 64*3));
        this.entities.push(new Building3(gameEngine, 1100, 545, 63 * 3, 64 * 3));
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new Door(gameEngine, 1145, 668, 17 * 3, 23 * 3));
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new saloonLZ(gameEngine,170,355,55,25));
        this.entities.push(new sheriffLZ(gameEngine,700,255,55,25));
        this.entities.push(new bankLZ(gameEngine,1165,300,23,25));
        this.entities.push(new desertLZ(gameEngine,1370,415,23,100));
    }
}

class Desert extends Scene {
    constructor(game, character) {
        super(game, character);
        this.xMin = -2700;
        this.xMax = 3500;
        this.yMin = -2700;
        this.yMax = 2700;
        // this.camera.pixelScale = 128;

        //this.camera.setEntityToFollow(character);
        this.entities.push(this.camera);

        for (var i = -26; i < 25; i++) {
            for (var j = -26; j < 25; j++) {
                this.entities.push(new DesertGround(gameEngine, i * 128, j * 128, this.camera));

            }
        }
        for(var i =25 ; i < 32; i++)
        {
            for (var j = -26; j < 25; j++) {
                this.entities.push(new DesertGround(gameEngine, i * 128, j * 128, this.camera));

            }
        }

        var things = {};
        for (var i = 0; i < 40; i++) {
            // Add skull
            var x = Math.random() * 40 - 20;
            var y = Math.random() * 40 - 20;
            while (things[JSON.stringify(x) + JSON.stringify(y)] != undefined) {
                x = Math.random() * 40 - 20;
                y = Math.random() * 40 - 20;
            }
            var thing = new DesertSkull(gameEngine, x * 128, y * 128, this.camera);
            this.entities.push(thing);
            things[JSON.stringify(x) + JSON.stringify(y)] = thing;
            
            // Add plant
            x = Math.random() * 40 - 20;
            y = Math.random() * 40 - 20;
            while (things[JSON.stringify(x) + JSON.stringify(y)] != undefined) {
                x = Math.random() * 40 - 20;
                y = Math.random() * 40 - 20;
            }
            thing = new DesertPlant(gameEngine, x * 128, y * 128, this.camera);
            this.entities.push(thing);
            things[JSON.stringify(x) + JSON.stringify(y)] = thing;
        }
        for (var i = 0; i < 5; i++) {
            // Add Well
            var x = Math.random() * 40 - 20;
            var y = Math.random() * 40 - 20;
            while (things[JSON.stringify(x) + JSON.stringify(y)] != undefined) {
                x = Math.random() * 39 - 20;
                y = Math.random() * 39 - 20;
            }
            // Add enemy spawner
            var thing = new DesertWell(gameEngine, x * 128, y * 128, this.camera);
            this.entities.push(thing);

            var thing = new EnemySpawner(gameEngine,x * 128,500,y * 128,500,5,1,this.camera);
        
            this.entities.push(thing);
            things[JSON.stringify(x) + JSON.stringify(y)] = thing;
        }
        for(var i = 0; i < 27; i++)
        {
            this.entities.push(new TopGate(gameEngine, -2560 + (i * 194),-2560, this.camera));
            this.entities.push(new TopGate(gameEngine, -2560 + (i * 194), 2660, this.camera))
            if(i < 26)
            {
                this.entities.push(new SideGate(gameEngine, 2660 ,-2560 + (i * 194), this.camera));
            }
        }
        this.entities.push(new DrawBoundry(gameEngine,2660,2400,1000,10,this.camera));
        this.breakableGate = new SideGate(gameEngine, 2660 ,-2560 + (26 * 194), this.camera)
        this.entities.push(this.breakableGate);
        this.entities.push(new Explodable(gameEngine, 2635,2484,25,194,this.breakableGate,null, this.camera));
        this.entities.push(new SecretSign(gameEngine,3250,2450,this.camera));
        this.entities.push(new npc(gameEngine,3350,2550, "secret",this.camera));
        for(var i = 0; i < 13; i++)
        {
            this.entities.push(new SideGate(gameEngine, -2560 ,-2560 + (i * 194), this.camera));
            this.entities.push(new SideGate(gameEngine, -2560 ,2500 - (i * 194), this.camera));
        }
        // Add beep bop boop bep cowboy
        var cowboys = new OverWorldPlayer(gameEngine,-2540,0,this.character, this.camera);
        this.entities.push(new Horse(gameEngine,-2400,250,this.camera,cowboys));
        for(var i = 0; i < 20; i++)
        {
            this.entities.push(new WalkWay(gameEngine,-2642 - (i * 32),0,this.camera));
        }
        this.entities.push(new Camp(gameEngine,2000,-2000,this.camera));
        this.entities.push(new EnemySpawner(gameEngine,1800,400,-2200,400,5,2,this.camera));
        this.entities.push(new Camp(gameEngine,0,-1800,this.camera));
        this.entities.push(new EnemySpawner(gameEngine,-200,400,-2000,400,5,2,this.camera));
        this.entities.push(new Camp(gameEngine,2200,-1000,this.camera));
        this.entities.push(new EnemySpawner(gameEngine,2000,400,-1200,400,5,2,this.camera));
        this.entities.push(new CaveSideLeft(gameEngine,2358,-2590,this.camera));
        this.entities.push(new CaveSideLeftMid(gameEngine,2365,-2686,this.camera));
        this.entities.push(new CaveSideRight(gameEngine,2678,-2590,this.camera));
        this.entities.push(new CaveSideRightMid(gameEngine,2678,-2686,this.camera));
        this.entities.push(new Cave(gameEngine,2454,-2686,this.camera));
        this.entities.push(new CaveTop(gameEngine,2550,-2782,this.camera));
        this.entities.push(new CaveTop(gameEngine,2390,-2782,this.camera));
        this.entities.push(new CaveTop(gameEngine,2454,-2782,this.camera));
        this.entities.push(new CaveTop(gameEngine,2614,-2782,this.camera));
        this.entities.push(new TownSign(gameEngine,-2500,-120,this.camera));
        this.entities.push(this.inventory);
        this.camera.setEntityToFollow(cowboys, 700, 384);
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
        this.entities.push(cowboys);
        this.entities.push(new TownZone(gameEngine,-2610,0,this.camera));
    }
}
class CaveScene extends Scene {
    constructor(game, character) {
        super(game, character);
        this.xMin = -1000;
        this.xMax = 870;
        this.yMin = -950;
        this.yMax = 970;
        // this.camera.pixelScale = 128;

        //this.camera.setEntityToFollow(character);
        this.entities.push(this.camera);

        for (var i = -17; i < 16; i++) {
            for (var j = -16; j < 16; j++) {
                this.entities.push(new caveFloor(gameEngine, i * 64, j * 64, this.camera));

            }
        }
        for(var i = 0; i < 15; i++)
        {
            this.entities.push(new tCaveWall(gameEngine,-1040 + (153 * (i - 1)),-1050,this.camera));  // Top cave wall
            this.entities.push(new lCaveWall(gameEngine,-1040,50 +(i*64) ,this.camera));  // Lower left cave wall
            

            this.entities.push(new lCaveWall(gameEngine,-1040,-200 - (i*64) ,this.camera));  // Upper left cave wall
            this.entities.push(new rCaveWall(gameEngine,915,50 +(i*64) ,this.camera));  // Lower right cave wall
            this.entities.push(new rCaveWall(gameEngine,915,-200 - (i*64) ,this.camera));  // Upper right cave wall
        }
        
        // Middle two right and left walls
        this.entities.push(new rCaveWall(gameEngine,915,-42 ,this.camera));
        this.entities.push(new rCaveWall(gameEngine,915,-110 ,this.camera)); 
        this.entities.push(new lCaveWall(gameEngine,-1040,-42 ,this.camera));
        this.entities.push(new lCaveWall(gameEngine,-1040,-110 ,this.camera));
        for(var i = 0; i < 17; i++)
        {
            this.entities.push(new bCaveWall(gameEngine,-993 + (120 * i),1015,this.camera));  // Bottom cave wall
        }
        for(var i = 0; i < 5; i++)
        {
            this.entities.push(new cavePillar(gameEngine,-1000 + (i * 120),468,this.camera));  // Gating wall left of boulders
            this.entities.push(new cavePillar(gameEngine,-145 + (i * 120),468,this.camera));  // Gating wall right of boulders
        }
        this.entities.push(new cavePillarREdge(gameEngine,-400,468,this.camera));  // Gates next to boulders
        this.entities.push(new cavePillarLEdge(gameEngine,-200,468,this.camera));
        this.Boulder1 = new Boulder(gameEngine,-550,170,this.camera)
        this.Boulder2 = new Boulder(gameEngine,-470,170,this.camera);
        this.entities.push(this.Boulder1);
        this.entities.push(this.Boulder2);
        this.entities.push(new Explodable(gameEngine,-550,190,150,100,this.Boulder1,this.Boulder2, this.camera));
        // this.entities.push(new Boulder(gameEngine,-350,600,this.camera));  // Boulders
        // this.entities.push(new Boulder(gameEngine,-270,600,this.camera));
        
        // Maze v2:
        var CPVWidth = 27 * 3;  // CPV = cavePillarVertical
        var CPWidth = 40 * 3;  // CPV = cavePillarVertical
        this.entities.push(new cavePillarVertical(gameEngine, (120 * 3) - 1000 + CPWidth - CPVWidth, (186 * (0)) - 1020,this.camera));
        this.entities.push(new cavePillarVertical(gameEngine, (120 * 3) - 1000 + CPWidth - CPVWidth, (186 * (1)) - 1020,this.camera));
        this.entities.push(new cavePillar(gameEngine, (120 * 3) - 1000, (186 * (2)) - 1020,this.camera));
        this.entities.push(new cavePillar(gameEngine, (120 * 2) - 1000, (186 * (2)) - 1020,this.camera));
        this.entities.push(new cavePillar(gameEngine, (120 * 1) - 1000, (186 * (2)) - 1020,this.camera));
        for(var i = 0; i < 7; i++)
        {
            this.entities.push(new cavePillar(gameEngine, (120 * (i + 5)) - 1000, (186 * (1)) - 1020,this.camera));
        }
        for(var i = 0; i < 5; i++) {
            this.entities.push(new cavePillarVertical(gameEngine, (120 * 5) - 1000, (186 * (1 + i)) - 1020,this.camera));
            this.entities.push(new cavePillarVertical(gameEngine, (120 * 11) - 1000, (186 * (1 + i)) - 1020,this.camera));
        }
        for(var i = 0; i < 4; i++)
        {
            this.entities.push(new cavePillar(gameEngine, (120 * (1 + i)) - 1000, (186 * (4)) - 1020,this.camera));
            this.entities.push(new cavePillar(gameEngine, (120 * (7 + i)) - 1000, (186 * (4)) - 1020,this.camera));
        }
        for(var i = 0; i < 3; i++)
        {
            this.entities.push(new cavePillarVertical(gameEngine, (120 * (1)) - 1000, (186 * (4 + i)) - 1020,this.camera));
            this.entities.push(new cavePillar(gameEngine, (120 * (11 + i)) - 1000, (186 * (6)) - 1020,this.camera));
        }
        for(var i = 0; i < 2; i++)
        {
            this.entities.push(new cavePillarVertical(gameEngine, (120 * (3)) - 1000, (186 * (6 + i)) - 1020,this.camera));
            this.entities.push(new cavePillarVertical(gameEngine, (120 * (9)) - 1000 + CPWidth - CPVWidth, (186 * (6 + i)) - 1020,this.camera));
            this.entities.push(new cavePillarVertical(gameEngine, (120 * (13)) - 1000 + CPWidth - CPVWidth, (186 * (6 + i)) - 1020,this.camera));
            this.entities.push(new cavePillarVertical(gameEngine, (120 * (9)) - 1000, (186 * (i + 1)) - 1020,this.camera));
            this.entities.push(new cavePillar(gameEngine, (120 * (12 + i)) - 1000, (186 * (8)) - 1020,this.camera));
            this.entities.push(new cavePillar(gameEngine, (120 * (12 + i)) - 1000, (186 * (1)) - 1020,this.camera));
            this.entities.push(new cavePillar(gameEngine, (120 * (14 + i)) - 1000, (186 * (3)) - 1020,this.camera));
            this.entities.push(new cavePillar(gameEngine, (120 * (5 + i)) - 1000, (186 * (6)) - 1020,this.camera));
        }
        this.entities.push(new cavePillarVertical(gameEngine, (120 * (7)) - 1000, (186 * (3)) - 1020,this.camera));

        for(var i = 0; i < 3; i++)
        {
            this.entities.push(new cavePillarVertical(gameEngine,376,540 + (186 * i),this.camera));  // Right gating wall
        }

        // End caps
        this.entities.push(new cavePillarBEdge(gameEngine, (120 * (1)) - 1000, (186 * (7)) - 1020,this.camera));
        this.entities.push(new cavePillarTEdge(gameEngine, (120 * (3)) - 1000, (186 * (5.33)) - 939,this.camera));
        this.entities.push(new cavePillarTEdge(gameEngine, (120 * (1)) - 1000, (186 * (1.33)) - 939,this.camera));
        this.entities.push(new cavePillarTEdge(gameEngine, (120 * (9)) - 1000 + CPWidth - CPVWidth, (186 * (5.33)) - 939,this.camera));
        this.entities.push(new cavePillarTEdge(gameEngine, (120 * (7)) - 1000, (186 * (2.33)) - 939,this.camera));
        this.entities.push(new cavePillarBEdge(gameEngine, (120 * (9)) - 1000, (186 * (3)) - 1020,this.camera));
        this.entities.push(new cavePillarREdge(gameEngine, (120 * (7)) - 1000, (186 * (6)) - 1020,this.camera));
        this.entities.push(new cavePillarREdge(gameEngine, (120 * (14)) - 1000, (186 * (1)) - 1020,this.camera));
        this.entities.push(new cavePillarLEdge(gameEngine, (120 * (13.52)) - 1000, (186 * (3)) - 1020,this.camera));
        
        
        for (var i = -27; i < -16; i++) {
            for (var j = -22; j < 22; j++) {
                this.entities.push(new caveOutside(gameEngine, i * 64, j * 64, this.camera));
            }
        }
        for (var i = -16; i < 16; i++) {
            for (var j = -22; j < -16; j++) {
                this.entities.push(new caveOutside(gameEngine, i * 64, j * 64, this.camera));
            }
        }
        for (var i = 15; i < 27; i++) {
            for (var j = -22; j < 22; j++) {
                this.entities.push(new caveOutside(gameEngine, i * 64, j * 64, this.camera));
            }
        }
        for (var i = -16; i < 16; i++) {
            for (var j = 16; j < 22; j++) {
                this.entities.push(new caveOutside(gameEngine, i * 64, j * 64, this.camera));
            }
        }
        var cowboys = new OverWorldPlayer(gameEngine,-500,950,this.character, this.camera);
        this.entities.push(new caveExit(gameEngine,-500, 1015,this.camera));
        this.entities.push(new MoneyCave(gameEngine, 220, -640, this.camera));
        this.entities.push(new overWorldBandit(this.game,-290,-160,4,this.camera,null))
        this.entities.push(new overWorldBandit(this.game,175,-475,4,this.camera,null))
        this.entities.push(new overWorldBandit(this.game,240,-475,4,this.camera,null))
        this.entities.push(new overWorldBandit(this.game,-620,-55,4,this.camera,null))
        this.entities.push(new overWorldBandit(this.game,-965,-520,4,this.camera,null))
        this.entities.push(new overWorldBandit(this.game,-380,-905,4,this.camera,null))
        this.entities.push(new overWorldBandit(this.game,685,-905,4,this.camera,null))
        this.entities.push(new overWorldBandit(this.game,-230,-145,4,this.camera,null))
        this.entities.push(new overWorldBoss(game,4.7 * 128, 6.2 * 128,5,this.camera,null));
        // Add beep bop boop bep cowboy
        this.entities.push(this.inventory);
        this.camera.setEntityToFollow(cowboys, 700, 384);
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
        this.entities.push(cowboys);
    }
}
