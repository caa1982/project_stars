<template>
    <v-flex xs12 sm6 offset-sm3>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around wrap text-xs-center>
          <H1 v-if="object.length ===0">Seems their is no entry for {{query}}</H1>
          <v-card v-if="object.length !=0" class="card_search_width" color="transparent">
            <IFRAME 
              class="iframe_search_stars" 
              :src="`http://server1.sky-map.org/skywindow?object=HD${object.hd}`" 
              frameBorder="0" 
              sandbox="allow-scripts allow-same-origin"
              v-if="object.object === 'star' && object.name != 'Sun' && skyMap === true"
            ></IFRAME>
            <v-card-media 
              class="card_search_media" 
              src="https://img.purch.com/w/660/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA3My85NTMvb3JpZ2luYWwvc2lyaXVzLmpwZw=="
              v-else-if="object.object === 'star' && object.name != 'Sun' && skyMap != true"
            ></v-card-media>
            <v-card-media 
              class="card_search_media"
              :src="object.img"
              v-else-if="object.object != 'star' || object.name === 'Sun'"
            ></v-card-media>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline">{{object.name}}</div>
                <div class="black--text body-1">Price: {{object.price}} ETH 
                  ({{(object.price*priceEthUsd).toFixed(0).toString().replace(/\B(?=(\d{3})+\b)/g, "'")}} USD)
                </div>
              </div>
            </v-card-title>
            <v-card-action>
             <v-btn outline v-if="! cart.some(e => e.name === object.name)" @click="addToCart(object)" color="green">
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn outline v-if=" cart.some(e => e.name === object.name)" @click="removeFromCart(object)" color="red">
              <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
            </v-card-action>
            <v-expansion-panel dark>
                <v-expansion-panel-content>
                  <div slot="header">Tell me more</div>
              <v-card-text>
                <span class="white--text body-2"> {{object.info}} </span>
                <v-divider class="innerDivider"></v-divider>
                <div v-if="!isNaN(object.name)"  class="white--text">Learn more about HD{{object.hd}} on
                  <a class="red--text" 
                    :href="`${wikipediaUrl} HD_${object.hd}`" 
                    target="_blank">Wikipedia</a>
                </div>
                <div v-else-if="isNaN(object.name)" class="white--text">Learn more about {{object.name}} on
                  <a class="red--text" 
                    v-if="object.object != 'Planet'"
                    :href="`${wikipediaUrl} 
                    ${object.name}`" 
                    target="_blank">Wikipedia</a>
                  <a class="red--text" 
                    v-else-if="object.object === 'Planet'"
                    :href="`${wikipediaUrl} 
                    ${object.name}_(planet)`" 
                    target="_blank">Wikipedia</a>
                </div>
          
                <div class="white--text" v-if="object.object === 'star' && object.name != 'Sun'">Learn more about the HD{{object.hd}} on
                  <a class="red--text" :href="`${SIMBAD} ${object.hd}`" target="_blank">
                    SIMBAD
                  </a>
                </div>
              </v-card-text>
                </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </v-layout>
      </v-container>
    </v-flex>
</template>
<script>
import api from "@/api";
import { EventBus } from "@/modules/eventBus.js";
export default {
  name: "SearchBar",
  props: ["priceEthUsd", "cart", "query", "skyMap"],
  data() {
    return {
      object: [],
      wikipediaUrl: "https://en.wikipedia.org/wiki/",
      SIMBAD: "http://simbad.u-strasbg.fr/simbad/sim-basic?Ident=HD+"
    };
  },
  created() {
    this.search();
  },
  methods: {
    search: function() {
      this.object = [];
      api.search(this.query, object => {
        this.object = object;
      });
    },
    addToCart: function(object) {
      EventBus.$emit("add", object);
    },
    removeFromCart: function(object) {
      EventBus.$emit("remove", object);
    }
  },
  watch: {
      query: function () {
        this.search();
      },
      skyMap: function() {
        this.search();
      },
  }
};
</script>

<style>
.iframe_search_stars {
  height: 500px !important;
  width: 500px !important;
}
.card_search_width {
  width: 500px;
}
.card_search_media {
  height: 500px !important;
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