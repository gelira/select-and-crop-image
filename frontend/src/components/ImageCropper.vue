<template>
  <div class="content">
    <section class="cropper-area">
      <div class="img-cropper">
        <vue-cropper
          ref="cropper"
          :aspect-ratio="1"
          :src="imgSrc"
          preview=".preview"
        />
      </div>
      <div class="actions">
        <button
          @click="cropImage"
        >
          Crop
        </button>
        <button
          @click="reset"
        >
          Reset
        </button>
      </div>
    </section>
    <section class="preview-area">
      <p>Preview</p>
      <div class="preview" />
    </section>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'ImageCropper',
  components: {
    VueCropper
  },
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    cropImage() {
      const cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$emit('image-cropped', cropImg);
    },
    reset() {
      this.$refs.cropper.reset();
    },
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}
.preview-area {
  width: 307px;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
</style>
