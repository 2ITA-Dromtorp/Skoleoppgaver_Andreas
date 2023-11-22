import Json from "./profiles";

export default function hello(){

function shuffleArray(Json) {
    let len = Json.length,
        currentIndex;
    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
        let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
        var temp = Json[currentIndex];
        Json[currentIndex] = Json[randIndex];
        Json[randIndex] = temp;
    }
}
let a = [{}];
console.log("Array before Shuffling", a);

console.log("Shuffling array");
shuffleArray(a);

console.log("Array after Shuffling", a);

}