// Asset.js
export class Asset {
    constructor(key, path) {
        this.key = key; // 에셋의 키
        this.path = path; // 에셋의 경로
        this.isAudio = path.endsWith('.mp3') || path.endsWith('.wav'); // 오디오인지 여부 판별
    }

    load(scene) {
        if (this.isAudio) {
            scene.load.audio(this.key, this.path); // 오디오 파일 로드
        } else {
            scene.load.image(this.key, this.path); // 이미지 파일 로드
        }
    }
}
