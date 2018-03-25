<template>
<v-flex xs12 sm10 offset-sm1>
    <v-container fill-height>
        <v-layout class="justify-center" justify-space-around row wrap text-xs-center>  
            <div v-if="portfolio.length !=0" v-for="(item, index) in portfolio" :key="index">
                <v-card class="transparent margin_items_portfolio elevation-8">
                        <v-card-title primary-title class="justify-center">
                            <div>
                                <v-avatar v-if="item.img != ''" size="45px"><img :src="item.img" alt=""></v-avatar>
                                <v-avatar v-else-if="item.img === ''&& item.object === 'star'" size="45px">
                                    <img src="https://img.purch.com/w/660/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA3My85NTMvb3JpZ2luYWwvc2lyaXVzLmpwZw==" alt="">
                                </v-avatar>
                                <v-avatar v-else-if="item.img === ''&& item.object != 'star'" size="45px">
                                    <img src="http://www.hanedanrpg.com/photos/hanedanrpg/20/96700.jpg" alt="">
                                </v-avatar>
                                <div class="black--text headline">{{item.name}}</div>
                                <div class="black--text subheading">{{item.object}}</div>
                            </div>
                        </v-card-title>
                        <v-expansion-panel dark>
                            <v-expansion-panel-content>
                                <div slot="header">Actions</div>
                                        <v-layout class="justify-center" row wrap align-center>
                                            <v-flex xs6>
                                                <v-text-field
                                                    color="green darken-2"
                                                    label="Sell Price in ETH"
                                                    :value="item.price"
                                                    :rules="[]"
                                                    dark
                                                ></v-text-field>
                                            </v-flex>
                                            <v-btn outline color="green darken-2">Change</v-btn>
                                        </v-layout>
                                        <v-layout v-if="item.object == 'star'" class="justify-center" row wrap align-center>
                                            <v-flex xs6>
                                                <v-text-field
                                                    color="green darken-2"
                                                    label="Name"
                                                    :value="item.name"
                                                    :rules="[]"
                                                    dark
                                                ></v-text-field>
                                            </v-flex>
                                            <v-btn outline color="green darken-2">Change</v-btn>
                                        </v-layout>
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
  name: 'Portfolio',
  data() {
    return {
        portfolio:[]
    }
  },
  created() {
      api.getPortfolio(portfolio => {
          this.portfolio = portfolio;
      })
  },
  methods: {
  }
}
</script>
<style>
    .margin_items_portfolio {
        width: 350px;
        margin-bottom: 2vh;
    }
</style>
