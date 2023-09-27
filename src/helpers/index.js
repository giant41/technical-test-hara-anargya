
import { ref } from 'vue'

// helper to get icon by name
export const getIcon = (icon_name) => {
  return new URL(`../assets/icons/${icon_name}.svg`, import.meta.url).href
}

export const sidebarMenu = ref([
  { label: 'Dashboard', icon:'graph' },
  { label: 'Overview', icon:'overview' },
])

export const dataCards = ref([
    { status: 'Pending', total:'2.480,30', percentage:'2,15', isIncrease:true},
    { status: 'Paid', total:'84.310,0',percentage:'1,10', isIncrease:false},
    { status: 'Rejected', total:'12.155,0',percentage:'2,15', isIncrease:true}
])

export const tableColumns = ref([
  { label : 'ID'},
  { label : 'Full Name'},
  { label : 'Date Of Birth'},
  { label : 'Email'},
  { label : 'Job'},
  { label : 'Country'},
  { label : 'Actions'},
])

export const cityColumns = ref([
  { label : 'ID', sort:''},
  { label : 'City', sort:''},
])

export const provinceColumns = ref([
  { label : 'ID', sort:''},
  { label : 'Province', sort:''},
])
