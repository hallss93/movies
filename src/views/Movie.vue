<template>
  <div>
    <scene :type="'movie'" :id="Number($route.params.id)" />
  </div>
</template>

<script>
import Scene from "@/components/Scene.vue";

export default {
  name: "Movie",
  components: {
    Scene
  },
  watch: {
    $route() {
      window.location.reload();
    }
  }
};
</script>
