export class VisibleManager {
    constructor(elements) {
        this.elements = elements;
    }

    show() {
        this.setVisible(true);
    }

    hide() {
        this.setVisible(false);
    }

    setVisible(visible) {
        this.elements.forEach(element => element.setVisible(visible));
    }
    // 요소를 직접 전달하여 가시성을 설정하는 메서드
    showElement(element) {
            element.setVisible(true);
            return element.visible;
    }

    hideElement(element) {
            element.setVisible(false);
            return !element.visible;
    }

    setVisibleElement(element, visible) {
            element.setVisible(visible);
            return element.visible === visible;
    }
}