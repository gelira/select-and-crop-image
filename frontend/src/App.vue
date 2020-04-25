<template>
  <div>
    <ImageSelector 
      @image-selected="handleImageSelected"
      @clean-image-selected="handleCleanImageSelected"
    />
    <div v-if="imageSrc !== ''">
      <p>Imagem cortada</p>
      <img :src="imageSrc" />
    </div>
  </div>
</template>

<script>
import ImageSelector from './components/ImageSelector';

export default {
  name: 'App',
  components: {
    ImageSelector
  },
  data() {
    return {
      msg: 'Hello World!!',
      imageSrc: ''
    };
  },
  methods: {
    handleImageSelected(event) {
      this.imageSrc = event;
    },
    handleCleanImageSelected() {
      this.imageSrc = '';
    }
  }
}
</script>
