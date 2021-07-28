class AnimatedTexture extends Texture {

   frames;
   frameInterval;

   currentFrame = 0;
   frameTimer = 0;

   constructor(frames, frameInterval) {
      super(frames[0]);
      this.frames = frames;
      this.frameInterval = frameInterval;
   }

   update() {
      this.frameTimer += Time.deltaTime;
      if (this.frameTimer * 1000 >= this.frameInterval) {
         this.frameTimer -= this.frameInterval / 1000;

         this.currentFrame ++;

         if (this.currentFrame >= this.frames.length) {
            this.currentFrame = 0;
         }

         this.image = this.frames[this.currentFrame];
      }
   }
}