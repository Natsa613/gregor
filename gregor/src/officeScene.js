import Phaser from "phaser";
import { Asset } from "./Asset";
import { Button } from "./Button";
import { Modal } from "./Modal";

export default class officeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'officeScene' });
        this.assets = [
            new Asset('office', './assets/office.png'),
            new Asset('draggtest','./assets/draggtest.png'),
            new Asset('numPuzzle','./assets/numPuzzle.png'),
            new Asset('Xicon','./assets/Xicon.png')
        ];
        this.numPuzzleAnswer = "14";// 정답 설정
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
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'office').setOrigin(0.5, 0.55).setScale(0.99);
        //this.numPuzzleImage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'numPuzzle').setOrigin(0.5, 0.5).setScale(0.5).setVisible(false);

        this.letter = new Button(this, 1050, 700, '', 1, () => {
            console.log('Button clicked');
            this.modal.hide();
            this.time.delayedCall(100, () => this.scene.start('talk1Scene', { fadeIn: true }));//편지 클릭시 다음 신으로
        },{useImage:false,width:150,height:150});

        
        this.modal = new Modal(this, 100, 150, 300, 50); //입력 테스트

        this.modaltest = new Button(this, 600, 600, '', 1, () => { //입력 테스트용
            console.log('Button clicked'); 
            this.time.delayedCall(100, () => this.modal.show());
        },{useImage:true,width:150,height:50});

        //this.displayedText = this.add.text(100, 300, '', { fontSize: '32px', fill: '#fff' });

        //this.draggtest = new Button(this,300,300,'draggtest',0.1,()=>{},{useImage:true,width:150,height:50,draggable:true});

        this.book = new Button(this, 1350, 150, '', 1, () => {
            console.log('Button clicked');
            this.modal.hide();
            this.time.delayedCall(100, () => this.scene.start('textPuzzle1', { fadeIn: true }));//책 클릭시 퍼즐로 이동
        },{useImage:false,width:150,height:150});
        
    /*
    // numPuzzle 버튼 클릭 시 numPuzzleImage 보이기
    this.numPuzzle = new Button(this, 1350, 150, '', 1, () => {
        this.numPuzzleImage.setVisible(true);
    }, { useImage: false, width: 200, height: 100 });

    // numPuzzleImage에 닫기 버튼 추가
    this.closeButton = new Button(this, this.scale.width / 2 + 465, this.scale.height / 2 - 250, 'Xicon', 0.05, () => {
        this.numPuzzleImage.setVisible(false);
    }, { useImage: true, width: 50, height: 50 });
    
    // 닫기 버튼을 numPuzzleImage와 같은 위치에 배치
    this.closeButton.setVisible(false); // 처음에는 비가시 상태로 설정
    this.numPuzzleImage.setInteractive();
    this.numPuzzleImage.on('pointerdown', () => {
        this.numPuzzleImage.setVisible(false); // numPuzzleImage 클릭 시 숨기기
    });

    // numPuzzleImage가 보일 때만 닫기 버튼 보이기
    this.events.on('update', () => {
        this.closeButton.setVisible(this.numPuzzleImage.visible);
    });
    */

    }

    update() {

    }

    displayText(text) {
        this.displayedText.setText(text);
    }
    
    // 정답 확인 메서드
    checkAnswer(answer) {
        if (answer === this.numPuzzleAnswer) {
            this.displayText("정답입니다!");
        } else {
           this.modal.hide();
        }
    }
}
