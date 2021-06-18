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
          <error v-if="error" :error="errorText"/>
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
import Error from '@/components/Error'

export default {
  name: 'App',
  components: {
    Error,
    SearchHistory,
    Localization,
    Weather
  },
  data() {
    return {
      search: '',
      error: false,
      errorText: '',
      city: null
    }
  },
  methods: {
    async getWeather() {
      try {
        if (this.search.length > 0) {
          this.error = false
          const response = await this.$store.dispatch('fetchWeather', this.search)
          this.city = response
        } else {
          this.error = true
          this.errorText = this.$t('errors.isEmpty')
        }
      } catch (e) {
        this.error = true
        this.errorText = this.$t('errors.noExist')
      }
    },
  }
}
</script>
