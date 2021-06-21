<template>
  <v-card tile class="mt-8">
    <v-list dense>
      <v-subheader class="body-2">{{ $t('weather.searchHistory') }}</v-subheader>
      <v-list-item-group
          color="indigo"
      >
        <v-list-item
            v-for="(item, i) in list"
            :key="i"
            @click.prevent="$emit('handle-item', item)"
        >
          <v-list-item-title class="body-2">{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
