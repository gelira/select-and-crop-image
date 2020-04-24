<template>
  <div>
    <ImageUploader 
      v-show="showUploader"
      @image-loaded="imageLoaded"
      @selecting-image="emitCleanImageSelected"
    />
    <ImageCropper
      v-if="showCropper"
      :img-src="imgSrc" 
      @image-cropped="imageCropped"
      @cropping-canceled="croppingCanceled"
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
    imageLoaded(event) {
      this.imgSrc = event;
      this.showUploader = false;
      this.showCropper = true;
    },
    imageCropped(event) {
      this.showUploader = true;
      this.showCropper = false;
      this.$emit('image-selected', event);
    },
    croppingCanceled() {
      this.showUploader = true;
      this.showCropper = false;
      this.emitCleanImageSelected();
    },
    emitCleanImageSelected() {
      this.$emit('clean-image-selected');
    }
  }
}
</script>
