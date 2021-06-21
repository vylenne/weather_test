<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <localization/>
        </v-col>
        <v-col cols="6">
          <v-form @submit.prevent="getWeather(search)">
            <div class="d-flex align-center">
              <v-text-field
                  v-model.trim="search"
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
                  :loading="isLoading"
                  :disabled="!search"
                  type="submit"
                  color="indigo"
              >
                {{ $t('weather.search') }}
              </v-btn>
            </div>
          </v-form>
          <search-history :list="history" @handle-item="handleHistoryItem($event)"/>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <weather-widget :weather="weather" :error="error" :loading="isLoading"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Localization from '@/components/Localization'
import WeatherWidget from '@/components/WeatherWidget'
import SearchHistory from '@/components/SearchHistory'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    SearchHistory,
    Localization,
    WeatherWidget
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      weather: 'weather/currentWeather',
      isLoading: 'weather/isLoading',
      error: 'weather/error',
      history: 'weather/history'
    }),
  },
  created(){
    const searchParam = this.getURLParamsQuery(window.location.search)
    if(searchParam){
      this.handleHistoryItem(searchParam)
    }
  },
  methods: {
    ...mapActions({
      fetchWeather: 'weather/getWeather'
    }),
    getWeather(search) {
      if (search.length) {
        window.history.replaceState(null, null, `?q=${search}`)
        this.fetchWeather(search)
      }
    },
    handleHistoryItem(query) {
      window.history.replaceState(null, null, `?q=${query}`)
      this.search = query
      this.fetchWeather(query)
    },
    getURLParamsQuery(queryString){
      return new URLSearchParams(queryString).get('q');
    }
  }
}
</script>
