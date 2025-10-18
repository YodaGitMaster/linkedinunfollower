// Auto-clicker script for unfollowing with detailed logging
(function() {
  console.log('🚀 Unfollow Script Started');
  
  // Configuration
  const DELAY = 2000; // 2 seconds between each unfollow
  const MENU_WAIT = 300; // Wait for menu to appear
  const MENU_BUTTON_CLASSES = 'feed-shared-control-menu__trigger artdeco-button artdeco-button--tertiary artdeco-button--muted artdeco-button--1 artdeco-button--circle artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view';
  
  // Helper function to match button classes
  function matchesClasses(element, targetClasses) {
    const elementClasses = element.className.split(' ').filter(c => c).sort().join(' ');
    const target = targetClasses.split(' ').filter(c => c).sort().join(' ');
    return elementClasses === target;
  }
  
  // Get all menu trigger buttons
  const menuButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
    matchesClasses(btn, MENU_BUTTON_CLASSES)
  );
  
  console.log(`📋 Found ${menuButtons.length} menu buttons to process`);
  
  if (menuButtons.length === 0) {
    console.warn('⚠️ No menu buttons found matching the criteria');
    return;
  }
  
  let currentIndex = 0;
  let successCount = 0;
  let errorCount = 0;
  
  function clickUnfollowOption() {
    console.log('   🔍 Looking for Unfollow option in menu...');
    
    setTimeout(() => {
      // Strategy 1: Look for clickable elements with "Unfollow" text
      const allClickable = document.querySelectorAll('button, [role="menuitem"], [role="button"], div[tabindex], a');
      let unfollowElement = Array.from(allClickable).find(el => {
        const text = el.textContent.trim();
        return text.startsWith('Unfollow') && text.length < 50;
      });
      
      // Strategy 2: If not found, search all elements and find closest clickable parent
      if (!unfollowElement) {
        const allElements = document.querySelectorAll('*');
        const textElement = Array.from(allElements).find(el => {
          const text = el.textContent.trim();
          const childText = Array.from(el.children).reduce((sum, child) => sum + child.textContent.length, 0);
          const ownText = text.length - childText;
          return text.startsWith('Unfollow') && ownText > 0 && text.length < 50;
        });
        
        if (textElement) {
          unfollowElement = textElement.closest('button') || 
                           textElement.closest('[role="menuitem"]') || 
                           textElement.closest('[role="button"]') ||
                           textElement.closest('div[tabindex]') ||
                           textElement.closest('a');
        }
      }
      
      if (unfollowElement) {
        const personName = unfollowElement.textContent.replace('Unfollow', '').trim();
        console.log(`   ✅ Found: "${unfollowElement.textContent.trim()}"`);
        console.log(`   👤 Unfollowing: ${personName || '(name not detected)'}`);
        console.log(`   🎯 Target element: <${unfollowElement.tagName.toLowerCase()}>`);
        
        // Force click with multiple methods to ensure it works
        try {
          unfollowElement.click();
          console.log('   ✓ Click method 1: element.click()');
        } catch (e) {
          console.log('   ⚠️ Click method 1 failed, trying method 2...');
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          unfollowElement.dispatchEvent(clickEvent);
          console.log('   ✓ Click method 2: dispatchEvent()');
        }
        
        successCount++;
        console.log(`   ✨ Success! (${successCount} unfollowed, ${errorCount} errors)`);
      } else {
        console.error('   ❌ Unfollow option not found in menu');
        console.log('   💡 Tip: The menu might not have opened. Check the page.');
        errorCount++;
        
        // Debug: Log what's visible in potential menus
        const menus = document.querySelectorAll('[role="menu"], .artdeco-dropdown__content');
        if (menus.length > 0) {
          console.log('   🔍 Debug: Found menus, content:');
          menus.forEach((menu, i) => {
            console.log(`      Menu ${i + 1}: "${menu.textContent.trim().substring(0, 100)}"`);
          });
        }
        
        // Try to close any open menu by clicking elsewhere
        document.body.click();
      }
    }, MENU_WAIT);
  }
  
  function autoScroll() {
    console.log('📜 Auto-scrolling to load more content...');
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
  
  function processNextButton() {
    if (currentIndex >= menuButtons.length) {
      console.log('\n🎉 All visible buttons processed!');
      console.log(`📊 Stats: ${successCount} unfollowed, ${errorCount} errors`);
      console.log('📜 Scrolling to load more content...\n');
      
      // Scroll and look for new buttons
      autoScroll();
      
      setTimeout(() => {
        // Find new buttons that weren't in the original list
        const allButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
          matchesClasses(btn, MENU_BUTTON_CLASSES)
        );
        
        const newButtons = allButtons.filter(btn => !menuButtons.includes(btn));
        
        if (newButtons.length > 0) {
          console.log(`✨ Found ${newButtons.length} new buttons after scrolling!`);
          menuButtons.push(...newButtons);
          console.log(`📋 Total buttons now: ${menuButtons.length}\n`);
          
          // Continue processing
          setTimeout(processNextButton, DELAY);
        } else {
          console.log('🏁 No new buttons found. Script complete!');
          console.log(`📊 Final stats: ${successCount} unfollowed, ${errorCount} errors`);
        }
      }, 2000); // Wait for new content to load
      
      return;
    }
    
    const btn = menuButtons[currentIndex];
    console.log(`\n[${currentIndex + 1}/${menuButtons.length}] 🖱️ Clicking menu button...`);
    
    try {
      // Scroll button into view to ensure it's clickable
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      setTimeout(() => {
        btn.click();
        console.log('   ✓ Menu button clicked');
        
        // Click unfollow option after menu appears
        clickUnfollowOption();
      }, 200); // Small delay after scroll
      
    } catch (error) {
      console.error(`   ❌ Error clicking menu button: ${error.message}`);
      errorCount++;
    }
    
    currentIndex++;
    
    // Schedule next button click
    setTimeout(processNextButton, DELAY);
  }
  
  // Start processing
  console.log(`⏱️ Starting in 1 second...\n`);
  setTimeout(processNextButton, 1000);
  
  // Return control object for manual stopping if needed
  window.unfollowScript = {
    stop: function() {
      currentIndex = menuButtons.length;
      console.log('⏹️ Script stopped by user');
    },
    status: function() {
      console.log(`📊 Current progress: ${currentIndex}/${menuButtons.length}`);
      console.log(`✅ Successful: ${successCount} | ❌ Errors: ${errorCount}`);
    }
  };
  
  console.log('💡 Tip: Type unfollowScript.stop() to stop the script');
  console.log('💡 Tip: Type unfollowScript.status() to check progress');
  
})();
