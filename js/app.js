const list = JSON.parse(localStorage.getItem('todos')) || [];
const vm = new Vue({
	el: '.todoapp',
	data: {
		list:list,
		things: '',
		currentId: '',
		currentThing: ''
	},
	methods: {
		del(id) {
			console.log(this.list);
			let idx = this.list.findIndex(item => item.id === id);
			this.list.splice(idx, 1);
			// this.list = this.list.filter(v => v.id !== id );
		},
		add() {
			if (!this.things.trim()) {
				alert('输入内容不能为空!');
				return;
			}
			// console.log(this.things);
			let temp = {
				id: +new Date(),
				thing: this.things,
				done: false
			}
			this.list.unshift(temp);
			this.things = '';
		},
		showEdit(id, thing) {
			this.currentId = id;
			this.currentThing = thing;
		},
		edit() {
			const todo = this.list.find(item => item.id === this.currentId);
			if (!todo.thing.trim()) {
				this.list = this.list.filter(item => item.id !== this.currentId);
			}
			this.currentId = '';
		},
		cancel(item) {
			this.currentId = '';
			console.log(item);
			item.thing = this.currentThing
		},
		clear() {
			this.list = this.list.filter(item => !item.done);
		}
	},
	computed: {
		isShow() {
			return this.list.some(item => item.done);
		},
		leftCount() {
			return this.list.filter(item => !item.done).length;
		},
		isCheckAll: {
			get() {
				return this.list.every(item => item.done);
			},
			set(value) {
				console.log(value);
				this.list.forEach(item => item.done = value);
			}
		}
	},
	watch: {
		list: {
			deep:true,
			handler(value) {
				// console.log(value);
				localStorage.setItem('todos',JSON.stringify(value));
			}
		}
	}
})