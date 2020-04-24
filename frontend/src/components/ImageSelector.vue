<template>
  <div>
    <ImageUploader 
      v-show="showUploader"
      @image-loaded="imageLoaded"
    />
    <img ref="img" :src="imgSrc" v-show="!showUploader">
  </div>
</template>

<script>
import ImageUploader from './ImageUploader';

export default {
  name: 'ImageSelector',
  components: {
    ImageUploader
  },
  data() {
    return {
      showUploader: true,
      imgSrc: ''
    };
  },
  methods: {
    imageLoaded(event) {
      this.imgSrc = event;
      this.showUploader = false;
    }
  }
}
</script>
