<template>
    <v-card class="white justify-center">
        <v-container fluid>
            <v-layout row align-center>
                <v-flex xs12>
                    <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>

export default {
  name: "Loading"
};
</script>

<style>

</style>