class WebAudioManager {
  constructor(config, assetLoader) {
    const DEFAULT_CONFIG = {};

    config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    this.assetLoader = assetLoader;
    this.ctx = this.assetLoader.audioContext;

    const canvas = document.getElementById("gameCanvas");

    const { track: bgmTrack, element: bgmAudio } = this.assetLoader.track(
      ASSETS.sounds.MENU_BGM,
    );

    bgmTrack.connect(this.ctx.destination);

    bgmAudio.play();
    this.bgmPlaying = true;

    canvas.addEventListener("click", () => {
      // Check if context is in suspended state (autoplay policy)
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
        return;
      }
      
      // Play or pause track depending on state
      if (!this.bgmPlaying) {
        console.log("[WA] Play music");
        bgmAudio.play();
      } else {
        console.log("[WA] Pause music");
        bgmAudio.pause();
      }
      this.bgmPlaying = !this.bgmPlaying;
    });
  }
}
