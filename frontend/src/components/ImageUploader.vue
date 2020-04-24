<template>
  <div>
    <div
      class="uploader"
      @drop="dropEvent" 
      @dragover="allowDrop"
    >
      <p v-show="loading">Carregando ...</p>
      <p v-show="!loading">
        Arraste e solte aqui ou <button @click="selecionarArquivo">Selecione uma foto</button>
      </p>
      <input
        type="file" 
        accept="image/*" 
        ref="file"
        @change="setImageFromInput"
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImageUploader',
  data() {
    return {
      loading: false
    };
  },
  methods: {
    allowDrop(event) {
      event.preventDefault();
    },
    async dropEvent(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.setImage(files[0]);
        return;
      }
      const link = event.dataTransfer.getData('text');
      try {
        this.loading = true;
        const response = await axios.post('http://localhost:3333/baixar-foto', { link });
        this.emitImageLoaded(response.data.src);
      }
      catch (error) {
        alert(error.response.data.message);
      }
      finally {
        this.loading = false;
      }
    },
    selecionarArquivo() {
      this.$refs.file.click();
    },
    setImageFromInput(event) {
      const file = event.target.files[0];
      this.setImage(file);
    },
    setImage(file) {
      if (file.type.indexOf('image/') === -1) {
        alert('O arquivo selecionado não é uma imagem');
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = event => this.emitImageLoaded(event.target.result);
        reader.readAsDataURL(file);
      } else {
        alert('FileReader API não suportada');
      }
    },
    emitImageLoaded(data) {
      this.$emit('image-loaded', data);
    }
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}

.uploader {
  padding: 50px;
  border: 2px solid black;
  border-radius: 5px;
  width: 300px;
}
</style>
