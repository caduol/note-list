<template>
  <div id="app">
    <h1>Listagem de notas</h1>

    <div class="container">
      <div class="row c-field">
        <div class="c-field-add">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              v-model="noteName"
              placeholder="Name of note"
            />
            <button class="btn btn-primary" @click="addNote">
              Adicionar Nota
            </button>
          </div>
        </div>
        <ul class="c-field-list list-group">
          <li v-for="(note, idx) in notes" :key="idx" class="list-group-item">
            <div class="input-group c-field-list-content">
              <span class="c-field-list-text">
                {{ note.noteName }}
              </span>
              <input
                type="text"
                class="c-field-list-content-input"
                v-model="editNote[idx]"
              />
              <div class="c-field-list-button">
                <button @click="editNote(idx)">Edit</button>
                <button @click="removeNote(idx)">Remove</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "./database/firebase";
export default {
  name: "App",
  components: {},
  data() {
    return {
      noteName: "",

      notes: [],
    };
  },
  mounted() {
    db.ref("notes/").on("value", (items) => {
      this.notes = items.val();
    });
  },
  methods: {
    addNote() {
      db.ref("notes/")
        .push({ noteName: this.noteName })
        .then((data) => {
          this.noteName = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editNote(id) {
      let input = document.querySelector(".c-field-list-content-input");
      console.log(input, id);
      // db.ref(`notes/${id}`).set({
      //   noteName: this.editNote[id],
      // });
    },
    removeNote(id) {
      db.ref(`notes/${id}`).remove();
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.c-field {
  justify-content: center;
  margin: 20px 0;
  &-add {
    flex: 0 0 50%;
  }
  &-list {
    flex: 0 0 60%;
    list-style: none;
    margin: 20px 0;
    &-content {
      color: rgb(117, 100, 110);
      justify-content: space-between;
      &-input {
        display: none;
      }
    }
    &-text {
      margin-left: 50px;
    }
  }
}
</style>


