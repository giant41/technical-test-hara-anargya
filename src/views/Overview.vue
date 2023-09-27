<template>
  <div class="flex flex-col gap-y-[31px] py-[30px] px-9">
    <div class="flex gap-x-[23px] ">
      <div class="grow rounded-[10px] border border-gray-200 card">
        <div class="bg-[#F9FAFC] py-[13px] px-[17px] flex justify-between items-center p-6">
          <div class="flex justify-between items-center">
            <div class="text-status-card text-xl font-semibold">Get City Base on Province</div>
          </div>
          <div class="font-semibold text-xl text-black-300"></div>
        </div>
        <div class="bg-[#ffffff] py-[13px] px-[17px] flex justify-between items-center">
          <div class="grid grid-cols-1 gap-4">
            <div class="font-semibold text-[10px] mx-1"> 
              <select v-model="provinceId" class="px-3 py-2 rounded-sm text-xs  bg-[#3e3e3e]">
                <option disabled value="">Please choose a Province</option>
                <option v-for="(prov, index) in province" :key="index" :value="prov.id"> {{ prov.name }}</option>
              </select>
            </div>
            <div>
              <div class="card bg-white">
                <table class="w-[350px] table-auto mt-4 border-collapse border align-middle border-slate-500">
                  <thead class="bg-[#FAFBFC] border border-gray-200">
                    <tr>
                      <th v-for="(column,index) in cityColumns" :key="index"
                      class="font-semibold text-xs text-[#7C7C7C] py-[18px] cursor-pointer px-4" @click="onSortCity(column)">
                        <div class="flex gap-x-2 justify-center items-center">
                          <div class="text"> {{ column.label }}</div>
                          <Icon icon="iconamoon:arrow-up-2" class="text-xl" v-if="column.sort == 'up'"/>
                          <Icon icon="iconamoon:arrow-down-2" class="text-xl" v-else-if="column.sort == 'down'"/>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in shortCity" :key="index" class="border border-gray-200 text-xs">
                      <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.id }}</td>
                      <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grow rounded-[10px] border border-gray-200 card">
        <div class="bg-[#F9FAFC] py-[13px] px-[17px] flex justify-between items-center p-6">
          <div class="flex justify-between items-center">
            <div class="text-status-card text-xl font-semibold">Get Province Base on City Name</div>
          </div>
          <div class="font-semibold text-xl text-black-300"></div>
        </div>
        <div class="bg-[#ffffff] py-[13px] px-[17px] flex justify-between items-center">
          <div class="grid grid-cols-1 gap-4">
            <div class="font-semibold text-[10px] mx-1"> 
              <select v-model="cityId" class="px-3 py-2 rounded-sm text-xs bg-[#3e3e3e]">
                <option disabled value="">Please choose a City</option>
                <option v-for="(city, index) in city" :key="index" :value="city.id"> {{ city.name }}</option>
              </select>
            </div>
            <div>
              <div class="w-400 bg-[#ffffff] p-[18px] border border-gray-200">
                <div class="font-semibold text-[17px] text-black-300">Province : {{getProvinceByCity}} </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grow rounded-[10px] border border-gray-200 card">
        <div class="bg-[#F9FAFC] py-[13px] px-[17px] flex justify-between items-center p-6">
          <div class="flex justify-between items-center">
            <div class="text-status-card text-xl font-semibold">Province Sorting By ID & Name</div>
          </div>
          <div class="font-semibold text-xl text-black-300"></div>
        </div>
        <div class="bg-[#ffffff] py-[13px] px-[17px] flex justify-between items-center">
          <div class="flex items-center">
            <div>
              <div class="card bg-white justify-center items-center">
                <table class="w-[350px] table-auto mt-4">
                  <thead class="bg-[#FAFBFC] border border-gray-200">
                    <tr>
                      <th v-for="(column,index) in provinceColumns" :key="index"
                      class="font-semibold text-xs text-[#7C7C7C] py-[18px] cursor-pointer px-4" @click="onSort(column)">
                        <div class="flex gap-x-2 justify-center items-center">
                          <div class="text"> {{ column.label }}</div>
                          <Icon icon="iconamoon:arrow-up-2" class="text-xl" v-if="column.sort == 'up'"/>
                          <Icon icon="iconamoon:arrow-down-2" class="text-xl" v-else-if="column.sort == 'down'"/>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row,index) in sortProvince" :key="index" class="border border-gray-200 text-xs">
                      <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.id }}</td>
                      <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import city from '@/assets/js/city.js'
import province from '@/assets/js/province.js'
import { computed,ref } from 'vue';
import { cityColumns, provinceColumns } from '@/helpers';

const provinceId = ref('')
const cityId = ref('')
const methodSortCity = ref({})
const methodSort = ref({})

// get Provincy by City ID
const getProvinceByCity = computed(() => {
  if(cityId.value){
    const prov_id = city.find(el=> el.id == cityId.value)
    return province.filter(el=> el.id == prov_id.provinsi_id)[0].name
  } else {
    return null
  }
})

// sort assign method city data
const onSortCity = column => {
  cityColumns.value.map(data => {
    if(data.label == column.label){
      if(column.sort == '') {
        data.sort = 'up'
      } else if(column.sort == "up") {
        data.sort = 'down'
      } else {
        data.sort = ''
      }
    } else {
      data.sort = ''
    }
  })
  methodSortCity.value = column
}

// sorting city array by id or name
const shortCity = computed(()=> {
  if(Object.keys(methodSortCity.value).length > 0) { 
    const dataCities = provinceId.value ? city.filter(el=> el.provinsi_id == provinceId.value) : city
    if(methodSortCity.value.sort == 'up') { 
      if(methodSortCity.value.label == 'ID') {
        return dataCities.sort((a, b) => a.id - b.id)
      } else { 
        return dataCities.sort((a, b) => {
          const ctA = a.name.toUpperCase()
          const ctB = b.name.toUpperCase()
          if(ctA < ctB) {
            return -1;
          }
          if(ctA > ctB) {
            return 1;
          }
          return 0;
        })
      }
    } else if(methodSortCity.value.sort == 'down') { 
      if(methodSortCity.value.label == 'ID') { 
        return dataCities.sort((a, b) => a.id - b.id).reverse()
      } else { 
        return dataCities.sort((a, b) => {
          const ctA = a.name.toUpperCase()
          const ctB = b.name.toUpperCase()
          if(ctA < ctB) {
            return -1;
          }
          if(ctA > ctB) {
            return 1;
          }
          return 0;
        }).reverse()
      }
    } else {
      return provinceId.value ? city.filter(el=> el.provinsi_id == provinceId.value) : city
    }
  }
    return provinceId.value ? city.filter(el=> el.provinsi_id == provinceId.value) : city
})

// sort assign method province data
const onSort = column => {
  provinceColumns.value.map(data => {
    if(data.label == column.label){
      if(column.sort == '') {
        data.sort = 'up'
      } else if(column.sort == "up") {
        data.sort = 'down'
      } else {
        data.sort = ''
      }
    } else {
      data.sort = ''
    }
  })
  methodSort.value = column
}

// sorting array by id or nama
const sortProvince = computed(()=> {
  if(Object.keys(methodSort.value).length > 0) { 
    if(methodSort.value.sort == 'up') { 
      if(methodSort.value.label == 'ID') {
        return [...province].sort((a, b) => a.id - b.id)
      } else { 
        return [...province].sort((a, b) => {
          const provA = a.name.toUpperCase()
          const provB = b.name.toUpperCase()
          if(provA < provB) {
            return -1;
          }
          if(provA > provB) {
            return 1;
          }
          return 0;
        })
      }
    } else if(methodSort.value.sort == 'down') { 
      if(methodSort.value.label == 'ID') { 
        return [...province].sort((a, b) => a.id - b.id).reverse()
      } else { 
        return [...province].sort((a, b) => {
          const provA = a.name.toUpperCase()
          const provB = b.name.toUpperCase()
          if(provA < provB) {
            return -1;
          }
          if(provA > provB) {
            return 1;
          }
          return 0;
        }).reverse()
      }
    } else {
      return province
    }
  }
  return province
})
</script>
