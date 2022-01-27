<template>
  <div>
    <scene :type="'tv'" :id="Number($route.params.id)" />
  </div>
</template>

<script>
import Scene from "@/components/Scene.vue";

export default {
  name: "TV",
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
