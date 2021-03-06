const iberia = { id: 'iberia', shared: true, amount: 1392.03, type: 'checking' };
const simpleJoint = { id: 'simple-joint', shared: true, amount: 609.44, type: 'checking' };

const hunter = {
	name: 'hunter',
	bills: [
		{ from: 'iberia', label: 'Farm Bureau', amount: 137.54, dom: 19 },
		{ from: 'iberia', label: 'Mortgage', amount: 1121.16, dom: 3 },
		{ from: 'discover', label: 'Patreon', amount: 5, dom: 1 },
		{ from: 'discover', label: 'DigitalOcean', amount: 18.12, dom: 28 },
		{ from: 'discover', label: 'Pet Stuff', amount: 40, dom: 25 },
		{ from: 'discover', label: 'Atmos', amount: 50, dom: 6 },
		{ from: 'discover', label: 'Gym', amount: 40, dom: 1 },
		{ from: 'discover', label: 'Fiber', amount: 42.95, dom: 28 },
		{ from: 'discover', label: 'Netflix', amount: 10.99, dom: 21 },
		{ from: 'discover', label: 'Coffee', amount: 34, dom: 21 },
		{ from: 'discover', label: 'LUS', amount: 122.45, dom: 17 },
		{ from: 'discover', label: 'Harvest', amount: 12, dom: 12 },
		{ from: 'discover', label: 'Gas', amount: 70, dom: 7 }
	],
	income: [
		{ source: 'Stuller', to: 'iberia', amount: 1944.8, period: 'every 2 weeks', align: '2019-3-22' }
	],
	transfers: [
		{ from: 'iberia', to: 'simple-joint', amount: 900, period: 'every 2 weeks', align: '2019-3-12' },
		{ from: 'iberia', to: 'simple-personal', amount: 300, period: 'every 2 weeks', align: '2019-3-12' },
		{ from: 'simple-personal', to: 'simple-savings', amount: 22.86, period: 'every 1 day', align: '2019-3-12' },
		{ from: 'iberia', to: 'discover', period: 'every 1 month', align: '2019-3-22' }
	],
	accounts: [
		simpleJoint,
		{ id: 'simple-personal', shared: false, amount: 249.22, type: 'checking' },
		{ id: 'simple-savings', shared: false, amount: 7841.60, type: 'savings' },
		iberia,
		{ id: 'discover', shared: false, statement: 27, lastStatement: 2246.52, amount: 2343.28, type: 'credit-card' }
	]
};

const emily = {
	name: 'emily',
	bills: [
		{ from: 'discover', label: 'Ipsy', amount: 10.85, dom: 1 },
		{ from: 'discover', label: 'Office', amount: 10.89, dom: 19 },
		{ from: 'discover', label: 'Gas', amount: 20, dom: 1 },
		{ from: 'discover', label: 'ATT', amount: 137.89, dom: 4 },
		{ from: 'discover', label: 'Spotify', amount: 14.99, dom: 28 },
		{ from: 'discover', label: 'Squarespace', amount: 16, dom: 28 },
		{ from: 'discover', label: 'Adobe', amount: 55.35, dom: 27 },
		{ from: 'discover', label: 'Starbucks', amount: 50, dom: 16 },
		{ from: 'discover', label: 'LiveKindly', amount: 14, dom: 22 }
	],
	income: [
		{ source: 'Oakbourne', to: 'iberia', amount: 1000, period: 'once a month', align: '2019-3-19' },
		{ source: 'AirBnB', to: 'iberia', amount: 35, period: 'every 3 days', align: '2019-3-28' }
	],
	transfers: [{ from: 'iberia', to: 'discover', period: 'every 1 month', align: '2019-3-7' }],
	accounts: [
		simpleJoint,
		iberia,
		{ id: 'discover', shared: false, statement: 12, lastStatement: 627.07, amount: 868.65, type: 'credit-card' }
	]
};

const people = [hunter, emily];

export default people;