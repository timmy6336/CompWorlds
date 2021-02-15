class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.fight = false;
        this.fightEnd = false;

        this.cowboy = new Character(this.game);

        this.scenes = [];
        this.scenes["town"] = new TownScene(game, this.cowboy);
        this.scenes["bank"] = new BankScene(game, this.cowboy);
        this.scenes["saloon"] = new SaloonScene(game, this.cowboy);
        this.scenes["sheriff"] = new SheriffScene(game, this.cowboy);
        this.scenes["fight"] = new FightScene(game, this.cowboy, new coyote(gameEngine,486,450));

        this.x = 0;

        this.missions = new MissionManager(this.game);
        this.currentScene = null;
        // this.sceneStack = [];
        this.inventory = null;
        this.enemySpawner = null;
        this.currentEnemy = null;

        this.loadScene("town");
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        if(this.fight && this.fightEnd)
        {
            this.fight = false;
            this.fightEnd = false;
            this.loadScene(this.currentScene);
            document.getElementById("fightAudio").pause();
            document.getElementById("townAudio").play();
            this.currentEnemy.removeFromWorld = true;
            this.currentEnemy = null;
        }
        this.missions.missions["Bank"].update();
    }
    draw(ctx) 
    { 
        /*
        ctx.font = "15px Papyrus";
        ctx.fillStyle = "Red";
        ctx.fillText("Coins: ", 5, 25);
        ctx.font = "30px Papyrus";
        ctx.fillStyle = "Red";
        ctx.fillText(this.inventory.checkItem("coin"), 55, 25);
        */
       this.missions.missions["Bank"].draw(ctx);
    }

    loadScene(scene) {
        var sceneToLoad = this.scenes[scene]
        this.game.entities = sceneToLoad.entities;
        this.currentScene = scene;
        var temp = this.game.entities.length
        for (var i = 0; i < temp; i++) 
        {
          //console.log(this.game.entities[i]);
          var temp2 = this.game.entities[i];
          if(temp2 instanceof SceneInventory) 
          {
              //console.log(temp2);
              this.inventory = temp2;
          }
          if(temp2 instanceof EnemySpawner)
          {
            console.log(temp2);
            this.enemySpawner = temp2;
          }
      }
    }

    createFightSceneWithEnemy(enemy) 
    {
        //console.log(enemy);
        this.currentEnemy = enemy;
        var sceneToLoad = new FightScene(this.game, this.cowboy, enemy);
        this.game.entities = sceneToLoad.entities;
        this.fight = true;
    }
}
