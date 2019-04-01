const chrono = require('chrono-node');
import moment from 'moment';

export function buildDates(instances, start, end) {
	let totalLines = [];

	instances.forEach(instance => {
		debugger;
		let dateList = buildDateList(instance.period, new Date(instance.align), start, end);
		let lines = dateList.map(date => ({
			date,
			...instance
		}));

		totalLines = totalLines.concat(lines);
	});

	return totalLines;
}

function buildDateList(period, alignmentDate, start, end) {
	const list = [];
	let current = getNextAlignedDate(period, alignmentDate);
  
	while (current.getTime() <= end.getTime()) {
	  if (current.getTime() >= start.getTime()) {
		list.push(current);
	  }
  
	  current = getNextAlignedDate(period, current);
	}
  
	return list;
  }
  
  function getNextAlignedDate(period, date) {
	return chrono.parse(period, date)[0].start.date();
  }

export function buildBillDates(bills, start, end) {
	const billLines = [];	
	let current = moment(start);
	let month, year;

	while (current.isBetween(start, end, null, '[]')) {
		month = current.month();
		year = current.year();

		bills.forEach(bill => {
			let date = moment(new Date(year, month, bill.dom));

			if (date.isBetween(start, end, null, '[]')) {
				billLines.push({ date: date.toDate(), ...bill });	
			}
		}); 

		current.add(1, 'months');
	}

	return billLines;
}

function buildAccountStatementDates(start) {

}

function buildAccountPaymentDates(start) {

}