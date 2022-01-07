const canvas = document.getElementById('canvas1');
//tworzę z canvas obiekt 2d
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
letParticleArray = [];

//mouse

const mouse = {
  x: null,
  y: null,
  radius: 100
}
/* wewnątrz okna dodaje event listener, który reaguje na mousemove. przekazuje do niego funkcję,
która przyjmuje wartość event - skoro jest wewnątrz listenera, odnosi się do collbacku.
przekazuję mu funkcje, która zwraca wartości obiektu mouse - tutaj pozycje na x oraz y.
// // wyciągam informację za pomocą funkcji, i wysylam je do obiektu mouse */
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse.x, mouse.y)
})
//tworzę nowe pole, z danymi, które są przekazywane przez wbudowaną w JS funkcje image
//const image1 = new Image();
//image1.src = 'images/zdj.jpg';
/* sprawiam, że js wykonuje funkcje draw dopiero po zaladowaniu obrazka, muszę to zrobić,
ponieważ kod js wczytuje się szybciej niż obrazek
drawImage - wbudowana funkcja JS, parametry (lacznie 9): image to draw,
pozycja na osi x, pozycja na osi y, szerokośc obrazka, wysokość obrazka */
//image1.addEventListener('load', function(){
//  ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  /*
  - szukam kolorów każdego pixela, który tworzy ten obrazek wbudowaną funkcją JS
  argumenty (lacznie 4) - pozycja na osi x, pozycja na osi y - pozycja początku skanowania,
  cavas width, canvas height - droga do zeskanowania
  - funckja czyta obrazek pixel po pixelu i przypisuje każdemu z nich wartość pomiędzy 0 a 255
  wynika to z budowy RGB - red (255) green (65) blue (0) alpha (przeźroczystość)
  - funkcja zwraca 4 dane dla jednego pixela- wartości RGBa - elementów w tablicy jest 4x więcej,
  niż pixeli, które budują obrazek
  - obrazek można przetworzyć na string toDataURL(), albo online - to base 64
  */
//  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
//  console.log(scannedImage);
//  });

class Particle {
  // nadaje particles wlasciwosci
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 1.5;
    // baseX/Y przechowuje dane dla każdej cząsteczki dla momentu, w którym się pojawia
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 30) + 1
    }
  draw(){
    ctx.fillStyle = 'white'
    ctx.beginPath();
    //arc tworzy kolo - pozycja startowa x/y, rozmiar, kąt startowy rysunku, kąt końcowy rysunku z obwodu kola
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update(){
    //szukam odleglosci myszy od cząsteczki
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100){
      this.size = 2;
    } else{
      this.size = 1.5;
    }
  }
}

function init() {
  particleArray = [];
  //tworzę pętlę idącą 10 razy
  for (let i = 0; i < 10000; i++){
    // dzialam dla particles, ktore wymagają danych x oraz y, daje im random wartość od 0 do szer/dl canvavs
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}
init();
console.log(particleArray);

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++){
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}
animate();
