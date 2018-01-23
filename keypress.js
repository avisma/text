let textString = "";

  $(function() {
    $(document).keypress(function(event) {
      if (event.which === 8) {
        textString = textString.substring(0, textString.length - 1);

      } else {
        textString += String.fromCharCode(event.which);
      }

      alert(textString);
    });
  });
