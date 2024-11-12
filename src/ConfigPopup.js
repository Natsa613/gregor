// ConfigPopup.js
import { formatValue } from './utils';

export const globalVolume = {
    volume : 0.25 //기본값
};

export class ConfigPopup {
    constructor(scene) {
        this.scene = scene;
        this.createPopup();
        this.hide();
    }

    createPopup() {
        this.popupBackground = this.scene.add.graphics();
        this.popupBackground.fillStyle(0x000000, 0.8);
        this.popupBackground.fillRoundedRect(400, 200, 800, 600, 20);
        this.popupBackground.setDepth(10);

        this.closeButton = this.createText(1150, 220, 'X', 11, () => this.hide());
        this.configText = this.createText(600, 300, '게임 설정 변경', 11);

        this.soundConfigText = this.createText(500, 400, '배경음악', 11);
        this.soundConfigValue = this.createText(1000, 400, '25.00', 11);
        this.soundSlider = this.createSlider(750, 400, (value) => {
            this.soundConfigValue.setText(formatValue(value * 100, 2));
            globalVolume.volume = value;
        });

        this.textspeedConfigText = this.createText(500, 600, '텍스트 속도', 11);
        this.textspeedConfigValue = this.createText(1000, 600, '75.00', 11);
        this.textSpeedSlider = this.createSlider(750, 600, (value) => {
            this.textspeedConfigValue.setText(formatValue(value * 100, 2));
            console.log('텍스트 속도:', value);
        });

        this.hide();
    }

    createText(x, y, text, depth, callback) {
        let textObject = this.scene.add.text(x, y, text, { fontSize: '32px', fill: '#fff' });
        textObject.setDepth(depth);
        if (callback) {
            textObject.setInteractive();
            textObject.on('pointerdown', callback);
        }
        return textObject;
    }

    createSlider(x, y, onChange) {
        let track = this.scene.add.graphics();
        track.fillStyle(0x888888);
        track.fillRoundedRect(0, 0, 200, 20, 10);
        track.setPosition(x, y + 10);

        let thumb = this.scene.add.graphics();
        thumb.fillStyle(0xcfcfcf);
        thumb.fillCircle(0, 0, 10);
        thumb.setPosition(x + 150, y + 20);

        thumb.setInteractive(new Phaser.Geom.Circle(0, 0, 10), Phaser.Geom.Circle.Contains);
        this.scene.input.setDraggable(thumb);

        thumb.on('drag', (pointer, dragX) => {
            if (dragX >= x && dragX <= x + 200) {
                thumb.x = dragX;
                let value = (dragX - x) / 200;
                onChange(value);
            }
        });

        track.setDepth(11);
        thumb.setDepth(12);

        return { track, thumb };
    }

    show() {
        this.setVisible(true);
    }

    hide() {
        this.setVisible(false);
    }

    setVisible(visible) {
        this.popupBackground.setVisible(visible);
        this.closeButton.setVisible(visible);
        this.configText.setVisible(visible);
        this.soundConfigText.setVisible(visible);
        this.soundConfigValue.setVisible(visible);
        this.soundSlider.track.setVisible(visible);
        this.soundSlider.thumb.setVisible(visible);
        this.textspeedConfigText.setVisible(visible);
        this.textspeedConfigValue.setVisible(visible);
        this.textSpeedSlider.track.setVisible(visible);
        this.textSpeedSlider.thumb.setVisible(visible);
    }
}
