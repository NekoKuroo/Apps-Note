document.addEventListener('DOMContentLoaded', () => {
            let guestBook = []; // Hanya disimpan di memori, tidak pakai localStorage
            
            const guestForm = document.getElementById('guestForm');
            const daftarPesan = document.getElementById('messages');
            const messageInput = document.getElementById('message');
            const charCount = document.getElementById('charCount');
            
            // Update karakter count
            messageInput.addEventListener('input', () => {
                const length = messageInput.value.length;
                charCount.textContent = length;
                
                if (length > 150) {
                    charCount.style.color = 'red';
                } else {
                    charCount.style.color = '#666';
                }
            });

            // function submit form
            guestForm.addEventListener('submit', (e) => {
                e.preventDefault();
                addGuestBook();
            });

            // fitur tambah
            function addGuestBook() {
                const nameGuest = document.getElementById('name').value.trim();
                const pesanGuest = document.getElementById('message').value.trim();
                
                if (nameGuest === "" || pesanGuest === "") {
                    alert('Nama / Pesan tidak boleh kosong !');
                    return;
                } else if (pesanGuest.length > 150) {
                    alert('Pesan lebih dari 150 karakter !');
                    return;
                }
                
                // Tambahkan data ke guestBook
                const newGuest = {
                    name: nameGuest,
                    message: pesanGuest,
                    date: new Date().toLocaleString('id-ID')
                };
                
                guestBook.push(newGuest);
                render();
                
                // Reset form
                guestForm.reset();
                charCount.textContent = '0';
                charCount.style.color = '#666';
            }

            // render halaman
            function render() {
                daftarPesan.innerHTML = '';
                
                if (guestBook.length === 0) {
                    daftarPesan.innerHTML = `
                        <div class="empty-state">
                            <i>📝</i>
                            <p>Belum ada pesan. Jadilah yang pertama mengisi buku tamu!</p>
                        </div>
                    `;
                    return;
                }
                
                guestBook.forEach((item, index) => {
                    const newDiv = document.createElement('div');
                    newDiv.classList.add('card');

                    const newName = document.createElement('h3');
                    newName.textContent = item.name;

                    const newPesanGuest = document.createElement('p');
                    newPesanGuest.textContent = item.message;

                    const newMsg = document.createElement('small');
                    newMsg.textContent = item.date;

                    newDiv.appendChild(newName);
                    newDiv.appendChild(newPesanGuest);
                    newDiv.appendChild(newMsg);
                    
                    daftarPesan.appendChild(newDiv);
                });
            }
            
            render();
        });