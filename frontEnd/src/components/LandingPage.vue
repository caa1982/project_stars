<template>
  <v-container fluid >
      <v-card color="black" class="elevation-10">
        <v-card-media 
          height="380px"
          :src="earth">
            <v-container>
              <v-layout d-block>
                <v-flex text-xs-center>
                  <h1 class="orange--text darken-1 mt-5">Buying the Universe has never been easier</h1>
                  <h2 class="white--text mt-5">Buy, sell and register Stars & other celestial bodies on the Ethereum BlockChain</h2>
                  <img class="logoImg mt-4" src="../assets/hs_logo.svg" alt="">
                </v-flex>
              </v-layout>
             </v-container>
          </v-card-media>
        </v-card>

        <v-container class="bottom">
         <v-layout class="justify-center">  
          <v-flex xs5> 
            <v-card color="transparent elevation-10">
                  <v-layout d-block>
                    <v-flex text-xs-center>
                      <v-card-title primary-title>
                        <v-flex text-xs-center>
                          <v-container id='meta-container'></v-container>
                          <div class="headline">This site requires Metamask</div>
                          <span>Download it <a :href="metamaskUrl"><span class="orange--text darken-4">here</span></a></span>
                          <div>Learn how to use Metamask <a :href="metamaskVideo"><span class="orange--text darken-4">here</span></a></div>
                        </v-flex>
                      </v-card-title>
                      <v-alert color="orange darken-4" icon="priority_high" :value="true">
                        {{message}}  
                      </v-alert>
                    </v-flex>
                  </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
  </v-container>
</template>
<script>
  import Earth from '../assets/earth.jpg'
  import ModelViewer from 'metamask-logo'
  export default {
    data: () => ({
      earth: Earth,
      metaMaskUrl: "https://metamask.io/",
      metaMaskVideo: "https://www.youtube.com/watch?v=2YeyTF5lalE",
      viewer: ModelViewer({
        pxNotRatio: false,
        width: 0.18,
        height: 0.18,
        followMouse: true
      })
    }),
    props: ["message"],
    mounted() {
      document.getElementById('meta-container').appendChild(this.viewer.container);
    },
    destroyed() {
      this.viewer.stopAnimation()
    }
  }
</script>
<style>
  .container {
    padding: 0!important
  }
  .bottom {
      margin-top: 5vh;
  }
  .logoImg {
    height: 110px;
  }
</style>
