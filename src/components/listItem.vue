<template>
    <div class="listitem">
      <div class="checkbox-wrapper" @click="() => inputChecked = !inputChecked">
        <div class="checkbox">
          <input class="checkbox__input" type="checkbox" v-model="inputChecked">
          <label class="checkbox__label"></label>
        </div>
      </div>
      <div class="listitem__description">
        <span>{{listItem.description}}</span>
      </div>
      <div class="listitem__status">
        <span v-if="inputChecked" class="listitem__status-complete">Выполнено</span>
        <span v-if="!inputChecked"  class="listitem__status-not-complete">В работе</span>
      </div>
      <div class="listitem__date">
        <span>{{listItem.date}}</span>
      </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useListItemsStore } from "../stores/listItemsStore";

const props = defineProps(["listItem"]);

const inputChecked = ref(props.listItem.status)

const listItemsStore = useListItemsStore();
const { changeStatus } = listItemsStore;

watch([inputChecked], () => {
  changeStatus(props.listItem.id, inputChecked.value)
})

</script>

<style lang="scss" scoped>

  .listitem {
    height: 60px;
    display: flex;
  }

  .checkbox-wrapper {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .listitem__description, .listitem__status, .listitem__date {
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
  .listitem__description {
    margin-right: auto;
  }
  .listitem__status {
    width: 150px;
  }
  .listitem__status-complete {
    color: #134EC1;
  }
  .listitem__status-not-complete {
    color: #F89B11;
  }
  .listitem__date {
    width: 130px;
  }

  /////////////////////////////////////////////////////////
  ///////////////////// checkbox //////////////////////////
  /////////////////////////////////////////////////////////

  .checkbox {
    position: relative;
  }
  .checkbox__input {
    appearance: none;
    position: absolute;
  }
  .checkbox__label {
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .checkbox__label::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border: 1px solid #000;
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .checkbox__label::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: url('../assets/check-icon.svg') no-repeat;
    background-size: 12px 12px;
    opacity: 0;

    position: absolute;
    top: 4px;
    left: 3px;
    z-index: 2;

    transition: opacity .5s ease;
  }
  .checkbox__input:checked + .checkbox__label::before {
    border: 1px solid #134EC1;
  }
  .checkbox__input:checked + .checkbox__label::after {
    opacity: 1;
  }
</style>