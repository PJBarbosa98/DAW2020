/**
 *
 * DAW2020 - T4 - `arq_aux.js`
 *
 * Auxiliar Server Module 
 *
 */

exports.myDateTime = function()
{
	var d = new Date();
	return d.toISOString().substring(0, 16);
}