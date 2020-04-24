<template>
  <div>
    <ImageUploader 
      v-show="showUploader"
      @image-loaded="imageLoaded"
    />
    <ImageCropper
      v-if="showCropper"
      :img-src="imgSrc" 
      @cropped-image="cropped"
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
    cropped(event) {
      this.showUploader = true;
      this.showCropper = false;
      this.$emit('image-cropped', event);
    }
  }
}
</script>
