/*global odeNinja */

/* ========================================================================
 * Just for fun, my 2 cents to Amazon India Code Ninjas
 * http://nicobruenjes.de/codeninjas
 *
 * The Questions are here:
 * https://amazon.interviewstreet.com/challenges/dashboard/#problems
 * ======================================================================== */
 
jQuery(document).ready(function($) {

	var problems = [
		"This is a test. This is a programming test. This is a programming test in any language.\n4\nthis\na\ntest\nprogramming",
		"5 120\n16 00 17 00\n10 30 14 30\n20 45 22 15\n10 00 13 15\n09 00 11 00",
		"3\n3\n5\n161",
		"4\n4\n0 0 1 0\n1 0 1 0\n0 1 0 0\n1 1 1 1\n4\n1 0 0 1\n0 0 0 0\n0 1 1 0\n1 0 0 1\n5\n1 0 0 1 1\n0 0 1 0 0\n0 0 0 0 0\n1 1 1 1 1\n0 0 0 0 0\n8\n0 0 1 0 0 1 0 0\n1 0 0 0 0 0 0 1\n0 0 1 0 0 1 0 1\n0 1 0 0 0 1 0 0\n1 0 0 0 0 0 0 0\n0 0 1 1 0 1 1 0\n1 0 1 1 0 1 1 0\n0 0 0 0 0 0 0 0"
	];

	$('section').each(function(i) {
		var problem = problems[i],
			text = $('#test-' + i + '-text'),
			reset = $('#test-' + i + '-reset'),
			solution = $('#test-' + i + '-solution'),
			form = $('#test-' + i + '-form'),
			func = $(this).data('name');

		text.val(problem);

		reset.on('click', function(evt) {
			evt.preventDefault();
			text.val(problem);
			solution.val("");
			$(this).addClass("hidden");
		});

		form.on('submit', function(evt) {
			evt.preventDefault();
			solution.val(CodeNinja[func](text.val()));
			reset.removeClass('hidden');
		});

	});
});