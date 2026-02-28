// Function defined to generate an array of 5 unique values
export default function generateRandomNumbers(count) {
  // Define a set of unique numbers, and keep adding numbers until we have the correct number of integers in the set
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * 151) + 1;
    uniqueNumbers.add(randomNumber);
  }

  // Return the set as an array
  return [...uniqueNumbers];
}
