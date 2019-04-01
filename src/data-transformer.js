const chrono = require('chrono-node');
import moment from 'moment';

export function buildDates(instances, start, end) {
	let totalLines = [];

	instances.forEach(instance => {
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

export function resolveAccounts(data, start, end) {
	let accountLines = [];
	let accountMap = data.accounts.reduce((accounts, account) => {
			accounts[account.id] = account;
			return accounts;
	}, {});
	let current = moment(start);

	while (current.isBetween(start, end, null, '[]')) {
		let lines = [];
		
		lines = lines.concat(data.transferLines.filter(transfer => current.isSame(transfer.date)));
		lines = lines.concat(data.incomeLines.filter(income => current.isSame(income.date)));
		lines = lines.concat(data.billLines.filter(bill => current.isSame(bill.date)));
		
		lines.forEach(line => calculateAccounts(line, accountMap));

		accountLines = accountLines.concat(Object.keys(accountMap).map(key => ({
			date: current.toDate(),
			...accountMap[key]
		})));

		current.add(1, 'days');
	}

	return accountLines;
}

function calculateAccounts(line, accountMap) {
	debugger;
	if (typeof line.from !== 'undefined') {
		accountMap[line.from].amount -= line.amount;
	}

	if (typeof line.to !== 'undefined') {
		accountMap[line.to].amount -= line.amount;
	}
}

function buildAccountStatementDates(start) {

}

function buildAccountPaymentDates(start) {

}