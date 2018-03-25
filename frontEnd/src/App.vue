<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      clipped
      width="200"
      class="grey darken-4"
      app
      stateless
      hide-overlay
      v-model="drawer"
      dark
    >
    <v-list>
      <v-list-tile :to="{name:'Stars'}">
          <v-list-tile-action>
            <v-icon color="yellow">far fa-sun</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Stars</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'Planets'}">
          <v-list-tile-action>
            <v-icon color="blue">fas fa-globe</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Planets</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'Exoplanets'}">
          <v-list-tile-action>
            <v-icon color="green">fas fa-globe</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Exoplanets</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'DwarfPlanets'}">
          <v-list-tile-action>
            <v-icon color="light-blue" small>fas fa-globe</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Dwarf Planets</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'PlanetSatelites'}">
          <v-list-tile-action>
            <v-icon color="white">fas fa-moon</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Planet Satellites</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'SkyMap'}">
          <v-list-tile-action>
            <v-icon color="indigo">fas fa-map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">SkyMap</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'Portfolio'}">
            <v-list-tile-action>
              <v-icon color="deep-purple">fas fa-briefcase</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">My Portfolio</v-list-tile-title>
            </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar color="black" app clipped-left>
      <v-toolbar-side-icon color="yellow" @click.native="drawer = !drawer" v-if="MetaMaskConnected != false"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5 white--text">Head In The Stars</span>
      
      <v-flex lg4 md2 sm2 xs2>
        <v-text-field
          solo
          flat
          @keyup.enter.native="search(searchBar)"
          label="Search by HD/name"
          v-model="searchBar"
          prepend-icon="search"
          v-if="MetaMaskConnected != false"
        ></v-text-field>
      </v-flex>
      
      <v-spacer></v-spacer>
      
        <v-badge class="margin_badge" color="red" v-if="MetaMaskConnected != false" overlap>
          <span slot="badge">{{cart.length}}</span>
          <v-menu
            bottom 
            :close-on-content-click="false"
            offset-y
          >
          <v-icon color="grey darken-1" medium slot="activator">
            shopping_cart
          </v-icon>
            <v-card v-if="cart.length !=0" class="margin_cart grey darken-4 text-xs-center">
            <v-card-title class="indigo">
              <div class="white--text">Recently added items ({{cart.length}})</div>
            </v-card-title> 
            <v-list class="transparent" Two-line>
                <template v-for="item in cart">
                  <v-list-tile class="white rounded card_text_margin" avatar :key="item.title">
                    <v-list-tile-avatar>
                      <img v-if="item.img" :src="item.img">
                      <img v-else-if="item.object == 'star'" src="./assets/star.jpg">
                      <img v-else-if="item.object == 'exoplanet'" src="./assets/No-image-available.jpg">
                    </v-list-tile-avatar>
                    
                  
                    <v-list-tile-content>
                      <v-list-tile-title >{{item.name}}</v-list-tile-title>
                      <v-list-tile-title >{{item.price}} <v-icon small>fab fa-ethereum</v-icon></v-list-tile-title>
                    </v-list-tile-content>
                  
                    <v-flex xs6>
                      <v-text-field 
                      label="New ETH price" 
                      v-model="item.newPrice"
                      single-line></v-text-field>
                    </v-flex>
                    
                    <div class="pointer"><v-icon @click="deleteFromCart(item)" medium>clear</v-icon></div>
                    
              
                  </v-list-tile>
                </template>
            </v-list>
            <v-card-text class="card_cartBalance_margin indigo">
              <div class="white--text" v-if="cart.length > 5">Please remove {{cart.length-5}} items, the max items you can buy at once is 5</div>
              <div class="white--text" v-if="cart.length <= 5">Total: {{ Math.round(cart.reduce((acc, obj) => acc + obj.price, 0)* 100)/100 }} ETH / 
                {{ (Math.round(cart.reduce((acc, obj) => acc + obj.price, 0)* 100)/100*priceEthUsd).toFixed(0).toString().replace(/\B(?=(\d{3})+\b)/g, "'")}} USD
              </div>
            </v-card-text>
            <v-card-actions class="justify-center" v-if="cart.length <= 5">
              <v-btn @click="checkout()" outline color="green" large>
                Check out
              </v-btn>
            </v-card-actions>
            </v-card>
          </v-menu>
        </v-badge>
        
        <v-menu 
          bottom 
          offset-y
          :close-on-content-click="false"
          v-if="MetaMaskConnected != false"
          fixed
        >
     
          <v-icon @click="scrollTop()" class="settings_margin" color="grey darken-1" slot="activator" large>settings</v-icon>
          <v-card class="settings grey darken-4">
          
            <v-radio-group v-model="sort" row>
              <v-radio
                label="Ascending sort"
                color="orange darken-1"
                value="ascending"
                dark
              ></v-radio>
              
              <v-radio
                label="Descanding sort"
                color="orange darken-1"
                value="descanding"
                dark 
                ></v-radio>
              </v-radio-group>

              <v-flex>
                <v-checkbox
                  label="Highest price first"
                  color="yellow darken-1"
                  value="priceHigh"
                  v-model="sortPrice"
                  hide-details
                  dark
                ></v-checkbox>
                <v-checkbox
                  label="Lowest price first"
                  color="yellow darken-1"
                  value="priceLow"
                  v-model="sortPrice"
                  hide-details
                  dark
                ></v-checkbox>
                <v-checkbox
                  label="Enable SkyMap on stars"
                  color="indigo darken-1"
                  v-model="skyMap"
                  hide-details
                  dark
                ></v-checkbox>
            
                <v-checkbox
                  label="Include objects with no image"
                  v-model="selected"
                  color="green darken-1"
                  value="image"
                  hide-details
                  dark
                ></v-checkbox>
              </v-flex>
              
            </v-card>
          </v-menu>
          
        <v-badge class="margin_badge" :color="metaMaskColor" overlap>  
          <v-icon slot="badge" color="white">{{metaMaskIcon}}</v-icon>
          
          <v-menu 
            bottom 
            offset-y
          >
            <img id="MetaMask" slot="activator" src="./assets/Metamask.png">
            
            <v-card v-if="MetaMaskConnected != false" class="margin_card transparent text-xs-center">
            <v-card-title class="orange lighten-1">
            <div class="black--text">
              <div class="pointerCopy" v-clipboard="address[0]">{{ address[0] }}</div>
              <span><v-icon class="fab fa-ethereum"></v-icon>{{ metaMaskBalance  }}</span>
            </div>
            </v-card-title>
            </v-card>
            
          </v-menu>
        </v-badge>
        
    </v-toolbar>
    <v-content>
      <router-view 
        :message="message" 
        :cart="cart"
        :priceEthUsd="priceEthUsd"
        :image="selected"
        :sort="sort"
        :sortPrice="sortPrice"
        :query="query"
        :skyMap="skyMap"
        :address="address"
      ></router-view>
    </v-content>
    <v-footer color="black" app fixed>
       <v-layout row wrap justify-center>
        <span class="white--text">&copy; 2018 <span class="yellow--text">HeadInTheStars</span> All Rights Reserved</span>
       </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
import MetaMask from "./api/modules/web3Connection.js";
import api from "@/api";
import { EventBus } from "@/modules/eventBus.js";
export default {
  data: () => ({
    drawer: null,
    address: [],
    network: "",
    metaMaskIcon: "not_interested",
    metaMaskColor: "red",
    MetaMaskConnected: false,
    metaMaskBalance: 0,
    message: "",
    menu: false,
    priceEthUsd: 0,
    sort: "ascending",
    sortPrice: "priceHigh",
    selected: "image",
    skyMap: false,
    searchBar: "",
    query: "",
    cart: []
  }),
  async created() {
    MetaMask.eth.net.getNetworkType().then(network => {
      this.network = network;
      this.getMessage();
    });

    this.intervalMetamaskeId = setInterval(() => {
      this.addressMetaMask();
    }, 1000);

    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    EventBus.$on("add", object => {
      this.cart.push(object);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    });

    EventBus.$on("remove", object => {
      this.deleteFromCart(object);
    });

    this.getEthUsd();

    this.ethUsdIntervalId = setInterval(() => {
      this.getEthUsd();
    }, 60000);

  },
  destroyed() {
      clearInterval(this.intervalMetamaskeId);
      clearInterval(this.ethUsdIntervalId);
  },
  methods: {
    addressMetaMask: async function() {
      if (MetaMask.currentProvider === null) {
        return;
      }

      this.network = await MetaMask.eth.net.getNetworkType();
      this.address = await MetaMask.eth.getAccounts();

      if (
        this.address.length != 0 &&
        this.network === "private" &&
        this.MetaMaskConnected != true
      ) {
        this.drawer = true;
        this.$router.push({ name: "Stars" });
        this.metaMaskColor = "green";
        this.metaMaskIcon = "done";
        this.MetaMaskConnected = true;
      } else if (
        (this.network != "private" || this.address.length === 0) &&
        this.MetaMaskConnected == true
      ) {
        this.reset();
      } else if (
        this.MetaMaskConnected != true &&
        this.$route.name != "LandingPage"
      ) {
        this.reset();
      }
    },
    getmetaMaskBalance: async function() {
      const metaMaskBalance = await MetaMask.eth.getmetaMaskBalance(
        this.address[0].toString()
      );
      this.metaMaskBalance = MetaMask.utils.fromWei(metaMaskBalance, "ether");
    },
    reset: function() {
      this.$router.push({ name: "LandingPage" });
      this.drawer = false;
      this.MetaMaskConnected = false;
      this.address = [];
      this.metaMaskIcon = "not_interested";
      this.metaMaskColor = "red";
      this.getMessage();
    },
    getMessage: function() {
      if (this.network === "private") {
        this.message = "LogIn into MetaMask Please";
      } else if (this.network === "") {
        this.message = "Please download MetaMask";
      } else {
        this.message = `You are connected to the ${
          this.network
        } Netwrok please change to private`;
      }
    },
    deleteFromCart: function(object) {
      this.cart = this.cart.filter(el => el._id !== object._id);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    getEthUsd: function () {
      api.getEthUsd(priceEth => {
        this.priceEthUsd = priceEth;
      });
    },
    scrollTop () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    search (input) {
      if(this.$route.name != "SearchBar"){
        this.$router.push({name:"SearchBar"})
        this.query = input;
        this.searchBar = '';
      } else {
        this.query = input;
        this.searchBar = '';
      }
    },
    checkout () {
      api.checkout(this.cart, result => {
        console.log('result: ', result);
        this.$router.push({ name: "Portfolio" });
        this.cart= [];
      })
    }
  }
};
</script>

<style>
main {
  background: linear-gradient(#e3e338, #ffffff, #e3e338);
}
#MetaMask {
  margin-left: 1vh;
  width: 30px;
}
.margin_badge {
  right: 1vw;
  margin-top: 1vh;
}
.margin_menu {
  margin-top: 5vh;
}
.margin_card {
  margin-top: 2vh;
  border-style: solid;
  border-width: 5px;
}
.margin_cart {
  margin-top: 2vh;
  border-style: solid;
  border-width: 7px;
  width: 400px;
}
.settings {
  margin-top: 2vh;
  border-style: solid;
  border-width: 7px;
  padding: 1vh;
  width: 350px;
}
.settings_margin {
  margin-right: 1vw;
}
.pointerCopy {
  cursor: copy;
}
.pointer {
  cursor: pointer;
}
.fa-ethereum {
  margin-bottom: 5px;
}
.card_text_margin {
  margin-top: 1vh;
  margin-left: 7px !important;
  margin-right: 7px !important;
}
.card_cartBalance_margin {
  margin-top: 1vh;
}
.rounded {
  border-radius: 25px;
}
.radio-group {
  margin-top: 1vh;
}
</style>
