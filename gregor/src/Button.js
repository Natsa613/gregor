// Button.js
export class Button {
    constructor(scene, x, y, key, scale, callback, options = { useImage: true, draggable: false }) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.callback = callback;

        if (options.useImage && key) {
            this.button = scene.add.image(x, y, key).setScale(scale).setInteractive();
            this.button.on('pointerdown', callback);
        }

        // 투명 버튼 생성
        this.transparentButton = scene.add.graphics();
        this.updateTransparentButton(x, y, (options.width || this.button.width) * scale, (options.height || this.button.height) * scale);
        this.transparentButton.setInteractive(new Phaser.Geom.Rectangle(x, y, (options.width || this.button.width) * scale, (options.height || this.button.height) * scale), Phaser.Geom.Rectangle.Contains);
        this.transparentButton.on('pointerdown', callback);

        // 드래그 가능 여부 설정
        if (options.draggable) {
            this.enableDragging();
        }
    }

    updateTransparentButton(x, y, width, height) {
        this.transparentButton.clear();
        this.transparentButton.fillStyle(0x000000, 0); // 투명한 색상
        this.transparentButton.fillRect(x - width / 2, y - height / 2, width, height);
    }

    setVisible(visible) {
        if (this.button) {
            this.button.setVisible(visible);
        }
        this.transparentButton.setVisible(visible);
    }

    setPosition(x, y) {
        if (this.button) {
            this.button.setPosition(x, y);
        }
        this.updateTransparentButton(x, y, this.button ? this.button.width * this.button.scaleX : 100 * this.scale, this.button ? this.button.height * this.button.scaleY : 50 * this.scale);
        this.transparentButton.setInteractive(new Phaser.Geom.Rectangle(x, y, this.button ? this.button.width * this.button.scaleX : 100 * this.scale, this.button ? this.button.height * this.button.scaleY : 50 * this.scale), Phaser.Geom.Rectangle.Contains);
    }

    enableDragging() {
        if (this.button) {
            this.button.setInteractive({ draggable: true });
            this.scene.input.setDraggable(this.button);

            this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                if (gameObject === this.button) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                    this.setPosition(dragX, dragY); // 투명 버튼 위치도 업데이트
                }
            });
        } else {
            this.transparentButton.setInteractive({ draggable: true });
            this.scene.input.setDraggable(this.transparentButton);

            this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                if (gameObject === this.transparentButton) {
                    this.setPosition(dragX, dragY);
                }
            });
        }
    }
}

