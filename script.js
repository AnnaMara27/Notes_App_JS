const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clear");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
  <div class="tools">
    <button class="edit ${text ? "" : "hidden"}""><i class="fas fa-edit"></i></button>
    <button class="save ${text ? "hidden" : ""}" id="save"><i class="fas fa-save"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>

  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea ${text ? "hidden" : ""}></textarea>
  `;

  const editBtn = note.querySelector(".edit");
  const saveBtn = note.querySelector(".save");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = text;

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    editBtn.classList.toggle("hidden");
    saveBtn.classList.toggle("hidden");
  });

  saveBtn.addEventListener("click", () => {
    editBtn.classList.toggle("hidden");
    saveBtn.classList.toggle("hidden");
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = value;
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));
}

clearBtn.addEventListener("click", () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  localStorage.clear();
});
