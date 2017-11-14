
import './styles/styles.less';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import BigCalendar from 'react-big-calendar';

let {
	default: messages,
} = require('react-big-calendar/lib/utils/messages');

messages = messages({
	allDay: "Весь день",
});

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

import moment from 'moment';
import locale from 'moment/src/locale/ru';

// if(typeof window !== "undefined"){
// 	window.moment = moment;
// }

// console.log('messages', messages);


// require('globalize/lib/cultures/globalize.culture.ru');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
allViews = allViews.filter(n => n === "week");

export class ReactSchedule extends Component{

	static propTypes = {
		days: PropTypes.array,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		days: [],
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		const {
			days,
		} = props;

		this.state = {
			days,
			currentDate: moment(),
		};
	}


	// onSelect(a,b,c){

	// 	console.log("onSelect a", a);
	// 	console.log("onSelect b", b);
	// 	console.log("onSelect c", c);

	// }

	onSelectSlot(slotInfo){
		// console.log(
		// 	slotInfo,

	 //    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
	 //    `\nend: ${slotInfo.end.toLocaleString()}` +
	 //    `\naction: ${slotInfo.action}`
	 //  );

		let {
			start,
			end,
			action,
		} = slotInfo;

		let {
			days,
		} = this.state;

		start = moment(start);
		end = moment(end);

		const dayIndex = start.weekday();

		let prevDay = days && days[dayIndex];

		// console.log('onSelectSlot start', start, moment(start).weekday());


		let startHour = start.get('hour');
		let startMinute = start.get('minute');

		let endHour = end.get('hour');
		let endMinute = end.get('minute');

		// console.log("newEvent", newEvent);

		// Получаем предыдущую информацию за этот день, если она была

		switch(action){

			case 'click':

				if(prevDay){

					const {
						start: prevStart,
						end: prevEnd,
					} = prevDay;

					const {
						hour: prevStartHour,
						minute: prevStartMinute,
					} = prevStart || {};

					const {
						hour: prevEndHour,
						minute: prevEndMinute,
					} = prevEnd || {};

					
					if(prevStartHour !== undefined){

						if(prevStartHour * 60 + prevStartMinute < startHour * 60 + prevEndMinute){
							startHour = prevStartHour;
							startMinute = prevStartMinute;
						}

					}

				}

				break;

		}


		let newStart = {
			hour: startHour,
			minute: startMinute,
		};

		let newEnd = {
			hour: endHour,
			minute: endMinute,
		};


		let newEvent = {
			start: newStart,
			end: newEnd,
		};

		// Устанавливаем данные дня
		days[dayIndex] = newEvent;

		// console.log('days', days);

		this.onChange(days);

	}

	onChange(days){
		
		const {
			onChange,
		} = this.props;

		onChange && onChange(days);

		this.setState({
			days,
		});
	}

  
  moveEvent(event) {
    // const { events } = this.state;

    // const { start, end } = event;

    // console.log('moveEvent', event, start, end);

    // const idx = events.indexOf(event);
    // const updatedEvent = { ...event, start, end };

    // Object.assign(event, {
    // 	start,
    // 	end,
    // });

    // const nextEvents = [...events]
    // nextEvents.splice(idx, 1, updatedEvent)

    // this.setState({
    //   // events: nextEvents
    //   events,
    // })

    // console.log(`${event.title} was dropped onto ${event.start}`);

    // this.forceUpdate();


    this.onSelectSlot(event);
  }


	render(){

		const {
			...other
		} = this.props;


		const {
			// events,
			days,
			currentDate,
		} = this.state;

		let events = [];


		// console.log("currentDate", currentDate);

		// Формируем дни недели

		const startDay = currentDate.clone().startOf('week');

		days.map((n, index) => {
			// events.push(day);

			if(!n){
				return;
			}

			const {
				start,
				end,
			} = n;

			if(!start || !end){
				return;
			}

			const {
				hour: startHour,
				minute: startMinute,
			} = start;

			const {
				hour: endHour,
				minute: endMinute,
			} = end;

			// console.log("days n", n);

			let newData = startDay.clone().add('day', index);

			let newStart = newData.clone().add('hour', startHour).add('minute', startMinute).toDate();
			let newEnd = newData.clone().add('hour', endHour).add('minute', endMinute).toDate();

			let event = {
				start: newStart,
				end: newEnd,
			};

			events.push(event);

			// console.log('event', event, moment(newStart).toArray(), moment(newEnd).toArray());

		});

		// events.push({
		// 	title: "SDfsdf",
	 //    'start': moment(new Date(2017, 10, 12, 7,0,0)).toDate(),
	 //    'end': moment(new Date(2017, 10, 12, 17,0,0)).toDate(),
	 //  });


		return <div
			style={{
				height: "100vh",
				// overflow: 'auto',
			}}
		>
      <DragAndDropCalendar
        {...other}
        selectable
        toolbar={false}
        events={events}
        views={allViews}
        view="week"
        step={30}
        defaultDate={currentDate}
        culture={'ru'}
        // onSelectEvent={::this.onSelect}
        onSelectSlot={::this.onSelectSlot}
        onEventDrop={::this.moveEvent}
        // allDayAccessor="Весь день"
        messages={messages}
        // onDrillDown={() => {
        // 	console.log("onDrillDown");
        // }}
        formats={{
        	dayFormat: "dddd",
        }}
      />
		</div>
	}
}

export default DragDropContext(HTML5Backend)(ReactSchedule);
