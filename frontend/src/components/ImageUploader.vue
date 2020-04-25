<template>
  <div>
    <div
      class="uploader"
      @drop="handleDrop" 
      @dragover="handleDragover"
    >
      <p v-show="loading">Carregando ...</p>
      <div v-show="!loading">
        <p>
          Arraste e solte aqui
        </p>
        <p>
          Ou <button @click="triggerFileInputClick">Selecione uma foto</button>
        </p>
        <p>
          Ou informe o link aqui: 
          <input type="text" ref="link">
          <button @click="handleBuscarButtonClick">Buscar</button>
        </p>
      </div>
      <input
        type="file" 
        accept="image/*" 
        ref="file"
        @change="handleFileInputChange"
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
    setImage(file) {
      this.emitSelectingImage();
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
    async buscarBackend(link) {
      this.emitSelectingImage();
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
    // events
    handleDragover(event) {
      event.preventDefault();
    },
    async handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.setImage(files[0]);
        return;
      }
      const link = event.dataTransfer.getData('text');
      await this.buscarBackend(link);
    },
    handleFileInputChange(event) {
      const file = event.target.files[0];
      this.setImage(file);
    },
    triggerFileInputClick() {
      this.$refs.file.click();
    },
    async handleBuscarButtonClick() {
      const link = this.$refs.link.value;
      this.$refs.link.value = '';
      if (link === '') {
        return;
      }
      await this.buscarBackend(link);
    },
    emitImageLoaded(data) {
      this.$emit('image-loaded', data);
    },
    emitSelectingImage() {
      this.$emit('selecting-image');
    }
  }
}
</script>

<style scoped>
input[type='file'] {
  display: none;
}

.uploader {
  padding: 50px;
  border: 2px solid black;
  border-radius: 5px;
  width: 300px;
}
</style>
