# jquery.konami
A simple, lightweight jQuery plugin to easily add a konami code to a website

What is a konami code?
http://en.wikipedia.org/wiki/Konami_Code

Commercial use requires one-time purchase of a commercial license
http://ApplyContext.com

Non-commercial use is licensed under the GPL v3 License
Copyright 2015 ApplyContext.com

Example Usage

  // create a konami 'admin' that triggers console message
  $(document).konami({charCodes: [65,68,77,73,78], successHandler: function(){
    console.log('konami success');
  }});
