export class Content {
    constructor(data) {
        this.data = data; // [{ text: '...', characterName: '...', imageKey: '...' }, {...}]
        this.currentContentIndex = 0;
        this.currentCharIndex = 0;
        this.displayText = "";
        this.logContent = [];
        this.complete = false;
    }

    // 현재 텍스트 데이터 가져오기
    getCurrentText() {
        return this.data[this.currentContentIndex].text; // 텍스트 반환
    }

    // 현재 캐릭터 이름 가져오기
    getCurrentCharacterName() {
        return this.data[this.currentContentIndex].characterName; // 캐릭터 이름 반환
    }

    // 현재 이미지 키 가져오기
    getCurrentImageKey() {
        return this.data[this.currentContentIndex].images; // 이미지 키 반환
    }

    // 현재 사운드 키 가져오기
    getCurrentSoundKey() {
        return this.data[this.currentContentIndex].soundKey; // soundKey 반환
    }

    // 현재 글자색 가져오기
    getCurrentColor() {
        return this.data[this.currentContentIndex].color || "#000000"; // 기본값은 검정색
    }

    // 현재 볼드 여부 가져오기
    isCurrentBold() {
        return this.data[this.currentContentIndex].bold || false; // 기본값은 false
    }


    //현재 텍스트에 대한 딜레이 가져오는 메서드
    getCurrentDelay() {
        return this.data[this.currentContentIndex].delay || 0; // 기본값 0
    }

    // 한 글자씩 텍스트 추가하여 출력
    addCharToDisplayText() {
        const currentText = this.getCurrentText();
        if (this.currentCharIndex < currentText.length) {
            this.displayText += currentText[this.currentCharIndex];
            this.currentCharIndex++;
        }
        return this.displayText;
    }

    // 텍스트가 모두 출력되었는지 확인
    isComplete() {
        return this.currentCharIndex >= this.getCurrentText().length || this.complete; // 대사가 모두 출력되었거나 완료 상태일 때 true
    }    

    // 다음 텍스트로 이동
    moveToNext() {
        console.log('현재 인덱스:', this.currentContentIndex);
        console.log('완료 여부:', this.isComplete());
        if (this.currentContentIndex < this.data.length - 1 && this.isComplete()) {
            this.currentContentIndex++;
            this.currentCharIndex = 0;
            this.displayText = "";
            this.complete = false; // 다음 대사로 넘어가면 완료 상태 리셋
            console.log('다음 인덱스로 이동:', this.currentContentIndex);
            return true;
        }
        return false;
    }

    showImages(imagesArray, images, scene) {
        imagesArray.forEach(imageInfo => {
            const imageKey = imageInfo.imageKey;
            const showImage = imageInfo.showImage;
            const fadeIn = imageInfo.fadeIn; // 페이드인 속성
            const fadeOut = imageInfo.fadeOut; // 페이드아웃 속성
            const color = imageInfo.color; // 색상 속성 추가

            if (images[imageKey]) {
                const image = images[imageKey];
                if (showImage) {
                    if (fadeIn) {
                        // 페이드인 효과 적용
                        image.setVisible(true);
                        image.setAlpha(0); // 투명도로 시작
                        scene.tweens.add({
                            targets: image,
                            alpha: { from: 0, to: 1 },
                            duration: 500, // 페이드인 시간
                            ease: 'Linear'
                        });
                    } else {
                        image.setVisible(true);
                    }
                    if (color) {
                        image.setTint(Phaser.Display.Color.HexStringToColor(color).color); // 색상 적용
                    }
                } else {
                    if (fadeOut) {
                        // 페이드아웃 효과 적용
                        scene.tweens.add({
                            targets: image,
                            alpha: { from: 1, to: 0 },
                            duration: 500, // 페이드아웃 시간
                            ease: 'Linear',
                            onComplete: () => {
                                image.setVisible(false); // 애니메이션이 끝난 후 숨기기
                            }
                        });
                    } else {
                        image.setVisible(false);
                    }
                }
            }
        });
    }

    // 색상 초기화 메서드 추가
    resetImageColor(image) {
        image.clearTint(); // 원래 색상으로 되돌리기
    }
    

    // 현재 출력된 텍스트 로그에 추가
    addToLog() {
        this.logContent.push(this.displayText);
    }

    // 로그 가져오기
    getLog() {
        return this.logContent.join('\n\n');
    }

    // 대사가 완료되었음을 표시
    setComplete() {
        this.complete = true; // 대사가 완료되었음을 표시
    }
}
