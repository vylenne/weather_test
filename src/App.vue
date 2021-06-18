<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <localization/>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-text-field
                v-model="search"
                class="mr-4"
                solo
                filled
                dense
                hide-details
                clearable
                :label="$t('weather.search')"
            ></v-text-field>
            <v-btn
                class="white--text"
                color="indigo"
                @click="getWeather"
            >
              {{ $t('weather.search') }}
            </v-btn>
          </div>
          <search-history/>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <weather :city ="city"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Localization from '@/components/Localization'
import Weather from '@/components/Weather'
import SearchHistory from '@/components/SearchHistory'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    SearchHistory,
    Localization,
    Weather
  },
  data() {
    return {
      search: '',
      error: false,
      city: null
    }
  },
  computed: {
    ...mapGetters(['getCities'])
  },
  methods: {
    async getWeather() {
      try {
        if (this.search.length > 0) {
          const response = await this.$store.dispatch('fetchWeather', this.search)
          this.city = response
        }
      } catch (e) {
        this.city = null;
        this.error = true;
      }
    },
  }
}
</script>
