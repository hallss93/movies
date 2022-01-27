<template>
  <div>
    <screen :type="'tv'" />
  </div>
</template>

<script>
import Screen from "@/components/Screen.vue";

export default {
  name: "TVs",
  components: {
    Screen
  }
};
</script>
