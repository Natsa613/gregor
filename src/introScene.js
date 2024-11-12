// introScene.js
import { Button } from './Button';
import { ConfigPopup } from './ConfigPopup';
import { globalVolume } from './ConfigPopup';

export default class introScene extends Phaser.Scene {
    constructor() {
        super({ key: 'intro' });
    }
    
    init(data) {
        this.fadeIn = data.fadeIn;
    }

    preload() {
        this.load.image('introBackground', './assets/introBackground.jpg');
        this.load.image('startButton', './assets/icon/startButton.png');
        this.load.image('configButton', './assets/icon/configButton.png');
        this.load.image('logo','./assets/icon/logo.png');
        this.load.image('credit','./assets/icon/credit.png');
        this.load.audio('introBgm', './assets/sound/No.8 Requiem - Esther Abrami.mp3');
    }

    create() {
        if (this.fadeIn) {
            this.cameras.main.fadeIn(1000, 0, 0, 0); // 1초 동안 페이드인
        }
        this.add.image(this.scale.width / 2, this.scale.height / 2 +75, 'introBackground').setScale(0.99);
        this.add.image(this.scale.width / 2 -650, this.scale.height / 2 -325, 'logo').setScale(1);

        this.introBgm = this.sound.add('introBgm', { loop: true });
        this.introBgm.setVolume(globalVolume.volume);
        this.introBgm.play();

        this.startButton = new Button(this, 1750, 550, 'startButton', 0.7, () => {
            this.introBgm.stop();
            this.time.delayedCall(100, () => this.scene.start('textScene',{fadeIn:true}));
        });

        this.configButton = new Button(this, 1750, 675, 'configButton', 0.7, () => this.configPopup.show());

        this.configPopup = new ConfigPopup(this);

        this.creditButton = new Button(this, 1745, 775, 'credit', 0.8, () => {});
    }
}
