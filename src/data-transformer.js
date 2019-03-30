const chrono = require('chrono');

function buildDates(start) {

}

function buildTransferDates(start) {

}

function buildBillDates(month, year, bills) {
	const billLines = [];

	bills.forEach(bill => bill.date = new Date(year, month, bill.dom));
}

function buildIncomeDates(income) {
	const incomeLines = [];
	income.forEach(income => {
		incomeLines.push({
			date: chrono.parse(income.period, income.align),
			...income
		});
	});
	return incomeLines;
}

function buildAccountStatementDates(start) {

}

function buildAccountPaymentDates(start) {

}