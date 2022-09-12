<template>
  <div>
    <div class="overlay" @click="close" :class="{ overlayActive: isOpen }">
      <div class="modal" @click.stop :class="{ modalActive: isOpen }">

        <form action="" @submit.prevent="enterItem">
          <h2 class="modal__title">Создать новую задачу</h2>
          <div class="modal__input-box">
            <label for="" class="modal__label">Описание</label>
            <input type="text" class="modal__input" placeholder="Введите описание" v-model="newItemDescription" ref="input">
          </div>
          <div class="modal__btn-box">
            <button type="submit" class="modal__btn">Создать</button>
          </div>
        </form>

        <div class="modal__close" @click="close">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="22" height="22" rx="5" fill="#314B99"/>
            <path d="M8 8L11 11M14 14L11 11M11 11L14 8M11 11L8 14" stroke="white" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUpdated, ref } from 'vue';
import { useListItemsStore } from "../stores/listItemsStore";
import { v4 as uuidv4 } from 'uuid';


const listItemsStore = useListItemsStore();
const { addListItem } = listItemsStore;

const newItemDescription = ref('');

const getDate = () => {
  let t = new Date()
  let year = t.getFullYear()
  let month = t.getMonth()
  month = month.toString().length < 2 ? '0' + month : month;
  let date = t.getDate()
  date = date.toString().length < 2 ? '0' + date : date;
  let res = date + '.' + month + '.' + year
  return res
}

const enterItem = () => {
  addListItem({
        id: uuidv4(),
        description: newItemDescription.value,
        status: false,
        date: getDate(),
        date2: new Date().getTime()
      })
  newItemDescription.value = ''
  close()
}

defineProps(["isOpen"]);

const emit = defineEmits(["closeModal"]);
function close() {
  emit("closeModal");
}

let input = ref()

onUpdated(() => {
  input.value.focus()
})

</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  z-index: 10;
  display: none;
}
.overlayActive {
  display: block;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: white;
  z-index: 10;
  transform: translate(-50%, -50%) scale(0);

  box-shadow: 0px 25px 50px -12px #00000040;
  width: 400px;
  height: 280px;
  padding: 40px; 
}
.modalActive {
  transform: translate(-50%, -50%) scale(1);
  animation-name: a1;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-direction: normal;
}
@keyframes a1 {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.modal__close {
  position: absolute;
  top: 40px;
  right: 40px;

  &:hover {
    cursor: pointer;
  }
  & rect {
    transition: .5s ease;
  }
  &:hover rect {
    fill: #5c7cdf;
  }
}

.modal__title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.3;
  color: #16181D;
  margin-bottom: 30px;
}

.modal__input-box {

}
.modal__label {
  display: block;
  font-family: 'AGAvantGardeCyr', sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
}
.modal__input {
  display: block;
  width: 100%;
  padding: 11px 16px;
  border: 1px solid #DDE2E4;
  border-radius: 10px;
  
  &:focus {
    border: 1px solid #DDE2E4;
    outline: 1px solid #DDE2E4;
  }
  &::placeholder {
    color: #c4c4c4;
    opacity: 1;
  }
}
.modal__btn-box {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.modal__btn {
  font-size: 18px;
  padding: 12px 40px;
  background-color: #F0F5FF;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e6e7ee;
  }
}

</style>
