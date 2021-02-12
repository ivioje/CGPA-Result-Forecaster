//To get an element from the Dom
function call (name) {
  return document.querySelector(name);
}

// To get elements from html dom
function callAll (name) {
  return document.querySelectorAll(name);
}

// Selecting various elements from the DOM
const addInputBtn = call('.add');
const calculateBtn = call('.calculate');
const addNewSecBtn = call('.addNewSecBtn');
const addNewSecInp = call('.addNewSecInp');
const yesBtn = call('.yesBtn');
const noBtn = call('.noBtn');
const submitBtn = call('.submitBtn');
const addInput = call('.numAdd');
const userName = call('#name');
const years = call('#years');
const undo = call('.undo');
const creditUnits = callAll('.creditUnit');
const grades = callAll('.grade');
const courseCodeInputs = callAll('.courseCode');
let totalUnit = call('.totalUnit');
let gpaValue = call('.gpaScore');
const level = call('.level');
const semester = call('.semester');
let displayResult = call('.displayResult');
let cgpaScore = call('.cgpaScore');
let displayBg = call('.modalResult-bg');
let helpBtn = document.querySelector('.help');
let modal = document.getElementById('modal');
let closeBtn = document.querySelector('.cancelBtn');

var levelCount = 1;
let cgpaArray = [];
let clickedYesBtn = false;
let clickedUndoBtn = false;
let clickedCalcBtn = false;

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') addNewInput();
});
addInputBtn.addEventListener('click', addNewInput);
calculateBtn.addEventListener('click', gpaResult);
yesBtn.addEventListener('click', continueCalculation);
noBtn.addEventListener('click', stopCalculation);
submitBtn.addEventListener('click', formSubmit);
undo.addEventListener('click', undoCgpaArray);
helpBtn.addEventListener('click', () => (modal.style.display = 'block'));
closeBtn.addEventListener('click', () => (modal.style.display = 'none'));

// When Undo button is clicked, pop last item from array
function undoCgpaArray () {
  if (!clickedUndoBtn) {
    addInput.focus();
    addInput.select();

    grades.forEach(grade => {
      grade.value = '';
    });
    creditUnits.forEach(creditUnit => {
      creditUnit.value = '';
    });
    courseCodeInputs.forEach(courseCodeInput => {
      courseCodeInput.value = '';
    });
    totalUnit.innerHTML = 0;
    gpaValue.innerHTML = 0;

    cgpaArray.pop();

    clickedUndoBtn = true;
    clickedCalcBtn = false;

    cgpaScore.innerHTML = cgpaCal(cgpaArray);

    console.log(cgpaArray);
  }
}

// Calculate for the next semester
function continueCalculation () {
  if (!clickedYesBtn) {
    addInput.focus();
    addInput.select();

    grades.forEach(grade => {
      grade.value = '';
    });
    creditUnits.forEach(creditUnit => {
      creditUnit.value = '';
    });
    courseCodeInputs.forEach(courseCodeInput => {
      courseCodeInput.value = '';
    });
    totalUnit.innerHTML = 0;
    gpaValue.innerHTML = 0;

    if (semester.innerHTML === '1st') {
      semester.innerHTML = '2nd';
    } else {
      semester.innerHTML = '1st';
      levelCount++;
    }

    level.innerHTML = levelCount;

    clickedYesBtn = true;
    clickedCalcBtn = false;

    console.log(clickedYesBtn);
  }
}
