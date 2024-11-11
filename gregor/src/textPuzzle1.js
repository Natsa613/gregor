import Phaser from "phaser";
import { Asset } from "./Asset";
import { Modal } from "./Modal";
import { Button } from "./Button";

export default class textPuzzle1 extends Phaser.Scene{
    constructor() {
        super({ key: 'textPuzzle1' });
        this.assets = [
            new Asset('textPuzzle1','./assets/textPuzzle1.png'),
            new Asset('hintButton', './assets/icon/logButton.png')
        ];
        this.doorPuzzleAnswer = "죽음";// 정답 설정
        this.hint = null;
        this.hintbackground = null;
        this.isTextVisible = false;
    }

    preload() {
        this.assets.forEach(asset => asset.load(this));
    }

    create() {
        this.cameras.main.fadeIn(1000);

        this.add.image(this.scale.width/2, this.scale.height / 2 , 'textPuzzle1');


        this.doorPuzzleAnswerSheet = new Modal(this, this.scale.width/2-150, 800, 300, 50,'#000000',0,'80%',false);
        this.doorPuzzleAnswerSheet.show();

        this.hintbackground = this.add.rectangle(this.scale.width/2,this.scale.height/2, 500, 150, '#000000').setDepth(10).setOrigin(0.5).setVisible(false);

        this.hint = this.add.text(this.scale.width/2,this.scale.height/2,'나는 죽음이다.',
            {font:"48px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setDepth(11).setOrigin(0.5,0.5).setVisible(false);

        const hintButton = this.add.image(this.scale.width - 100, this.scale.height - 850, 'hintButton').setScale(0.04).setInteractive();
        hintButton.on('pointerdown', () =>{
            this.isTextVisible = !this.isTextVisible; // 가시성 상태 토글
            this.hint.setVisible(this.isTextVisible); // 텍스트 가시성 설정
            this.hintbackground.setVisible(this.isTextVisible);//배경 가시성 설정
        });

    }

    checkAnswer(answer) {
        if (answer === this.doorPuzzleAnswer) {
            this.doorPuzzleAnswerSheet.hide();
            this.time.delayedCall(100, () => this.scene.start('textPuzzle2',{fadeIn:true}));//저택 내부 씬으로 이동
        } else {
            // 정답이 틀린 경우 처리 (예: 메시지 표기)
            console.log('틀린 답변입니다.');
        }
    }

}