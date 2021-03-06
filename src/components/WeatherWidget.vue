<template>
  <div>
    <p v-if="!weather && !error && !loading" class="body-2 text-center"> {{ $t('errors.noWeather') }} </p>
    <error v-if="error" :error="error"/>
    <v-card v-if="weather" class="mx-auto" max-width="400">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h4">{{ weather.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ todayDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col cols="12" class="py-0">
            <p class="text-h6"> {{ weather.weather[0].description }}</p>
          </v-col>
          <v-col cols="6" class="pt-0">
            <p> {{ $t('weather.info.realTemperature') }} </p>
            <p class="display-3 mb-0 black--text">{{ weatherParams.defaultTemp }} &deg;C </p>
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-img
                class="ma-auto"
                width="100"
                :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
                :alt="weather.weather[0].description"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.feelsLike') }}</p>
            <span class="text-h5 font-weight-light">{{ weatherParams.defaultFeelsLikeTemp }} &deg;C</span>
          </v-col>
          <v-col>
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.windSpeedAndDirection') }}</p>
            <span class="text-h6 font-weight-light">{{ windParams.windSpeed }} {{ $t('weather.info.windSpeedLabel') }}</span>
            <p class="text-body-2">{{ windParams.windDirection }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.minTemperature') }}</p>
            <span class="text-h5 font-weight-light">{{ weatherParams.defaultMinTemp }} &deg;C</span>
          </v-col>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.maxTemperature') }}</p>
            <span class="text-h5 font-weight-light">{{ weatherParams.defaultMaxTemp }} &deg;C</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.pressure') }}</p>
            <span class="text-h5 font-weight-light">{{ weather.main.pressure }} {{
                $t('weather.info.pressureLabel')
              }} </span>
          </v-col>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.humidity') }}</p>
            <span class="text-h5 font-weight-light">{{ weather.main.humidity }} %</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import Error from '@/components/Error'

const KELVIN_TEMP = 273
export default {
  name: 'Weather',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {},
    weather: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Error
  },
  computed: {
    directions() {
      return [
        this.$t('weather.info.windDirections.Northerly'),
        this.$t('weather.info.windDirections.NorthEasterly'),
        this.$t('weather.info.windDirections.Easterly'),
        this.$t('weather.info.windDirections.SouthEasterly'),
        this.$t('weather.info.windDirections.Southerly'),
        this.$t('weather.info.windDirections.SouthWesterly'),
        this.$t('weather.info.windDirections.Westerly'),
        this.$t('weather.info.windDirections.NorthWesterly')
      ]
    },
    todayDate() {
      return moment().locale(`${this.$i18n.locale}`).format("Do MMMM YYYY")
    },
    weatherParams() {
      return {
        defaultTemp: this.calculateDefaultTemperature(this.weather.main.temp),
        defaultFeelsLikeTemp: this.calculateDefaultTemperature(this.weather.main.feels_like),
        defaultMinTemp: this.calculateDefaultTemperature(this.weather.main.temp_min),
        defaultMaxTemp: this.calculateDefaultTemperature(this.weather.main.temp_max)
      }
    },
    windParams() {
      return {
        windSpeed: this.weather.wind.speed,
        windDirection: this.convertDegreesToWindDirection(this.weather.wind.deg)
      }
    }
  },
  methods: {
    calculateDefaultTemperature(data) {
      return parseInt(data - KELVIN_TEMP)
    },
    convertDegreesToWindDirection(degree) {
      const degrees = degree * 8 / 360;
      let degreesRounded = Math.round(degrees, 0);
      const index = (degreesRounded + 8) % 8
      return this.directions[index]
    }
  }
}
</script>
