import { directive } from "babel-types";

const template = document.createElement('template');
template.innerHTML = `
    <style>

        .messages {
            display: flex;
            justify-content: flex-begin;
            width: 600px;
            flex-direction: column;
            color: black;
            height: calc(100vh - 22px);
            overflow-y: scroll;
            overflow-x: auto;
        }

        .message {
            display: flex;
            width: 568px;
            margin: 5px;
            border: 3px solid black;
            border-radius: 10px;
            flex-direction: column;
            padding: 3px;
        }
        
        input[type=submit] {
            visibility: collapse;
        }

        form-input {
            width: 600px;
        }

        .msg-info {
            font-size: 10px;
            line-height: 1;
        }

    </style>
    <form>
        <div class="messages"></div>
        <form-input name="message-text" placeholder="Введите сообщеине"></form-input>
    </form>
`;
        
function get_cur_date(absdate) {
    let date = new Date(absdate);
    let str1 = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    let str2 = date.getHours() + ':' + date.getMinutes();
    return str1 + ' ' + str2;
}

class MessageForm extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('form-input');
        this.$messages = this._shadowRoot.querySelector('.messages');

        // console.log(localStorage.length);

        let keys = Object.keys(localStorage);
        keys.sort();
        // console.log(keys);
        for (let key of keys) {
            if (key == 'loglevel:webpack-dev-server') {
                continue;
            }
            // console.log(key);
            // console.log(localStorage.getItem(key));
            let msg = document.createElement('div');
            msg.className = 'message';
            Object.assign(msg, JSON.parse(localStorage.getItem(key)));
            msg.innerHTML = '<div class="msg-info">' + msg.date + '<br />' +
            'from: ' + msg.from + '</div>' +
            msg.text;
            // console.log(msg);
            this.$messages.append(msg);
        }

        this.$messages.scrollTop = this.$messages.scrollHeight;
        // for (let i = 0; i < localStorage.length; i++) {
        //     console.log(localStorage.key(i));
        //     console.log(localStorage.getItem(localStorage.key(i)));
        //     let msg = JSON.parse( localStorage.getItem(localStorage.key(i)) );
        //     this.$messages.append(msg);
        // }

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    }

    _onSubmit (event) {
        event.preventDefault();
        let msg = document.createElement('div');
        msg.className = 'message';
        msg.text = this.$input.value;
        let absdate = new Date().getTime();
        msg.date = get_cur_date(absdate);
        msg.from = 'me';
        msg.innerHTML = '<div class="msg-info">' + msg.date + '<br />' +
            'from: ' + msg.from + '</div>' +
            msg.text;
        this.$messages.append(msg);
        localStorage.setItem(absdate, JSON.stringify(msg));

        this.$input.$input.value = '';
        this.$messages.scrollTop = this.$messages.scrollHeight;
    }

    _onKeyPress (event) {
        if (event.keyCode == 13) {
            this.$form.dispatchEvent(new Event('submit'));
        }
    }
}

customElements.define('message-form', MessageForm);
