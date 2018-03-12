<template>
    <v-flex xs12 sm10 offset-sm1>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around row wrap text-xs-center>
          <div v-if="stars.length !=0" v-for="(star, index) in stars" :key="index">
          <v-card class="card_stars_width" color="transparent">
            <IFRAME :src="`http://server1.sky-map.org/skywindow?object=HD${star.hd}`"></IFRAME>
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
      wikipediaUrl: "https://en.wikipedia.org/wiki/"
    }
  },
  created() {
    api.getStars(stars => {
       this.stars = stars.slice(0, 8);
    });
  }
}
</script>

<style>
.margin_stars_top {
  width: 400px !important;
}
IFRAME {
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

