const grades = {
  "A+": 10,
  "A": 9,
  "B": 8,
  "C": 7,
  "D": 6,
  "E": 5,
  "F": 0
};

// Default credits for 9 subjects
const defaultCredits = [3, 1.5, 3, 3, 1.5, 1.5, 3, 2, 3];

function populateSubjects() {
  const table = document.getElementById("subjectTable");

  for (let i = 0; i < 9; i++) {
    const row = document.createElement("tr");

    // Subject name input
    const nameCell = document.createElement("td");
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = `Enter Subject ${i + 1}`;
    nameCell.appendChild(nameInput);

    // Grade dropdown
    const gradeCell = document.createElement("td");
    const gradeSelect = document.createElement("select");
    for (let grade in grades) {
      const option = document.createElement("option");
      option.value = grade;
      option.text = grade;
      gradeSelect.appendChild(option);
    }
    gradeCell.appendChild(gradeSelect);

    // Credit dropdown with default selected
    const creditCell = document.createElement("td");
    const creditSelect = document.createElement("select");
    [1.5, 2, 3].forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.text = c;
      if (c === defaultCredits[i]) {
        option.selected = true;
      }
      creditSelect.appendChild(option);
    });
    creditCell.appendChild(creditSelect);

    // Append cells to row
    row.appendChild(nameCell);
    row.appendChild(gradeCell);
    row.appendChild(creditCell);

    // Append row to table
    table.appendChild(row);
  }
}

function calculateSGPA() {
  const rows = document.querySelectorAll("#subjectTable tr");
  let totalCredits = 0;
  let totalPoints = 0;
  let failed = false;

  rows.forEach(row => {
    const grade = row.children[1].querySelector("select").value;
    const credit = parseFloat(row.children[2].querySelector("select").value);
    const point = grades[grade];

    if (point === 0) failed = true;

    totalCredits += credit;
    totalPoints += point * credit;
  });

  if (failed) {
    alert("Sorry, you have failed in one or more subjects.");
  } else {
    const sgpa = (totalPoints / totalCredits).toFixed(2);
    alert(`Congratulations! You have passed. Your SGPA is: ${sgpa}`);
  }
}

// Load on page load
populateSubjects();
