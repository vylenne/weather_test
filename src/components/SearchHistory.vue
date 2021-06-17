<template>
  <v-row>
    <v-col>
      <div class="pa-3 body-2">
        <span>{{ $t('weather.searchHistory') }}</span>
      </div>
      <div class="pa-3 body-2">
        {{ cities }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SearchHistory',
  computed: {
    cities() {
      return this.$store.state.cities
    }
  }
}
</script>
