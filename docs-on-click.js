document.addEventListener('DOMContentLoaded', function() {
  function initializeTippy() {
    var quartoDocumentContent = document.getElementById('quarto-document-content');
    tippy('.my-xref', {
        content: function(reference) {
            var contentId = "#documentation-" + reference.querySelector('span').innerText;
            var tipContent = document.querySelector(contentId);
            if (tipContent) {
                tipContent = tipContent.cloneNode(true);
                tipContent.style.display = 'block'; // Ensure the cloned content is displayed
            } else {
                tipContent = document.createElement('div');
                tipContent.textContent = "No content available";
            }
            return tipContent;
        },
        allowHTML: true, // Allow HTML content in tooltips
        arrow: true,
        trigger: "click",
        theme: "quarto",
        interactive: false,
        placement: 'bottom',
        maxWidth: "65%"
    });
  }
    
    function isValidSelector(selector) {
        try {
            document.querySelectorAll(selector);
            return true;
        } catch (error) {
            return false;
        }
    }
  var spans = document.querySelectorAll('span.fu');
  spans.forEach(function(span) {
      var anchor = document.createElement('a');
      var contentId = "#documentation-" + span.innerText;
      if(!isValidSelector(contentId)) {
        return;
      }
      var contentElement = document.querySelector(contentId);
      if (contentElement) {
          anchor.setAttribute('href', '#my-' + span.innerText);
          anchor.classList.add('my-xref');
          anchor.setAttribute('aria-expanded', 'false');
          anchor.appendChild(span.cloneNode(true));
          span.parentNode.replaceChild(anchor, span);
      }
  });
  initializeTippy();
});