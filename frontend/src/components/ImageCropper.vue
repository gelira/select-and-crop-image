<template>
  <div class="content">
    <section class="cropper-area">
      <div class="img-cropper">
        <vue-cropper
          ref="cropper"
          :aspect-ratio="1"
          :view-mode="2"
          :src="imgSrc"
          preview=".preview"
        />
      </div>
      <div class="actions">
        <button
          @click="handleCropButtonClick"
        >
          Crop
        </button>
        <button
          @click="handleResetButtonClick"
        >
          Reset
        </button>
        <button
          @click="handleCancelButtonClick"
        >
          Cancel
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
    // events
    handleCropButtonClick() {
      const cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.emitImageCropped(cropImg);
    },
    handleResetButtonClick() {
      this.triggerCropperRefReset();
    },
    handleCancelButtonClick() {
      this.emitCroppingCanceled();
    },
    emitImageCropped(data) {
      this.$emit('image-cropped', data);
    },
    emitCroppingCanceled() {
      this.$emit('cropping-canceled');
    },
    triggerCropperRefReset() {
      this.$refs.cropper.reset();
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-evenly;
}
.actions {
  margin-top: 1rem;
}
.cropper-area {
  width: 614px;
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
