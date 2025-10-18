// Auto-clicker script with detailed logging
(function() {
  console.log('🚀 Script started');
  
  // Configuration
  const DELAY = 2000; // 2 seconds
  const PRIMARY_BUTTON_CLASSES = 'artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view';
  const CONFIRM_BUTTON_CLASSES = 'artdeco-button artdeco-button--2 artdeco-button--primary ember-view artdeco-modal__confirm-dialog-btn';
  
  // Get all primary buttons
  const buttons = Array.from(document.querySelectorAll('button')).filter(btn => {
    const classes = btn.className.split(' ').sort().join(' ');
    const targetClasses = PRIMARY_BUTTON_CLASSES.split(' ').sort().join(' ');
    return classes === targetClasses;
  });
  
  console.log(`📋 Found ${buttons.length} buttons to process`);
  
  if (buttons.length === 0) {
    console.warn('⚠️ No buttons found matching the criteria');
    return;
  }
  
  let currentIndex = 0;
  let successCount = 0;
  let errorCount = 0;
  
  function clickConfirmButton() {
    console.log('   🔍 Looking for confirmation button...');
    
    // Wait a bit for modal to appear
    setTimeout(() => {
      const confirmBtn = Array.from(document.querySelectorAll('button')).find(btn => {
        const classes = btn.className.split(' ').sort().join(' ');
        const targetClasses = CONFIRM_BUTTON_CLASSES.split(' ').sort().join(' ');
        return classes === targetClasses;
      });
      
      if (confirmBtn) {
        console.log('   ✅ Confirmation button found, clicking...');
        confirmBtn.click();
        successCount++;
        console.log(`   ✨ Success! (${successCount} completed, ${errorCount} errors)`);
      } else {
        console.error('   ❌ Confirmation button not found');
        errorCount++;
      }
    }, 500); // Wait 500ms for modal to render
  }
  
  function processNextButton() {
    if (currentIndex >= buttons.length) {
      console.log('🎉 All buttons processed!');
      console.log(`📊 Final stats: ${successCount} successful, ${errorCount} errors`);
      return;
    }
    
    const btn = buttons[currentIndex];
    console.log(`\n[${currentIndex + 1}/${buttons.length}] 🖱️ Clicking primary button...`);
    
    try {
      btn.click();
      console.log('   ✓ Primary button clicked');
      
      // Click confirm button after a short delay
      clickConfirmButton();
      
    } catch (error) {
      console.error(`   ❌ Error clicking button: ${error.message}`);
      errorCount++;
    }
    
    currentIndex++;
    
    // Schedule next button click
    setTimeout(processNextButton, DELAY);
  }
  
  // Start processing
  console.log(`⏱️ Starting in ${DELAY/1000} seconds...\n`);
  setTimeout(processNextButton, DELAY);
  
})();
