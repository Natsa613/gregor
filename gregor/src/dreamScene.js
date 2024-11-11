import Phaser from "phaser";
import { Asset } from "./Asset";
import { VisibleManager } from "./visibleManager";

export default class dreamScene extends Phaser.Scene{
    constructor(){
        super({key:'dreamScene'});
        this.assets = [
            new Asset('dream','./assets/dream.png'),
            new Asset('dream_killing1','./assets/dream_killing1.png'),
            new Asset('dream_killing2','./assets/dream_killing2.png')
        ];
    }

    preload(){
        this.assets.forEach(asset => asset.load(this));
    }

    create(){
        this.cameras.main.fadeIn(1000);
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'dream').setOrigin(0.5, 0.55).setScale(0.99);

        this.killing1 = this.add.image(this.scale.width/2,this.scale.height/2 + 35,'dream_killing1').setScale(0.73).setVisible(false);
        this.killing2 = this.add.image(this.scale.width/2,this.scale.height/2 + 35,'dream_killing2').setScale(0.8).setVisible(false);

        const visibleElement =[
            this.killing1,
            this.killing2
        ];

        const visibleManager = new VisibleManager(visibleElement);

        this.input.keyboard.on('keydown-SPACE',()=>{
            if(!this.killing1.visible && !this.killing2.visible) {
                visibleManager.hide();
                this.tweens.add({
                    targets: this.killing1,
                    alpha: { from: 0, to: 1 },
                    duration: 1000,
                    onStart: () => visibleManager.showElement(this.killing1)
                });
            } else if(this.killing1.visible) {
                visibleManager.hideElement(this.killing1);
                visibleManager.showElement(this.killing2);
            } else if(this.killing2.visible) {
                this.tweens.add({
                    targets: this.killing2,
                    alpha: { from: 1, to: 0 },
                    duration: 1000,
                    onComplete: () => visibleManager.hideElement(this.killing2)
                });
                this.time.delayedCall(100, () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0); // 1초 동안 페이드아웃
                
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('officeScene', { fadeIn: true });
                    });
                });                
            }
        })


    }

    update(){

    }

}