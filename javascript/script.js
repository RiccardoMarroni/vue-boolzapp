import {contacts} from './data.js';
import Picker from './emoji-picker.js';

const dt = luxon.DateTime;

const {createApp} = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1,
            newMsg: '',
            searchText: ''
        }
    },
    methods: {
        classMsg(msg) {
            if (msg.status === 'sent') {
                return 'sent';
            } else {
                return 'received';
            }
        },
        sendMsg() {
            if (!this.newMsg.trim()) return;
            const contact = this.contacts.find((contact) => contact.id === this.activeContactId);
            if (contact) {
                contact.messages.push({
                    date:  dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                    message: this.newMsg,
                    status: 'sent'
                });
                this.newMsg = '';
                setTimeout(() => {
                    contact.messages.push({
                        date:  new Date().toLocaleString(),
                        message: 'ok',
                        status: 'received'
                    });
                },1000)
            }
        },
        findTheHour(dateString) {
            let hourExact = dateString.split(' ');
            return hourExact[1]; 
          },
         onSelectEmoji(emoji) {
            console.log(emoji)
            this.messageText += emoji.i;
            /*
              // result
              { 
                  i: "😚", 
                  n: ["kissing face"], 
                  r: "1f61a", // with skin tone
                  t: "neutral", // skin tone
                  u: "1f61a" // without tone
              }
              */
        },

    },
    computed: {
        changeAvatar() {
            const contact = this.contacts.find((contact) => contact.id === this.activeContactId);
            return contact.messages;
        },
        activeContact() {
            const contact = this.contacts.find(contact => contact.id === this.activeContactId);
            return contact;
        },
        filteredContact(){		
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    mounted() {
        
    }
}).mount('#app');



createApp({

}).component('Picker', Picker).mount('#app');
