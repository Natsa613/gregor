import Phaser from "phaser";
import { Asset } from "./Asset";
import { Modal } from "./Modal";

export default class rumenPuzzle extends Phaser.Scene{
    constructor() {
        super({ key: 'rumenPuzzle' });
        this.assets = [
            new Asset('textbox', './assets/textbox.png'),
            new Asset('skipButton', './assets/skipButton.png'),
            new Asset('station','./assets/station.png'),
            new Asset('Rumen','./assets/Rumen.png')
        ];
        this.numPuzzleAnswer = "어둠";// 정답 설정
    }

    preload() {
        this.assets.forEach(asset => asset.load(this));
    }

    create() {
        this.cameras.main.fadeIn(1000);

        this.add.image(this.scale.width / 2, this.scale.height / 2, 'station').setScale(1).setOrigin(0.5, 0.5);
        this.textbox = this.add.image(this.scale.width/2, this.scale.height/2-80, 'textbox').setOrigin(0.5, 0.5).setDepth(10).setScale(1).setVisible(false);
        this.rumen = this.add.image(this.scale.width/2, this.scale.height/2, 'Rumen').setScale(1).setOrigin(0.5, 0.5).setVisible(true).setDepth(9);

        this.characterName = this.add.text(100, this.scale.height - 225, "그레고르", 
            { font: "48px '국립박물관문화재단클래식B'", fill: "#000000" })
            .setDepth(11).setVisible(false);

        this.answerTrue = this.add.text(50, this.scale.height - 135, "어디서 많이 본 구절인데...", 
            { font: "24px '국립박물관문화재단클래식B'", fill: "#000000", wordWrap: { width: this.scale.width - 100 } })
            .setDepth(11).setVisible(false);
        
        this.answerFalse = this.add.text(50, this.scale.height - 135, "잘못 넣어놨나 보군", 
            { font: "24px '국립박물관문화재단클래식B'", fill: "#000000", wordWrap: { width: this.scale.width - 100 } })
            .setDepth(11).setVisible(false);

        this.numPuzzleAnswerSheet = new Modal(this, this.scale.width/2-200, 800, 300, 50,'#000000',0,'80%',false);
        this.numPuzzleAnswerSheet.show();

    }

    checkAnswer(answer) {
        if (answer === this.numPuzzleAnswer) {
            this.numPuzzleAnswerSheet.hide();
            this.textbox.setVisible(true);
            this.characterName.setVisible(true);
            this.answerTrue.setVisible(true);
            this.input.keyboard.on('keydown-SPACE', () => {
                this.time.delayedCall(100, () => this.scene.start('station2Scene',{fadeIn:true}));
            });
        } else {
            this.numPuzzleAnswerSheet.hide();
            this.textbox.setVisible(true);
            this.characterName.setVisible(true);
            this.answerFalse.setVisible(true);
            this.input.keyboard.on('keydown-SPACE', () => {
                this.time.delayedCall(100, () => this.scene.start('station2Scene',{fadeIn:true}));
            });
            // 정답이 틀린 경우 처리 (예: 메시지 표기)
            console.log('틀린 답변입니다.');
        }
    }
}