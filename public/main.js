async function test() {
  const response = await fetch("/.netlify/functions/test");
  const text = await response.text();
  console.log(text);
}

test();