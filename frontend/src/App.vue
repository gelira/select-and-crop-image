<template>
  <div>
    <ImageSelector 
      @image-cropped="cropped"
    />
    <div v-if="croppedSrc !== ''">
      <p>Imagem cortada</p>
      <img :src="croppedSrc" />
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
      croppedSrc: ''
    };
  },
  methods: {
    cropped(event) {
      this.croppedSrc = event;
    }
  }
}
</script>
