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
            :country="$i18n.locale"
        />
        <span class="mr-1">{{ $i18n.locale }}</span>
        <v-icon small>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="locale of locales"
          :key="locale"
          dense
          link
          @click="changeLocale(locale)"
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
      locales: ['US', 'RU']
    }
  },
  created() {
    if (localStorage.getItem('locale')) {
      this.$i18n.locale = localStorage.getItem('locale')
    }
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
      localStorage.setItem('locale', locale)
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }
}
</script>
