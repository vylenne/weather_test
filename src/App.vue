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
                :label="$t('weather.search')"
            ></v-text-field>
            <v-btn
                class="white--text"
                color="indigo"
            >
              {{ $t('weather.search') }}
            </v-btn>
          </div>
          <search-history/>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <weather/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import Weather from '@/components/Weather'
import Localization from '@/components/Localization'
import SearchHistory from "@/components/SearchHistory";

export default {
  name: 'App',
  components: {
    SearchHistory,
    Localization,
    Weather
  },
  data() {
    return {
      search: ''
    }
  }
};
</script>
