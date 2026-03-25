var control_btn = document.querySelectorAll(".fun_btn");
let control_Loads_notes = true;

// For butttons navigation controll ----------
var activeButton = null;
control_btn.forEach(function (button) {
  button.addEventListener("click", function () {
    if (document.querySelector(".Alert_on_clear_notes_active")) {
      lockTab_on_active_clearAllNotes();
      return;
    }

    if (document.getElementsByName("search_text")) {
      set_searchBox_Empty();
    }

    if (activeButton) {
      activeButton.style.color = "";
    }
    button.style.color = "white";
    activeButton = button;

    if (button.innerHTML !== "Load Notes") {
      control_Loads_notes = true;
    }

    if (button.innerHTML === "Create New Note") {
      if (document.querySelector(".edit_box")) {
        remove_editable_box();
      }
      createNotes();
    }
    if (button.innerHTML === "Load Notes") {
      if (document.querySelector(".edit_box")) {
        remove_editable_box();
      }
      loadNotes(control_Loads_notes);
      control_Loads_notes = false;
    }
    if (button.innerHTML === "Edit Notes") {
      active_search_box();
    }
    if (button.innerHTML === "Clear All Notes") {
      if (document.querySelector(".edit_box")) {
        remove_editable_box();
      }
      clrearAll_Notes();
    }
  });
});

// For storing data in localhost -------------
function updateNotes(Obj_data) {
  localStorage.setItem("Notes_data", JSON.stringify(Obj_data));
}

// For Creating the notes -------------
function createNotes() {
  if (document.querySelector(".ShowNotes")) {
    document.querySelector(".ShowNotes").remove();
  }
  document
    .querySelector(".edit_search_box")
    .classList.remove("active_edit_search_box");

  if (document.querySelector(".content_bar")) {
    return;
  }
  var Contentbar = document.createElement("div");
  Contentbar.classList.add("content_bar");
  document.body.appendChild(Contentbar);

  var NotesInformation1 = document.createElement("span");
  NotesInformation1.classList.add("span1");
  NotesInformation1.innerHTML = "Enter Tittle";
  Contentbar.appendChild(NotesInformation1);

  var TittleBox = document.createElement("h1");
  TittleBox.setAttribute("contenteditable", "true");
  Contentbar.appendChild(TittleBox);

  var NotesInformation2 = document.createElement("span");
  NotesInformation2.classList.add("span2");
  NotesInformation2.innerHTML = "Notes";
  Contentbar.appendChild(NotesInformation2);

  var NoteInformationbox = document.createElement("p");
  NoteInformationbox.setAttribute("contenteditable", "true");
  Contentbar.appendChild(NoteInformationbox);

  var SaveBtn = document.createElement("span");
  SaveBtn.classList.add("save_btn");
  SaveBtn.innerHTML = "Save Note";
  Contentbar.appendChild(SaveBtn);

  Successed_tittle = TittleBox.innerHTML;

  var savadata = document.querySelector(".save_btn");
  savadata.addEventListener("click", function () {
    var tittle_data = TittleBox.innerHTML;
    var information_data = NoteInformationbox.innerHTML;

    var notes_data = {
      tittle: tittle_data,
      information: information_data,
    };
    TittleBox.innerHTML = "";
    NoteInformationbox.innerHTML = "";

    var stored_data = localStorage.getItem("Notes_data");
    var notesArray = stored_data ? JSON.parse(stored_data) : [];

    if (notes_data.tittle.length !== 0 && notes_data.information.length !== 0) {
      notesArray.push(notes_data);
      setTimeout(() => {
        Contentbar.remove();
      }, 20);
      setTimeout(() => {
        success_popUp(tittle_data);
      }, 21);
      updateNotes(notesArray);
    } else {
      let empty_tittle_And_info = "Title and Info (Note): Should Not Be Empty";
      Error_pop(empty_tittle_And_info);
      if (document.querySelector(".error_pop")) {
        let Error_pop_change_style = document.querySelector(".error_pop");
        Object.assign(Error_pop_change_style.style, {
          background: "#D75BD0",
          transform: "scale(1.5)",
          "z-index": 2,
          border: "2px solid rgba(255,255,2555,0.4)",
          left: "500px",
          top: "-500px",
        });
      }
    }
  });
}

function success_popUp(tittle) {
  var pop_up = document.querySelector(".save_pop_up");
  var pop_tiitle = document.getElementById("popUptittle");
  pop_up.classList.add("on_pop_up");
  pop_tiitle.innerHTML = tittle;

  ok_pop_remove();
}

function ok_pop_remove() {
  var hide_pop = document.querySelector(".save_pop_up");
  if (hide_pop) {
    var timeout = 2000;
    setTimeout(() => {
      hide_pop.classList.remove("on_pop_up");
    }, timeout);
  }
}

// Load notes --------------->

function loadNotes(control_Loads_notes) {
  if (document.querySelector(".content_bar")) {
    document.querySelector(".content_bar").remove();
  }
  document
    .querySelector(".edit_search_box")
    .classList.remove("active_edit_search_box");

  if (control_Loads_notes) {
    var Array_notes = JSON.parse(localStorage.getItem("Notes_data")) || [];
    var ShowNotes_box = document.createElement("div");
    ShowNotes_box.classList.add("ShowNotes");
    document.body.appendChild(ShowNotes_box);

    Array_notes.forEach(function (data) {
      var mainNote_box = document.createElement("div");
      mainNote_box.classList.add("mainNotes");
      ShowNotes_box.appendChild(mainNote_box);
      var main_note_tittle = document.createElement("span");
      main_note_tittle.innerHTML = data.tittle;
      var main_note_Info = document.createElement("p");
      main_note_Info.innerHTML = data.information;
      mainNote_box.appendChild(main_note_tittle);
      mainNote_box.appendChild(main_note_Info);
    });
  } else {
    return;
  }
}

// alert on delete all notes
function clrearAll_Notes() {
  if (document.querySelector(".edit_search_box")) {
    document
      .querySelector(".edit_search_box")
      .classList.remove("active_edit_search_box");
  }
  if (document.querySelector(".ShowNotes")) {
    document.querySelector(".ShowNotes").remove();
  }
  if (document.querySelector(".content_bar")) {
    document.querySelector(".content_bar").remove();
  }

  let local_data;
  if (localStorage.getItem("Notes_data")) {
    local_data = true;
  } else {
    local_data = false;
  }
  if (local_data) {
    var active_delete_alert = document.querySelector(".Alert_on_clear_notes");
    active_delete_alert.classList.add("Alert_on_clear_notes_active");
    var yes_no = document.querySelectorAll(".agree_on_delete");

    yes_no.forEach((data) => {
      data.addEventListener("click", () => {
        if (data.innerHTML === "Yes") {
          localStorage.clear();
          document.querySelector(".alert_notice").innerHTML =
            "All Notes Are Cleared..";
          document.querySelector(".no").style.display = "none";
          document.querySelector(".yes").style.display = "none";
          setTimeout(() => {
            document
              .querySelector(".Alert_on_clear_notes")
              .classList.remove("Alert_on_clear_notes_active");
          }, 600);
        } else {
          document
            .querySelector(".Alert_on_clear_notes")
            .classList.remove("Alert_on_clear_notes_active");
        }
      });
    });
  } else {
    Error_pop("Nothings To Clear..");
    return;
  }
}

// Edit Notes =========================================>
// 1. active search box
function active_search_box() {
  if (document.querySelector(".ShowNotes")) {
    document.querySelector(".ShowNotes").remove();
  }
  if (document.querySelector(".content_bar")) {
    document.querySelector(".content_bar").remove();
  }
  document
    .querySelector(".edit_search_box")
    .classList.add("active_edit_search_box");

  if (!document.querySelector(".edit_box")) {
    var edit_box = document.createElement("div");
    edit_box.classList.add("edit_box");
    document.body.appendChild(edit_box);
  }

  var search_button = document.querySelector(".search");
  search_button.addEventListener("click", () => {
    search_by_tittle();
  });
}

const loadNotesData = () => {
  if (localStorage.getItem("Notes_data"))
    var data = localStorage.getItem("Notes_data");
  var Arrya_data = JSON.parse(data);
  return Arrya_data;
};

// Searching by the tittle
const search_by_tittle = () => {
  var input_tittle_box = document.getElementsByName("search_text")[0];
  const input_tittle = input_tittle_box.value;
  let data;

  if (localStorage.getItem("Notes_data")) {
    data = loadNotesData();
  } else {
    Error_pop("Notes Not Saved Till Now");
    return;
  }

  if (input_tittle_box.value == " " || input_tittle_box.value.length == 0) {
    Error_pop("Please enter tittle");
    return;
  }

  if (input_tittle_box.value !== " " && input_tittle_box.value.length != 0) {
    if (
      document.querySelector(".edit_box") &&
      document.querySelector(".edit_button")
    ) {
      var text_in_search_input = document.getElementsByName("search_text")[0];
      if (text_in_search_input.value && text_in_search_input.value !== " ") {
        document.querySelector(".edit_button").style.display = "block";
        document.querySelector(".Cancel_button").style.display = "block";
        document.querySelector(".edit_box_info").style.display = "block";
      } else {
        return;
      }
    }

    let data_for_edit = data.find((data) => data.tittle === input_tittle);
    if (!data_for_edit) {
      let error_message =
        "OOPs! Note Not Found ,Please Check Spelling  and Extra Space or <br> <br> May Be Note Not Created Till Now";
      Error_pop(error_message);
      return;
    }

    let data_for_edit_index = data.findIndex(
      (data) => data.tittle === input_tittle
    );
    let note_tittle = data_for_edit.tittle;
    let note_info = data_for_edit.information;

    show_editable_note(
      note_tittle,
      note_info,
      input_tittle,
      data_for_edit_index
    );
  } else {
    return;
  }
};

// -----------------------------

const show_editable_note = (note_tittle, note_info, input_tittle, index) => {
  if (
    document.querySelector(".edit_box_tittle") &&
    document.querySelector(".edit_box_tittle").innerHTML !== input_tittle
  ) {
    document.querySelector(".edit_box_tittle").innerHTML = note_tittle;
    document.querySelector(".edit_box_info").innerHTML = note_info;
  }

  if (document.querySelector(".after_edit_p")) {
    document.querySelector(".after_edit_p").remove();
  }

  if (!document.querySelector(".edit_box_tittle")) {
    var edit_box = document.querySelector(".edit_box");

    if (!edit_box.classList.contains("active_edit_box")) {
      edit_box.classList.add("active_edit_box");
    }

    var tittle_box = document.createElement("h1");
    tittle_box.classList.add("edit_box_tittle");
    tittle_box.innerHTML = note_tittle;

    var info_box = document.createElement("p");
    info_box.classList.add("edit_box_info");
    info_box.setAttribute("contenteditable", "true");
    info_box.innerHTML = note_info;

    edit_box.appendChild(tittle_box);
    edit_box.appendChild(info_box);

    var edit_button = document.createElement("div");
    edit_button.innerHTML = "Edit";
    edit_button.classList.add("edit_button", "edit_note_btn");
    edit_box.appendChild(edit_button);

    var cancel_button = document.createElement("div");
    cancel_button.innerHTML = "Cancel";
    cancel_button.classList.add("Cancel_button", "edit_note_btn");
    edit_box.appendChild(cancel_button);
  }

  if (document.querySelector(".edit_box")) {
    var edit_box1 = document.querySelector(".edit_box");
    edit_box1.style.transform = "scale(1)";
  }

  var edit_button_click = document.querySelector(".edit_button");
  edit_button_click.addEventListener("click", () => {
    let note_info = document.querySelector(".edit_box_info");
    let note_info_data = note_info.innerHTML;
    edit_data(note_info_data, index);
  });

  var cancel_button_ = document.querySelector(".Cancel_button");
  cancel_button_.addEventListener("click", () => {
    document.querySelector(".edit_box").style.transform = "scale(0)";
  });
};

// -----------------------------

const edit_data = (note_info, index) => {
  let stored_data = loadNotesData();

  let new_index_data = {
    tittle: stored_data[index].tittle,
    information: note_info,
  };

  stored_data[index] = new_index_data;
  updateNotes(stored_data);

  var searchValue = document.getElementsByName("search_text")[0];
  searchValue.value = "";

  // alert("Great \n  Note Edited..");
  var edit_box = document.querySelector(".edit_box");
  var edit_button = document.querySelector(".edit_button");
  var note_info = document.querySelector(".edit_box_info");
  note_info.style.display = "none";
  var edit_note_tittle = document.querySelector(".edit_box_tittle");
  edit_note_tittle.innerHTML =
    '<h2><b style="color: rgb(1, 255, 1);margin-left:10%;">&#x2714;</b><br>Your Note Edited Successfully..</h2>';
  edit_button.style.display = "none";

  if (!document.querySelector(".after_edit_p")) {
    let after_edit_p = document.createElement("h2");
    after_edit_p.classList.add("after_edit_p");
    after_edit_p.innerHTML =
      "Search <b style='color: #00EDFF;'>&#128269</b> Next Note..";
    edit_box.appendChild(after_edit_p);
  }
  document.querySelector(".Cancel_button").style.display = "none";
  setTimeout(() => {
    edit_box.style.transform = "scale(0)";
  }, 1500);
};

const remove_editable_box = () => {
  document.querySelector(".edit_box").remove();
};

// Error funtion ......
const Error_pop = (Error_Data) => {
  if (!document.querySelector(".error_pop")) {
    let main_error_box = document.createElement("div");
    let error_text = document.createElement("div");
    let error_message = document.createElement("div");

    error_text.innerHTML = "Error";
    error_message.innerHTML = Error_Data;

    main_error_box.classList.add("error_pop");
    error_text.classList.add("error_text");
    error_message.classList.add("error_message");

    document.body.appendChild(main_error_box);
    main_error_box.appendChild(error_text);
    main_error_box.appendChild(error_message);
    setTimeout(() => {
      document.querySelector(".error_pop").remove();
    }, 1700);
  }
};

//funtion for ==> if pop open then blocxk all tabs

const lockTab_on_active_clearAllNotes = () => {
  let select_clear_all_note_popUp = document.querySelector(
    ".Alert_on_clear_notes_active"
  );

  if (select_clear_all_note_popUp) {
    if (!document.querySelector(".error_pop")) {
      Error_pop("Please select one option for Clear Notes ");
      let Error_pop_change_style = document.querySelector(".error_pop");
      Object.assign(Error_pop_change_style.style, {
        background: "#D75BD0",
        transform: "scale(1.9)",
        "z-index": 2,
        border: "2px solid rgba(255,255,2555,0.4)",
        left: "500px",
      });
    }
  }
};

// set search input box to Empty
const set_searchBox_Empty = () => {
  let inputField = document.getElementsByName("search_text")[0];
  if (inputField.value.length != 0) {
    inputField.value = "";
  }
};
