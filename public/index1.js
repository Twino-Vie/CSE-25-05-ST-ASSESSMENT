
let productId = 1;
const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const color = document.getElementById("color").value;
    const imageFile = document.getElementById("image").files[0];

    // Add new row
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = productId++;
    row.insertCell(1).textContent = name;
    row.insertCell(2).textContent = category;
    row.insertCell(3).textContent = parseFloat(price).toLocaleString();
    row.insertCell(4).textContent = date;

    // Image preview
    const imgCell = row.insertCell(5);
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.width = 50;
            img.height = 50;
            img.classList.add("img-thumbnail");
            imgCell.appendChild(img);
        };
        reader.readAsDataURL(imageFile);
    }

    form.reset();
});