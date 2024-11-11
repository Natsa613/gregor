import Phaser from "phaser";
import { Asset } from "./Asset";
import { Modal } from "./Modal";
import { Button } from "./Button";

export default class textPuzzle3 extends Phaser.Scene{
    constructor() {
        super({ key: 'textPuzzle3' });
        this.assets = [
            //new Asset('numPuzzle','./assets/numPuzzle.png')
            new Asset('hintButton', './assets/icon/logButton.png')
        ];
        this.doorPuzzleAnswer = "죄책감";// 정답 설정
        this.hint = null;
        this.hintbackground = null;
        this.isTextVisible = false;
    }

    preload() {
        this.assets.forEach(asset => asset.load(this));
    }

    create() {
        this.cameras.main.fadeIn(1000);

        //this.add.image(this.scale.width/2, this.scale.height / 2 -100, 'numPuzzle').setOrigin(0.5, 0.5).setScale(0.7);

        this.add.text(this.scale.width/2,this.scale.height/2-200,'나는 사람들의 마음 깊숙이 숨겨져 있으며, 결고 쉽게 드러나지 않는다.',{font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)
        //this.add.text(this.scale.width/2,this.scale.height/2-150,'2, 5, 10, 17, 26, A',{font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)
        this.add.text(this.scale.width/2,this.scale.height/2-100,'나는 과거의 선택에서 비롯되며, 때로는 그들을 괴롭히기도 한다.',{font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)
        //this.add.text(this.scale.width/2,this.scale.height/2-50,'1, 2, 4, 8, 16, H',{font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)
        this.add.text(this.scale.width/2,this.scale.height/2,'나는 누군가의 마음을 무겁게 만들고, 잊고 싶어도 결코 잊히지 않는다.',{font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)

        this.doorPuzzleAnswerSheet = new Modal(this, this.scale.width/2-150, 800, 300, 50,'#000000',0,'80%',false);
        this.doorPuzzleAnswerSheet.show();

        this.hintbackground = this.add.rectangle(this.scale.width/2,this.scale.height/2, 500, 150, '#000000').setDepth(10).setOrigin(0.5).setVisible(false);

        this.hint = this.add.text(this.scale.width/2,this.scale.height/2,'나는 죄책감이다',
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
            this.time.delayedCall(100, () => this.scene.start('intro',{fadeIn:true}));//저택 내부 씬으로 이동
        } else {
            // 정답이 틀린 경우 처리 (예: 메시지 표기)
            console.log('틀린 답변입니다.');
        }
    }

}