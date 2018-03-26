<template>
    <v-flex xs12 sm10 offset-sm1>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around row wrap text-xs-center>
          <div v-if="planets.length !=0" v-for="(planet, index) in planets" :key="index">
          <v-card class="card_width" color="transparent">
            <v-card-media class="card_media" :src="planet.img"></v-card-media>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline">{{planet.name}}</div>
                <div class="black--text body-1">Price: {{planet.price}} ETH 
                  ({{(planet.price*priceEthUsd).toFixed(0).toString().replace(/\B(?=(\d{3})+\b)/g, "'")}} USD)
                </div>
                <div class="black--text body-1" v-if="planet.owner != 0">Owner:
                  <a :href="`${etherscan}${planet.owner}`" target="_blank">{{planet.owner.substring(0, 8)}}</a>
                </div>
                <div class="black--text body-1" v-if="planet.owner == 0">Not registered yet</div>
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
              <v-btn outline v-if="!cart.some(e => e.name === planet.name) && planet.owner != address" @click="addToCart(planet)" color="green">
                <v-icon>add_shopping_cart</v-icon>
              </v-btn>
              <v-btn outline v-if="cart.some(e => e.name === planet.name) || planet.owner == address" @click="removeFromCart(planet)" color="red">
                <v-icon>remove_shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="card_width margin_bottom">
          <v-expansion-panel dark>
              <v-expansion-panel-content>
                <div slot="header">Tell me more</div>
            <v-card-text>
              <span class="white--text body-2"> {{planet.info}} </span>
              <v-divider class="innerDivider"></v-divider>
              <div class="white--text">Learn more about {{planet.name}}</div>
              <a class="red--text" :href="`${wikipediaUrl} ${planet.name} _(planet)`" target="_blank">here</a>
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
  name: "Planets",
  props: ["cart", "priceEthUsd", "sort", "sortPrice", "address"],
  data() {
    return {
      planets: [],
      etherscan: "https://etherscan.io/address/",
      wikipediaUrl: "https://en.wikipedia.org/wiki/"
    };
  },
  created() {
    this.getPlanets();
  },
  methods: {
    getPlanets: function() {
      api.getPlanets(this.sort, this.sortPrice, planets => {
        this.planets = planets;
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
        this.getPlanets();
      },
      sortPrice: function(){
        this.getPlanets();
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
