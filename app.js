const db = new PouchDB('Finances');
const form = document.getElementById('recordForm');
const list = document.getElementById('recordsList');
const totalDaily = document.getElementById('dailySum');
const total = document.getElementById('totalSum');
const today = new Date().toISOString().slice(0, 10);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const desc = document.getElementById('description').value;
    const value = parseFloat(document.getElementById('value').value);
    const recordType = document.getElementById('type').value;

    const doc = {
        _id: new Date().toISOString(),
        desc,
        value,
        recordType,
        date: today
    };

    await db.put(doc);
    form.reset();
    refresh();
});

async function refresh() {
    const res = await db.allDocs({ include_docs: true,  descending: true});

    list.innerHTML = '';
    let totalG = 0;
    let totalD = 0;

    res.rows.forEach(row => {
        const { desc, value, recordType, date} = row.doc;
        const li = document.createElement('li');
        li.textContent = `${date} - ${desc} - R$ ${parseFloat(value).toFixed(2).replace('.', ',')} - ${recordType === 'income' ? 'Receita' : 'Despesa'}`;
        list.appendChild(li);

        const valor = parseFloat(value);
        const fator = recordType === 'income' ? 1 : -1;

        totalG += fator * valor;
        if (date === today) {
            totalD += fator * valor;
        }
    });

    total.textContent = `R$ ${totalG.toFixed(2).replace('.', ',')}`;
    totalDaily.textContent = `R$ ${totalD.toFixed(2).replace('.', ',')}`;
}
refresh();