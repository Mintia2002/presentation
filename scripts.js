const locations = Array(3).fill().map((_, i) => 'Location ' + (i + 1));
const bookedTimes = {
    "Location 1": { "2023-09-10": ["10:00", "11:05"] }
    //... 他の場所と日にちの予約時間も追加できます
};

function selectLocation(location) {
    document.querySelectorAll('.location-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    const locationButton = document.querySelector(`.location-btn[data-location="${location}"]`);
    locationButton.classList.add('selected');
}

document.getElementById('locationButtons').innerHTML = locations.map((location, i) => 
    `<button class="location-btn" data-location="${location}" onclick="selectLocation('${location}')">${location}</button>`
).join('');

document.getElementById('datePicker').addEventListener('change', function() {
    // ここで時間の更新を行う
    updateTimes();
});

function updateTimes() {
    const location = document.querySelector('.location-btn.selected').getAttribute('data-location');
    const date = document.getElementById('datePicker').value;
    const reservedHours = [];
    for (let i = 10; i < 22; i++) {
        const hourReservations = bookedTimes[location] && bookedTimes[location][date] ? bookedTimes[location][date].filter(time => time.startsWith(i + ":")) : [];
        reservedHours.push(hourReservations.length > 0 ? 'unavailable' : 'available');
    }
    let hourHtml = '';
    for (let i = 10; i < 22; i++) {
        hourHtml += `<button class="hour-slot ${reservedHours[i-10]}" onclick="selectHourSlot(${i})">${i}時台</button>`;
    }
    document.getElementById('timeSlots').innerHTML = hourHtml;
    document.querySelectorAll('.hour-slot').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.minute-slot').forEach(minuteBtn => {
                minuteBtn.classList.remove('selected');
            });
            updateMinutes(parseInt(this.innerText));
        });
    });
}

// 以下のコードは変更なし


function selectHourSlot(hour) {
    document.querySelectorAll('.hour-slot').forEach(btn => btn.classList.remove('selected'));
    const hourButton = document.querySelector(`.hour-slot.${hour}`);
    hourButton.classList.add('selected');

    updateMinutes(hour);
}

function updateMinutes(hour) {
    const location = document.querySelector('.location-btn.selected').getAttribute('data-location');
    const date = document.getElementById('datePicker').value;
    const reservedTimes = bookedTimes[location] && bookedTimes[location][date] ? bookedTimes[location][date] : [];
    let minuteHtml = '<p>緑：予約可能 赤：予約不可</p>';
    for (let j = 0; j < 12; j++) {
        let time = hour + ':' + (j * 5).toString().padStart(2, '0');
        let classList = reservedTimes.includes(time) ? 'unavailable' : 'available';
        minuteHtml += `<button class="minute-slot ${classList}" onclick="selectMinuteSlot(this, '${time}')">${time}</button>`;
    }
    document.getElementById('minuteSlots').innerHTML = minuteHtml;
}

function selectMinuteSlot(btn, time) {
    document.querySelectorAll('.minute-slot').forEach(btn => btn.classList.remove('selected'));
    btn.classList.add('selected');
    // ここでは選択した分を扱えます
}

/*function previewImage() {
    const imageInput = document.getElementById('imageUpload');
    const preview = document.getElementById('imagePreview');
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(imageInput.files[0]);
    }
}*/

function previewImage() {
    const preview = document.getElementById('imagePreview');
    const previewLabel = document.getElementById('previewLabel');
    preview.src = 'miyashitapark.jpg';  // 固定の画像パスをセット
    preview.style.display = 'block';
    previewLabel.style.display = 'block';
}





function completeBooking() {
    window.location.href = 'complete.html';
}
