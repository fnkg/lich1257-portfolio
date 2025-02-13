export function randomText(
  text: string,
  setText: (text: string) => void,
  speed: number
) {
  let i = 0;
  const chars = text.split("");
  const displayChars = Array(chars.length).fill("");

  const randomize = () => {
    if (i < chars.length) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      if (displayChars[randomIndex] === "") {
        displayChars[randomIndex] = chars[randomIndex];
        setText(displayChars.join(""));
        i++;
      }
      setTimeout(randomize, speed);
    }
  };

  randomize();
}
