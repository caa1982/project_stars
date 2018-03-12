<template>
    <v-flex xs12 sm10 offset-sm1>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around row wrap text-xs-center>
          <div v-if="planets.length !=0" v-for="(planet, index) in planets" :key="index">
          <v-card class="card_stars_width" color="transparent">
            <v-card-media class="card_media" :src="planet.img"></v-card-media>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline">{{planet.Name}}</div>
                <div class="black--text body-1">Price: {{planet.Price}} USD </div>
              </div>
            </v-card-title>
            <v-card-action>
            <v-btn outline color="green">
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            </v-card-action>
          </v-card>
          <v-card class="card_stars_width margin_bottom">
          <v-expansion-panel dark>
              <v-expansion-panel-content>
                <div slot="header">Tell me more</div>
            <v-card-text>
              <span class="white--text body-2"> {{planet.Info}} </span>
              <v-divider class="innerDivider"></v-divider>
              <div class="white--text">Learn more about {{planet.Name}}</div>
              <a class="red--text" :href="`${wikipediaUrl} ${planet.Name} _(planet)`" target="_blank">here</a>
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
  name: 'Planets',
  data() {
    return {
      planets: [],
      wikipediaUrl: "https://en.wikipedia.org/wiki/"
    }
  },
  created() {
    api.getPlanets(planets => {
       this.planets = planets;
    });
  }
}
</script>

<style>
.card_stars_width {
  width: 400px;
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
