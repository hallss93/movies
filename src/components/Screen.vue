<template>
  <div>
    <carousel
      :paginationEnabled="false"
      v-if="medias.length > 0"
      :perPage="1"
      :autoplay="false"
      :autoplayTimeout="3000"
    >
      <template v-for="(media, index) in mediaGet">
        <slide :key="index">
          <router-link
            :to="{
              name: type == 'movie' ? 'Movie' : 'TV',
              params: { id: media.id },
            }"
          >
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
                  <h2 class="pb-20">{{ media.title }}</h2>
                  <h6>{{ media.overview ? media.overview : media.tagline }}</h6>
                  <div class="p-50">
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
          </router-link>
        </slide>
      </template>
    </carousel>
    <div class="c-container space-between pt-50">
      <template v-for="(media, index) in medias">
        <router-link
          :key="index"
          :to="{
            name: type == 'movie' ? 'Movie' : 'TV',
            params: { id: media.id },
          }"
        >
          <div v-if="media.poster_path" class="c-card medium">
            <div class="c-card-body">
              <img
                :src="
                  `https://www.themoviedb.org/t/p/w220_and_h330_face/${media.poster_path}`
                "
                :alt="media.title"
                class="c-img"
              />
            </div>
            <div class="text">
              <h4>{{ media.title ? media.title : media.name }}</h4>
              <h6 v-if="media.release_date">
                {{
                  new Intl.DateTimeFormat("pt").format(
                    new Date(`${media.release_date} `)
                  )
                }}
              </h6>
              <h6>
                {{ media.last_air_date }}
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
      </template>
      <div
        class="mt-50"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="20"
      >
        ...
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import mediaService from "@/service/media";
import infiniteScroll from "vue-infinite-scroll";

export default {
  props: {
    type: {
      type: String,
      default: "movie",
    },
  },
  name: "Screen",
  directives: { infiniteScroll },
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      medias: [],
      mediaGet: [],
      page: 1,
    };
  },
  methods: {
    async getAllMovie(concat = false) {
      const { data, status } = await mediaService.getAllMovie(
        this.type,
        this.page
      );

      if (status == 200) {
        if (concat) this.medias = this.medias.concat(data.results);
        else this.medias = data.results;
      }
      data.results.map(async (e) => {
        e.rating = e.vote_average / 2;
        const { data } = await mediaService.getMovie(e.id, this.type);
        data.rating = data.vote_average / 2;
        if (data.backdrop_path && data.backdrop_path.indexOf(".jpg") > 0)
          this.mediaGet.push(data);
      });
      return true;
    },
    async loadMore() {
      this.page++;
      this.busy = true;
      await this.getAllMovie(true);
      this.busy = false;
    },
  },
  created() {
    this.getAllMovie();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
