<template>
  <div>
    <div
      class="uploader"
      @drop="dropEvent" 
      @dragover="allowDrop"
    >
      <p>Arraste e solte aqui ou <button @click="selecionarArquivo">Selecione uma foto</button></p>
      <input
        type="file" 
        accept="image/*" 
        ref="file"
        @change="setImage"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCropper',
  data() {
    return {};
  },
  methods: {
    allowDrop(event) {
      event.preventDefault();
    },
    dropEvent(event) {
      event.preventDefault();
      console.log(event.dataTransfer.files);
      console.log(event.dataTransfer.getData('text'));
    },
    selecionarArquivo() {
      this.$refs.file.click();
    },
    setImage(event) {
      const file = event.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        alert('O arquivo selecionado não é uma imagem');
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = ev => this.emitImageLoaded(ev.target.result);
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
