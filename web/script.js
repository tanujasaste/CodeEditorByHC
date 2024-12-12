document.addEventListener('DOMContentLoaded', function() {
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html'), {
        mode: 'htmlmixed',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'dracula'
    });

    const cssEditor = CodeMirror.fromTextArea(document.getElementById('css'), {
        mode: 'css',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'dracula'
    });

    const jsEditor = CodeMirror.fromTextArea(document.getElementById('js'), {
        mode: 'javascript',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'dracula'
    });

    const outputFrame = document.getElementById('output');

    function updateOutput() {
        const htmlCode = htmlEditor.getValue();
        const cssCode = `<style>${cssEditor.getValue()}</style>`;
        const jsCode = `<script>${jsEditor.getValue()}</script>`;
        const output = outputFrame.contentDocument;

        output.open();
        output.write(htmlCode + cssCode + jsCode);
        output.close();

        // Save code to localStorage
        localStorage.setItem('htmlCode', htmlCode);
        localStorage.setItem('cssCode', cssEditor.getValue());
        localStorage.setItem('jsCode', jsEditor.getValue());
    }

    function loadCode() {
        const savedHtmlCode = localStorage.getItem('htmlCode');
        const savedCssCode = localStorage.getItem('cssCode');
        const savedJsCode = localStorage.getItem('jsCode');

        if (savedHtmlCode) htmlEditor.setValue(savedHtmlCode);
        if (savedCssCode) cssEditor.setValue(savedCssCode);
        if (savedJsCode) jsEditor.setValue(savedJsCode);

        updateOutput();
    }

    loadCode();

    htmlEditor.on('change', updateOutput);
    cssEditor.on('change', updateOutput);
    jsEditor.on('change', updateOutput);
});

