import { h } from 'preact';
import { Line } from 'preact-chartjs-2';
import data from '../../data';
import { buildBillDates, buildDates, resolveAccounts } from '../../data-transformer';

import style from './style';

const start = new Date(2019, 3, 1);
const end = new Date(2019, 5, 30);
const personData = data.map(person => ({
	billLines: buildBillDates(person.bills, start, end),
	incomeLines: buildDates(person.income, start, end),
	transferLines: buildDates(person.transfers, start, end),
	...person
}));
const accounts = personData.map(data => resolveAccounts(data, start, end));

const Home = () => (
	<div class={style.home}>
		{JSON.stringify(accounts)}
	</div>
);

export default Home;
