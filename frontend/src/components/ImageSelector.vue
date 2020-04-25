<template>
  <div>
    <ImageUploader 
      v-show="showUploader"
      @image-loaded="handleImageLoaded"
      @selecting-image="emitCleanImageSelected"
    />
    <ImageCropper
      v-if="showCropper"
      :img-src="imgSrc" 
      @image-cropped="handleImageCropped"
      @cropping-canceled="handleCroppingCanceled"
    />
  </div>
</template>

<script>
import ImageUploader from './ImageUploader';
import ImageCropper from './ImageCropper';

export default {
  name: 'ImageSelector',
  components: {
    ImageUploader,
    ImageCropper
  },
  data() {
    return {
      showUploader: true,
      showCropper: false,
      imgSrc: ''
    };
  },
  methods: {
    // events
    handleImageLoaded(event) {
      this.imgSrc = event;
      this.showUploader = false;
      this.showCropper = true;
    },
    handleImageCropped(event) {
      this.showUploader = true;
      this.showCropper = false;
      this.emitImageSelected(event);
    },
    handleCroppingCanceled() {
      this.showUploader = true;
      this.showCropper = false;
      this.emitCleanImageSelected();
    },
    emitCleanImageSelected() {
      this.$emit('clean-image-selected');
    },
    emitImageSelected(data) {
      this.$emit('image-selected', data);
    }
  }
}
</script>
