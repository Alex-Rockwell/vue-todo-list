<template>
  <main class="todolist container">

    <div class="todolist__title-box">
      <h1 class="todolist__heading-main">To do list</h1>
      <div class="todolist__plus-btn" @click="() => (isOpen = true)">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#D6DBEB"/>
          <rect x="19" y="10" width="2" height="20" fill="#314B99"/>
          <rect x="30" y="19" width="2" height="20" transform="rotate(90 30 19)" fill="#314B99"/>
        </svg>
      </div>
    </div>

    <div class="todolist__filters">
      <div class="todolist__search-icon">
        <img src="../assets/search-icon.svg" alt="">
      </div>
      <input type="text" placeholder="Поиск Имени, статуса или даты" class="todolist__search-input" v-model="filterSearch">
      <div class="todolist__select-box">
        <label for="select" class="todolist__select-label">Сортировать по:</label>
        <select class="todolist__select" name="select" id="select" v-model="filterSelect">
          <option value="filterDate">Дата</option>
          <option value="filterStatus">Статус</option>
        </select>
      </div>
    </div>

    <div class="todolist__description-box">
      <div class="todolist__description-title">
        <span>Описание</span>
      </div>
      <div class="todolist__status-title">
        <span>Статус</span>
      </div>
      <div class="todolist__date-title">
        <span>Дата</span>
      </div>
    </div>

    <ListItem v-for="el in sortedElements" :listItem="el" :key="el.id"/>

  </main>
  <ModalWindow :isOpen="isOpen" @closeModal="() => (isOpen = false)" />
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import ModalWindow from "./ModalWindow.vue";
import { storeToRefs } from "pinia";
import { useListItemsStore } from "../stores/listItemsStore";
import ListItem from "./listItem.vue";

const isOpen = ref(false);

const listItemsStore = useListItemsStore();
const { listItems } = storeToRefs(listItemsStore);
// const elements = ref(listItems)

const filterSearch = ref('')
const filterSelect = ref('filterDate')

watchEffect(() => {
  window.localStorage.setItem('listItemsData', JSON.stringify(listItems))
})


const filteredElements = computed(() => {
  let res 
  if (filterSearch.value.length != 0) {
    let temp = [...listItems.value]
    res = temp.filter(el => {
      if (el.description.includes(filterSearch.value)) {
        return el
      }
      let statusString = el.status ? 'Выполнено' : 'В работе'
      if (statusString.includes(filterSearch.value)) {
        return el
      }
      if (el.date.includes(filterSearch.value)) {
        return el
      }
    })
  }
  if (filterSearch.value == 0) {
    res = listItems.value
  }
  return res
})

const sortedElements = computed(() => {
  let res
  if (filterSelect.value == 'filterDate') {
    res = [...filteredElements.value].sort((item1, item2) => item2.date2 - item1.date2)
  }
  if (filterSelect.value == 'filterStatus') {
    let statusA = [...filteredElements.value].filter(el => el.status == true)
    let statusB = [...filteredElements.value].filter(el => el.status == false)
    res = statusA.concat(statusB)
  }
  return res
})

</script>

<style lang="scss" scoped>
  .todolist {
    padding-top: 105px;
    padding-left: 45px;
  }
  .todolist__title-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;

    & > *:first-child {
      margin-right: auto;
    }
  }
  .todolist__heading-main {
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 700;
  }
  .todolist__plus-btn {
    &:hover {
      cursor: pointer;
    }
    & circle {
      transition: .5s ease;
    }
    & rect {
      transition: .5s ease;
    }
    &:hover circle {
      fill: #314B99;
    }
    &:hover rect {
      fill: #fff;
    }
  }

  .todolist__filters {
    display: flex;
    align-items: center;
  }
  .todolist__search-icon {
    display: flex;
    align-items: center;
  }
  .todolist__select-box {
    display: flex;
    align-items: center;
  }
  .todolist__search-input {
    width: 220px;
    border: none;
    margin-left: 15px;
    margin-right: auto;
    &:focus {
      border: none;
      outline: none;
    }
    &::placeholder {
      color: #c4c4c4;
      opacity: 1;
    }
  }
  .todolist__select {
    border: none;
    margin-left: 15px;
    &:focus {
      border: none;
      outline: none;
    }
  }
  .todolist__description-box {
    padding-left: 80px;
    height: 32px;
    display: flex;
    margin-top: 30px;
  }

  .todolist__description-title, .todolist__status-title, .todolist__date-title {
    border-left: 1px solid #C4C4C4;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
  .todolist__description-title {
    margin-right: auto;
  }
  .todolist__status-title {
    width: 150px;
  }
  .todolist__date-title {
    width: 130px;
  }


</style>