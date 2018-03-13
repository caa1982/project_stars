<template>
    <v-flex xs12 sm10 offset-sm1>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around row wrap text-xs-center>
          <div 
            v-for="(star, index) in stars" 
            :key="index">
          <v-card class="card_stars_width" color="transparent">
            <IFRAME class="iframe_stars" :src="`http://server1.sky-map.org/skywindow?object=HD${star.hd}`" frameBorder="0" sandbox="allow-scripts allow-same-origin"></IFRAME>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline">{{star.Name}}</div>
                <div class="black--text body-1">Price: {{star.Price}} USD </div>
              </div>
            </v-card-title>
            <v-card-action>
            <v-btn outline color="green">
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            </v-card-action>
          </v-card>
          <v-card class="card_srtars_width margin_bottom">
          <v-expansion-panel dark>
              <v-expansion-panel-content>
                <div slot="header">Tell me more</div>
            <v-card-text class="justify-center">
              <span class="white--text body-2"> {{star.Info}} </span>
              <v-divider class="innerDivider"></v-divider>
              <div class="white--text">Learn more about HD{{star.hd}}</div>
              <a class="red--text" :href="`${wikipediaUrl} ${star.Name}`" target="_blank">here</a>
            </v-card-text>
              </v-expansion-panel-content>
          </v-expansion-panel>
          </v-card>
          </div>
        </v-layout>
        <v-progress-linear :v-if="loading === true && stars.length() != 0" :indeterminate="true"></v-progress-linear>
      </v-container>
    </v-flex>
</template>
<script>
import api from "@/api";
export default {
  name: 'Stars',
  data() {
    return {
      stars: [],
      loading: true,
      page: 1,
      wikipediaUrl: "https://en.wikipedia.org/wiki/"
    }
  },
  methods: {
    getStars: function () {
      api.getStars(this.page, stars => {
        this.stars = this.stars.concat(stars);
        this.loading = false;
      });
    },
    handleScroll: function (event) {
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;

      console.log('offset = ' + offset);
      console.log('height = ' + height);

      if (offset === height) {
        this.getStars();
        this.page++
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.getStars();
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
<style>
.margin_stars_top {
  width: 400px !important;
}
.iframe_stars {
  height: 250px !important;
  width: 400px !important;
}
.innerDivider{
  margin: 1vh;
}
.card_title {
  padding: 10px;
}
.margin_bottom {
  margin-bottom: 2vh;
}
.margin_top{
  margin-top: 2vh;
}
</style>

