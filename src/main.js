import Phaser from "phaser";
import introScene from "./introScene.js";
import talk1Scene from "./talk1Scene.js";
import officeScene from "./officeScene.js";
import firstNumPuzzle from "./firstNumPuzzle.js";
import talk2Scene from "./talk2Scene.js";
import stationScene from "./stationScene.js";
import frontdoorScene from "./frontdoorScene.js";
import frontdoorPuzzle from "./frontdoorPuzzle.js";
import textPuzzle1 from "./textPuzzle1.js";
import textPuzzle2 from "./textPuzzle2.js";
import textPuzzle3 from "./textPuzzle3.js";
import textScene from "./textScene.js";
import dreamScene from "./dreamScene.js";
import memoryScene from "./memoryScene.js";
import rumenPuzzle from "./RumenPuzzle.js";
import station2Scene from "./station2Scene.js";
import doorScene from "./doorScene.js";
import endScene from "./endScene.js";
import endpage from "./endpage.js";

const config = {
    type: Phaser.AUTO,
    width : 1900,
    height : 910,
    scene : [introScene,
         textScene, dreamScene,
         talk1Scene, talk2Scene, firstNumPuzzle,
         memoryScene,
         officeScene, 
         stationScene, rumenPuzzle, station2Scene,
         doorScene, 
         frontdoorScene, frontdoorPuzzle,
         textPuzzle1,textPuzzle2,textPuzzle3,
         endScene,endpage
         ]
    /*{

        preload : preload,
        create : create,
        update : update
    }*/

};

const game = new Phaser.Game(config);

/*
function preload(){
    //자원로드
}

function create(){
    //게임 오브젝트 및 초기 로직 생성
}

function update(){
    //게임 루프에 실행되는 코드
}
*/