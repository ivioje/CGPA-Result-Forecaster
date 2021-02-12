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

// 4.50-5.00         1st Class
// 3.5-4.49          2nd Class Upper
// 2.50-3.49         2nd Class Lower
// 1.50-2.49         3rd Class
// 1.00-1.49         Pass
// 0.-0.99           Fail

// Forecast Result when no button is clicked
function stopCalculation () {
  let firstClass = averageGPA(years.value, 4.52);
  let content = `
    <div class="display__result__content">
      <h3>${firstUpper(userName.value)} you're on a ${
    years.value
  } years program</h3>
      <p><strong>${cgpaCal(cgpaArray)}</strong> is your current CGPA score</p>

      <small><em>Note: The average score is approximated</em></small>

      <div>
        ${
          firstClass > 4.9
            ? ''
            : `<p>You'll need <strong>${firstClass}</strong> to remain at <strong>1st class</strong> for each of the semesters left</p>`
        }

        <p>You'll need <strong>${averageGPA(
          years.value,
          3.52
        )}</strong> to remain at with a <strong>2nd class upper</strong> for each of the semesters left</p>

        <p>You'll need <strong>${averageGPA(
          years.value,
          2.52
        )}</strong> to remain at with a <strong>2nd class lower</strong> for each of the semesters left</p>
        
      </div>

      <button class="closeBtn">Close</button>
    </div>
    
  `;
  displayBg.style.display = 'flex';
  displayResult.style.display = 'flex';
  displayResult.innerHTML = content;

  let closeBtn = call('.closeBtn');

  closeBtn.addEventListener('click', () => {
    displayBg.style.display = 'none';
    displayResult.style.display = 'none';
  });
}
