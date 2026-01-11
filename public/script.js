function send() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;

  fetch("/save", {
    method: "POST",
    body: name + " " + surname
  });

  alert("yangilanish olib borilmoqda!");
}
