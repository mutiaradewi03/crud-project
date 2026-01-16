let data = JSON.parse(localStorage.getItem("data")) || [];

function tampilData() {
    let list = document.getElementById("listData");
    list.innerHTML = "";

    data.forEach((item, index) => {
        list.innerHTML += `
            <li>
                <span>${item}</span>
                <div class="btn-group">
                    <button onclick="editData(${index})">Edit</button>
                    <button onclick="hapusData(${index})">Hapus</button>
                </div>
            </li>
        `;
    });
}

function tambahData() {
    let nama = document.getElementById("nama").value;

    if (nama === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    data.push(nama);
    localStorage.setItem("data", JSON.stringify(data));
    document.getElementById("nama").value = "";
    tampilData();
}

function editData(index) {
    let namaBaru = prompt("Edit Nama:", data[index]);
    if (namaBaru !== null && namaBaru !== "") {
        data[index] = namaBaru;
        localStorage.setItem("data", JSON.stringify(data));
        tampilData();
    }
}

function hapusData(index) {
    if (confirm("Yakin ingin menghapus?")) {
        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
        tampilData();
    }
}

tampilData();
