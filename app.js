const db = new PouchDB('Finances');
const form = document.getElementsById('recordForm');
const list = document.getElementsById('recordsList');
const totalDaily = document.getElementsById('dailySum');
const total = document.getElementsById('totalSum');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const desc = document.getElementsById('Description').value;
    const value = document.getElementsById('Value').value;
    const recordtype = document.getElementsById('Type').value;
    const date = new Date().toISOString().slice(0, 10);
}
)