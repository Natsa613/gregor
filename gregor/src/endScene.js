import Phaser from "phaser";
import { Asset } from "./Asset";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { globalVolume } from './ConfigPopup';

export default class endScene extends Phaser.Scene{
    constructor() {
        super({ key: 'endScene' });
        this.assets = [
        ];
    }

    preload() {
        this.assets.forEach(asset => asset.load(this));
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.text(this.scale.width/2,this.scale.height/2,'이 게임은 베타 버전입니다. 이후 문제를 해결하시겠습니까?',
            {font:"48px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)
        
        this.yesBtn = this.add.text(this.scale.width/2-200,this.scale.height/2+200,'네',
            {font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5).setInteractive()
            .on('pointerdown',()=>{
                console.log('버튼 클릭됨');
                this.time.delayedCall(100, () => this.scene.start('textPuzzle1', { fadeIn: true }));
            });

        this.noBtn = this.add.text(this.scale.width/2+200,this.scale.height/2+200,'아니요',
            {font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5).setInteractive()
            .on('pointerdown',()=>{
                console.log('버튼 클릭됨');
                this.time.delayedCall(100, () => this.scene.start('endpage', { fadeIn: true }));
            });
        
        
    }


}