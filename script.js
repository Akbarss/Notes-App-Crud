const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
  <div class='tools'>
  <button class='edit'>Edit</button>
  <button class='delete'>Delete</button>
  </div>

  <div class='main ${text ? "" : "hidden"}'></div>
  <textarea class='${text ? "hidden" : ""}'></textarea>
  `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", () => {
    const { value } = e.target;

    main.innerHTML = marked(value);
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelector("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
