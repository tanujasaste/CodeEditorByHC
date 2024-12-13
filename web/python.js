// const pyEditor = CodeMirror.fromTextArea(document.getElementById('pythoncode'), {
//   mode: 'javascript',
//   lineNumbers: true,
//   matchBrackets: true,
//   autoCloseBrackets: true,
//   theme: 'dracula'
// });
document.getElementById("runBtn").addEventListener("click", () => {
    const code = document.getElementById("pythonCode").value; // Get Python code from the textarea
    const outputElement = document.getElementById("output"); // Output area
  
    // Clear previous output
    outputElement.innerText = "";
  
    // Configure Skulpt
    Sk.configure({
      output: (text) => {
        outputElement.innerText += text; // Append Python output
      },
      read: (filename) => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
          throw `File not found: '${filename}'`;
        }
        return Sk.builtinFiles["files"][filename];
      },
    });
  
    // Execute Python code
    Sk.misceval
      .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code))
      .then(() => console.log("Execution completed"))
      .catch((err) => {
        outputElement.innerText =` Error: ${err.toString()}`; // Show errors
      });
  });
// Clear output
function clearOutput() {
  document.getElementById('output').textContent = '';
}
// Save code
function saveCode() {
  const code = editor.getValue();
  const blob = new Blob([code], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'code.txt';
  a.click();
}