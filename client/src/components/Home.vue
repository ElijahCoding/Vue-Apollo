<template>
  <v-container>
    <h1>Home</h1>
  </v-container>
</template>

<script>
    import { gql } from 'apollo-boost';

    export default {
        name: "home",

        apollo: {
            getPosts: {
                query: gql`
                    query {
                        getPosts {
                            _id
                            title
                            imageUrl
                            description
                        }
                    }
                `
            }
        }
    };
</script>
