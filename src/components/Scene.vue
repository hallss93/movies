<template>
  <div>
    <div v-if="media">
      <div class="relative pointer">
        <img
          :src="
            `https://www.themoviedb.org/t/p/w220_and_h330_face/${media.backdrop_path}`
          "
          :alt="media.title"
          class="c-img poster"
        />
        <div class="title-body">
          <div class="p-50">
            <h1 class="pb-20 white">{{ media.title }}</h1>
            <h3 class="white">
              {{ media.overview ? media.overview : media.tagline }}
            </h3>
            <div class="pt-20">
              <span
                class="c-badge"
                v-for="(genres, genresIndex) in media.genres"
                :key="genresIndex"
                >{{ genres.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-container space-between pt-100" v-if="media">
      <div class="c-container no-wrap ">
        <div class="m-20">
          <img
            :src="
              `https://www.themoviedb.org/t/p/w220_and_h330_face/${media.poster_path}`
            "
            :alt="media.title"
            class=""
            height="400"
          />
        </div>
        <div class="m-20">
          <h1 class="mb-10">{{ media.title }}</h1>
          <div class="mb-20">
            <star-rating
              :star-size="20"
              :increment="0.5"
              v-model="media.rating"
            ></star-rating>
          </div>
          <h2 class="title">Sinopse</h2>
          <h4 class="mt-20">{{ media.overview }}</h4>
        </div>
      </div>
    </div>
    <div class="p-20" v-if="media"></div>
    <div class="p-20" v-if="type == 'tv' && media && media.seasons">
      <h1>Temporadas</h1>
      <div
        class="c-container space-between pt-50"
        v-if="media && media.seasons"
      >
        <div
          class="c-card medium"
          v-for="(season, index) in media.seasons"
          :key="index"
        >
          <div class="c-card-body" v-if="season.poster_path">
            <img
              :src="
                'https://www.themoviedb.org/t/p/w220_and_h330_face/' +
                  season.poster_path
              "
              :alt="season.name"
              height="240"
            />
          </div>
          <div class="text opacity">
            <h4 class="upper">{{ season.name }}</h4>
            <h6 v-if="season.air_date">
              {{
                new Intl.DateTimeFormat("pt").format(
                  new Date(`${season.air_date} `)
                )
              }}
            </h6>
            <h6 v-if="season.last_air_date">
              {{
                new Intl.DateTimeFormat("pt").format(
                  new Date(`${season.last_air_date} `)
                )
              }}
            </h6>
            <div class="pt-10 pb-10" v-if="season.overview">
              <h5>{{ cutText(season.overview, 100) }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaService from "@/service/media";
import infiniteScroll from "vue-infinite-scroll";

export default {
  props: {
    type: {
      type: String,
      default: "movie",
    },
    id: {
      type: Number,
    },
  },
  directives: { infiniteScroll },
  name: "Scene",
  data() {
    return {
      media: null,
      medias: [],
      page: 1,
    };
  },
  methods: {
    cutText(text, max = 200) {
      return text.length > max ? `${text.substr(0, max)}...` : text;
    },
    async getMovie() {
      const { data } = await mediaService.getMovie(this.id, this.type);
      this.media = data;
      this.media.rating = data.vote_average / 2;
    },
  },
  created() {
    this.getMovie();
  },
};
</script>
