<template>
    <v-flex xs12 sm10 offset-sm1>
      <v-container class="margin_top" fluid grid-list-sm>
        <v-layout justify-space-around row wrap text-xs-center>
          <div 
            v-for="(star, index) in stars"
            :key="index"
            >
          <v-card class="card_stars_width" color="transparent">
            <IFRAME 
              class="iframe_stars" 
              :src="`http://server1.sky-map.org/skywindow?object=HD${star.hd}`" 
              frameBorder="0" 
              sandbox="allow-scripts allow-same-origin"
              v-if="star.name != 'Sun'"
            ></IFRAME>
            <v-card-media 
              class="sun" 
              :src="star.img"
              v-else-if="star.name === 'Sun'"
            ></v-card-media>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline" v-if="!isNaN(star.name)">HD{{star.name}}</div>
                <div class="headline" v-else-if="isNaN(star.name)">{{star.name}}</div>
                <div class="black--text body-1">price: {{star.price}} ETH 
                  ({{(star.price*priceEthUsd).toFixed(0).toString().replace(/\B(?=(\d{3})+\b)/g, "'")}} USD)
                </div>
              </div>
            </v-card-title>
            <v-card-action>
            <v-btn outline v-if="! cart.some(e => e.name === star.name)" @click="addToCart(star)" color="green">
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn outline v-if=" cart.some(e => e.name === star.name)" @click="removeFromCart(star)" color="red">
              <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
            </v-card-action>
          </v-card>
          <v-card class="card_stars_width margin_bottom">
          <v-expansion-panel dark>
              <v-expansion-panel-content>
                <div slot="header">Tell me more</div>
            <v-card-text>
              <span class="white--text body-2"> {{star.info}} </span>
              <v-divider class="innerDivider"></v-divider>
              <div class="white--text">Learn more about HD{{star.hd}}</div>
              <a class="red--text" :href="`${wikipediaUrl} ${isNaN(star.name) == true ? star.name : 'HD_' + star.name}`" target="_blank">here</a>
            </v-card-text>
              </v-expansion-panel-content>
          </v-expansion-panel>
          </v-card>
          </div>
        </v-layout>
        <v-dialog v-if="loading === true && stars.length != 0" v-model="dialogLoading" max-height="100" max-width="100">
          <Loading></Loading>
        </v-dialog>
      </v-container>
    </v-flex>
</template>
<script>
import api from "@/api";
import { EventBus } from "@/modules/eventBus.js";
import Loading from "@/components/Loading";

export default {
  name: "Stars",
  components: { Loading },
  data() {
    return {
      stars: [],
      loading: false,
      page: 1,
      dialogLoading: false,
      wikipediaUrl: "https://en.wikipedia.org/wiki/"
    };
  },
  props: ["cart", "priceEthUsd", 'sort', "sortPrice"],
  methods: {
    getStars: function() {
      api.getStars(this.page, this.sort, this.sortPrice, stars => {
        this.stars = this.stars.concat(stars);
        this.loading = false;
      });
    },
    handleScroll: function(event) {
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;
        
      if (offset === height) {
        this.loading = true;
        this.page++;
        this.getStars();
      }
    },
    addToCart: function(object) {
      EventBus.$emit("add", object);
    },
    removeFromCart: function(object) {
      EventBus.$emit("remove", object);
    },
    clearGetNewStars: function(){
      this.stars = [];
      this.page = 1;
      this.getStars();
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.getStars();
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch:{
      image: function() {
        this.clearGetNewStars();
      },
      sort: function() {
        this.clearGetNewStars();
      },
      sortPrice: function(){
        this.clearGetNewStars();
      },
      loading: function() {
        if(this.loading === true){
          this.dialogLoading = true;
        }
      }
  }
};
</script>
<style>
.margin_stars_top {
  width: 400px !important;
}
.card_stars_width {
  width: 400px;
}
.sun {
  height: 256px !important;
  width: 400px !important;
}
.iframe_stars {
  height: 250px !important;
  width: 400px !important;
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
.progress-circular {
  position: absolute;
}
</style>

