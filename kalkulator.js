//kurang lebih, ini adalah script dari kalkulator tadi
//kita mulai dari bagian paling atas yaitu objek dengan nama kalkulator. Jadi objek ini berfungsi
//sebagai indikator / kondisi kalkulator itu sendiri
//untuk indikator itu sendiri ada displayNumber sebagai representasi dari angka yang ditampilkan dihalaman web
//selanjutnya, ada operator sebagai representasi dari operasi yang akan dilakukan pengguna (penjumlahan, pengurangan)
//lalu, first number, angka pertama yang dipilih pengguna, dan waiting for second number sebagai
//indikator sedang menunggu angka kedua atau tidak

const calculator = {
    displayNumber : '0',
    operator : null,
    firstNumber : null,
    waitingForSecondNumber : false
};

//dibawahnya terdapat function atau fungsi update display, secara singkat fungsi ini akan mengubah angka yang ditampilkan di web
//dengan cara, dia akan mencari teks dalam elemen file HTML terkait yang memiliki class display number,
//lalu teks itu akan diubah sesuai dengan nilai
//display number yang ada di objek kalkulator tadi

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

//selanjutnya ada fungsi clear kalkulator, jadi fungsi ini akan me-reset state / kondisi dari kalkulator
//jadi kalkulator yang sudah melakukan operasi (penjumlahan/pengurangan) akan berubah seperti awal,
//dalam kata lain hal ini mirip factory reset di perangkat keras.
//display number jadi 0, operator jadi null, dan seterusnya.

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//disini ada juga, fungsi input digit, singkatnya fungsi ini akan mengubah nilai display number sesuai dengan inputan pengguna
//jika displaynya itu 0, maka 0 itu akan digantikan digit atau angka inputan.
//Jadi misalkan 0, akan langsung jadi 5, bukan jadi 05.
//jika display bukan 0, maka angka itu akan ditambahkan digit. Jadi misalkan 5, nanti akan jadi 57, bukan jadi 7.

function inputDigit(digit) {
    if(calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

//lalu disini ada objek buttons, objek ini berisikan semua button atau tombol yang ada di file index.html
//Di bawahnya terdapat loop / perulangan, yang singkatnya berfungsi untuk menetapkan event listener kepada button
//event listener itu sendiri merupakan semacam syntax yang dapat membuat button menjadi responsif / dapat memberikan respon
//setiap respon button bisa diklasifikasikan atau dibedakan jenisnya, dalam hal ini, setiap respon button dibagi berdasarkan
//nama classnya. Nama class itu nantinya akan dimasukkan ke objek baru dengan nama target.
//disini juga terdapat percabangan dengan kondisi berupa nama class (nilai dari objek target), apabila diterjemahkan, kurang
//lebih hasilnya seperti ini, "Apabila nilai dari target berupa nama class yang mengandung kata "clear", maka jalankan perintah ini!"
//begitu juga untuk kondisi lainnya. Didalam masing2 percabangan terdapat perintah yang memanggil function / fungsi tertentu.
//setelah percabangan terdapat perintah yang gunanya untuk menampilkan angka yang dipilih user

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {

        //mendapatkan objek elemen yang diklik
        const target = event.target;

        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}

//berikut adalah fungsi inverse number, fungsi ini memiliki fungsi yang sederhana yaitu mengubah nilai angka menjadi negatif / positif
//misalkan nilai display adalah 1, maka akan berubah menjadi -1, begitu juga sebaliknya.
//disini terdapat pengecualian yaitu apabila nilai display adalah 0,
//maka tidak akan terjadi pengubahan (karena -0 itu tidak ada, alias nilainya
//sama saja dengan 0)

function inverseNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

//handle operator, handle operator disini berfungsi sebagai pengatur kondisi kalkulator dalam kata lain,
//fungsi ini akan mengubah nilai data 
//dari objek kalkulator. Apabila nilai dari waiting for second number itu masih false (belum melakukan operasi),
//maka fungsi ini akan mengubah
//nilai operator, waiting for second number, first number, dan display number.
//jika nilai waiting for second number itu true, maka akan muncul sebuah notifikasi yang
//mengingatkan pengguna bahwa operator sudah ditetapkan.

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

//mengatur ulang nilai display number supaya  tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('operator sudah ditetapkan')
    }
}

//Perform Calculation adalah fungsi yang mengambil nomer pertama lalu melakukan operasi sesuai dengan input user
//kepada nomer kedua (display number)
//funsi ini mengecek apakah ada tidaknya nomer pertama dan operator dan menotifikasi user jika belum ada kedua input

function performCalculation() {
    if(calculator.firstNumber == null || calculator.operator == null) {
        alert('anda belum menetapkan operator');
        return;
    }

//Melakukan pengecekan operator menggunakan statement "if", dimana user meng input operator "+" maka yang akan terjadi adalah,
//first number akan di ditambah (+) dengan display number.
//Lalu apabila operator yang diinput merupakan "-", yang akan terjadi adalah pengurangan antara first number dengan display number
//Jika user menginput operator selain "+" atau "-", yang akan muncul adalah kalimat 'operator tidak tersedia'

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else if (calculator.operator === "-") {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    } else{
        alert('operator tidak tersedia')
    }

    calculator.displayNumber = result;
}