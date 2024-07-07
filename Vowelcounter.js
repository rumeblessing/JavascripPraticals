function countAndDisplay() {
    const inputString = document.getElementById("inputString").value;

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const vowelCounts = {};

    for (let vowel of vowels) {
        const regex = new RegExp(vowel, 'gi');
        const count = (inputString.match(regex) || []).length;
        vowelCounts[vowel] = count;
    }

    for (let vowel of vowels) {
        const vowelButton = document.getElementById(vowel + 'Button');
        const count = vowelCounts[vowel];

        switch (count) {
            case 0:
                vowelButton.style.backgroundColor = "white";
                break;
            case 1:
                vowelButton.style.backgroundColor = "yellow";
                break;
            case 2:
                vowelButton.style.backgroundColor = "green";
                break;
            case 3:
                vowelButton.style.backgroundColor = "pink";
                break;
            case 4:
                vowelButton.style.backgroundColor = "blue";
                break;
            default:
                vowelButton.style.backgroundColor = "orange";
                break;
        }
    }
}

