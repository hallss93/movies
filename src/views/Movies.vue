<template>
  <div>
    <screen :type="'movie'" />
  </div>
</template>

<script>
import Screen from "@/components/Screen.vue";

export default {
  name: "Movies",
  components: {
    Screen,
  },
};
</script>
