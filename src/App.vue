<template>
  <div id="app">
    <h1>Listagem de notas</h1>
    <div class="container">
      <div class="c-field">
        <div class="row c-field-box">
          <div class="input-group">
            <input
              type="text"
              class="form-control c-field-box-input"
              v-model="noteName"
              placeholder="Name of note"
            />
            <button class="btn btn-primary" @click="addNote">
              Adicionar Nota
            </button>
          </div>
        </div>

        <div class="row c-field-box">
          <div class="c-field-box-content">
            <ul class="c-field-box-content-list list-group">
              <li
                v-for="(note, idx) in notes"
                :key="idx"
                class="c-field-box-content-list-item list-group-item"
              >
                <span class="lead">
                  {{ note.noteName }}
                </span>
                <div class="input-group">
                  <input
                    type="text"
                    class="c-field-box-content-list-item-input form-control"
                    v-model="editNote[idx]"
                  />
                  <div class="c-field-list-button">
                    <button class="btn btn-xs btn-info" @click="editNote(idx)">
                      Edit
                    </button>
                    <button
                      class="btn btn-xs btn-danger"
                      @click="removeNote(idx)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
      // TODO - Selecionar e aplicar efeito de troca de input
      // TODO - O evento partirá do conteudo antes da edição
      db.ref(`notes/${id}`).set({
        noteName: this.editNote[id],
      });

      this.editNote[id] = "";
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
  margin: 20px 0;

  &-box {
    justify-content: center;
    &-input {
      min-width: 20em;
    }
    &-content {
      margin: 23px 0;
      &-list {
        &-item {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          min-width: 450px;
          span {
            display: flex;
          }
          &-input {
          }
        }
      }
    }
  }
}
</style>


