import Phaser from "phaser";
import { Asset } from "./Asset";
import { Button } from "./Button";

export default class doorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'doorScene' });
        this.assets = [
            new Asset('door_lock', './assets/door_lock.jpeg'),
            new Asset('door_unlock', './assets/door_unlock.jpeg'),
            new Asset('doorPuzzle', './assets/doorPuzzle.png'),
            new Asset('textbox', './assets/textbox.png')
        ];
        this.clickCount = 0; // 클릭 횟수 초기화
    }

    init(data) {
        this.fadeIn = data.fadeIn;
    }

    preload() {
        this.assets.forEach(asset => asset.load(this));
    }

    create() {
        if (this.fadeIn) {
            this.cameras.main.fadeIn(100, 0, 0, 0); // 1초 동안 페이드인
        }
        
        this.door_lock = this.add.image(this.scale.width / 2, this.scale.height / 2, 'door_lock').setOrigin(0.5, 0.55).setScale(1.1).setVisible(true);
        this.door_unlock = this.add.image(this.scale.width / 2, this.scale.height / 2, 'door_unlock').setOrigin(0.5, 0.55).setScale(1.1).setVisible(false);
        this.textbox = this.add.image(this.scale.width / 2, this.scale.height / 2 - 80, 'textbox').setOrigin(0.5, 0.5).setDepth(10).setScale(1).setVisible(false);

        this.characterName = this.add.text(100, this.scale.height - 225, "그레고르", 
            { font: "48px '국립박물관문화재단클래식B'", fill: "#000000" })
            .setDepth(11).setVisible(false);

        this.lines = [
            this.add.text(50, this.scale.height - 135, "(굳게 잠겨있다, 열쇠가 필요한듯 하다.)", 
                { font: "24px '국립박물관문화재단클래식B'", fill: "#000000", wordWrap: { width: this.scale.width - 100 } })
                .setDepth(11).setVisible(false),
            this.add.text(50, this.scale.height - 135, "열쇠가 필요해. 어딘가 보관해둔건가?", 
                { font: "24px '국립박물관문화재단클래식B'", fill: "#000000", wordWrap: { width: this.scale.width - 100 } })
                .setDepth(11).setVisible(false),
            this.add.text(50, this.scale.height - 135, "...이상한 장치군... 뭔가 새겨져 있는데?", 
                { font: "24px '국립박물관문화재단클래식B'", fill: "#000000", wordWrap: { width: this.scale.width - 100 } })
                .setDepth(11).setVisible(false)
        ];

        this.lock = new Button(this, this.scale.width / 2, this.scale.height / 2, '', 1, () => {
            this.handleLockClick();
        }, { useImage: false, width: 150, height: 150 });

        this.chest = new Button(this, 150, this.scale.height/2-50, '', 1, () => {
            console.log('Button clicked');
            this.textbox.setVisible(true);
            this.characterName.setVisible(true);
            this.lines[2].setVisible(true);
            this.input.keyboard.on('keydown-SPACE', () => {
                this.time.delayedCall(100, () => this.scene.start('frontdoorPuzzle',{fadeIn:true}));
            });
        }, { useImage: false, width: 300, height: 200 });
    }

    update() {

    }

    handleLockClick() {
        this.clickCount++; // 클릭 횟수 증가

        this.hideAllLines(); // 모든 라인 숨기기

        if (this.clickCount === 1) {
            this.showTextBoxAndLines(0); // 첫 번째 라인 출력
        } else if (this.clickCount === 2) {
            this.showTextBoxAndLines(1); // 두 번째 라인 출력
            this.characterName.setVisible(true);
        } else {
            this.hideTextBoxAndLines(); // 클릭이 3번 이상일 때 숨김
            this.clickCount = 0; // 클릭 횟수 리셋
        }
    }

    showTextBoxAndLines(index) {
        this.textbox.setVisible(true);
        this.lines[index].setVisible(true);
    }

    hideTextBoxAndLines() {
        this.textbox.setVisible(false);
        this.characterName.setVisible(false);
        this.lines.forEach(line => line.setVisible(false)); // 모든 라인 숨김
    }

    hideAllLines() {
        this.lines.forEach(line => line.setVisible(false)); // 모든 라인 숨김
    }
}
