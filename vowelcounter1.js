var vowelA = document.getElementById("vowelA");
var vowelE = document.getElementById("vowelE");
var vowelI = document.getElementById("vowelI");
var vowelO = document.getElementById("vowelO");
var vowelU = document.getElementById("vowelU");

var vowelCounts = {
    'A': 0,
    'E': 0,
    'I': 0,
    'O': 0,
    'U': 0
};

var vowelOrder = [];

function displayAndColor(vowel, count) {
    var element = document.getElementById("vowel" + vowel);

    var colors = ['green', 'blue', 'orange', 'white'];

   
    var uniqueCounts = [...new Set(Object.values(vowelCounts))];

  
    var colorIndex = uniqueCounts.indexOf(count);


    if (colorIndex === -1) {
        colorIndex = colors.length - 1; 
    }

    element.style.backgroundColor = colors[colorIndex];

    // Display counts
    element.value = count;
}



function countAndDisplay() {
    var text = document.getElementById("textarea").value;

    // Reset counts and order before counting
    vowelCounts = {
        'A': 0,
        'E': 0,
        'I': 0,
        'O': 0,
        'U': 0
    };
    vowelOrder = [];

    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i).toUpperCase();

        if (vowelCounts.hasOwnProperty(char)) {
            vowelCounts[char]++;
            if (!vowelOrder.includes(char)) {
                vowelOrder.push(char);
            }
        }
    }

    // Sort vowelOrder array in descending order based on counts
    vowelOrder.sort(function (a, b) {
        return vowelCounts[b] - vowelCounts[a];
    });

    // Display counts and assign colors based on rank
    displayAndColor('A', vowelCounts['A'], vowelOrder.indexOf('A'));
    displayAndColor('E', vowelCounts['E'], vowelOrder.indexOf('E'));
    displayAndColor('I', vowelCounts['I'], vowelOrder.indexOf('I'));
    displayAndColor('O', vowelCounts['O'], vowelOrder.indexOf('O'));
    displayAndColor('U', vowelCounts['U'], vowelOrder.indexOf('U'));
}
