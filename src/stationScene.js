import Phaser from "phaser";
import { Asset } from "./Asset";
import { Button } from './Button';
import { Content } from './Content';
import { LogPopup } from './LogPopup';
import { globalVolume } from "./ConfigPopup";

export default class stationScene extends Phaser.Scene{
    constructor(){
        super({key:'stationScene'});
        this.assets =[
            new Asset('textbox', './assets/textbox.png'),
            new Asset('logButton', './assets/icon/logButton.png'),
            new Asset('gregor', './assets/character/gregor.png'),
            new Asset('harmatz', './assets/character/harmatz.png'),
            new Asset('skipButton', './assets/skipButton.png'),
            new Asset('station','./assets/station.png'),
            new Asset('Rumen','./assets/Rumen.png'),
            new Asset('train_horn','./assets/sound/train_horn.mp3'),
            new Asset('train_run','./assets/sound/train_run.mp3'),
            new Asset('stationSound','./assets/sound/station.mp3'),
            new Asset('backMusic','./assets/sound/TRAVELATOR - Density & Time.mp3'),
            new Asset('office_back', './assets/office_back.png')
        ];
        this.content = null;
        this.textEvent = null;
        this.currentImage = null;
    }

    preload(){
        this.assets.forEach(asset => asset.load(this));
        this.load.json('stationData', './assets/text/stationData.json'); // 텍스트, 이미지, 사운드 데이터 로드
    }

    create(){
        this.cameras.main.fadeIn(1500);
    
        const textData = this.cache.json.get('stationData').contents; // Content.js에 맞춘 구조로 로드
        this.content = new Content(textData);
    
        const characterNameObject = this.add.text(100, this.scale.height - 225, "", 
            { font: "48px '국립박물관문화재단클래식B'", fill: "#000000" })
            .setDepth(11);

        const textObject = this.add.text(50, this.scale.height - 135, "", 
            { font: "24px '국립박물관문화재단클래식B'", fill: "#000000", wordWrap: { width: this.scale.width - 100 } })
            .setDepth(11);

        const images = {
            'textbox' : this.add.image(this.scale.width/2, this.scale.height/2-80, 'textbox').setOrigin(0.5, 0.5).setDepth(10).setScale(1).setVisible(false),
            'gregor': this.add.image(300, 425, 'gregor').setScale(1).setOrigin(0.5, 0.5).setDepth(9).setVisible(false),
            'harmatz': this.add.image(1600, 425, 'harmatz').setScale(1).setOrigin(0.5, 0.5).setScale(-1,1).setDepth(9).setVisible(false),
            'station': this.add.image(this.scale.width/2, this.scale.height/2, 'station').setScale(1).setOrigin(0.5, 0.5).setVisible(false).setDepth(2),
            'Rumen': this.add.image(this.scale.width/2, this.scale.height/2, 'Rumen').setScale(1).setOrigin(0.5, 0.5).setVisible(false).setDepth(9),
            'office_back': this.add.image(this.scale.width / 2, this.scale.height / 2, 'office_back').setScale(1).setOrigin(0.5, 0.5).setVisible(false).setDepth(2)
        };

        this.backMusic = this.sound.add('backMusic',{loop:true}).setVolume(globalVolume.volume);
        this.backMusic.play();
        
        this.add.text(this.scale.width/2,this.scale.height/2,'그렇게 노인이 뱉은 말을 의문으로 뒤로 한 채, 그레고르는 다음 날 저녁이 되어 기차역으로 향했다.',
            {font:"32px '국립박물관문화재단클래식B'", fill: '#bb0000'}).setOrigin(0.5,0.5)

        const logPopup = new LogPopup(this, this.scale.width / 2, this.scale.height / 2, 600, 700);
    
        const revealText = () => {
            textObject.setText(this.content.addCharToDisplayText());
            characterNameObject.setText(this.content.getCurrentCharacterName());
        
            // 현재 Content의 soundKey를 가져온 후 사운드를 재생
            const currentSoundKey = this.content.getCurrentSoundKey(); // 새로 추가할 메서드
            if (currentSoundKey) {
                this.sound.setVolume(globalVolume.volume);
                this.sound.play(currentSoundKey); // 효과음 재생
            }
            
            // 텍스트가 완료되면 이미지와 사운드를 동기화
            if (this.content.isComplete()) {
                this.time.removeEvent(this.textEvent);
                this.content.addToLog();
                logPopup.updateLog(this.content.getLog());

                const currentImagesToShow = this.content.data[this.content.currentContentIndex].images; // 이미지 배열 가져오기
                if (currentImagesToShow.length > 0) {
                    currentImagesToShow.forEach(imageInfo => {
                        const imageKey = imageInfo.imageKey;
                        if (images[imageKey] && images[imageKey].texture) { // 텍스처가 로드되었는지 확인
                            this.content.showImages(currentImagesToShow, images, this); // 이미지 표시
                        } else {
                            console.warn(`Image ${imageKey} is not loaded yet.`); // 로드되지 않은 이미지 경고
                        }
                    });
                }
            }
        };
        
    
        const startRevealText = () => {
            if (this.textEvent) this.time.removeEvent(this.textEvent);
            textObject.setText("");
            characterNameObject.setText(""); // 이름 초기화
        
            const currentImages = this.content.data[this.content.currentContentIndex].images;
            
            // 현재 콘텐츠의 딜레이 값 가져오기
            const currentDelay = this.content.getCurrentDelay();
            setTimeout(() => {
                // 이미지 보이기 및 색상 설정
                currentImages.forEach(imageInfo => {
                    const imageKey = imageInfo.imageKey;
                    if (images[imageKey]) {
                        images[imageKey].setVisible(imageInfo.showImage); // 이미지 보이기
                        if (imageInfo.color) {
                            images[imageKey].setTint(Phaser.Display.Color.HexStringToColor(imageInfo.color).color); // 색상 적용
                        } else {
                            images[imageKey].clearTint(); // 색상 초기화
                        }
                    }
                });
        
                this.content.showImages(currentImages, images, this); // 대사 시작 시 이미지 출력
                this.textEvent = this.time.addEvent({ delay: 100, callback: revealText, loop: true });
            }, currentDelay);
        };
        
    
        startRevealText();
    
        this.input.keyboard.on('keydown-SPACE', () => {
            console.log('스페이스바 눌림');
        
            if (!this.content.isComplete()) {
                console.log('대사가 아직 완료되지 않음');
                this.time.removeEvent(this.textEvent); // 텍스트 출력 이벤트 중지
                textObject.setText(this.content.getCurrentText()); // 현재 대사 전체 출력
                characterNameObject.setText(this.content.getCurrentCharacterName()); // 이름 출력
                this.content.setComplete(); // 대사 완료 상태로 설정
                console.log('대사 완료 상태로 설정');
                this.content.addToLog(); // 로그에 현재 대사 추가
                logPopup.updateLog(this.content.getLog()); // 로그 팝업 업데이트
            } else {
                // 대사가 완료된 경우 다음 대사로 이동
                console.log('대사가 완료됨. 다음 대사로 이동 시도');
                if (this.content.moveToNext()) {
                    console.log('다음 대사로 이동 성공');
                    startRevealText(); // 다음 대사 출력 시작
                } else {
                    console.log('모든 대사가 끝났음. 다음 씬으로 이동');
                    this.scene.start('rumenPuzzle', { fadeIn: true }); // 다음 씬으로 이동
                }
            }
        });
        
    
        const skipButton = new Button(this, this.scale.width - 200, this.scale.height - 850, 'skipButton', 0.1, () => {
            this.scene.start('rumenPuzzle', { fadeIn: true });
        });
    
        const logButton = this.add.image(this.scale.width - 100, this.scale.height - 850, 'logButton')
            .setScale(0.04).setInteractive();
        logButton.on('pointerdown', () => logPopup.toggleVisibility());
    }    

    update(){

    }

}