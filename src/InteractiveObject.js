class InteractiveObject extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;

        // 설정: 드래그 가능
        this.setInteractive({ draggable: true });

        // 클릭 이벤트
        this.on('pointerdown', this.onPointerDown, this);
        // 드래그 시작 이벤트
        this.on('dragstart', this.onDragStart, this);
        // 드래그 중 이벤트
        this.on('drag', this.onDrag, this);
        // 드래그 종료 이벤트
        this.on('dragend', this.onDragEnd, this);

        // 씬에 추가
        scene.add.existing(this);
    }

    onPointerDown(pointer) {
        console.log('Object clicked!', pointer);
    }

    onDragStart(pointer, dragX, dragY) {
        console.log('Drag started!', pointer, dragX, dragY);
    }

    onDrag(pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
        console.log('Dragging...', pointer, dragX, dragY);
    }

    onDragEnd(pointer, dragX, dragY) {
        console.log('Drag ended!', pointer, dragX, dragY);
    }
}
