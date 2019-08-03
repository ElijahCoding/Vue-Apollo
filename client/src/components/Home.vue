<template>
    <v-container text-xs-center>

    </v-container>
</template>

<script>
    import { gql } from 'apollo-boost';

    export default {
        name: "home",

        created () {
            this.handleGetCarouselPosts()
        },

        methods: {
            handleGetCarouselPosts () {
                this.$store.dispatch('getPosts')
            }
        }
    };
</script>

<style>
    #carousel__title {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 5px 5px 0 0;
        padding: 0.5em;
        margin: 0 auto;
        bottom: 50px;
        left: 0;
        right: 0;
    }
</style>
