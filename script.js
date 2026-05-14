const inputs = document.querySelectorAll('input');
const ring = document.getElementById('progressRing');
const percentText = document.getElementById('percentText');
const circleLen = 314;

function validateEmail(email) {
    return String(email).toLowerCase().match(/\S+@\S+\.\S+/);
}

function updateUI() {
    let completed = 0;
    const values = {
        name: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        pass: document.getElementById('password').value,
        confirm: document.getElementById('confirmPass').value
    };

    if (values.name.length > 0) { completed++; document.getElementById('check-name').classList.add('done'); }
    else { document.getElementById('check-name').classList.remove('done'); }

    if (validateEmail(values.email)) { completed++; document.getElementById('check-email').classList.add('done'); }
    else { document.getElementById('check-email').classList.remove('done'); }

    if (values.pass.length >= 8) { completed++; document.getElementById('check-setup').classList.add('done'); }
    else { document.getElementById('check-setup').classList.remove('done'); }

    if (values.confirm === values.pass && values.confirm !== "") { completed++; document.getElementById('check-project').classList.add('done'); }
    else { document.getElementById('check-project').classList.remove('done'); }

    // Tính toán SVG
    const percent = (completed / 4) * 100;
    percentText.innerText = `${percent}%`;
    const offset = circleLen - (percent / 100) * circleLen;
    ring.style.strokeDashoffset = offset;
}

// Gắn sự kiện cho input và toggle password
inputs.forEach(input => input.addEventListener('input', updateUI));

document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});