<template>
  <div>
    <ImageSelector 
      @image-selected="imageSelected"
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
    imageSelected(event) {
      this.imageSrc = event;
    }
  }
}
</script>
