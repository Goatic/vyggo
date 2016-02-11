import Rooms from '/common/imports/collections/rooms'

Template.room.onCreated(function() {
	this.state = new ReactiveDict()

	this.state.set('name',FlowRouter.getParam('name'))

	this.subscribe('room', this.state.get('name'))

	this.autorun(()=> {
		const room = Rooms.findOne()
		this.subscribe("room.users", room.users)
	})
})

Template.room.helpers({
	room() {
		return Rooms.findOne({name:Template.instance().state.get('name')})
	},
	users() {
		return Meteor.users.find()
	}

})
