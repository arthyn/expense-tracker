import { h } from 'preact';
import { Line } from 'preact-chartjs-2';

import style from './style';

const Home = () => (
	<div class={style.home}>
		<Line data={data} />
	</div>
);

export default Home;
