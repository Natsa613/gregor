import Phaser from "phaser";
import { Asset } from "./Asset";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { globalVolume } from './ConfigPopup';

export default class endpage extends Phaser.Scene{
    constructor() {
        super({ key: 'endpage' });
        this.assets = [
        ];
    }

    preload() {
        this.assets.forEach(asset => asset.load(this));
    }

    create() {
        this.cameras.main.fadeIn(1000);

        this.add.text(this.scale.width/2,this.scale.height/2-100,'플레이해주셔서 감사합니다.',
            {font:"48px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)

        this.gointroBtn = this.add.text(this.scale.width/2,this.scale.height/2+200,'메인화면으로',
            {font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5).setInteractive()
            .on('pointerdown',()=>{
                console.log('버튼 클릭됨');
                this.time.delayedCall(100, () => this.scene.start('intro', { fadeIn: true }));
            });

    }


}