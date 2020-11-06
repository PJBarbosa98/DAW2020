/**
 *
 * DAW2020 - T4 - `arq_aux.js`
 *
 * Main Server Module (for requests)
 *
 */

exports.myDateTime = function()
{
	var d = new Date();
	return d.toISOString().substring(0, 16);
}