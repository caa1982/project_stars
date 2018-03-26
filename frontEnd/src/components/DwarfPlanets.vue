<template>
    <v-flex xs12 sm10 offset-sm1>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around row wrap text-xs-center>
          <div v-if="dwarfplanets.length !=0" v-for="(dwarfplanet, index) in dwarfplanets" :key="index">
          <v-card class="card_width" color="transparent">
            <v-card-media class="card_media" :src="dwarfplanet.img"></v-card-media>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline">{{dwarfplanet.name}}</div>
                <div class="black--text body-1">Price: {{dwarfplanet.price}} ETH 
                  ({{(dwarfplanet.price*priceEthUsd).toFixed(0).toString().replace(/\B(?=(\d{3})+\b)/g, "'")}} USD) 
                </div>
                <div class="black--text body-1" v-if="dwarfplanet.owner != 0">Owner:
                  <a :href="`${etherscan}${dwarfplanet.owner}`" target="_blank">{{dwarfplanet.owner.substring(0, 8)}}</a>
                </div>
                <div class="black--text body-1" v-if="dwarfplanet.owner == 0">Not registered yet</div>
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
              <v-btn outline v-if="!cart.some(e => e.name === dwarfplanet.name) && dwarfplanet.owner != address" @click="addToCart(dwarfplanet)" color="green">
                  <v-icon>add_shopping_cart</v-icon>
                </v-btn>
                <v-btn outline v-if="cart.some(e => e.name === dwarfplanet.name) || dwarfplanet.owner == address" @click="removeFromCart(dwarfplanet)" color="red">
                  <v-icon>remove_shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="card_width margin_bottom">
          <v-expansion-panel dark>
              <v-expansion-panel-content>
                <div slot="header">Tell me more</div>
            <v-card-text>
              <span class="white--text body-2"> {{dwarfplanet.info}} </span>
              <v-divider class="innerDivider"></v-divider>
              <div class="white--text">Learn more about {{dwarfplanet.name}}</div>
              <a class="red--text" :href="`${wikipediaUrl} ${dwarfplanet.name}`" target="_blank">here</a>
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
  name: "DwarfPlanets",
  props: ["cart", "priceEthUsd", "sort", "sortPrice", "address"],
  data() {
    return {
      dwarfplanets: [],
      etherscan: "https://etherscan.io/address/",
      wikipediaUrl: "https://en.wikipedia.org/wiki/"
    };
  },
  created() {
    this.getDwarfPlanet();
  },
  methods: {
    getDwarfPlanet: function () {
      api.getDwarfPlanet(this.sort, this.sortPrice, dwarfplanets => {
        this.dwarfplanets = dwarfplanets;
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
      this.getDwarfPlanet();
    },
     sortPrice: function(){
      this.getDwarfPlanet();
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
