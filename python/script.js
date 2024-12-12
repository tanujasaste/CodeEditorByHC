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