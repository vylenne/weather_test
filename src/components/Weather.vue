<template>
  <div>
    <p v-if="!city" class="body-2 text-center"> {{ $t('errors.noWeather') }} </p>
    <v-card class="mx-auto" max-width="400" v-else>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h4">{{ city.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ todayDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col cols="12" class="py-0">
            <p class="text-h6"> {{ city.weather[0].description }}</p>
          </v-col>
          <v-col cols="6" class="pt-0">
            <p> {{ $t('weather.info.realTemperature') }} </p>
            <p class="display-3 mb-0 black--text">{{ defaultTemp }} &deg;C </p>
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-img
                class="ma-auto"
                width="100"
                :src="weatherImagePath"
                :alt="city.weather[0].description"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.feelsLike') }}</p>
            <span class="text-h5 font-weight-light">{{ defaultFeelsLikeTemp }} &deg;C</span>
          </v-col>
          <v-col>
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.windSpeedAndDirection') }}</p>
            <span class="text-h6 font-weight-light">{{ windSpeed }} {{ $t('weather.info.windSpeedLabel') }}</span>
            <p class="text-body-2">{{ windDirection }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.minTemperature') }}</p>
            <span class="text-h5 font-weight-light">{{ defaultMinTemp }} &deg;C</span>
          </v-col>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.maxTemperature') }}</p>
            <span class="text-h5 font-weight-light">{{ defaultMaxTemp }} &deg;C</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.pressure') }}</p>
            <span class="text-h5 font-weight-light">{{ city.main.pressure }} {{
                $t('weather.info.pressureLabel')
              }} </span>
          </v-col>
          <v-col cols="6">
            <p class="subtitle-2 mb-0"> {{ $t('weather.info.humidity') }}</p>
            <span class="text-h5 font-weight-light">{{ city.main.humidity }} %</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  props: {
    city: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      kelvinTemp: 273
    }
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
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()

      return today = mm + '/' + dd + '/' + yyyy
    },
    defaultTemp() {
      return this.calculateDefaultTemperature(this.city.main.temp)
    },
    defaultFeelsLikeTemp() {
      return this.calculateDefaultTemperature(this.city.main.feels_like)
    },
    defaultMinTemp() {
      return this.calculateDefaultTemperature(this.city.main.temp_min)
    },
    defaultMaxTemp() {
      return this.calculateDefaultTemperature(this.city.main.temp_max)
    },
    windSpeed() {
      return this.city.wind.speed
    },
    windDirection() {
      return this.convertDegreesToWindDirection(this.city.wind.deg)
    },
    weatherImagePath() {
      return `http://openweathermap.org/img/wn/${this.city.weather[0].icon}@2x.png`
    }
  },
  methods: {
    calculateDefaultTemperature(data) {
      return parseInt(data - this.kelvinTemp)
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
