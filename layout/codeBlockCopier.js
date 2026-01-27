 document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const fieldset = button.closest('.file-block');
      const content = fieldset.querySelector('.code-content').innerText;

      navigator.clipboard.writeText(content).then(() => {
        // Optional: temporary visual feedback
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 1500);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  });
