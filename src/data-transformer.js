const chrono = require('chrono-node');
import moment from 'moment';

export function buildDates(instances, start, end) {
	let totalLines = [];

	instances.forEach(instance => {
		let dateList = buildDateList(instance.period, moment(instance.align, 'YYYY-MM-DD').toDate(), start, end);
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
	console.log(alignmentDate);
	let current = getNextAlignedDate(period, alignmentDate);
  
	while (current.getTime() <= end.getTime()) {
	  console.log(current);
	  if (current.getTime() >= start.getTime()) {
			list.push(current);
	  }
  
	  current = getNextAlignedDate(period, current);
	}
  
	return list;
}
  
function getNextAlignedDate(period, date) {
	let parsed = chrono.parse(period, date)[0];
	parsed.start.imply('hour', 0);
	return parsed.start.date();
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

function accountMap(accountList) {
	return accountList.reduce((accounts, account) => {
		accounts[account.id] = account;
		return accounts;
	}, {});
}

export function resolveAccounts(people, start, end) {
	let current = moment(start);
	debugger;
	people.forEach(person => {
		person.accountMap = accountMap(person.accounts);
		person.accountLines = [];
	});

	while (current.isBetween(start, end, null, '[]')) {
		people.forEach(person => {
			calculateAccounts(person, current, person.accountMap);
			updateStatements(person.accountMap, current);
		});

		people.forEach(person => {
			person.accountLines = person.accountLines.concat(Object.keys(person.accountMap).map(key => ({
				date: current.toDate(),
				...person.accountMap[key]
			})));
		});

		current.add(1, 'days');
	}

	return people;
}

function calculateAccounts(data, current, accountMap) {
	let lines = [];
	let transfers = data.transferLines.filter(transfer => current.isSame(transfer.date));
	let income = data.incomeLines.filter(income => current.isSame(income.date));
	let bills = data.billLines.filter(bill => current.isSame(bill.date));
	
	lines
		.concat(transfers, income, bills)
		.forEach(line => processLine(line, accountMap));
}

function processLine(line, accountMap) {
	let amount = line.amount;
	if (typeof amount === 'undefined' && accountMap[line.to].type === 'credit-card') {
		amount = accountMap[line.to].lastStatement;
	}

	resolveFrom(line.from, amount, accountMap);
	resolveTo(line.to, amount, accountMap);
}

function resolveTo(to, amount, accountMap) {
	if (typeof to !== 'undefined') {
		let account = accountMap[to];
		account.amount += account.type === 'credit-card' ? -amount : amount;
	}
}

function resolveFrom(from, amount, accountMap) {
	if (typeof from !== 'undefined') {
		let account = accountMap[from];
		account.amount -= account.type === 'credit-card' ? -amount : amount;
	}
}

function updateStatements(accountMap, currentDate) {
	Object.keys(accountMap).forEach(key => {
		let account = accountMap[key];
		if (typeof account.statement !== 'undefined') {
			let statementDate = moment(new Date(currentDate.year(), currentDate.month(), account.statement));
			if (currentDate.isSame(statementDate)) {
				account.lastStatement = account.amount;
			}
		}
	});
}

export function getGraphData(accountLines, accountMap) {
	let datasets = [];
	let labels = [];

	Object.keys(accountMap).forEach((key, index) => {
		let account = accountMap[key];
		let lines = accountLines.filter(line => line.id === account.id);
		let set = {
			label: key,
			data: []
		};
		
		lines.forEach(line => {
			set.data.push(line.amount);
			if (index === 0) {
				labels.push(`${line.date.getMonth() + 1}/${line.date.getDate()}`);
			}
		});

		datasets.push(set);
	});

	return { labels, datasets };
}

function buildAccountStatementDates(start) {

}

function buildAccountPaymentDates(start) {

}