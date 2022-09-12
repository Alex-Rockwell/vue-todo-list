import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

const temp = [
      {
        id: uuidv4(),
        description: 'Размещение новостей на сайте',
        status: true,
        date: '22.04.2022',
      },
      {
        id: uuidv4(),
        description: 'Внедрить Wi-fi для читателей',
        status: false,
        date: '25.03.2022',
      },
      {
        id: uuidv4(),
        description: 'Отредактировать раздел “Доступная среда”',
        status: true,
        date: '15.03.2022',
      },
      {
        id: uuidv4(),
        description: 'Презентация “Информационные технологии”',
        status: false,
        date: '15.03.2022',
      },
      {
        id: uuidv4(),
        description: 'Счётчики — внедрить дизайн',
        status: false,
        date: '09.03.2022',
      },
    ]

    
let storageData = JSON.parse(window.localStorage.getItem('listItemsData'))
let todoList = storageData ? storageData._object.listItems : temp;

let todoListWTime = todoList.map(el => {
  let temp2 = el.date.split('.').reverse().join('-');
  el = {...el, date2: new Date(temp2).getTime()};
  return el
});

export const useListItemsStore = defineStore({
  id: "listData",
  state: () => ({
    listItems: todoListWTime,
  }),

  actions: {
    addListItem(newItem) {
      this.listItems.push(newItem)
    },
    changeStatus(id, currentStatus) {
      this.listItems = this.listItems.map((el) => {
        if (el.id == id) {
          return { ...el, status: currentStatus };
        }
        return el;
      });
    },
    deleteListItem(id) {
      this.listItems = this.listItems.filter((el) => el.id != id);
    },
  },

});
