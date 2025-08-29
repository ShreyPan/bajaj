const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const FULL_NAME = 'utkarsh_pandey';
const DOB = '29082025';
const EMAIL = 'utkarsh.pandey2022a@vitstudent.ac.in';
const COLLEGE_ROLL_NUMBER = '22BRS1111';

function isAlpha(char) {
    return /^[a-zA-Z]$/.test(char);
}
function isDigit(char) {
    return /^\d$/.test(char);
}
function isSpecial(char) {
    return !isAlpha(char) && !isDigit(char);
}
function alternateCaps(str) {
    let res = '';
    let upper = true;
    for (let i = str.length - 1; i >= 0; i--) {
        let c = str[i];
        if (upper) res += c.toUpperCase();
        else res += c.toLowerCase();
        upper = !upper;
    }
    return res;
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Enter array.' });
        }
        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let allAlphaChars = '';
        for (const item of data) {
            if (typeof item === 'string') {

                if (/^[a-zA-Z]+$/.test(item)) {
                    alphabets.push(item.toUpperCase());
                    allAlphaChars += item;
                }

                else if (/^\d+$/.test(item)) {

                    if (parseInt(item) % 2 === 0) even_numbers.push(item);

                    else odd_numbers.push(item);
                    sum += parseInt(item);
                }

                else if (item.length === 1 && isSpecial(item)) {
                    special_characters.push(item);
                }

                else {
                    special_characters.push(item);
                }
            }

            else if (typeof item === 'number') {
                if (item % 2 === 0) even_numbers.push(item.toString());
                else odd_numbers.push(item.toString());
                sum += item;
            }
        }

        let chars = allAlphaChars.split("");
        let concat_string = '';
        let upper = true;
        for (let i = chars.length - 1; i >= 0; i--) {
            concat_string += upper ? chars[i].toUpperCase() : chars[i].toLowerCase();
            upper = !upper;
        }
        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: COLLEGE_ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (err) {
        res.status(500).json({ is_success: false, message: 'Internal server error.' });
    }
});

app.get('/', (req, res) => {
    res.send('BFHL API is running.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
