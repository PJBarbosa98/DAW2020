const axios = require('axios');

axios.get('http://localhost:3000/pubs?_sort=year,title&_order=desc,asc')
	.then(resp => {
		pubs = resp.data;
		pubs.forEach(p => {
			console.log(`${p.year}, ${p.id}, ${p.title}`);
		});
	})
	.catch(error => {
		console.log(error);
	});

/*
 * note: javascript's anonymous functions
 *
 * 	.catch(error => {
 *		console.log(error);
 *	});
 *
 * equals
 *
 * .catch(function (error) {
 *		console.log(error);	
 * });
 *
 */