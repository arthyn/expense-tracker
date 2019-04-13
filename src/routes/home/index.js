import { h } from 'preact';
import { Line } from 'preact-chartjs-2';
import data from '../../data';
import { buildBillDates, buildDates, resolveAccounts, getGraphData } from '../../data-transformer';

import style from './style';

const start = new Date(2019, 3, 1);
const end = new Date(2019, 5, 30);
const personData = data.map(person => ({
	billLines: buildBillDates(person.bills, start, end),
	incomeLines: buildDates(person.income, start, end),
	transferLines: buildDates(person.transfers, start, end),
	...person
}));
console.log(personData);

const accountsByPerson = resolveAccounts(personData, start, end);

console.log(accountsByPerson);

const people = accountsByPerson.map(data => getGraphData(data.accountLines, data.accountMap));

const Home = () => (
	<div class={style.home}>
		{people.map(person =>
			<Line data={person} />
		)}
	</div>
);

export default Home;
