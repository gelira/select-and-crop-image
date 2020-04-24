<template>
  <div>
    <h1>{{ msg }}</h1>
    <ImageSelector />
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
      msg: 'Hello World!!'
    };
  }
}
</script>
