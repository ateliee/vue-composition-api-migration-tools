<h1 align="center">Kalimah Tools</h1>
<p align="center">
<img src="https://raw.githubusercontent.com/kalimahapps/tools/main/public/logo.svg" width="120" alt="Kalimah Tools Logo">
</p>
<p align="center">
A collection of online tools for web development, design, and more to help you build better websites and applications.
</p>

## 🏗️ Tools
### [Vue Composition API Converter](https://tools.kalimah-apps.com/vue-composition-converter/info.html)
Converts Vue 2 options API code to Vue 3 composition API code. For example, this code:
```vue
<template>
  <p>template data</p>
</template>

<script>
export default {
	data:{
      items: [],
      list: {},
    },
  props: ['loading', 'lazy', 'disabled'],
  methods:{
  	isLazy(){
      return this.lazy;
    },
    isLoading: function(){
      return this.loading;
    },
    isDisabled: () => {
      return this.disabled;
    }
  },
  watch:{
    loading(newValue){
      console.log("Value", newValue);
    },
    disabled:{
      immediate: true,
    handler(value) {
      this.bar = value;
    }
    }

  }
}
</script>

<style scoped>
.el-image {
  display: inline-block;
  position: relative;
  font-size: 0;
  background-color: #f5f7fa;
  line-height: 0;
  overflow: hidden;
  transition: background-color .3s;
}
</style>
```
will be converted to:
```vue
<template>
  <p>template data</p>
</template>

<script setup>
import { reactive, watch } from 'vue';


// Data
const items = reactive([]);
const list = reactive({});

// Props
const props = defineProps(['loading', 'lazy', 'disabled']);

// Methods
const isLazy = function(){
	return props.lazy;
}

const isLoading = function(){
	return props.loading;
}

const isDisabled = () => {
	return props.disabled;
}


// Watch
watch(loading, function(newValue){
	console.log("Value", newValue);
})

watch(disabled, function (value) {
	this.bar = value;
}, { immediate: true })

</script>

<style scoped>
.el-image {
  display: inline-block;
  position: relative;
  font-size: 0;
  background-color: #f5f7fa;
  line-height: 0;
  overflow: hidden;
  transition: background-color .3s;
}
</style>
```

### CLI tools

convert Option API to Composition API
```
npm run convert example/test.vue
```