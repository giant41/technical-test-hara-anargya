<template>
    <div class="flex flex-col gap-y-[31px] py-[30px] px-9">
        <div class="flex gap-x-[23px]">
        <div class="grow rounded-[10px] border border-gray-200 card" v-for="(card, index) in dataCards" :key="index">
            <div class="section-satu bg-white p-6">
                <div class="flex justify-between items-center">
                    <div class="text-status-card text-xs font-semibold">{{ card.status }}</div>
                    <div class="rounded bg-icon-card p-[6px]">
                        <img :src="getIcon('status-card')" alt="">
                    </div>
                </div>
                <div class="font-semibold text-xl text-black-300">{{card.total.split(',')[0]}}<span class="text-black-50" v-if="card.total.split(',')[1] > 0">,{{card.total.split(',')[1]}}</span></div>
            </div>
            <div class="bg-[#F9FAFC] py-[13px] px-[17px] flex justify-between items-center">
                <div class="flex items-center">
                    <img :src="getIcon(card.isIncrease ? 'ph_arrow-up-bold' : 'ph_arrow-down-bold')" alt="">
                    <div class="font-semibold text-[10px] mx-1" :class="card.isIncrease ? 'text-positive' : 'text-negative'"> 
                    {{ card.percentage }}%
                    </div>
                    <div class="font-medium text-[10px] text-[#AAAAAA]"> Last Month</div>
                </div>
                <div class="text-[#6E6E6E] font-semibold text-[10px] p-2 hover:bg-icon-card hover:rounded cursor-pointer">
                    View More
                </div>
            </div>
        </div>
        </div>
        <div class="rounded-[10px] card bg-white">
        <div class="bg-white pt-[25px] pb-[18px] pl-[28px] border border-gray-200">
            <div class="font-semibold text-[17px] text-black-300">User List</div>
        </div>
            <table class="w-full table-auto">
                <thead class="bg-[#FAFBFC] border border-gray-200">
                <tr>
                    <th v-for="(column, index) in tableColumns" :key="index"
                    class="font-semibold text-xs text-[#7C7C7C] py-[18px]">{{ column.label }}</th>
                </tr>
                </thead>
                <tbody v-if="loading">
                    <tr class="border border-gray-200">
                        <td class="text-center bg-white py-[18px] font-medium text-black-300" colspan="7">Loading...</td>
                    </tr>
                </tbody>
                <tbody v-else>
                <tr v-for="(row,index) in dataRows" :key="index" class="border border-gray-200 text-xs">
                    <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.id }}</td>
                    <td class="text-center bg-white py-[18px] "> 
                        <div class="flex gap-x-2 items-center">
                            <img :src="row.profile_picture" class="rounded-full w-6 h-6">
                            <div class="font-medium text-black-300"> {{ row.fullname }} </div>
                        </div>
                    </td>
                    <td class="text-center bg-white py-[18px] text-content-table"> {{ row.date_of_birth }}</td>
                    <td class="text-center bg-white py-[18px] font-medium text-black-300"> {{ row.email }}</td>
                    <td class="text-center bg-white py-[18px] text-content-table"> {{ row.job }}</td>
                    <td class="text-center bg-white py-[18px] font-medium text-black-300"> {{ row.country }}</td>
                    <td class="text-center bg-white py-[18px]"> 
                        <div class="rounded bg-white border border-gray-200 text-black-300 inline-flex py-1 px-4 font-medium cursor-pointer hover:bg-icon-card mr-2" @click="openModal()">Select</div>
                        <div class="rounded bg-white border border-gray-200 text-black-300 inline-flex py-1 px-4 font-medium cursor-pointer hover:bg-icon-card" @click="openDetail(row)">View Detail</div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <ModalView v-model:show-modal="show" title-modal="Detail">
        <div class="gap-x-8 px-9 py-[26px]">
            <div class="flex mb-8">
                <img :src="userDetail.profile_picture" class="rounded-full w-[150px] h-[150px] mr-3">
                <div class="flex flex-col text-black-300 items-center">
                <div class="font-medium text-[40px]">{{userDetail.fullname}}</div>
                <div class="font-medium text-xl">{{userDetail.email}}</div>
                <div class="font-medium text-xl">{{userDetail.phone}}</div>
                </div>
            </div>
            <div class="w-full rounded-[10px] border border-gray-200 text-xs bg-white p-4">
                <div v-for="(row, index) in rowsDetail" :key="index" class="grid grid-cols-3 gap-4 text-sm">
                    <div class="text-[#272727]">{{ row.label }}</div>
                    <div class="col-span-2  text-[#272727] px-2"> : {{ row.value }}</div>
                </div>
            </div>
        </div>
    </ModalView>
</template>

<script setup>
import { dataCards, getIcon, tableColumns} from '@/helpers';
import { ref, onMounted } from 'vue'
import ModalView from '../components/ModalView.vue';
import dayjs from 'dayjs'

const dataRows = ref([])
const loading = ref(false)

const getData = async(url) => {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (error) {
    return error
  }
}

onMounted(()=>{
  loading.value = true
  getData('https://api.slingacademy.com/v1/sample-data/users')
  .then(res=>{
    dataRows.value = res.users.map(data=> {
      return {
        ...data,
        fullname : data.first_name + data.last_name,
        date_of_birth: dayjs(data.date_of_birth).format('DD/MM/YYYY')
      }
    })
    loading.value = false
  })
  .catch(err=>{
    loading.value = false
  })
})

const rowsDetail = ref([])

const show = ref(false)
const userDetail = ref(null)
const openDetail = row => {
  show.value = true
  userDetail.value = row
  rowsDetail.value = [
    { label:'Date Of Birth', value:row.date_of_birth},
    { label:'Gender', value:row.gender},
    { label:'Job', value:row.job},
    { label:'Address', value:`${row.street}`},
    { label:'Zip Code', value:`${row.zipcode}`},
    { label:'City', value:`${row.city}`},
    { label:'State', value:`${row.state}`},
    { label:'Country', value:row.country},
  ]
}
</script>
