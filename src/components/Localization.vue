<template>
  <v-menu
      class="localization"
      offset-y
  >
    <template #activator="{ attrs, on }">
      <v-btn
          class="white--text"
          color="indigo"
          v-bind="attrs"
          v-on="on"
      >
        <country-flag
            class="mr-1"
            size='small'
            :country="currentLocale"
        />
        <span class="mr-1">{{ currentLocale }}</span>
        <v-icon small>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="locale of locales"
          :key="locale"
          dense
          link
          @click="currentLocale = locale"
      >

        <v-list-item-action>
          <country-flag size="small" :country="locale"/>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title v-text="locale"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'Localization',
  components: {
    CountryFlag
  },
  data() {
    return {
      drawer: null,
      locales: ['US', 'RU']
    }
  },
  computed: {
    currentLocale: {
      set(val) {
        this.$i18n.locale = val
        this.$store.state.currentLanguage = val
      },
      get() {
        return this.$store.state.currentLanguage
      }
    }
  },
  watch: {
    currentLocale: {
      immediate: true,
      handler(val) {
        window.localStorage.locale = val
      }
    }
  }
}
</script>