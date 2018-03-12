<template>
 <v-container fill-height>
    <v-layout class="justify-center" row wrap align-center>  
      <v-flex xs11> 
            <IFRAME class="iframe-placeholder" @load="load" frameBorder="0" :src="url" sandbox="allow-scripts allow-same-origin"></IFRAME>
      </v-flex>
      <v-progress-circular :size="50" indeterminate color="red" v-if="loaded === false"></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'SkyMap',
  data() {
    return {
      loaded: false,
      url: "http://www.sky-map.org/skywindow/?object=Lion&zoom=1"
    }
  },
  methods: {
    load: function(){
      this.loaded = true;
    }
  }
}
</script>
<style>
iframe{
    width: 100%;
    height: 80vh;
    pointer-events: unset;
}
.progress-circular {
  position: absolute;
}
</style>
