  const output = document.getElementById('output');
  const inputField = document.getElementById('input');
    
  function getCurrentPath() {
  const file = window.location.pathname.split('/').pop();
  if (!file || file === 'home.html') return '~';
  return `~ ` + file.replace('.html', '');
}

  const commands = {
    help: `
<span class="ansi-green">Available commands:</span>
<div class="help">
  <b>home</b>      <i>- Main page</i>
  <b>about</b>     <i>- What is this web site about?</i>
  <b>projects</b>  <i>- View my projects</i>
  <b>social</b>    <i>- My social links</i>
  <b>email</b>     <i>- Get my email</i>
  <b>clear</b>     <i>- Clear the terminal</i>
</div>`,
    pwd: `<span class="ansi-cyan">guest@techdiy:${getCurrentPath()}</span>`,
    about: `<div class="intro"><p>This site is a small collection of custom scripts that might be helpful, mostly for <strong>Linux</strong>, with some <strong>Android ADB tools</strong> and a couple of small <strong>Docker</strong> projects.</p><p>Nothing fancy, just practical stuff: scripts that solve small problems, configs for customising environments, and a few tips gathered along the way. <p>* <i>The content is aimed at advanced users who are comfortable with Linux, Docker, Android, coding, and general system-level tinkering.</i></p><p><strong>** <i>You'll need the basic Linux commands to navigate here...</i></strong></p><p><b><i>...But I am a Windows/Mac user -> <a href="windows-or-mac-users.html">Read here...</a></i></b></p></div>`,
    projects: `<span class="ansi-yellow">
📁 <b>docker</b>     <i>- My small docker projects</i>
📁 <b>android</b>    <i>- Some Android scripts..</i>
📁 <b>linux</b>      <i>- Small scripts for automation etc..</i>
</span>`,
    social: `<span class="ansi-yellow">
🦊 Gitlab:   https://gitlab.com/mark-lab
🐳 DockerHub: https://hub.docker.com/repositories/dockerfos
</span>`,
    email: `<span class="ansi-cyan">📫 Email: <span class="error">Not present..</span></span>`,
    clear: ''
  };

  function printLine(content, isHTML = false) {
    const line = document.createElement('div');
    line.className = 'line';
    if (isHTML) {
      line.innerHTML = content;
    } else {
      line.textContent = content;
    }
    output.appendChild(line);
    //output.scrollTop = output.scrollHeight;
    document.getElementById('input').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// Type/Writing function

function typeLine(htmlContent, callback) {
  const container = document.createElement('div');
  container.className = 'line';
  output.appendChild(container);

  let index = 0;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const fullText = tempDiv.textContent || tempDiv.innerText || "";

  function typeChar() {
    if (index < fullText.length) {
      container.textContent += fullText.charAt(index);
      index++;
      //output.scrollTop = output.scrollHeight;
      document.getElementById('input').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(typeChar, 15); // Adjust typing speed here
    } else {
      container.innerHTML = htmlContent; // Replace with full styled HTML after typing
      //output.scrollTop = output.scrollHeight;
      document.getElementById('input').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (callback) callback();
    }
  }

  typeChar();
}

/* Add Alies Map */
const fileAliases = {
  'docker.html': {
    ffd: 'docker-image-firefox-browser-on-debian',
    ffa: 'docker-image-firefox-browser-on-alpine',
    tor: 'docker-image-tor-browser-on-debian'
  },
  'android.html': {
    adb: 'android-adb-app-uninstaller'
  },
  'linux.html': {
    usb: 'malicious-usb-device-detector',
    cff: 'corrupted-files-finder',
    pdt: 'picture-name-date-time'
  }
};

function handleCommand(cmd) {
  const safeCmd = escapeHTML(cmd);
  const promptLine = `<span class="prompt">guest@techdiy:~$</span> ${safeCmd}`;
  printLine(promptLine, true);

  if (cmd === 'clear') {
    output.innerHTML = '';
    return;
  }

  if (commands[cmd]) {
    // typeLine(commands[cmd]);
    if (cmd === 'pwd') {
		typeLine(`<span class="ansi-green">guest@techdiy:${getCurrentPath()}</span>`);
} 	else {
		typeLine(commands[cmd]);
}

    return;
  }

  if (cmd === 'cd' || cmd === 'cd ..' || cmd === 'cd ~' || cmd === 'cd ~/' || cmd === 'home') {
    localStorage.setItem('previousPath', window.location.pathname);
    window.location.href = 'home.html';
    return;
  }

  if (cmd === 'cd -') {
    const previous = localStorage.getItem('previousPath');
    if (previous) {
      localStorage.setItem('previousPath', window.location.pathname);
      window.location.href = previous;
    } else {
      printLine(`<span class="error">cd: OLDPWD not set</span>`, true);
    }
    return;
  }

  if (cmd.startsWith('cd ')) {
    const target = cmd.slice(3).trim();
    const pages = ['home', 'docker', 'android', 'linux'];
    if (pages.includes(target)) {
      localStorage.setItem('previousPath', window.location.pathname);
      window.location.href = `${target}.html`;
    } else {
      const safeTarget = escapeHTML(target);
      printLine(`<span class="error">cd: no such file or directory: ${safeTarget}</span>`, true);
    }
    return;
  }
  
 if (cmd.startsWith('sudo')) {
  printLine('<span class="error">sudo: command not found, sudo is not installed!</span>', true);
  return;
}
  
 if (cmd === 'ls') {
  const path = window.location.pathname;
  let lsOutput = `<span class="ansi-yellow">No content found.</span>`;

  if (path.includes('home.html') || path === '/' || path === '') {
    lsOutput = `<span class="ansi-yellow">
📁 docker
📁 android
📁 linux
</span>`;
  } else {
    const page = path.split('/').pop(); // e.g., 'docker.html'
    const aliases = fileAliases[page];

    if (aliases) {
      lsOutput = `<span class="ansi-yellow">`;
      for (const [alias, full] of Object.entries(aliases)) {
        lsOutput += `📄 <a href="${full}.html">${full}</a> <i>(alias: ${alias})</i>\n`;
      }
      /* Adding Tips */
      lsOutput += `</span>
<span class="ansi-green">Tips:</span>
<i>Use short aliases (<q>ffd</q>, <q>tor</q>, <q>adb</q>...) present along the file names above with <b class="ansi-purple">'cat'</b> or <b class="ansi-purple">'less'</b> command to open files: 
For example:
<b class="ansi-purple">'cat ffd'</b>	→ opens file <b class="ansi-purple">'docker-image-firefox-browser-on-debian'</b> ..OR
<b class="ansi-purple">'less adb'</b>	→ opens file <b class="ansi-purple">'android-adb-app-uninstaller'</b> etc..
..OR you can just click on</i>
<br />`;
      lsOutput += `</span>`;
    }
  }

  // printLine(lsOutput, true); /* prints at once */
  typeLine(lsOutput); /* prints with `Type/Writing` style */
  return;
}

/* Adding `cat` & `less` commands */
if (cmd.startsWith('cat ') || cmd.startsWith('less ')) {
  const [, alias] = cmd.split(' ');
  const page = window.location.pathname.split('/').pop();
  const aliases = fileAliases[page];

  if (aliases && aliases[alias]) {
    const filename = aliases[alias] + '.html';
    localStorage.setItem('previousPath', window.location.pathname);
    window.location.href = filename;
  } else {
    printLine(`<span class="error">${cmd.split(' ')[0]}: no such file or alias: ${alias}</span>`, true);
  }
  return;
}

  printLine(`<span class="error">command not found: ${safeCmd}</span>`, true);
}

let commandHistory = [];
let historyIndex = -1;

inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = inputField.value.trim();
    if (command) {
      handleCommand(command);
      commandHistory.push(command);
      historyIndex = commandHistory.length;
    }
    inputField.value = '';
  }

  if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      inputField.value = commandHistory[historyIndex];
    }
    e.preventDefault();
  }

  if (e.key === 'ArrowDown') {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      inputField.value = commandHistory[historyIndex];
    } else {
      inputField.value = '';
      historyIndex = commandHistory.length;
    }
    e.preventDefault();
  }
});
  
	// Focus input on page load — only on home.html
//~ if (window.location.pathname.includes('home.html')) {
  //~ inputField.focus();

  // Refocus if user clicks anywhere on the page
  //~ document.addEventListener('click', () => {
    //~ inputField.focus();
  //~ });
//~ }
