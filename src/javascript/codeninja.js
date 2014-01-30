/* ========================================================================
 * Just for fun, my 2 cents to Amazon India Code Ninjas
 * http://nicobruenjes.de/codeninjas
 *
 * The Questions are here:
 * https://amazon.interviewstreet.com/challenges/dashboard/#problems
 * ======================================================================== */

var CodeNinja = function() {

	"use strict";

	// extend object with counter
	Object.size = function ( obj ) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty( key )) {
				size++;
			}
		}
		return size;
	};

	// helper function to format input
	var trimToArray = function ( input ) {
		return input.replace( /^\s+|\s+$/g, '' ).split( "\n" );
	};

	return {
		// Shortest Sub-Sequent
		// Given a paragraph of text, write a program to find the first shortest
		// sub-segment that contains each of the given k words at least once. 
		// A segment is said to be shorter than other if it contains less number
		// of words. Ignore characters other than [a-z][A-Z] in the text. 
		// Comparison between the strings should be case-insensitive. If no 
		// sub-segment is found then the program should 
		// output “NO SUBSEGMENT FOUND”.
		shortestSubSequence: function ( input ) {
			var inputarray = trimToArray( input ),
				text = inputarray.shift().replace( /[^a-zA-Z\s]/gi, "" ).split( " " ),
				k = parseInt( inputarray.shift(), 10 ),
				textlength = text.length,
				findings = {},
				bestlength = textlength,
				solution = "NO SUBSEGMENT FOUND",
				// if item found, scribble it down for later
				recPosition = function ( item ) {
					if ( this.elem.toLowerCase() === item.toLowerCase() ) {
						findings[item] = this.index;
					}
				},
				// I would call this dynamic search
				// not sure if it's just this
				searchDynamic = function ( elem, index, arr ) {
					inputarray.forEach( recPosition, {
						"elem": elem,
						"index": index
					});
					if (Object.size( findings ) === k) {
						substring2solution( findings );
					}
				},
				// find the shortest substring
				// add it to the solution string
				substring2solution = function ( obj ) {
					var list = [],
						output;
					list = Object.keys( obj ).map( function ( item ) {
						return obj[item];
					}).sort( function ( a, b ) {
						return a - b;
					});
					output = text.slice( list.shift(), list.pop() + 1 );
					if ( output.length < bestlength ) {
						bestlength = output.length;
						solution = output.join( " " );
					}
				};

			if ( inputarray.length === k ) {
				text.forEach( searchDynamic );
			}
			return solution;
		},

		// Meeting Schedules
		// Given M busy-time slots of N people, You need to print all the
		// available time slots when all the N people can schedule a meeting for
		// a duration of K minutes. Event time will be of form HH MM ( where 0
		// <= HH <= 23 and 0 <= MM <= 59 ), K will be in the form minutes.
		meetingSchedules: function ( input ) {
			var inputarray = trimToArray( input ),
				mk = inputarray.shift().split( " " ),
				m = mk[0],
				k = mk[1],
				busy = [],
				free = [],
				starttime,
				solution = "",
				makeTimeString = function ( time ) {
					return  ( "0" + Math.floor( time / 60 ) ).slice( -2 ) + " " +
							( "0" + time % 60 ).slice( -2 );
				};

			// there is a highly scientifical soultion which will contain the
			// mapping of mathematical graphs especially concerning hungarian
			// woods… for simplecity sake I just wrote down a day in its 1440
			// minutes, mark the occupied spots and return the free
			if ( 1 <= m && m <= 100 ) {
				for ( var i = 0, end = 1440; i < end; i++ ) {
					free[i] = false;
				}
				inputarray.sort();
				busy = inputarray.map( function ( elem ) {
					var t = elem.split(" "),
						start = ( Number( t[0] ) * 60 ) + Number( t[1] ),
						end = ( Number( t[2] ) * 60 ) + Number( t[3] );
					return [start, end];
				});
				busy.forEach( function( elem ) {
					for ( var i = elem[0]; i < elem[1]; i++ ) {
						free[i] = true;
					}
				});
				free.forEach( function( elem, index, arr) {
					if ( elem === false ) {
						if ( typeof starttime === "undefined" ) {
							starttime = index;
						}
					}
					if ( elem === true ) {
						if ( arr[index - 1] === false ) {
							if ( index - starttime >= k ) {
								solution += makeTimeString( starttime ) + " " +
											makeTimeString( index ) + "\n";
							}
							starttime = undefined;
						}
					}
				});
			}
			return solution;
		},

		// Fibonacci Factor
		// Given a number K, find the smallest Fibonacci number that shares a
		// common factor( other than 1 ) with it. A number is said to be a
		// common factor of two numbers if it exactly divides both of them.
		// Output two separate numbers, F and D, where F is the smallest
		// fibonacci number and D is the smallest number other than 1 which
		// divides K and F.
		fibonacciFactor: function ( input ) {
			var fibmax = 1000,
				inputarray = trimToArray( input ),
				count = parseInt(inputarray.shift(),10),
				solution = "",
				// as in everybody should have his own fibonacci function
				mustHaveFibunacci = function () {
					var fib = [],
						x, y, sum;
					for (var i = 0; i < fibmax; i++) {
						if (i === 0) {
							x = 1;
							y = 2;
						}
						sum = x + y;
						x = y;
						y = sum;
						fib.push(sum);
					}
					return fib;
				},
				fibs = mustHaveFibunacci(),
				// find greatest common divisor
				gcd = function ( x, y ) {
					while ( y !== 0 ) {
						var z = x % y;
						x = y;
						y = z;
					}
					return x;
				},
				// return all factors of num
				returnFactors = function ( num ) {
					var factor = [];
					for ( var i = 1; i < num; i++ ) {
						var n = num / i;
						if ( n % 2 === 1 ) {
							factor.push(n);
						}
					}
					return factor.reverse();
				},
				// check fibinacci number against divisor with factors of num
				// returns immediatly when first found
				checkFibFactor = function ( num ) {
					var f = returnFactors( num );
					fibs.some( function ( elem ) {
						return f.some( function ( fElem ) {
							var d = gcd( fElem, elem );
							if ( fElem === d ) {
								solution += elem + " " + d + "\n";
								return true;
							}
						});
					});
				};


			if ( ( 1 <= count && count <= 5 ) && count === inputarray.length ) {
				inputarray.forEach( checkFibFactor );
			}
			return solution;
		},

		// Connected Sets
		// Given a 2–d matrix , which has only 1’s and 0’s in it. Find the
		// total number of connected sets in that matrix. Explanation: Connected
		// set can be defined as group of cell(s) which has 1 mentioned on it
		// and have at least one other cell in that set with which they share
		// the neighbor relationship. A cell with 1 in it and no surrounding
		// neighbor having 1 in it can be considered as a set with one cell in
		// it. Neighbors can be defined as all the cells adjacent to the given 
		// cell in 8 possible directions ( i.e N , W , E , S , NE , NW , SE ,
		// SW direction ). A cell is not a neighbor of itself.
		connectedSets: function( input ) {
			var inputarray = trimToArray( input ),
				cases = inputarray.shift(),
				matrices = [],
				solution = "",
				visited = [],
				// is there a smoother way in javascript to produce an x*x array
				// with only false as content?
				makeBoolMatrix = function ( length ) {
					var arr = [];
					for ( var i = 0; i < length; i++ ) {
						var inner = [];
						for ( var j = 0; j < length; j++ ) {
							inner.push( false );
						}
						arr.push( inner );
					}
					return arr;
				},
				// check if a cell has a neighbour,
				// that is connected to the set
				// and wasn't visited before
				safeToVisit = function ( row, col, visited, matrix ) {
					var length = matrix.length - 1;
					return  ( row >= 0 ) &&
							( row <= length ) &&
							( col >= 0)  &&
							( col <= length ) &&
							( matrix[row][col] === 1 ) &&
							( !visited[row][col] );
				},
				// mark cell as visited and check the possibly 8 surrounding
				// cells if they are "safe"
				search = function ( row, col, visited, matrix ) {
					var possibleRow = [-1, -1, -1, 0, 0, 1, 1, 1],
						possibleCol = [-1, 0, 1, -1, 1, -1, 0, 1];

					visited[row][col] = true;
					for ( var i = 0; i < possibleRow.length; i++ ) {
						if ( safeToVisit( row + possibleRow[i], col + possibleCol[i], visited, matrix ) ) {
							search( row + possibleRow[i], col + possibleCol[i], visited, matrix );
						}
					}

				},
				// for all cells start the search
				// as the search is recursivly finding all set members after
				// finding one, all new found 1 are the start of a new set
				// what is counted
				countSets = function ( matrix ) {
					var count = 0,
						visited = makeBoolMatrix( matrix.length );
					matrix.forEach( function ( rowElem, rowIndex ) {
						rowElem.forEach( function ( cell, colIndex ) {
							if ( cell === 1 && !visited[rowIndex][colIndex] ) {
								search( rowIndex, colIndex, visited, matrix );
								count++;
							}
						});
					});
					return count;
				};

			// the input format for this problem is hell
			// need to reformat reformatted input
			for ( var i = 0; i < cases; i++ ) {
				var length = inputarray.shift(),
					arr = [];
				for ( var j = 0; j < length; j++ ) {
					var inner = inputarray.shift().split( " " );
					// TODO: commit suicide in cause of js lint
					inner = inner.map( function ( elem ) {
						return parseFloat( elem, 10 );
					});
					arr.push( inner );
				}
				matrices.push( arr );
			}

			matrices.forEach( function ( matrix ) {
				solution += countSets( matrix ) + "\n";
			});
			return solution;
		}
	};
}();