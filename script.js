const notesContainer = document.querySelector(".notesContainer");
const createBtn = document.querySelector(".btn");

// Show saved notes on load
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  attachListeners(); // Add input and delete listeners
}
showNotes();

// Save notes to localStorage
function uploadNotes() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create a new editable note
function writeNote() {
  const divEl = document.createElement("div");
  divEl.classList.add("note-wrapper");

  const inputBox = document.createElement("p");
  inputBox.classList.add("input-box");
  inputBox.setAttribute("contenteditable", "true");
  inputBox.setAttribute("data-placeholder", "Write your note here...");


  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "✖️";

  deleteBtn.addEventListener("click", () => {
    divEl.remove();
    uploadNotes();
  });

  inputBox.addEventListener("input", uploadNotes);

  divEl.appendChild(inputBox);
  divEl.appendChild(deleteBtn);
  notesContainer.appendChild(divEl);
  uploadNotes();
}

// Attach listeners after loading from localStorage
function attachListeners() {
  const inputBoxes = document.querySelectorAll(".input-box");
  const deleteBtns = document.querySelectorAll(".delete-btn");

  inputBoxes.forEach(input => {
    input.addEventListener("input", uploadNotes);
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      uploadNotes();
    });
  });
}

createBtn.addEventListener("click", writeNote);
