export class LogPopup {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.container = scene.add.container(x, y).setDepth(100);
        this.background = scene.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0.5);
        this.closeButton = scene.add.text(width / 2 - 60, -height / 2 + 20, 'Close', { font: '18px Arial', fill: '#ff0000' }).setInteractive();
        this.textContainer = scene.add.container(-width / 2 + 10, -height / 2 + 10);
        this.mask = scene.add.graphics();
        this.mask.fillRect(-width / 2 + 10, -height / 2 + 10, width - 20, height - 40);
        this.textContainer.setMask(new Phaser.Display.Masks.GeometryMask(scene, this.mask));
        this.container.add([this.background, this.closeButton, this.textContainer]);
        this.container.setVisible(false);
        this.logText = null;
        this.scrollY = 0;
        this.logContent = [];

        this.closeButton.on('pointerdown', () => this.toggleVisibility());
        scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (this.container.visible) {
                this.scrollY -= deltaY;
                if (this.logText) {
                    this.scrollY = Phaser.Math.Clamp(this.scrollY, -this.logText.height + (height - 40), 0);
                    this.logText.y = this.scrollY;
                }
            }
        });
    }

    updateLog(newLogContent) {
        this.logContent.push(newLogContent); // 새로운 대사를 배열에 추가
        const combinedLog = this.logContent.join('\n\n'); // 배열을 문자열로 결합

        if (this.logText) this.logText.destroy(); // 기존 텍스트 제거
        this.logText = this.scene.add.text(0, 0, combinedLog, { font: '18px Arial', fill: '#000000', wordWrap: { width: 580 } });
        this.textContainer.removeAll(true);
        this.textContainer.add(this.logText);
        this.logText.y = this.scrollY;
    }

    toggleVisibility() {
        this.container.setVisible(!this.container.visible);
        if (this.container.visible) {
            this.updateLog(this.scene.content.getLog()); // 현재 로그 업데이트
        }
    }
}
