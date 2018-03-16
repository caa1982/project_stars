<template>
    <v-flex xs12 sm10 offset-sm1>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around row wrap text-xs-center>
          <div v-if="planetSatelites.length !=0" v-for="(planetSatelite, index) in planetSatelites" :key="index">
          <v-card class="card_width" color="transparent">
            <v-card-media class="card_media" :src="planetSatelite.img"></v-card-media>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline">{{planetSatelite.name}}</div>
                <div class="black--text body-1">price: {{planetSatelite.price}} ETH 
                  ({{(planetSatelite.price*priceEthUsd).toFixed(0).toString().replace(/\B(?=(\d{3})+\b)/g, "'")}} USD)
                </div>
              </div>
            </v-card-title>
            <v-card-action>
            <v-btn outline v-if="! cart.some(e => e.name === planetSatelite.name)" @click="addToCart(planetSatelite)" color="green">
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn outline v-if=" cart.some(e => e.name === planetSatelite.name)" @click="removeFromCart(planetSatelite)" color="red">
              <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
            </v-card-action>
          </v-card>
          <v-card class="card_width margin_bottom">
          <v-expansion-panel dark>
              <v-expansion-panel-content>
                <div slot="header">Tell me more</div> 
            <v-card-text>
              <span class="white--text body-2"> {{planetSatelite.info}} </span>
              <v-divider class="innerDivider"></v-divider>
              <div class="white--text">Learn more about {{planetSatelite.name}}</div>
              <a class="red--text" :href="`${wikipediaUrl} ${planetSatelite.name}`" target="_blank">here</a>
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
import { EventBus } from "@/modules/eventBus.js";

export default {
  name: "PlanetSatelites",
  props: ["cart", "priceEthUsd", "sort", "sortPrice"],
  data() {
    return {
      planetSatelites: [],
      wikipediaUrl: "https://en.wikipedia.org/wiki/",
    };
  },
  mounted() {
    this.getPlanetSatelites();
  },
  methods: {
    getPlanetSatelites: function () {
      api.getPlanetSatelites(this.sort, this.sortPrice, planetSatelites => {
        this.planetSatelites = planetSatelites;
      });
    },
    addToCart: function(object) {
      EventBus.$emit("add", object);
    },
    removeFromCart: function(object) {
      EventBus.$emit("remove", object);
    }
  },
  watch:{
    sort: function() {
      this.getPlanetSatelites();
    },
     sortPrice: function(){
      this.getPlanetSatelites();
    }
  }
};
</script>

<style>
.card_width {
  width: 250px;
}
.card_media {
  height: 250px !important;
}
.innerDivider {
  margin: 1vh;
}
.card_title {
  padding: 10px;
}
.margin_bottom {
  margin-bottom: 2vh;
}
.margin_top {
  margin-top: 2vh;
}
</style>
