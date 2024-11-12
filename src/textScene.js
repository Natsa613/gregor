import Phaser from "phaser";
import { Asset } from "./Asset";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { globalVolume } from './ConfigPopup';

export default class textScene extends Phaser.Scene{
    constructor() {
        super({ key: 'textScene' });
        this.assets = [
            new Asset('boom','./assets/sound/boom.mp3'),
            new Asset('groan','./assets/sound/groan.mp3')
        ];
    }

    preload() {
        this.assets.forEach(asset => asset.load(this));
    }

    create() {
        this.cameras.main.fadeIn(1000);

        this.boom = this.sound.add('boom');
        this.boom.setVolume(globalVolume.volume);
        this.boom.play();

        this.groan = this.sound.add('groan',{ loop:true });
        this.groan.setVolume(globalVolume.volume);
        this.groan.play();

        this.add.text(this.scale.width/2,this.scale.height/2,'전쟁의 소음과 죽어가는 사람들의 비명이 한데 섞여 아수라장을 자아낸다.',
            {font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)

        this.input.keyboard.on('keydown-SPACE', () => {
            this.groan.stop();
            this.time.delayedCall(100, () => this.scene.start('dreamScene',{fadeIn:true}));
        })

    }


}