// ===============================
// FIREBASE CONFIG
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCZjqHQXoB4JAZGkOzEshmm1kDbF3i-kQo",
  authDomain: "crud-cloud-2a618.firebaseapp.com",
  databaseURL: "https://crud-cloud-2a618-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-cloud-2a618",
  storageBucket: "crud-cloud-2a618.appspot.com",
  messagingSenderId: "755330216598",
  appId: "1:755330216598:web:8d4d58366c8786cf6748b7"
};

// ===============================
// INIT FIREBASE
// ===============================
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ===============================
// CREATE
// ===============================
function tambahData() {
    const nama = document.getElementById("nama").value.trim();

    if (nama === "") {
        alert("Nama tidak boleh kosong");
        return;
    }

    const id = Date.now();
    db.ref("users/" + id).set({
        nama: nama
    });

    document.getElementById("nama").value = "";
}

// ===============================
// READ (REALTIME)
// ===============================
db.ref("users").on("value", snapshot => {
    const list = document.getElementById("listData");
    list.innerHTML = "";

    snapshot.forEach(child => {
        const id = child.key;
        const nama = child.val().nama;

        list.innerHTML += `
            <li>
                <span>${nama}</span>
                <div class="actions">
                    <button class="btn-edit" onclick="editData('${id}', '${nama}')">Edit</button>
                    <button class="btn-delete" onclick="hapusData('${id}')">Hapus</button>
                </div>
            </li>
        `;
    });
});

// ===============================
// UPDATE
// ===============================
function editData(id, namaLama) {
    const namaBaru = prompt("Edit nama:", namaLama);

    if (namaBaru && namaBaru.trim() !== "") {
        db.ref("users/" + id).update({
            nama: namaBaru.trim()
        });
    }
}

// ===============================
// DELETE
// ===============================
function hapusData(id) {
    if (confirm("Yakin ingin menghapus data ini?")) {
        db.ref("users/" + id).remove();
    }
}
