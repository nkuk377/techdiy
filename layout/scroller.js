const scrollBtn = document.getElementById('scrollTopBtn');
const terminal = document.getElementById('terminal');

terminal.addEventListener('scroll', () => {
  if (terminal.scrollTop > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  terminal.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll to top smoothly when button is clicked
scrollBtn.addEventListener('click', () => {
  terminal.scrollTo({ top: 0, behavior: 'smooth' });
});

// Handle anchor click for scrolling to bottom
//~ document.querySelectorAll('a[href="#cli"]').forEach(anchor => {
  //~ anchor.addEventListener('click', (e) => {
    //~ e.preventDefault(); // Prevent default anchor jump

    //~ terminal.scrollTo({
      //~ top: terminal.scrollHeight,
      //~ behavior: 'smooth'
    //~ });

//~ // After scroll completes, focus and move cursor to end of input    
      //~ setTimeout(() => {
      //~ if (inputField) {
        //~ inputField.focus();
        //~ const val = inputField.value;
        //~ inputField.value = '';
        //~ inputField.value = val;
      //~ }
    //~ }, 500);
    
  //~ });
//~ });
