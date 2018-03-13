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
            <v-list-tile-title class="white--text">Sky Map</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{name:'Stars'}">
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
      <v-text-field
        solo
        flat
        label="Search by ID/Name"
        prepend-icon="search"
        v-if="MetaMaskConnected != false"
      ></v-text-field>
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
            <v-card v-if="cart.length !=0" class="margin_card grey darken-4 text-xs-center">
            <v-card-title class="indigo">
              <div class="white--text">Recently added items ({{cart.length}})</div>
            </v-card-title> 
            <v-list Two-line>
                <template v-for="item in cart">
                  <v-list-tile avatar :key="item.title">
                    <v-list-tile-avatar>
                      <img v-if="item.img" :src="item.img">
                      <img v-else-if="item.Object == 'star'" src="./assets/star.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title >{{item.Name}}</v-list-tile-title>
                      <v-list-tile-title >{{item.Price}} <v-icon small>fab fa-ethereum</v-icon></v-list-tile-title>
                    </v-list-tile-content>
                    <div class="pointer"><v-icon color="red" @click="deleteFromCart(item)" medium>delete_forever</v-icon></div>
                  </v-list-tile>
                </template>
            </v-list>
            <v-card-text class="card_trext_margin indigo">
              <div class="white--text">Total: {{ cart.reduce((acc, obj) => acc + obj.Price, 0) }} <v-icon small>fab fa-ethereum</v-icon></div>
            </v-card-text>
            <v-card-actions>
              <v-btn outline color="white" large>
                Check out
              </v-btn>
            </v-card-actions>
            </v-card>
          </v-menu>
        </v-badge>
        
        <v-badge class="margin_badge" :color="metaMaskColor" overlap>  
          <v-icon slot="badge" color="white">{{metaMaskIcon}}</v-icon>
          
          <v-menu 
            bottom 
            offset-y
          >
            <img id="MetaMask" slot="activator" src="./assets/Metamask.png">
            
            <v-card class="margin_card transparent text-xs-center">
            <v-card-title class="orange lighten-1">
            <div class="black--text" v-if="MetaMaskConnected != false">
              <div class="pointerCopy" v-clipboard="address[0]">{{ address[0] }}</div>
              <span><v-icon class="fab fa-ethereum"></v-icon>{{ metaMaskBalance  }}</span>
            </div>
            </v-card-title>
            </v-card>
            
          </v-menu>
        </v-badge>
    </v-toolbar>
    <v-content>
      <router-view :message="message" :cart="cart"></router-view>
    </v-content>
    <v-footer color="black" app fixed>
       <v-layout row wrap justify-center>
        <span class="white--text">&copy; 2018 <span class="yellow--text">HeadInTheStars</span> All Rights Reserved</span>
       </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
import MetaMask from './api/modules/web3Connection.js'
import { EventBus } from '@/modules/eventBus.js'
  export default {
    data: () => ({
      drawer: null,
      address: [],
      network: "",
      metaMaskIcon: "not_interested",
      metaMaskColor: "red",
      MetaMaskConnected: false,
      metaMaskBalance: 0,
      intervalId: "",
      message: "",
      menu: false,
      cart: []
    }),
    created() {
      MetaMask.eth.net.getNetworkType().then(network => {
        this.network = network;
        this.getMessage();
      });
      this.intervalId = setInterval(() => {
        this.addressMetaMask();
      }, 1000);
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log('this.cart: ', this.cart);
      EventBus.$on("add", object => {
        this.cart.push(object);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      })
      EventBus.$on("remove", object => {
        this.deleteFromCart(object);
      })
    },
    methods: {
      addressMetaMask: async function() {
        if(MetaMask.currentProvider === null){
          return
        }

        this.network = await MetaMask.eth.net.getNetworkType();
        this.address = await MetaMask.eth.getAccounts();

        if(this.address.length != 0 && this.network === "main" && this.MetaMaskConnected != true){
          this.drawer = true;
          this.$router.push({ name: 'Stars'});
          this.metaMaskColor = "green"
          this.metaMaskIcon = "done";
          this.MetaMaskConnected = true;
        } else if ((this.network != "main" || this.address.length === 0) && this.MetaMaskConnected == true) {
          this.reset()
        } else if (this.MetaMaskConnected != true && this.$route.name != 'LandingPage') {
          this.reset()
        }
      },
      getmetaMaskBalance: async function() {
        const metaMaskBalance = await MetaMask.eth.getmetaMaskBalance(this.address[0].toString())
        this.metaMaskBalance = MetaMask.utils.fromWei(metaMaskBalance, 'ether');
      },
      reset: function() {
        this.$router.push({ name: 'LandingPage' });
        this.drawer = false;
        this.MetaMaskConnected = false;
        this.address = [];
        this.metaMaskIcon = "not_interested";
        this.metaMaskColor = "red";
        this.getMessage();
      },
      getMessage: function() {
        if (this.network === 'main') {
          this.message = "LogIn into MetaMask Please";
         } else if (this.network === ''){
          this.message = 'Please download MetaMask';
         } else {
          this.message =`You are connected to the ${this.network} Netwrok please change to Main`;
         }
      },
      deleteFromCart: function(object){
        this.cart = this.cart.filter(el => el.Name !== object.Name );
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    watch: {
      address(newVal, oldVal) {
        if(this.network === "main"){
          this.address = newVal; 
        }
      },
      
    }
  }
</script>

<style>
  main {
    background: linear-gradient(#e3e338, #ffffff , #e3e338);
  }
  #MetaMask {
    margin-left: 2vh;
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
  .pointerCopy {
    cursor: copy;
  }
  .pointer {
    cursor: pointer;
  }
  .fa-ethereum {
    margin-bottom: 5px;
  }
  .card_trext_margin{
    margin-top: 1vh;
  }
</style>
