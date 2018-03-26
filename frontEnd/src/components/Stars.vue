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
              v-if="star.name != 'Sun' && skyMap === true"
            ></IFRAME>
            <v-card-media 
              class="sun" 
              src="https://img.purch.com/w/660/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA3My85NTMvb3JpZ2luYWwvc2lyaXVzLmpwZw=="
              v-else-if="star.name != 'Sun' && skyMap != true"
            ></v-card-media>
            <v-card-media 
              class="sun" 
              :src="star.img"
              v-else-if="star.name === 'Sun'"
            ></v-card-media>
            <v-card-title primary-title class="card_title justify-center">
              <div>
                <div class="headline" v-if="!isNaN(star.name)">HD{{star.hd}}</div>
                <div class="headline" v-else-if="isNaN(star.name)">{{star.name}}</div>
                <div class="headline" v-if="isNaN(star.name) && star.name !='Sun'">HD{{star.hd}}</div>
                <div class="black--text body-1">price: {{star.price}} ETH 
                  ({{(star.price*priceEthUsd).toFixed(0).toString().replace(/\B(?=(\d{3})+\b)/g, "'")}} USD)
                </div>
                <div class="black--text body-1" v-if="star.owner != 0">Owner:
                  <a :href="`${etherscan}${star.owner}`" target="_blank">{{star.owner.substring(0, 8)}}</a>
                </div>
                <div class="black--text body-1" v-if="star.owner == 0">Not registered yet</div>
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
            <v-btn outline v-if="!cart.some(e => e.name === star.name) && star.owner != address" @click="addToCart(star)" color="green">
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn outline v-if="cart.some(e => e.name === star.name) || star.owner == address" @click="removeFromCart(star)" color="red">
              <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="card_stars_width margin_bottom">
          <v-expansion-panel dark>
              <v-expansion-panel-content>
                <div slot="header">Tell me more</div>
            <v-card-text>
              <span class="white--text body-2"> {{star.info}} </span>
              <v-divider class="innerDivider"></v-divider>
              <div class="white--text" v-if="isNaN(star.name)">Learn more about the {{star.name}} on
                <a class="red--text" :href="`${wikipediaUrl} ${star.name}`" target="_blank">
                Wikipedia
                </a></div>
              <div class="white--text" v-if="!isNaN(star.name)">Learn more about HD{{star.hd}} on
                <a class="red--text" :href="`${wikipediaUrl} ${'HD_' + star.hd}`" target="_blank">
                Wikipedia
                </a>
              </div>

              <div class="white--text" v-if="star.name != 'Sun'">Learn more about HD{{star.hd}} on
                <a class="red--text" :href="`${SIMBAD} ${star.hd}`" target="_blank">
                SIMBAD
                </a>
              </div>
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
import MetaMask from "../api/modules/web3Connection.js";

export default {
  name: "Stars",
  components: { Loading },
  data() {
    return {
      stars: [],
      loading: false,
      page: 1,
      dialogLoading: false,
      wikipediaUrl: "https://en.wikipedia.org/wiki/",
      SIMBAD: "http://simbad.u-strasbg.fr/simbad/sim-basic?Ident=HD+",
      etherscan: "https://etherscan.io/address/"
    };
  },
  props: ["cart", "priceEthUsd", 'sort', "sortPrice", "skyMap", "address"],
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
      skyMap: function() {
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

