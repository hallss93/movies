<template>
  <div>
    <router-link
      :to="{
        name: type == 'movie' ? 'Movie' : 'TV',
        params: { id: media.id }
      }"
    >
      <div class="c-card medium">
        <div class="c-card-body">
          <img :src="media.poster_path" :alt="media.title" class="c-img" />
        </div>
        <div class="text">
          <h4>{{ media.title }}</h4>
          <h6 v-if="media.release_date">
            {{
              new Intl.DateTimeFormat("pt").format(
                new Date(`${media.release_date} `)
              )
            }}
          </h6>
          <div class="pt-10 pb-10">
            <star-rating
              :star-size="20"
              :increment="0.5"
              v-model="media.rating"
            ></star-rating>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "movie"
    },
    media: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  name: "Card"
};
</script>
<style lang="scss" scoped>
.VueCarousel-slide {
  position: relative;
  background: transparent;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  max-height: 600px;
}

.label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.c-container {
  margin: auto 10px;
  display: flex;
  flex-wrap: wrap;

  &.space-between {
    justify-content: space-between;
  }
  &.justify-center {
    justify-content: center;
  }
  &.align-items-center {
    align-items: center;
  }
  &.no-wrap {
    flex-wrap: nowrap;
  }
}
.c-card {
  margin-bottom: 40px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  &.medium {
    height: 240px;
  }
  .c-card-body {
    display: flex;
    height: 100%;
  }
  .text {
    padding: 40px 0px 0px 8px;
    transition: all 0.5s ease-in;
    opacity: 0;
    position: absolute;
    bottom: 0px;
    height: 200px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 1%,
      rgba(0, 0, 0, 0.7) 50%
    );

    h4,
    h6 {
      color: white;
    }
  }

  &:hover {
    transform: scale(1.05);
    .text {
      opacity: 1;
    }
  }
}
.relative {
  position: relative;
}
.title-body {
  display: flex;
  align-items: center;
  text-align: left;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 70%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.3) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(255, 255, 255, 0) 100%
  );
  height: 100%;
  h1 {
    text-transform: uppercase;
    font-weight: bold;
  }
  h3 {
    font-weight: 400;
  }
}
.c-badge {
  background: #fff;
  color: black;
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 14px;
  border-radius: 50px;
}
h4 {
  font-weight: 400;
}
.title {
  border-bottom: 1px solid white;
  text-transform: uppercase;
}
</style>
